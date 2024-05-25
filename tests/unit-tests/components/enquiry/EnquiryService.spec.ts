import { EnquiryService } from '../../../../src/components/enquiry/EnquiryService';
import {
	Enquiry,
	EnquiryAttributes,
	EnquiryCreationAttributes,
} from '../../../../src/database/models/Enquiry';
import logger from '../../../../src/lib/logger';
import enquiries from '../../data/enquiry.json';
jest.mock('../../../../src/lib/logger');

describe('EnquiryService', () => {
	let service: EnquiryService;

	beforeAll(() => {
		service = new EnquiryService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should return all enquiries', async () => {
		const findAll = jest.spyOn(Enquiry, 'findAll');
		const sequelizeEnquirys = enquiries.map(
			(org: EnquiryAttributes) => new Enquiry(org),
		);
		findAll.mockResolvedValueOnce(sequelizeEnquirys);

		const result = await service.getAll();

		expect(result).toEqual(sequelizeEnquirys);
		expect(findAll).toHaveBeenCalled();
	});

	it('should throw error if failed to fetch enquiries', async () => {
		const error = new Error('Database error');
		const findAll = jest.spyOn(Enquiry, 'findAll');
		findAll.mockRejectedValueOnce(error);
		await expect(service.getAll()).rejects.toThrow(error);
		expect(logger.error).toHaveBeenCalledWith(error);
	});

	it('should return particular enquiry by id', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const findByPk = jest.spyOn(Enquiry, 'findByPk');
		const sequelizeEnquiry = new Enquiry(enquiry);
		findByPk.mockResolvedValueOnce(sequelizeEnquiry);

		const result = await service.getById(enquiry.id);

		expect(result).toEqual(sequelizeEnquiry);
		expect(findByPk).toHaveBeenCalled();
	});

	it('should throw error if failed to fetch empty enquiry by id', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const error = new Error('Enquiry not found');

		const findByPk = jest.spyOn(Enquiry, 'findByPk');
		findByPk.mockResolvedValueOnce(null);

		await expect(service.getById(enquiry.id)).rejects.toThrow(error);
		expect(logger.error).toHaveBeenCalledWith(error);
	});

	it('should throw error if failed to fetch enquiry by id', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const error = new Error('Database error');

		const findByPk = jest.spyOn(Enquiry, 'findByPk');
		findByPk.mockRejectedValueOnce(error);

		await expect(service.getById(enquiry.id)).rejects.toThrow(error);
		expect(logger.error).toHaveBeenCalledWith(error);
	});

	it('should update enquiry with valid input', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const findByPk = jest.spyOn(Enquiry, 'findByPk');

		const sequelizeEnquiry = new Enquiry(enquiry);
		sequelizeEnquiry.update = jest
			.fn()
			.mockResolvedValueOnce({ ...enquiry, name: 'Demo' });

		findByPk.mockResolvedValueOnce(sequelizeEnquiry);

		const result = await service.update(enquiry.id, { name: 'Demo' });

		expect(result.name).toEqual('Demo');
		expect(Enquiry.findByPk).toHaveBeenCalledWith(enquiry.id);
	});

	it('should throw an error if it fails to update as it failed to find the enquiry by id', async () => {
		const error = new Error('Enquiry not found');
		const [enquiry] = enquiries as EnquiryAttributes[];

		const findByPk = jest.spyOn(Enquiry, 'findByPk');
		findByPk.mockResolvedValueOnce(null);

		await expect(
			service.update(enquiry.id, { name: 'Demo' }),
		).rejects.toThrow(error);

		expect(logger.error).toHaveBeenCalledWith(error);
	});

	it('should throw an error if it fails to update', async () => {
		const [enquiry] = enquiries as EnquiryAttributes[];
		const error = new Error('Database error');
		const findByPk = jest.spyOn(Enquiry, 'findByPk');

		const sequelizeEnquiry = new Enquiry(enquiry);
		sequelizeEnquiry.update = jest.fn().mockRejectedValueOnce(error);

		findByPk.mockResolvedValueOnce(sequelizeEnquiry);

		await expect(
			service.update(enquiry.id, { name: 'Demo' }),
		).rejects.toThrow(error);
		expect(logger.error).toHaveBeenCalledWith(error);
	});

	it('should create a new enquiry with valid input', async () => {
		const payload: EnquiryCreationAttributes = {
			id: '2b9eec45-fd45-488c-afb5-e8035e692228',
			name: 'Enquiry 1',
			subject: 'Demo',
			body: 'Demo',
			email: 'demo@gmail.com',
			country: 'India',
		};

		// Mocked enquiry object returned after creation
		const createdEnquiry: EnquiryAttributes = {
			id: '2b9eec45-fd45-488c-afb5-e8035e692228',
			name: 'Enquiry 1',
			subject: 'Demo',
			body: 'Demo',
			email: 'demo@gmail.com',
			country: 'India',
		};

		const createMock = jest.spyOn(Enquiry, 'create');
		createMock.mockResolvedValueOnce(createdEnquiry);

		const result = await service.create(payload);

		expect(result).toEqual(createdEnquiry);
		expect(createMock).toHaveBeenCalledWith(payload);
	});

	it('should throw error if failed to create enquiry', async () => {
		const payload: EnquiryCreationAttributes = {
			id: '2b9eec45-fd45-488c-afb5-e8035e692228',
			name: 'Enquiry 1',
			subject: 'Demo',
			body: 'Demo',
			email: 'demo@gmail.com',
			country: 'India',
		};

		const error = new Error('Database error');

		const createMock = jest.spyOn(Enquiry, 'create');
		createMock.mockRejectedValueOnce(error);

		await expect(service.create(payload)).rejects.toThrow(error);
		expect(logger.error).toHaveBeenCalledWith(error);
		expect(createMock).toHaveBeenCalledWith(payload);
	});

	it('should return true if enquiry is deleted successfully', async () => {
		const id = '1';

		const destroyMock = jest.spyOn(Enquiry, 'destroy');
		destroyMock.mockResolvedValueOnce(1);

		const result = await service.delete(id);

		expect(result).toEqual(true);
		expect(destroyMock).toHaveBeenCalledWith({ where: { id } });
	});

	it('should return false if no enquiry is deleted', async () => {
		const id = '1';

		const destroyMock = jest.spyOn(Enquiry, 'destroy');
		destroyMock.mockResolvedValueOnce(0);

		const result = await service.delete(id);

		expect(result).toEqual(false);
		expect(destroyMock).toHaveBeenCalledWith({ where: { id } });
	});

	it('should throw error if failed to delete enquiry', async () => {
		const id = '1';
		const error = new Error('Database error');

		const destroyMock = jest.spyOn(Enquiry, 'destroy');
		destroyMock.mockRejectedValueOnce(error);

		await expect(service.delete(id)).rejects.toThrow(error);
		expect(logger.error).toHaveBeenCalledWith(error);
		expect(destroyMock).toHaveBeenCalledWith({ where: { id } });
	});
});
