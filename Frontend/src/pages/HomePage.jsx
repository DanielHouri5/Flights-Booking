import React, { useState, useEffect } from 'react';
import FlightsList from './FlightsList';
import './HomePage.css';
import api from '../services/api.js';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

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

function HomePage() {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departure_date: '',
    passengers: '1',
  });

  const [showFlights, setShowFlights] = useState(false);
  const [nearestFlights, setNearestFlights] = useState([]);

  useEffect(() => {
    const fetchNearestFlights = async () => {
      try {
        const response = await api.get('/flights/nearest-flights');
        setNearestFlights(response.data);
      } catch (err) {
        console.error('Failed to load nearest flights:', err);
      }
    };

    fetchNearestFlights();
  }, []);

  const handleOriginChange = (event, newValue) => {
    setSearchParams((prev) => ({
      ...prev,
      origin: newValue || '',
    }));
  };

  const handleDestinationChange = (event, newValue) => {
    setSearchParams((prev) => ({
      ...prev,
      destination: newValue || '',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchClick = () => {
    const cleanedParams = {
      ...searchParams,
      origin: searchParams.origin.trim(),
      destination: searchParams.destination.trim(),
    };

    setSearchParams(cleanedParams);
    setShowFlights(true);
  };

  const splitArrayInHalf = (arr) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };

  const [leftFlights, rightFlights] = splitArrayInHalf(nearestFlights);

  return (
    <div>
      <section className="hero">
        <h2>Find your perfect flight</h2>
        <p>Compare flights from hundreds of airlines worldwide</p>
        <div className="search-box">
          <Autocomplete
            freeSolo
            options={cities}
            value={searchParams.origin}
            onChange={handleOriginChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name="origin"
                placeholder="From"
                variant="outlined"
                size="small"
                label={null}
                className="customTextField"
                InputLabelProps={{ shrink: false }}
              />
            )}
          />

          <Autocomplete
            freeSolo
            options={cities}
            value={searchParams.destination}
            onChange={handleDestinationChange}
            renderInput={(params) => (
              <TextField
                {...params}
                name="destination"
                placeholder="To"
                variant="outlined"
                size="small"
                label={null}
                className="customTextField"
                InputLabelProps={{ shrink: false }}
              />
            )}
          />

          <input
            type="date"
            name="departure_date"
            value={searchParams.departure_date}
            onChange={handleInputChange}
          />

          <select
            name="passengers"
            data-testid="passengers"
            value={searchParams.passengers}
            onChange={handleInputChange}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <div className="search-button">
            <button onClick={handleSearchClick}>Search Flights</button>
          </div>
        </div>
      </section>

      <section className="featured-section">
        {showFlights ? (
          <div className="flights-column flights-single-column">
            <FlightsList searchParams={searchParams} />
          </div>
        ) : (
          <>
            <h2>Upcoming Flights</h2>
            {nearestFlights.length > 0 ? (
              <div className="flights-double-column">
                <div className="flights-column">
                  <FlightsList flights={leftFlights} />
                </div>
                <div className="flights-column">
                  <FlightsList flights={rightFlights} />
                </div>
              </div>
            ) : (
              <p style={{ textAlign: 'center' }}>Loading nearest flights...</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default HomePage;
