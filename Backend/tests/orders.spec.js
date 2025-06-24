/* eslint-env mocha */
import request from 'supertest';
import chai from 'chai';
import { app, startTestServer } from './testFlights.js';

const { expect } = chai;
let server;

describe('Order Test', () => {
  const userId = 99999;
  let createdOrder = null;

  before(async function () {
    this.timeout(10000);
    server = await startTestServer();
  });

  after(() => {
    server?.close();
  });

  it('should create an order', async () => {
    const orderData = {
      user_id: userId,
      user_name: 'Test User',
      user_email: 'test@example.com',
      flight_id: 1,
      order_date: new Date().toISOString(),
      price: 123.45,
      num_passengers: 2, // חובה לפי הקונטרולר
    };

    const res = await request(app)
      .post('/orders/create-order')
      .send(orderData)
      .expect(201);

    expect(res.body).to.have.property('order');
    expect(res.body.order).to.have.property('order_id');
    expect(res.body.order.user_name).to.equal('Test User');
    createdOrder = res.body.order; 
  });

  it('should fetch orders for a user', async () => {
    const res = await request(app)
      .get(`/orders/read-orders/${userId}`)
      .expect(200);

    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
    const found = res.body.find(order => order.order_id === createdOrder.order_id);
    expect(found).to.exist;
    expect(found.user_email).to.equal('test@example.com');
  });
});
