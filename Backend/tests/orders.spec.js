import request from 'supertest';
import { app, startTestServer } from './testFlights.js';

let server;

jest.setTimeout(10000); // חשוב: מחוץ ל־beforeAll

describe('Order Test', () => {
  const userId = 99999;
  let createdOrder = null;

  beforeAll(async () => {
    server = await startTestServer();
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('should create an order', async () => {
    const orderData = {
      user_id: userId,
      user_name: 'Test User',
      user_email: 'test@example.com',
      flight_id: 4222,
      order_date: new Date().toISOString(),
      price: 258,
      num_passengers: '1',
    };

    const res = await request(app)
      .post('/orders/create-order')
      .send(orderData)
      .expect(201);

    expect(res.body).toHaveProperty('order');
    expect(res.body.order).toHaveProperty('order_id');
    expect(res.body.order.user_name).toBe('Test User');
    createdOrder = res.body.order;
  });

  test('should fetch orders for a user', async () => {
    const res = await request(app)
      .get(`/orders/read-orders/${userId}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const found = res.body.find(
      (order) => order.order_id === createdOrder.order_id
    );

    expect(found).toBeDefined();
    expect(found.user_email).toBe('test@example.com');
  });
});
