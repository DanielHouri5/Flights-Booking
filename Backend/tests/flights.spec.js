import request from 'supertest';
import { app, startTestServer } from './testFlights.js';

let server;

jest.setTimeout(10000); // חשוב: מחוץ ל־beforeAll

describe('Flights API Test', () => {
  beforeAll(async () => {
    server = await startTestServer();
  });

  afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('should return nearest flights', async () => {
    const res = await request(app)
      .get('/flights/nearest-flights')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should return a flight by ID', async () => {
    const flightId = 4222;
    const res = await request(app)
      .get(`/flights/read-flight/${flightId}`)
      .expect(200);

    expect(res.body).toHaveProperty('flight_id', flightId);
  });

  test('should return 404 for non-existing flight ID', async () => {
    const res = await request(app)
      .get('/flights/read-flight/999999')
      .expect(404);

    expect(res.body).toHaveProperty('error');
  });

  test('should search for flights with valid query params', async () => {
    const res = await request(app)
      .get('/flights/search-flights')
      .query({
        origin: 'TLV',
        destination: 'LHR',
        departure_date: '2025-07-01',
        passengers: 1,
      })
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should return 400 for missing search params', async () => {
    const res = await request(app)
      .get('/flights/search-flights')
      .query({})
      .expect(400);

    expect(res.body).toHaveProperty('error');
  });
});
