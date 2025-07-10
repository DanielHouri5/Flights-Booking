import request from 'supertest';
import { app, startTestServer } from './testFlights.js';

let server;

// Set Jest timeout for all tests in this file
jest.setTimeout(10000); // Important: set outside of beforeAll

// Test suite for Order API endpoints
describe('Order Test', () => {
  const userId = 1;
  let createdOrder = null;

  // Start the test server before running tests
  beforeAll(async () => {
    server = await startTestServer();
  });

  // Close the server after all tests are done
  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  // Test: should create a new order
  test('should create an order', async () => {
    const orderData = {
      user_id: userId,
      user_name: 'Test User',
      user_email: 'test@example.com',
      flight_id: 1,
      order_date: new Date().toISOString(),
      price: 655,
      num_passengers: '1',
    };

    // Send POST request to create a new order
    const res = await request(app)
      .post('/orders/create-order')
      .send(orderData)
      .expect(201);

    // Assert that the response contains the created order
    expect(res.body).toHaveProperty('order');
    expect(res.body.order).toHaveProperty('order_id');
    expect(res.body.order.user_name).toBe('Test User');
    createdOrder = res.body.order;
  });

  // Test: should fetch all orders for a specific user
  test('should fetch orders for a user', async () => {
    const res = await request(app)
      .get(`/orders/read-orders/${userId}`)
      .expect(200);

    // Assert that the response is an array and contains at least one order
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    // Find the created order in the response
    const found = res.body.find(
      (order) => order.order_id === createdOrder.order_id
    );

    // Assert that the created order is present and has the correct email
    expect(found).toBeDefined();
    expect(found.user_email).toBe('test@example.com');
  });
});
