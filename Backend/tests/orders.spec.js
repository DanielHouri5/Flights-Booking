/* eslint-env mocha */
import request from 'supertest';
import chai from 'chai';
import { app, startTestServer } from './testFlights.js';

const { expect } = chai;
let server;

// Test suite for order-related endpoints
describe('Order Test', () => {
  const userId = 99999;
  let createdOrder = null;

  // Start the test server before running tests
  before(async function () {
    this.timeout(10000);
    server = await startTestServer();
  });

  // Close the server after all tests are done
  after(() => {
    server?.close();
  });

  // Test for creating a new order
  it('should create an order', async () => {
    const orderData = {
      user_id: userId,
      user_name: 'Test User',
      user_email: 'test@example.com',
      flight_id: 4222,
      order_date: new Date().toISOString(),
      price: 258,
      num_passengers: '1',
    };

    // Send POST request to create a new order
    const res = await request(app)
      .post('/orders/create-order')
      .send(orderData)
      .expect(201);

    // Assert that the response contains the created order
    expect(res.body).to.have.property('order');
    expect(res.body.order).to.have.property('order_id');
    expect(res.body.order.user_name).to.equal('Test User');
    createdOrder = res.body.order;
  });

  // Test for fetching all orders for a specific user
  it('should fetch orders for a user', async () => {
    const res = await request(app)
      .get(`/orders/read-orders/${userId}`)
      .expect(200);

    // Assert that the response is an array and contains the created order
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    const found = res.body.find(
      (order) => order.order_id === createdOrder.order_id
    );
    expect(found).to.exist;
    expect(found.user_email).to.equal('test@example.com');
  });
});
