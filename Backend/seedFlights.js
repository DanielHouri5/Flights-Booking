// Import Sequelize and models
import { Sequelize, DataTypes } from 'sequelize';
import { Orders } from './src/data-access/ordersModel.js';
import { Flights } from './src/data-access/flightsModel.js';

// Create a Sequelize instance for connecting to the Postgres database
const sequelize = new Sequelize(
  'postgres://postgres:pass@db:5432/flight_booking',
  {
    dialect: 'postgres',
    logging: false, // Disable SQL logging
  }
);

// List of possible cities for flight origins and destinations
const cities = [
  'Tel Aviv',
  'New York',
  'Paris',
  'London',
  'Rome',
  'Berlin',
  'Athens',
  'Madrid',
  'Albania',
  'Dubai',
  'Istanbul',
  'Bangkok',
  'Tokyo',
  'Barcelona',
  'Amsterdam',
  'Moscow',
  'San Francisco',
  'Toronto',
  'Los Angeles',
  'Copenhagen',
  'Lisbon',
  'Venice',
  'Prague',
  'Cape Town',
  'Singapore',
  'Hong Kong',
  'Buenos Aires',
  'Vancouver',
  'Rio de Janeiro',
  'Delhi',
  'Shanghai',
  'Mexico City',
  'Miami',
  'Switzerland',
];

// List of possible airline companies
const companies = [
  'El Al',
  'Delta',
  'Air France',
  'Turkish Airlines',
  'British Airways',
  'Emirates',
  'Qatar Airways',
  'American Airlines',
  'Air Canada',
  'Alaska Airlines',
  'EasyJet',
  'Ryanair',
  'JetBlue',
  'Southwest Airlines',
];

// Helper function: pick a random element from an array
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function: generate a random date within the next month
function randomDateWithinNextMonth() {
  const now = new Date();
  const max = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days ahead
  const randomTime =
    now.getTime() + Math.random() * (max.getTime() - now.getTime());
  const date = new Date(randomTime);
  date.setMinutes([0, 15, 30, 45][Math.floor(Math.random() * 4)]); // Round to nearest quarter hour
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

// Main function to seed the flights table with random data
async function seedFlights(count = 5000) {
  try {
    await sequelize.authenticate(); // Connect to the DB
    console.log('✅ Connected to DB');

    const flights = [];

    // Generate random flight data
    for (let i = 0; i < count; i++) {
      let origin, destination;
      do {
        origin = randomFromArray(cities);
        destination = randomFromArray(cities);
      } while (origin === destination); // Ensure origin and destination are different

      const departure = randomDateWithinNextMonth();
      const durationMinutes = Math.floor(Math.random() * 270) + 90; // 1.5 to 5 hours
      const arrival = new Date(departure.getTime() + durationMinutes * 60000);

      flights.push({
        company: randomFromArray(companies),
        origin,
        destination,
        departure_date: departure,
        arrival_date: arrival,
        price: Math.floor(Math.random() * 650 + 150), // Price between 150 and 800
        seats_available: Math.floor(Math.random() * 130) + 20, // Seats between 20 and 150
      });
    }

    // Clear existing orders and flights before seeding
    await Orders.destroy({ where: {} });
    await Flights.destroy({ where: {} });
    await Flights.bulkCreate(flights); // Insert new flights
    console.log(`🎉 Inserted ${count} flights.`);
  } catch (error) {
    // Log any errors that occur during seeding
    console.error('❌ Error seeding flights:', error);
  } finally {
    // Always close the DB connection
    await sequelize.close();
  }
}

// Run the seeding function
seedFlights().catch(console.error);
