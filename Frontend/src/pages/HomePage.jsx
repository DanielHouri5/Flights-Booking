import React, { useState, useEffect } from 'react';
import FlightsList from './FlightsList';
import './HomePage.css';
import api from '../services/api.js';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = typeof value === 'string' ? value.trim() : value;

    setSearchParams((prev) => ({
      ...prev,
      [name]: trimmedValue,
    }));
  };

  const handleSearchClick = () => {
    setShowFlights(true);
  };

  // פונקציה לחלוקת מערך לשני חצאים
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
          <input
            type="text"
            name="origin"
            placeholder="From"
            value={searchParams.origin}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="destination"
            placeholder="To"
            value={searchParams.destination}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="departure_date"
            value={searchParams.departure_date}
            onChange={handleInputChange}
          />
          <select
            name="passengers"
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
