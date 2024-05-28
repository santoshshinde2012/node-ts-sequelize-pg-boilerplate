import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: path.join(__dirname, '../../.env'),
});

interface DbConnection {
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
	dbLogging: boolean;
}

const connection: DbConnection = {
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dbLogging:
		process.env.NODE_ENV === 'development' || process.env.LOG === 'true',
};

export default connection;
