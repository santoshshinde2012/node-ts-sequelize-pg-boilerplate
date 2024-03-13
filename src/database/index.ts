import { Dialect, Sequelize } from 'sequelize';
import connection from './config';

const { database, user, password, host, dbLogging } = connection;

const sequelizeConnection = new Sequelize(database, user, password, {
	host,
	logging: dbLogging,
	dialect: 'postgres' as Dialect,
});

export default sequelizeConnection;
