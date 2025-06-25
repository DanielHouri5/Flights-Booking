// Frontend/src/pages/FlightList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import FlightCard from '../components/FlightCard.jsx';
import './FlightsList.css';

function FlightsList({ searchParams }) {
  console.log('search params:', searchParams);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlights();
  }, [searchParams]);

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

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading flights...
      </p>
    );

  if (error)
  return (
    <p style={{ 
      color: '#3a8df3', 
      textAlign: 'center', 
      fontWeight: 'bold', 
      fontSize: '18px' ,
    }}>
      {error}
    </p>
  );

  if (flights.length === 0)
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>No flights found</p>;

  const passengers = Number(searchParams.passengers || 1);

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
