// tests/flights.test.js
/* eslint-env mocha */
//
import request from 'supertest';
import chai from 'chai';
import { app, startTestServer } from './testFlights.js';

const { expect } = chai;
let server;

// Test suite for flight-related endpoints
describe('Flight Test', () => {
  const flightId = 4222;

  // Start the test server before running tests
  before(async function () {
    this.timeout(10000);
    server = await startTestServer();
  });

  // Close the server after all tests are done
  after(() => {
    server?.close();
  });

  // Test for reading a specific flight by ID
  it('should read a flight', async () => {
    const readRes = await request(app)
      .get(`/flights/read-flight/${flightId}`)
      .expect(200);

    expect(readRes.body).to.have.property('company', 'Air Canada');
  });

  // Test for searching flights with specific parameters
  it('should return flights matching the search params', async () => {
    const searchParams = {
      origin: 'Paris',
      destination: 'Venice',
      departure_date: '2025-07-01',
      passengers: '1',
    };

    // Convert search parameters to query string
    const query = new URLSearchParams(searchParams).toString();

    // Send GET request to search-flights endpoint
    const res = await request(app)
      .get(`/flights/search-flights?${query}`)
      .expect(200);

    // Assert that the response is a non-empty array
    expect(res.body).to.be.an('array').that.is.not.empty;

    // Check that at least one flight matches the search criteria
    const flight = res.body.find(
      (f) => f.origin === 'Paris' && f.destination === 'Venice'
    );
    expect(flight).to.exist;
  });

  // Log when flight tests are completed
  console.log('Flight tests completed successfully');
});
