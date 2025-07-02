// src/routes/ordersRoutes.js

import { Router } from 'express';
import {
  createOrder,
  readOrders,
} from '../controllers/ordersController.js';

// Create a new router instance for order-related routes
const router = Router();

// Route to create a new order
router.post('/create-order', createOrder);

// Route to get all orders for a specific user by user ID
router.get('/read-orders/:userId', readOrders);

// Export the router to be used in the main app
export default router;
