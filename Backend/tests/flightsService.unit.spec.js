import { jest } from '@jest/globals';
import { flightsService } from '../src/services/flightsService.js';
import { Flights } from '../src/data-access/flightsModel.js';

// Mock the Flights model to isolate service logic from the database
jest.mock('../src/data-access/flightsModel.js');

// Test suite for the flightsService
describe('flightsService', () => {
  // Clean up mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  // Test: fetchFlightById returns flight if it exists
  test('fetchFlightById returns flight if exists', async () => {
    // Mock the DB call to return a flight object
    Flights.findByPk.mockResolvedValue({
      dataValues: { flight_id: 4222, origin: 'Paris' },
    });
    const flight = await flightsService.fetchFlightById(4222);
    expect(flight.flight_id).toBe(4222);
    expect(flight.origin).toBe('Paris');
  });

  // Test: fetchFlightById throws if flight is not found
  test('fetchFlightById throws if not found', async () => {
    Flights.findByPk.mockResolvedValue(null);
    await expect(flightsService.fetchFlightById(1)).rejects.toThrow(
      'Failed to fetch flight'
    );
  });

  // Test: searchFlights throws on missing parameters
  test('searchFlights throws on missing params', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    await expect(flightsService.searchFlights({})).rejects.toThrow(
      'Failed to search flights'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error searching flights:',
      'Missing required query parameters'
    );
  });

  // Test: searchFlights throws on invalid date format
  test('searchFlights throws on invalid date format', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    await expect(
      flightsService.searchFlights({
        origin: 'TLV',
        destination: 'LHR',
        departure_date: 'not-a-date',
        passengers: 1,
      })
    ).rejects.toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error searching flights:',
      'Invalid date format'
    );
  });

  // Test: searchFlights throws on invalid number of passengers
  test('searchFlights throws on invalid number of passengers', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    await expect(
      flightsService.searchFlights({
        origin: 'TLV',
        destination: 'LHR',
        departure_date: '2025-07-01',
        passengers: 'abc',
      })
    ).rejects.toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error searching flights:',
      'Invalid number of passengers'
    );
  });

  // Test: searchFlights throws if no flights found
  test('searchFlights throws if no flights found', async () => {
    Flights.findAll.mockResolvedValue([]);
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    await expect(
      flightsService.searchFlights({
        origin: 'TLV',
        destination: 'LHR',
        departure_date: '2025-07-01',
        passengers: 1,
      })
    ).rejects.toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error searching flights:',
      'No matching flights found'
    );
  });

  // Test: searchFlights returns flights if found
  test('searchFlights returns flights', async () => {
    Flights.findAll.mockResolvedValue([{ dataValues: { flight_id: 4222 } }]);
    const flights = await flightsService.searchFlights({
      origin: 'Paris',
      destination: 'Venice',
      departure_date: '2025-07-01',
      passengers: 1,
    });
    expect(Array.isArray(flights)).toBe(true);
    expect(flights[0].dataValues.flight_id).toBe(4222);
  });
});
