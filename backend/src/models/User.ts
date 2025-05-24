import { DataTypes } from 'sequelize';
import { sequelize } from '../db/sql';

export const User = sequelize.define('User', {
  name: DataTypes.STRING,
  phone: { type: DataTypes.STRING, unique: true },
  summary: DataTypes.TEXT,
});
