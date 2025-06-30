// tests/flights.test.js
/* eslint-env mocha */
//
import request from 'supertest';
import chai from 'chai';
import { app, startTestServer } from './testFlights.js';

const { expect } = chai;
let server;

describe('Flight Test', () => {
  const flightId = 4222;

  before(async function () {
    this.timeout(10000);
    server = await startTestServer();
  });

  after(() => {
    server?.close();
  });

  it('should read a flight', async () => {
    const readRes = await request(app)
      .get(`/flights/read-flight/${flightId}`)
      .expect(200);

    expect(readRes.body).to.have.property('company', 'Air Canada');
  });

  it('should return flights matching the search params', async () => {
    const searchParams = {
      origin: 'Paris',
      destination: 'Venice',
      departure_date: '2025-07-10',
      passengers: '1',
    };

    const query = new URLSearchParams(searchParams).toString();

    const res = await request(app)
      .get(`/flights/search-flights?${query}`)
      .expect(200);

    expect(res.body).to.be.an('array').that.is.not.empty;

    const flight = res.body.find(
      (f) => f.origin === 'Paris' && f.destination === 'Venice'
    );
    expect(flight).to.exist;
  });
  console.log('Flight tests completed successfully');
});
