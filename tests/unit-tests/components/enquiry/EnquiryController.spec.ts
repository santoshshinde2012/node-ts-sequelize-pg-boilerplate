import { NextFunction, Request, Response } from 'express';
import EnquiryController from '../../../../src/components/enquiry/EnquiryController';
import { EnquiryService } from '../../../../src/components/enquiry/EnquiryService';
import enquiries from '../../data/enquiry.json';
import { EnquiryAttributes } from '../../../../src/database/models/Enquiry';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ApiError from '../../../../src/abstractions/ApiError';
import { RouteDefinition } from '../../../../src/types/RouteDefinition';

describe('Enquiry Controller', () => {
	let request: Partial<Request>;
	let response: Partial<Response>;
	const next: NextFunction = jest.fn();
	let controller: EnquiryController;

	beforeAll(() => {
		controller = new EnquiryController();
	});

	beforeEach(() => {
		request = {} as Partial<Request>;
		response = {
			locals: {},
			status: jest.fn(),
			send: jest.fn(),
		} as Partial<Response>;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should defined routes and return array of route definition', () => {
		const routes: RouteDefinition[] = controller.routes();
		expect(routes).toBeDefined();
		expect(routes.length).toBeGreaterThan(0);
	});

	it('should get all enquiries', async () => {
		const getAll = jest.spyOn(EnquiryService.prototype, 'getAll');
		getAll.mockResolvedValueOnce(enquiries);

		await controller.getEnquiries(
			request as Request,
			response as Response,
			next,
		);

		const locals = response.locals;
		expect(locals?.data).toBeDefined();
	});

	it('should handle errors to get all enquiries', async () => {
		const error = new Error('Internal Server Error');
		const getAll = jest.spyOn(EnquiryService.prototype, 'getAll');
		getAll.mockRejectedValueOnce(error);

		await controller.getEnquiries(
			request as Request,
			response as Response,
			next,
		);

		expect(next).toHaveBeenCalled();
	});

	it('should get details of a specific enquiry', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const getById = jest.spyOn(EnquiryService.prototype, 'getById');
		getById.mockResolvedValueOnce(enquiry);

		request.params = { id: '1' };

		await controller.getEnquiry(
			request as Request,
			response as Response,
			next,
		);

		const locals = response.locals;

		expect(getById).toHaveBeenCalledWith('1');
		expect(locals?.data).toBeDefined();
	});

	it('should handle errors to get enquiry by id', async () => {
		const error = new Error('Internal Server Error');
		const getById = jest.spyOn(EnquiryService.prototype, 'getById');
		getById.mockRejectedValueOnce(error);

		await controller.getEnquiry(
			request as Request,
			response as Response,
			next,
		);

		expect(next).toHaveBeenCalled();
	});

	it('should create enquiry', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const body = { name: 'New Org' };
		enquiry.name = 'New Org';
		const create = jest.spyOn(EnquiryService.prototype, 'create');
		create.mockResolvedValueOnce(enquiry);

		request.body = body;

		await controller.createEnquiry(
			request as Request,
			response as Response,
			next,
		);

		expect(create).toHaveBeenCalledWith(body);
		const locals = response.locals;
		expect(locals?.data).toEqual({ enquiry });
		expect(response.status).toHaveBeenCalledWith(StatusCodes.CREATED);
	});

	it('should throw BAD_REQUEST error if name and country are not provided', async () => {
		request.body = {};

		await controller.createEnquiry(
			request as Request,
			response as Response,
			next,
		);

		expect(next).toHaveBeenCalledWith(
			new ApiError(ReasonPhrases.BAD_REQUEST, StatusCodes.BAD_REQUEST),
		);
	});

	it('should handle errors in create enquiry', async () => {
		const body = { name: 'New Org' };
		const error = new Error('Internal Server Error');
		const create = jest.spyOn(EnquiryService.prototype, 'create');
		create.mockRejectedValueOnce(error);

		request.body = body;

		await controller.createEnquiry(
			request as Request,
			response as Response,
			next,
		);

		expect(create).toHaveBeenCalledWith(body);
		expect(next).toHaveBeenCalledWith(error);
	});

	it('should update enquiry', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const { id } = enquiry;
		const body = { name: 'Updated Org' };
		enquiry.name = 'Updated Org';

		const update = jest.spyOn(EnquiryService.prototype, 'update');
		update.mockResolvedValueOnce(enquiry);

		request.params = { id };
		request.body = body;

		await controller.updateEnquiry(
			request as Request,
			response as Response,
			next,
		);

		expect(update).toHaveBeenCalledWith(id, body);
		const locals = response.locals;
		expect(locals?.data).toEqual({ enquiry });
	});

	it('should handle errors in update enquiry', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const { id } = enquiry;
		const body = { name: 'Updated Org' };
		const error = new Error('Internal Server Error');

		const update = jest.spyOn(EnquiryService.prototype, 'update');
		update.mockRejectedValueOnce(error);

		request.params = { id };
		request.body = body;

		await controller.updateEnquiry(
			request as Request,
			response as Response,
			next,
		);

		expect(update).toHaveBeenCalledWith(id, body);
		expect(next).toHaveBeenCalledWith(error);
	});

	it('should delete enquiry', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const { id } = enquiry;
		const status = true;

		const remove = jest.spyOn(EnquiryService.prototype, 'delete');
		remove.mockResolvedValueOnce(status);

		request.params = { id };

		await controller.delete(request as Request, response as Response, next);

		expect(remove).toHaveBeenCalledWith(id);
		const locals = response.locals;
		expect(locals?.data).toEqual({ status });
	});

	it('should handle errors in delete enquiry', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const { id } = enquiry;
		const error = new Error('Internal Server Error');

		const remove = jest.spyOn(EnquiryService.prototype, 'delete');
		remove.mockRejectedValueOnce(error);

		request.params = { id };

		await controller.delete(request as Request, response as Response, next);

		expect(remove).toHaveBeenCalledWith(id);
		expect(next).toHaveBeenCalledWith(error);
	});
});
