import process from 'process';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Loads .env file contents into process.env.
dotenv.config();

// create the sequelize instance
const sequelize = new Sequelize(
  `postgres://gcwiley:${process.env.PASSWORD}@postgre-sql-server-wiley.postgres.database.azure.com/postgres?sslmode=require`,
  {
    dialect: 'postgres',
  }
);

// tests the connection by trying to authenicate
try {
  await sequelize.authenticate();
  console.log('Connection to database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// export the sequelize instance
export { sequelize };
