import { jest } from '@jest/globals';
import { ordersService } from '../src/services/ordersService.js';

// Mock modules using factories
jest.mock('../src/data-access/ordersModel.js', () => ({
  Orders: {
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock('../src/data-access/flightsModel.js', () => ({
  Flights: {
    findByPk: jest.fn(),
  },
}));

jest.mock('../src/data-access/db.js', () => ({
  sequelize: {
    transaction: jest.fn((cb) => cb({})),
  },
}));

// Import mocks AFTER jest.mock (important!)
import { Orders } from '../src/data-access/ordersModel.js';
import { Flights } from '../src/data-access/flightsModel.js';
import { sequelize } from '../src/data-access/db.js';

describe('ordersService', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('createOrder', () => {
    test('should create an order when enough seats are available', async () => {
      const mockFlight = {
        seats_available: 5,
        save: jest.fn(),
      };
      Flights.findByPk.mockResolvedValue(mockFlight);
      Orders.create.mockResolvedValue({
        order_id: 123,
        user_name: 'Test User',
      });

      const orderData = {
        user_id: 1,
        user_name: 'Test User',
        user_email: 'test@example.com',
        flight_id: 100,
        order_date: new Date().toISOString(),
        price: 250,
        num_passengers: 2,
      };

      const result = await ordersService.createOrder(orderData);

      expect(Flights.findByPk).toHaveBeenCalledWith(100, { transaction: {} });
      expect(mockFlight.save).toHaveBeenCalledWith({ transaction: {} });
      expect(Orders.create).toHaveBeenCalledWith(
        expect.objectContaining({ user_name: 'Test User', flight_id: 100 }),
        { transaction: {} }
      );
      expect(result).toHaveProperty('order_id', 123);
    });

    test('should throw if flight not found', async () => {
      Flights.findByPk.mockResolvedValue(null);

      await expect(
        ordersService.createOrder({ flight_id: 999, num_passengers: 1 })
      ).rejects.toThrow('Failed to create order');
    });

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

    test('should handle unexpected errors', async () => {
      Flights.findByPk.mockRejectedValue(new Error('DB failure'));

      await expect(
        ordersService.createOrder({ flight_id: 100, num_passengers: 1 })
      ).rejects.toThrow('Failed to create order');
    });
  });

  describe('fetchOrdersById', () => {
    test('should fetch orders for a user', async () => {
      Orders.findAll.mockResolvedValue([{ order_id: 1 }, { order_id: 2 }]);

      const result = await ordersService.fetchOrdersById(999);

      expect(Orders.findAll).toHaveBeenCalledWith({
        where: { user_id: 999 },
        order: [['order_date', 'DESC']],
      });
      expect(result).toHaveLength(2);
    });

    test('should throw on fetch error', async () => {
      Orders.findAll.mockRejectedValue(new Error('DB error'));

      await expect(ordersService.fetchOrdersById(123)).rejects.toThrow(
        'DB error'
      );
    });
  });
});
