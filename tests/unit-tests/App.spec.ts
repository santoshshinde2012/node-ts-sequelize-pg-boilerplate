import database from '../../src/database';
import App from '../../src/App';
import logger from '../../src/lib/logger';

jest.mock('../../src/database', () => ({
	authenticate: jest.fn(),
	sync: jest.fn(),
}));

jest.mock('../../src/routes', () => ({
	registerRoutes: jest.fn(),
}));

jest.mock('../../src/lib/logger', () => ({
	info: jest.fn(),
	error: jest.fn(),
}));

describe('App', () => {
	let app: App;

	beforeEach(() => {
		app = new App();
	});

	describe('assertDatabaseConnection', () => {
		it('should log success message when database connection is established', async () => {
			(database.authenticate as jest.Mock).mockResolvedValueOnce(
				undefined,
			);
			(database.sync as jest.Mock).mockResolvedValueOnce(undefined);

			await app['assertDatabaseConnection']();

			expect(database.authenticate).toHaveBeenCalled();
			expect(database.sync).toHaveBeenCalled();
			expect(logger.info).toHaveBeenCalledWith(
				'Connection has been established successfully.',
			);
			expect(logger.error).not.toHaveBeenCalled();
		});

		it('should log error message when database connection fails', async () => {
			const error = new Error('Connection failed');
			(database.authenticate as jest.Mock).mockRejectedValueOnce(error);

			await app['assertDatabaseConnection']();

			expect(database.authenticate).toHaveBeenCalled();
			expect(logger.error).toHaveBeenCalledWith(
				'Unable to connect to the database:',
				error,
			);
		});
	});
});
