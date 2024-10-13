import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import BaseController from '../BaseController';
import { UserService } from './UserService';
import { UserAttributes } from '../../database/models/User';
import ApiError from '../../abstractions/ApiError';
import { RouteDefinition } from '../../types/RouteDefinition';

/**
 * User controller
 */
export default class UserController extends BaseController {
	private user: UserService;
	public basePath = 'users';

	constructor() {
		super();
		this.user = new UserService();
	}

	/**
	 * The routes method returns an array of route definitions for CRUD operations
	 * (GET, POST, PUT, DELETE) on enquiries,
	 * with corresponding handlers bound to the controller instance.
	 */
	public routes(): RouteDefinition[] {
		return [
			{ path: '/', method: 'get', handler: this.getUsers.bind(this) },
			{
				path: '/:id',
				method: 'get',
				handler: this.getUser.bind(this),
			},
			{
				path: '/',
				method: 'post',
				handler: this.createUser.bind(this),
			},
			{
				path: '/:id',
				method: 'put',
				handler: this.updateUser.bind(this),
			},
			{ path: '/:id', method: 'delete', handler: this.delete.bind(this) },
		];
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async getUsers(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const users: UserAttributes[] = await this.user.getAll();
			res.locals.data = users;
			// call base class method
			this.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async getUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = req.params.id;
			const user: UserAttributes = await this.user.getById(id);
			res.locals.data = user;
			// call base class method
			this.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async updateUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = req.params.id;
			const { body } = req;
			const user: UserAttributes = await this.user.update(
				id,
				body,
			);
			res.locals.data = {
				user,
			};
			// call base class method
			this.send(res);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async createUser(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { name, country, email, username, password } = req.body;
			if (!name && !country) {
				throw new ApiError(
					ReasonPhrases.BAD_REQUEST,
					StatusCodes.BAD_REQUEST,
				);
			}
			const user: UserAttributes = await this.user.create({
				username: username || email,
				name,
				country: country || "",
				password,
				email,
			});
			res.locals.data = {
				user,
			};
			// call base class method
			super.send(res, StatusCodes.CREATED);
		} catch (err) {
			next(err);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	public async delete(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = req.params.id;
			const status: boolean = await this.user.delete(id);
			res.locals.data = {
				status,
			};
			// call base class method
			this.send(res);
		} catch (err) {
			next(err);
		}
	}
}
