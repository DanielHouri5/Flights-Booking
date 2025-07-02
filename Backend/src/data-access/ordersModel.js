// src/data-access/ordersModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

// Define the Orders model representing the 'orders' table in the database
export const Orders = sequelize.define(
  'orders',
  {
    // Unique order ID (primary key, auto-incremented)
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // ID of the user who made the order
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Name of the user who made the order
    user_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Email of the user who made the order
    user_email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // ID of the flight associated with the order
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Date and time when the order was made
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Total price of the order
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    // Number of passengers included in the order
    num_passengers: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1, 
    },
  },
  {
    tableName: 'orders',   // Specify the table name
    timestamps: false,     // Disable timestamps (createdAt, updatedAt)
  }
);
