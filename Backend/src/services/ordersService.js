import { Orders } from '../data-access/ordersModel.js';
import { Flights } from '../data-access/flightsModel.js';
import { sequelize } from '../data-access/db.js';

// Service object for handling order-related business logic
export const ordersService = {
  // Create a new order and update the available seats for the flight
  async createOrder(orderData) {
    try {
      const {
        user_id,
        user_name,
        user_email,
        flight_id,
        order_date,
        price,
        num_passengers,
      } = orderData;

      // Use a transaction to ensure atomicity of seat update and order creation
      return await sequelize.transaction(async (t) => {
        // Find the flight by its primary key
        const flight = await Flights.findByPk(flight_id, { transaction: t });
        if (!flight) {
          throw new Error('Flight not found');
        }

        // Check if there are enough seats available
        const passengers = parseInt(num_passengers);
        if (flight.seats_available < passengers) {
          throw new Error('Not enough seats available');
        }

        // Update the number of available seats
        flight.seats_available -= num_passengers;
        await flight.save({ transaction: t });

        // Create the new order
        const newOrder = await Orders.create(
          {
            user_id,
            user_name,
            user_email,
            flight_id,
            order_date,
            price,
            num_passengers: passengers,
          },
          { transaction: t }
        );

        return newOrder;
      });
    } catch (err) {
      console.error('Error creating order with seat update:', err);
      throw new Error('Failed to create order');
    }
  },

  // Fetch all orders for a specific user by user ID
  async fetchOrdersById(userId) {
    try {
      return await Orders.findAll({
        where: { user_id: userId },
        order: [['order_date', 'DESC']],
      });
    } catch (error) {
      console.error('Error fetching orders by user ID:', error);
      throw error;
    }
  },
};
