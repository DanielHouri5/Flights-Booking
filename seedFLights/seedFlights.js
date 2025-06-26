// seedFlights.js
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('DB_NAME', 'USERNAME', 'PASSWORD', {
  host: 'DB_HOST',
  dialect: 'postgres', // או mysql/sqlite לפי הצורך שלך
  logging: false,
});

const Flights = sequelize.define(
  'flight',
  {
    flight_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    origin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    destination: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    departure_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrival_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    seats_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'flights',
    timestamps: false,
  }
);

const cities = [
  'Tel Aviv', 'New York', 'Paris', 'London', 'Rome', 'Berlin',
  'Athens', 'Madrid', 'Dubai', 'Istanbul', 'Bangkok', 'Tokyo'
];

const companies = ['El Al', 'Delta', 'United', 'Air France', 'Lufthansa', 'Turkish Airlines'];

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDateInJulyAugust() {
  const year = 2025;
  const month = Math.floor(Math.random() * 2) + 6; // 6 = July, 7 = August
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * 18) + 4;
  const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
  return new Date(Date.UTC(year, month, day, hour, minute));
}

async function seedFlights(count = 200) {
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

      const departure = randomDateInJulyAugust();
      const durationMinutes = Math.floor(Math.random() * 270) + 90;
      const arrival = new Date(departure.getTime() + durationMinutes * 60000);

      flights.push({
        company: randomFromArray(companies),
        origin,
        destination,
        departure_date: departure,
        arrival_date: arrival,
        price: (Math.random() * 650 + 150).toFixed(2),
        seats_available: Math.floor(Math.random() * 130) + 20,
      });
    }

    await Flights.bulkCreate(flights);
    console.log(`🎉 Inserted ${count} flights.`);
  } catch (error) {
    console.error('❌ Error seeding flights:', error);
  } finally {
    await sequelize.close();
  }
}

seedFlights();
