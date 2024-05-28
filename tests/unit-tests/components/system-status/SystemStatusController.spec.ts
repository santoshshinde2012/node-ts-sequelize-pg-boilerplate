import { NextFunction, Request, Response } from 'express';
import SystemStatusController from '../../../../src/components/system-status/SystemStatusController';

describe('System Status Controller', () => {
	let request: Partial<Request>;
	let response: Partial<Response>;
	const next: NextFunction = jest.fn();
	let controller: SystemStatusController;

	beforeAll(() => {
		controller = new SystemStatusController();
	});

	beforeEach(() => {
		request = {};
		response = {
			locals: {},
			status: jest.fn(),
			send: jest.fn(),
		};
	});

	test('getError method', () => {
		controller.getError(request as Request, response as Response, next);
		expect(next).toHaveBeenCalled();
	});

	test('getSystemInfo method', () => {
		controller.getSystemInfo(
			request as Request,
			response as Response,
			next,
		);
		const locals = response.locals;
		expect(locals?.data).toHaveProperty('os');
	});

	test('getServerTime method', () => {
		controller.getServerTime(
			request as Request,
			response as Response,
			next,
		);
		const locals = response.locals;
		expect(locals?.data).toHaveProperty('date');
		expect(locals?.data).toHaveProperty('utc');
	});

	test('getResourceUsage method', () => {
		controller.getResourceUsage(
			request as Request,
			response as Response,
			next,
		);
		const locals = response.locals;
		expect(locals?.data).toHaveProperty('processMemory');
		expect(locals?.data).toHaveProperty('systemMemory');
	});

	test('getProcessInfo method', () => {
		controller.getProcessInfo(
			request as Request,
			response as Response,
			next,
		);
		const locals = response.locals;
		expect(locals?.data).toHaveProperty('applicationVersion');
		expect(locals?.data).toHaveProperty('nodeDependencyVersions');
	});
});
