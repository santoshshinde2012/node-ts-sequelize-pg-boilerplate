import { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Provides services common to all API methods
 */
export default abstract class BaseController {
	protected router: Router;

	constructor() {
		this.router = Router();
	}

	public abstract register(): void;

	/**
	 * Global method to send API response
	 * @param res
	 * @param statusCode
	 */
	public send(res: Response, statusCode: number = StatusCodes.OK): void {
		let obj = {};
		obj = res.locals.data;
		res.status(statusCode).send(obj);
	}
}
