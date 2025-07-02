// src/data-access/flightsDataAccess.js
import { sequelize } from './db.js';
import './flightsModel.js';
import './ordersModel.js';

// Function to initialize the database connection and synchronize models
export async function initDb(retries = 10, delay = 2000) {
  while (retries > 0) {
    try {
      // Try to authenticate the connection to the database
      await sequelize.authenticate();
      console.log('✅ Connected to DB');
      // Synchronize all defined models to the database
      await sequelize.sync({ alter: true });

      return;
    } catch (err) {
      // Log connection error and retry after a delay
      console.error('❌ DB connection failed:', err.message);
      retries--;
      console.log(
        `🔁 Retrying in ${delay / 1000} seconds... (${retries} retries left)`
      );
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  // Throw an error if unable to connect after all retries
  throw new Error(
    '❌ Could not connect to the database after multiple attempts'
  );
}
