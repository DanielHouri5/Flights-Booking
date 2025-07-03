import { Sequelize, DataTypes } from 'sequelize';
import { Orders } from './src/data-access/ordersModel.js';
import { Flights } from './src/data-access/flightsModel.js';

const sequelize = new Sequelize(
  'postgres://postgres:pass@db:5432/flight_booking',
  {
    dialect: 'postgres',
    logging: false,
  }
);

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

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateWithinNextMonth() {
  const now = new Date();
  const max = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // חודש קדימה
  const randomTime =
    now.getTime() + Math.random() * (max.getTime() - now.getTime());
  const date = new Date(randomTime);
  date.setMinutes([0, 15, 30, 45][Math.floor(Math.random() * 4)]);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

async function seedFlights(count = 5000) {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to DB');

    const flights = [];

    for (let i = 0; i < count; i++) {
      let origin, destination;
      do {
        origin = randomFromArray(cities);
        destination = randomFromArray(cities);
      } while (origin === destination);

      const departure = randomDateWithinNextMonth();
      const durationMinutes = Math.floor(Math.random() * 270) + 90;
      const arrival = new Date(departure.getTime() + durationMinutes * 60000);

      flights.push({
        company: randomFromArray(companies),
        origin,
        destination,
        departure_date: departure,
        arrival_date: arrival,
        price: Math.floor(Math.random() * 650 + 150),
        seats_available: Math.floor(Math.random() * 130) + 20,
      });
    }

    await Orders.destroy({ where: {} });
    await Flights.destroy({ where: {} });
    await Flights.bulkCreate(flights);
    console.log(`🎉 Inserted ${count} flights.`);
  } catch (error) {
    console.error('❌ Error seeding flights:', error);
  } finally {
    await sequelize.close();
  }
}

seedFlights().catch(console.error);
