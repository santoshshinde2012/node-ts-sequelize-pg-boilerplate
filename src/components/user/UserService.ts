import {
	User,
	UserAttributes,
	UserCreationAttributes,
} from '../../database/models/User';
import logger from '../../lib/logger';
import ApiError from '../../abstractions/ApiError';
import { StatusCodes } from 'http-status-codes';

export class UserService {
	async getAll(): Promise<UserAttributes[]> {
		try {
			const users = await User.findAll();
			return users;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async getById(id: string | number): Promise<UserAttributes> {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new ApiError('User not found', StatusCodes.NOT_FOUND);
			}
			return user;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async getByUserName(username: string | number): Promise<UserAttributes> {
		try {
			const user = await User.findOne({
				where: { username: username },
			});
			if (!user) {
				throw new ApiError('User not found', StatusCodes.NOT_FOUND);
			}
			return user;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async update(
		id: string | number,
		payload: Partial<UserCreationAttributes>,
	): Promise<UserAttributes> {
		try {
			const user = await User.findByPk(id);
			if (!user) {
				throw new ApiError('User not found', StatusCodes.NOT_FOUND);
			}
			const updatedUser = await user.update(payload);
			return updatedUser;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async create(payload: UserCreationAttributes): Promise<UserAttributes> {
		try {
			const user = await User.create(payload);
			return user;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}

	async delete(id: string | number): Promise<boolean> {
		try {
			const deletedUserCount = await User.destroy({
				where: { id },
			});

			return !!deletedUserCount;
		} catch (error) {
			logger.error(error);
			throw error;
		}
	}
}
