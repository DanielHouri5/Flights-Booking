// src/data-access/flightsModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

// Define the Flights model representing the 'flights' table in the database
export const Flights = sequelize.define(
  'flight',
  {
    // Unique flight ID (primary key, auto-incremented)
    flight_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // Airline company name
    company: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Origin airport or city
    origin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Destination airport or city
    destination: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Departure date and time
    departure_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Arrival date and time
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Price of the flight ticket
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Number of available seats for the flight
    seats_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    tableName: 'flights', // Specify the table name
    timestamps: false,    // Disable automatic timestamp fields
  }
);
