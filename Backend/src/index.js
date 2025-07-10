//src/index.js
import 'dotenv/config';
import express, { json } from 'express';
import flightsRoutes from './routes/flightsRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import { initDb } from './data-access/flightsDataAccess.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins
app.use(
  cors({
    origin: '*',
  })
);

// Parse incoming JSON requests
app.use(json());

// Register routes for flights and orders
app.use('/flights', flightsRoutes);
app.use('/orders', ordersRoutes);

// Initialize the database connection
initDb()
  .then(() => {
    console.log('Database connected successfully');

    // Start the Express server after successful DB connection
    app.listen(PORT, () => {
      console.log(`flights service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // Handle database connection errors
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

console.log('');
