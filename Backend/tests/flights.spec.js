// tests/flights.test.js
/* eslint-env mocha */
//
import request from 'supertest';
import chai from 'chai';
import { app, startTestServer } from './testFlights.js';

const { expect } = chai;
let server;

describe('Flight Test', () => {
  const flightId = 130;

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

    expect(readRes.body).to.have.property('company', 'El Al');
  });

  it('should return the correct flight from search-flights query', async () => {
    searchParams = {
      origin: 'Tel Aviv',
        destination: 'New York',
        departure_date: '2025-07-10',
        passengers: '1'
    };
    const query = new URLSearchParams(searchParams).toString(); 
    const req = await api.get(`/flights/search-flights?${query}`).expect(200);

    expect(res.body).to.be.an('array').that.is.not.empty;
    console.log('Flights response:', res.body);
    
    const flight = res.body.find(f => f.flight_id === 130);
    expect(flight).to.exist;
    expect(flight).to.include({
      company: 'El Al',
      origin: 'Tel Aviv',
      destination: 'New York',
    });
    expect(flight.departure_time).to.include('2025-07-10');
  });
});
