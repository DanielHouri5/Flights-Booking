import request from 'supertest';
import { app, startTestServer } from './testFlights.js';

let server;

// Set Jest timeout for all tests in this file
jest.setTimeout(10000); // Important: set outside of beforeAll

// Test suite for Flights API endpoints
describe('Flights API Test', () => {
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

  // Test: should return a list of nearest flights
  test('should return nearest flights', async () => {
    const res = await request(app).get('/flights/nearest-flights').expect(200);

    // Assert that the response is an array
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test: should return a flight by its ID
  test('should return a flight by ID', async () => {
    const flightId = 1;
    const res = await request(app)
      .get(`/flights/read-flight/${flightId}`)
      .expect(200);

    // Assert that the returned flight has the correct ID
    expect(res.body).toHaveProperty('flight_id', flightId);
  });

  // Test: should return 404 for a non-existing flight ID
  test('should return 404 for non-existing flight ID', async () => {
    const res = await request(app)
      .get('/flights/read-flight/999999')
      .expect(500);

    // Assert that the response contains an error property
    expect(res.body).toHaveProperty('error');
  });

  // Test: should search for flights with valid query parameters
  test('should search for flights with valid query params', async () => {
    const res = await request(app)
      .get('/flights/search-flights')
      .query({
        origin: 'Lisbon',
        destination: 'Venice',
        departure_date: '2025-07-24',
        passengers: 1,
      })
      .expect(200);

    // Assert that the response is an array
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test: should return 400 if search parameters are missing
  test('should return 400 for missing search params', async () => {
    const res = await request(app)
      .get('/flights/search-flights')
      .query({})
      .expect(400);

    // Assert that the response contains an error property
    expect(res.body).toHaveProperty('error');
  });
});
