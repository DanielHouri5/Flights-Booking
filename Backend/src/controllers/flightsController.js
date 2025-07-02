import { flightsService } from '../services/flightsService.js';

// Controller to get flight details by flight number (ID)
export const readFlightByFlightNum = async (req, res) => {
  try {
    const { flightId } = req.params;
    const flight = await flightsService.fetchFlightById(flightId);
    res.status(200).json(flight);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching flight.', details: error.message });
  }
};

// Controller to search for flights based on query parameters
export const searchFlights = async (req, res) => {
  try {
    const { origin, destination, departure_date, passengers } = req.query;

    // Validate required query parameters
    if (!origin || !destination || !departure_date || !passengers) {
      return res
        .status(400)
        .json({ error: 'Missing required query parameters' });
    }

    // Call the service to search for flights
    const flights = await flightsService.searchFlights({
      origin,
      destination,
      departure_date,
      passengers: parseInt(passengers),
    });

    res.status(200).json(flights);
  } catch (error) {
    console.error('Error in searchFlights:', error);
    res
      .status(500)
      .json({ error: 'Error searching for flights', details: error.message });
  }
};

// Controller to get the nearest available flights
export const getNearestFlights = async (req, res) => {
  try {
    const now = new Date();
    const flights = await flightsService.fetchNearestFlights(now, 10);
    res.status(200).json(flights);
  } catch (error) {
    console.error('Error in getNearestFlights:', error);
    res.status(500).json({ error: 'Error fetching nearest flights', details: error.message });
  }
};
