import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import BaseController from '../BaseController';
import { EnquiryService } from './EnquiryService';
import { EnquiryAttributes } from '../../database/models/Enquiry';
import ApiError from '../../abstractions/ApiError';
import { RouteDefinition } from '../../types/RouteDefinition';

/**
 * Enquiry controller
 */
export default class EnquiryController extends BaseController {
	private enquiry: EnquiryService;
	public basePath = 'enquiries';

	constructor() {
		super();
		this.enquiry = new EnquiryService();
	}

	/**
	 * The routes method returns an array of route definitions for CRUD operations
	 * (GET, POST, PUT, DELETE) on enquiries,
	 * with corresponding handlers bound to the controller instance.
	 */
	public routes(): RouteDefinition[] {
		return [
			{ path: '/', method: 'get', handler: this.getEnquiries.bind(this) },
			{
				path: '/:id',
				method: 'get',
				handler: this.getEnquiry.bind(this),
			},
			{
				path: '/',
				method: 'post',
				handler: this.createEnquiry.bind(this),
			},
			{
				path: '/:id',
				method: 'put',
				handler: this.updateEnquiry.bind(this),
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
	public async getEnquiries(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const enquiries: EnquiryAttributes[] = await this.enquiry.getAll();
			res.locals.data = enquiries;
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
	public async getEnquiry(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = req.params.id;
			const enquiry: EnquiryAttributes = await this.enquiry.getById(id);
			res.locals.data = enquiry;
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
	public async updateEnquiry(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const id = req.params.id;
			const { body } = req;
			const enquiry: EnquiryAttributes = await this.enquiry.update(
				id,
				body,
			);
			res.locals.data = {
				enquiry,
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
	public async createEnquiry(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { name, country, subject, body, email } = req.body;
			if (!name && !country) {
				throw new ApiError(
					ReasonPhrases.BAD_REQUEST,
					StatusCodes.BAD_REQUEST,
				);
			}
			const enquiry: EnquiryAttributes = await this.enquiry.create({
				name,
				country,
				subject,
				body,
				email,
			});
			res.locals.data = {
				enquiry,
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
			const status: boolean = await this.enquiry.delete(id);
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
