// src/routes/flightsRoutes.js
import { Router } from 'express';
import {
  readFlightByFlightNum,
  searchFlights,
  getNearestFlights
} from '../controllers/flightsController.js';

const router = Router();

router.get('/read-flight/:flightId', readFlightByFlightNum);
router.get('/search-flights', searchFlights);
router.get('/nearest-flights', getNearestFlights);

export default router;
