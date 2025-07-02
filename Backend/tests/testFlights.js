import express from 'express';
import flightsRoutes from '../src/routes/flightsRoutes.js';
import ordersRoutes from '../src/routes/ordersRoutes.js';
import { initDb } from '../src/data-access/flightsDataAccess.js';

// Create an Express application instance for testing
export const app = express();
app.use(express.json());

// Register flight and order routes for testing
app.use('/flights', flightsRoutes);
app.use('/orders', ordersRoutes);

let server = null;

// Function to start the test server on port 4000
export async function startTestServer() {
  try {
    // Initialize the database before starting the server
    await initDb();
    return new Promise((resolve, reject) => {
      server = app.listen(4000, () => {
        console.log('Flights service running on port 4000');
        resolve(server);
      });
      // Handle server errors
      server.on('error', (err) => {
        reject(err);
      });
    });
  } catch (dbErr) {
    // Handle database initialization errors
    return Promise.reject(dbErr);
  }
}
