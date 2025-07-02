import { ordersService } from '../services/ordersService.js';

// Controller to create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      user_id,
      user_name,
      user_email,
      flight_id,
      order_date,
      price,
      num_passengers,
    } = req.body;

    // Validate required order fields
    if (
      !user_id || !user_name || !user_email || !flight_id ||
      !order_date || !price || !num_passengers
    ) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }

    // Call the service to create a new order
    const newOrder = await ordersService.createOrder({
      user_id,
      user_name,
      user_email,
      flight_id,
      order_date,
      price,
      num_passengers,
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to create order',
      details: err.message,
    });
  }
};

// Controller to get all orders for a specific user by user ID
export const readOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await ordersService.fetchOrdersById(userId);
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching orders.', details: error.message });
  }
};



