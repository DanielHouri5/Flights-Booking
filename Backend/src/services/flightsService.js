import { Flights } from '../data-access/flightsModel.js';
import { Op } from 'sequelize';

// Service object for handling flight-related business logic
export const flightsService = {
  // Fetch a flight by its primary key (ID)
  async fetchFlightById(flightId) {
    try {
      const flight = await Flights.findByPk(flightId);
      if (!flight) {
        throw new Error('flight not found');
      }

      // Return the flight data as a plain object
      return {
        ...flight.dataValues,
      };
    } catch (err) {
      console.error('Error fetching flight by ID:', err);
      throw new Error('Failed to fetch flight');
    }
  },

  // Search for flights based on origin, destination, date, and passenger count
  async searchFlights({ origin, destination, departure_date, passengers }) {
    try {
      // Validate required query parameters
      if (!origin || !destination || !departure_date || !passengers) {
        throw new Error('Missing required query parameters');
      }

      // Parse and validate the departure date
      const departureDate = new Date(departure_date);

      if (isNaN(departureDate.getTime())) {
        throw new Error('Invalid date format');
      }

      // Parse and validate the number of passengers
      const passengerCount = parseInt(passengers);
      if (isNaN(passengerCount) || passengerCount <= 0) {
        throw new Error('Invalid number of passengers');
      }

      // Set the search range for the entire day
      const startOfDay = new Date(departureDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(departureDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Query the database for matching flights
      const flights = await Flights.findAll({
        where: {
          origin: {
            [Op.iLike]: origin,
          },
          destination: {
            [Op.iLike]: destination,
          },
          departure_date: {
            [Op.gte]: startOfDay,
            [Op.lte]: endOfDay,
          },
          seats_available: {
            [Op.gte]: passengerCount,
          },
        },
      });

      // Throw an error if no flights are found
      if (!flights || flights.length === 0) {
        throw new Error('No matching flights found');
      }

      return flights;
    } catch (err) {
      console.error('Error searching flights:', err.message);
      throw new Error('Failed to search flights');
    }
  },

  // Fetch the nearest upcoming flights, ordered by departure date
  async fetchNearestFlights(startDate = new Date(), limit = 10) {
    try {
      // Query the database for upcoming flights
      const flights = await Flights.findAll({
        where: {
          departure_date: {
            [Op.gte]: startDate,
          },
        },
        order: [['departure_date', 'ASC']],
        limit: limit,
      });

      // Throw an error if no flights are found
      if (!flights || flights.length === 0) {
        throw new Error('No upcoming flights found');
      }

      return flights;
    } catch (err) {
      console.error('Error fetching nearest flights:', err.message);
      throw new Error('Failed to fetch nearest flights');
    }
  },
};
