// src/routes/flightsRoutes.js

import { Router } from 'express';
import {
  readFlightByFlightNum,
  searchFlights,
  getNearestFlights
} from '../controllers/flightsController.js';

// Create a new router instance for flight-related routes
const router = Router();

// Route to get flight details by flight number (ID)
router.get('/read-flight/:flightId', readFlightByFlightNum);

// Route to search for flights based on query parameters
router.get('/search-flights', searchFlights);

// Route to get the nearest available flights
router.get('/nearest-flights', getNearestFlights);

// Export the router to be used in the main app
export default router;
