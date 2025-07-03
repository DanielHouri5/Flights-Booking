// Use ESM imports for Jest globals and the service under test
import { jest } from '@jest/globals';
import { ordersService } from '../src/services/ordersService.js';

// Mock the Orders model with a factory to ensure all methods are mocked
jest.mock('../src/data-access/ordersModel.js', () => ({
  Orders: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

// Mock the Flights model with a factory
jest.mock('../src/data-access/flightsModel.js', () => ({
  Flights: {
    findByPk: jest.fn(),
  },
}));

// Mock the sequelize instance and its transaction method
jest.mock('../src/data-access/db.js', () => ({
  sequelize: {
    transaction: jest.fn((cb) => cb({})),
  },
}));

// Import the mocks AFTER jest.mock to ensure the mocks are applied
import { Orders } from '../src/data-access/ordersModel.js';
import { Flights } from '../src/data-access/flightsModel.js';
import { sequelize } from '../src/data-access/db.js';

// Test suite for the ordersService
// This suite covers both order creation and fetching orders by user ID
describe('ordersService', () => {
  // Clean up mocks after each test to avoid state leakage
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('createOrder', () => {
    // Test: should create an order when enough seats are available
    test('should create an order when enough seats are available', async () => {
      // Mock a flight with available seats and a save method
      const mockFlight = {
        seats_available: 5,
        save: jest.fn(),
      };
      // Mock the DB calls
      Flights.findByPk.mockResolvedValue(mockFlight);
      Orders.create.mockResolvedValue({
        order_id: 123,
        user_name: 'Test User',
      });

      // Order data to send to the service
      const orderData = {
        user_id: 1,
        user_name: 'Test User',
        user_email: 'test@example.com',
        flight_id: 100,
        order_date: new Date().toISOString(),
        price: 250,
        num_passengers: 2,
      };

      // Call the service and assert the result
      const result = await ordersService.createOrder(orderData);

      // Check that the mocks were called as expected
      expect(Flights.findByPk).toHaveBeenCalledWith(100, { transaction: {} });
      expect(mockFlight.save).toHaveBeenCalledWith({ transaction: {} });
      expect(Orders.create).toHaveBeenCalledWith(
        expect.objectContaining({ user_name: 'Test User', flight_id: 100 }),
        { transaction: {} }
      );
      expect(result).toHaveProperty('order_id', 123);
    });

    // Test: should throw if flight not found
    test('should throw if flight not found', async () => {
      Flights.findByPk.mockResolvedValue(null);

      await expect(
        ordersService.createOrder({ flight_id: 999, num_passengers: 1 })
      ).rejects.toThrow('Failed to create order');
    });

    // Test: should throw if not enough seats available
    test('should throw if not enough seats available', async () => {
      const mockFlight = {
        seats_available: 1,
        save: jest.fn(),
      };
      Flights.findByPk.mockResolvedValue(mockFlight);

      await expect(
        ordersService.createOrder({ flight_id: 100, num_passengers: 3 })
      ).rejects.toThrow('Failed to create order');
      expect(mockFlight.save).not.toHaveBeenCalled();
    });

    // Test: should handle unexpected errors from the DB
    test('should handle unexpected errors', async () => {
      Flights.findByPk.mockRejectedValue(new Error('DB failure'));

      await expect(
        ordersService.createOrder({ flight_id: 100, num_passengers: 1 })
      ).rejects.toThrow('Failed to create order');
    });
  });

  describe('fetchOrdersById', () => {
    // Test: should fetch orders for a user
    test('should fetch orders for a user', async () => {
      // Mock the DB call to return two orders
      Orders.findAll.mockResolvedValue([{ order_id: 1 }, { order_id: 2 }]);

      const result = await ordersService.fetchOrdersById(999);

      // Check that the mock was called with the correct query
      expect(Orders.findAll).toHaveBeenCalledWith({
        where: { user_id: 999 },
        order: [['order_date', 'DESC']],
      });
      expect(result).toHaveLength(2);
    });

    // Test: should throw on fetch error
    test('should throw on fetch error', async () => {
      Orders.findAll.mockRejectedValue(new Error('DB error'));

      await expect(ordersService.fetchOrdersById(123)).rejects.toThrow(
        'DB error'
      );
    });
  });
});
