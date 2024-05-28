import { DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import sequelize from '../index';

interface EnquiryAttributes {
	id: string;
	name: string;
	subject: string;
	body: string;
	email: string;
	country: string;
}

type EnquiryCreationAttributes = Optional<EnquiryAttributes, 'id'>;

class Enquiry
	extends Model<EnquiryAttributes, EnquiryCreationAttributes>
	implements EnquiryAttributes
{
	public id!: string;
	public name!: string;
	public country!: string;
	public subject!: string;
	public body!: string;
	public email!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Enquiry.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		subject: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		body: {
			type: DataTypes.STRING(400),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Enquiry',
		tableName: 'Enquiry',
		timestamps: true,
	},
);

export { Enquiry, EnquiryAttributes, EnquiryCreationAttributes };
