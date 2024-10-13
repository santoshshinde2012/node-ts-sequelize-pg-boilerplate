import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import BaseController from '../components/BaseController';
import { RouteDefinition } from '../types/RouteDefinition';
import { UserService } from '../components/user/UserService';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserAttributes } from '../database/models/User';
import ApiError from '../abstractions/ApiError';
import { ExtSession } from '../types/types';

interface AuthorizationCodeEntry {
	client_id: string;
	redirect_uri: string;
	username: string;
	scope: string;
}

export default class OAuth2Controller extends BaseController {
	private authorizationCodes: Record<string, AuthorizationCodeEntry>;
	private jwtSecret: string;
	public basePath = 'auth';
	private user: UserService;

	constructor() {
		super();
		this.jwtSecret = process.env.OAUTH_SECRET;
		this.authorizationCodes = {};
		this.user = new UserService();
	}

	public routes(): RouteDefinition[] {
		return [
			{
				path: '/register',
				method: 'post',
				handler: this.registerUser.bind(this),
			},
			{
				path: '/login',
				method: 'post',
				handler: this.loginUser.bind(this),
			},
			{
				path: '/authorize',
				method: 'get',
				handler: this.authorize.bind(this),
			},
			{
				path: '/token',
				method: 'post',
				handler: this.token.bind(this),
			},
			{
				path: '/callback',
				method: 'get',
				handler: this.callback.bind(this),
			},
			{
				path: '/userinfo',
				method: 'get',
				handler: this.userInfo.bind(this),
			},
		];
	}

	async registerUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, country, email, username, password } = req.body;
			if (!username || !password || !email || !name || !country) {
				throw new ApiError(
					ReasonPhrases.BAD_REQUEST,
					StatusCodes.BAD_REQUEST,
				);
			}
			const user: UserAttributes = await this.user.create({
				username: username || email,
				name,
				country: country || '',
				password,
				email,
			});
			res.locals.data = {
				user,
			};
			super.send(res, StatusCodes.CREATED);
		} catch (err) {
			next(err);
		}
	}

	private async loginUser(
		req: Request & { session: ExtSession },
		res: Response,
		next: NextFunction,
	) {
		try {
			const { username, password } = req.body;

			const user = await this.user.getByUserName(username);
			if (!user || user?.password !== password) {
				return res.status(401).send('Invalid credentials');
			}
			req.session.username = username;

			res.json({ message: 'Login successful' });
		} catch (err) {
			next(err);
		}
	}

	private authorize(req: Request & { session: ExtSession }, res: Response) {
		if (!req.session.username) {
			return res
				.status(401)
				.send('User not authenticated. Please log in first.');
		}

		const { response_type, client_id, redirect_uri, state } = req.query;

		const clientId = Array.isArray(client_id)
			? client_id[0]
			: (client_id as string);
		const redirectUri = Array.isArray(redirect_uri)
			? redirect_uri[0]
			: (redirect_uri as string);

		if (
			!clientId ||
			!redirectUri ||
			!response_type ||
			response_type !== 'code'
		) {
			return res.status(400).send('Invalid request parameters');
		}

		const username = req.session?.username;

		const authorizationCode = uuidv4();
		this.authorizationCodes[authorizationCode] = {
			client_id: clientId.toString(),
			redirect_uri: redirectUri.toString(),
			username,
			scope: 'openid profile',
		};

		const redirectUrl = `${redirect_uri}?code=${authorizationCode}${state ? `&state=${state}` : ''}`;
		res.redirect(redirectUrl);
	}

	private token(req: Request, res: Response) {
		const { grant_type, code, redirect_uri, client_id } = req.body;

		if (
			grant_type !== 'authorization_code' ||
			!code ||
			!client_id ||
			!redirect_uri
		) {
			return res.status(400).json({ error: 'invalid_request' });
		}

		const authCodeData = this.authorizationCodes[code];
		if (
			!authCodeData ||
			authCodeData.client_id !== client_id ||
			authCodeData.redirect_uri !== redirect_uri
		) {
			return res.status(400).json({ error: 'invalid_grant' });
		}

		const accessToken = jwt.sign(
			{ sub: authCodeData.username, scope: authCodeData.scope },
			this.jwtSecret,
			{ expiresIn: '1h' },
		);

		res.json({
			access_token: accessToken,
			token_type: 'Bearer',
			expires_in: 3600,
		});
	}

	private async userInfo(req: Request, res: Response) {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) return res.status(401).send('Unauthorized');

		try {
			const decoded = jwt.verify(token, this.jwtSecret);
			const username = decoded.sub.toString();
			const user = await this.user.getByUserName(username);
			res.json({
				sub: username,
				username: user.username,
				name: user.name,
				email: user.email,
				country: user.country,
				id: user.id,
			});
		} catch (error) {
			res.status(401).send('Invalid token');
		}
	}

	private callback(req: Request, res: Response) {
		const { code, state } = req.query;

		if (!code) {
			return res.status(400).send('Authorization code is missing');
		}

		res.send(
			`Authorization code received: ${code}. State: ${state ? state : 'No state'}`,
		);
	}
}
