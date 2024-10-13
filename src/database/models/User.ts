import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';

interface UserAttributes {
	id: string;
	name: string;
	password: string;
	username: string;
	email: string;
	country?: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: string;
	public name!: string;
	public country!: string;
	public email!: string;
	public username!: string;
	public password!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
		},
		username: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
		}
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'User',
		timestamps: true,
	},
);

export { User, UserAttributes, UserCreationAttributes };
