

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB, process.env.DBUSERNAME, process.env.DBPASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;

