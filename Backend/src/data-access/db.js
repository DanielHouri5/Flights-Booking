// src/data-access/db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL');
}

// Initialize a new Sequelize instance for PostgreSQL connection
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable SQL query logging
});
