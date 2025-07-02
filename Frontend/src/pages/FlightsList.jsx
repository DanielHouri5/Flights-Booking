import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import FlightCard from '../components/FlightCard.jsx';
import './FlightsList.css';

// FlightsList component displays a list of available flights based on search parameters
function FlightsList({ searchParams, flights: initialFlights }) {
  // State for the list of flights
  const [flights, setFlights] = useState(initialFlights || []);
  // State for loading indicator
  const [loading, setLoading] = useState(!initialFlights); // If there are immediate flights, don't show loading
  // State for error messages
  const [error, setError] = useState(null);

  // Fetch flights when searchParams or initialFlights change
  useEffect(() => {
    // If initial flights are provided, use them and skip fetching
    if (initialFlights) {
      setFlights(initialFlights);
      setLoading(false);
      setError(null);
      return;
    }

    // If there are no search parameters, do nothing
    if (!searchParams) return;

    // Function to fetch flights from the API
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build the query string from search parameters
        const query = new URLSearchParams(searchParams).toString();
        // Make API call to search for flights
        const response = await api.get(`/flights/search-flights?${query}`);
        setFlights(response.data);
      } catch (err) {
        // Handle errors and show a message if no flights found
        setError('No flights found for your selection');
        setFlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [searchParams, initialFlights]);

  // Show loading indicator while fetching flights
  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading flights...
      </p>
    );

  // Show error message if there was an error fetching flights
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

  // Show a message if no flights are found
  if (!flights || flights.length === 0)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>No flights found</p>
    );

  // Determine the number of passengers from searchParams, default to 1 if not provided
  const passengers = searchParams?.passengers
    ? parseInt(searchParams.passengers, 10)
    : 1;

  // Render the list of flight cards
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
