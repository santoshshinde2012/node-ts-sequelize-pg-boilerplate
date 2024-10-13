import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';

interface ClientAttributes {
	id: string;
	client_id: string;
	client_secret: string;
	redirect_uri: string;
}

type ClientCreationAttributes = Optional<ClientAttributes, 'id'>;

class Client
	extends Model<ClientAttributes, ClientCreationAttributes>
	implements ClientAttributes
{
	public id!: string;
	public client_id!: string;
	public client_secret!: string;
	public redirect_uri!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Client.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
		},
		client_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		client_secret: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		redirect_uri: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Client',
		tableName: 'Client',
		timestamps: true,
	},
);

export { Client, ClientAttributes, ClientCreationAttributes };
