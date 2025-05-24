import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.SQL_DB!,
  process.env.SQL_USER!,
  process.env.SQL_PASSWORD!,
  {
    host: process.env.SQL_HOST,
    dialect: 'postgres',
    logging: false,
  }
);
