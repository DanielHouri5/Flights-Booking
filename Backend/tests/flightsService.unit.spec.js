import { jest } from '@jest/globals';
import { flightsService } from '../src/services/flightsService.js';
import { Flights } from '../src/data-access/flightsModel.js';

jest.mock('../src/data-access/flightsModel.js');

describe('flightsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('fetchFlightById returns flight if exists', async () => {
    Flights.findByPk.mockResolvedValue({ dataValues: { flight_id: 1, origin: 'TLV' } });
    const flight = await flightsService.fetchFlightById(1);
    expect(flight.flight_id).toBe(1);
    expect(flight.origin).toBe('TLV');
  });

  test('fetchFlightById throws if not found', async () => {
    Flights.findByPk.mockResolvedValue(null);
    await expect(flightsService.fetchFlightById(999)).rejects.toThrow('Failed to fetch flight');
  });

  test('searchFlights throws on missing params', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(flightsService.searchFlights({}))
      .rejects
      .toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith('Error searching flights:', 'Missing required query parameters');
  });

  test('searchFlights throws on invalid date format', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(flightsService.searchFlights({
      origin: 'TLV',
      destination: 'LHR',
      departure_date: 'not-a-date',
      passengers: 1
    })).rejects.toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith('Error searching flights:', 'Invalid date format');
  });

  test('searchFlights throws on invalid number of passengers', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(flightsService.searchFlights({
      origin: 'TLV',
      destination: 'LHR',
      departure_date: '2025-07-01',
      passengers: 'abc'
    })).rejects.toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith('Error searching flights:', 'Invalid number of passengers');
  });

  test('searchFlights throws if no flights found', async () => {
    Flights.findAll.mockResolvedValue([]);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(flightsService.searchFlights({
      origin: 'TLV',
      destination: 'LHR',
      departure_date: '2025-07-01',
      passengers: 1
    })).rejects.toThrow('Failed to search flights');
    expect(consoleSpy).toHaveBeenCalledWith('Error searching flights:', 'No matching flights found');
  });

  test('searchFlights returns flights', async () => {
    Flights.findAll.mockResolvedValue([{ dataValues: { flight_id: 2 } }]);
    const flights = await flightsService.searchFlights({
      origin: 'TLV',
      destination: 'LHR',
      departure_date: '2025-07-01',
      passengers: 1,
    });
    expect(Array.isArray(flights)).toBe(true);
    expect(flights[0].dataValues.flight_id).toBe(2);
  });
});
