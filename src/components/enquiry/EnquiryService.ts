import {
	Enquiry,
	EnquiryAttributes,
	EnquiryCreationAttributes,
} from '../../database/models/Enquiry';
import logger from '../../lib/logger';
import ApiError from '../../abstractions/ApiError';
import { StatusCodes } from 'http-status-codes';

export class EnquiryService {
	async getAll(): Promise<EnquiryAttributes[]> {
		try {
			const enquiries = await Enquiry.findAll();
			return enquiries;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async getById(id: string | number): Promise<EnquiryAttributes> {
		try {
			const enquiry = await Enquiry.findByPk(id);
			if (!enquiry) {
				throw new ApiError('Enquiry not found', StatusCodes.NOT_FOUND);
			}
			return enquiry;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async update(
		id: string | number,
		payload: Partial<EnquiryCreationAttributes>,
	): Promise<EnquiryAttributes> {
		try {
			const enquiry = await Enquiry.findByPk(id);
			if (!enquiry) {
				throw new ApiError('Enquiry not found', StatusCodes.NOT_FOUND);
			}
			const updatedEnquiry = await enquiry.update(payload);
			return updatedEnquiry;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async create(
		payload: EnquiryCreationAttributes,
	): Promise<EnquiryAttributes> {
		try {
			const enquiry = await Enquiry.create(payload);
			return enquiry;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async delete(id: string | number): Promise<boolean> {
		try {
			const deletedEnquiryCount = await Enquiry.destroy({
				where: { id },
			});

			return !!deletedEnquiryCount;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}
}
