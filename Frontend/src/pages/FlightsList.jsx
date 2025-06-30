import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import FlightCard from '../components/FlightCard.jsx';
import './FlightsList.css';

function FlightsList({ searchParams, flights: initialFlights }) {
  const [flights, setFlights] = useState(initialFlights || []);
  const [loading, setLoading] = useState(!initialFlights); // אם יש טיסות מיידיות, לא טוען
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialFlights) {
      setFlights(initialFlights);
      setLoading(false);
      setError(null);
      return;
    }

    if (!searchParams) return;

    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams(searchParams).toString();
        const response = await api.get(`/flights/search-flights?${query}`);
        setFlights(response.data);
      } catch (err) {
        setError('No flights found for your selection');
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams, initialFlights]);

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading flights...
      </p>
    );

  if (error)
    return (
      <p
        style={{
          color: '#3a8df3',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        {error}
      </p>
    );

  if (!flights || flights.length === 0)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>No flights found</p>
    );

  // אם יש searchParams, אפשר להשתמש במספר הנוסעים מהם, אחרת אפשר להניח 1
  const passengers = searchParams?.passengers
    ? parseInt(searchParams.passengers, 10)
    : 1;

  return (
    <div className="flights-list-wrapper">
      {flights.map((flight) => (
        <div key={flight.flight_id} className="flight-card-wrapper">
          <FlightCard flight={{ ...flight, passengers }} />
        </div>
      ))}
    </div>
  );
}

export default FlightsList;
