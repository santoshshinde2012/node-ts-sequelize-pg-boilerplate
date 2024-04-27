import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export interface IError {
	status: number;
	fields: {
		name: {
			message: string;
		};
	};
	message: string;
	name: string;
}

class ApiError extends Error implements IError {
	public status = 500;

	public success = false;

	public fields: { name: { message: string } };

	constructor(
		msg: string,
		statusCode: number,
		name: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
	) {
		super();
		this.message = msg;
		this.status = statusCode;
		this.name =
			statusCode === StatusCodes.NOT_FOUND
				? ReasonPhrases.NOT_FOUND
				: name;
	}
}

export default ApiError;
