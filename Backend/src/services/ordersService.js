import { Orders } from '../data-access/ordersModel.js';
import { Flights } from '../data-access/flightsModel.js';
import { sequelize } from '../data-access/db.js';

export const ordersService = {
  async createOrder(orderData) {
    try {
      const {
        user_id,
        user_name,
        user_email,
        flight_id,
        order_date,
        num_passengers,
      } = orderData;

      return await sequelize.transaction(async (t) => {
        const flight = await Flights.findByPk(flight_id, { transaction: t });
        if (!flight) {
          throw new Error('Flight not found');
        }

        const passengers = parseInt(num_passengers);
        if (flight.seats_available < passengers) {
          throw new Error('Not enough seats available');
        }

        flight.seats_available -= passengers;
        await flight.save({ transaction: t });

        const totalPrice = passengers * flight.price;

        const newOrder = await Orders.create(
          {
            user_id,
            user_name,
            user_email,
            flight_id,
            order_date,
            price: totalPrice,
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
