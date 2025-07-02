import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightCard.css'; 

// FlightCard component displays a single flight's details in a styled card
function FlightCard({ flight }) {
  const navigate = useNavigate();

  // Destructure flight details from the flight prop
  const {
    company,
    flight_id,
    origin,
    destination,
    departure_date,
    arrival_date,
    price,
    passengers = 1,
  } = flight;

  // Format departure date for display
  const departureDate = new Date(departure_date).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  // Format departure time for display
  const departureTime = new Date(departure_date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Format arrival date for display
  const arrivalDate = new Date(arrival_date).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  // Format arrival time for display
  const arrivalTime = new Date(arrival_date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Handle the "Book Flight" button click
  const handleBookClick = () => {
    navigate('/create-order', {
      state: { flight: { ...flight, passengers } },
    });
  };

  return (
    <div className="flight-card">
      {/* Company logo and name */}
      <div className="flight-card__logo">
        <img
          src={`https://logo.clearbit.com/${company.replace(/\s/g, '').toLowerCase()}.com`}
          alt={`${company} logo`}
          onError={(e) => (e.target.style.display = 'none')}
        />
        <div className="flight-card__company-name">{company}</div>
      </div>

      {/* Flight info section */}
      <div className="flight-card__info">
        <div className="flight-card__company-info">
          {/* Display flight number if available */}
          {flight_id && (
            <div className="flight-card__flight-number" data-testid="flight-company">
              Flight Number: {flight_id}
            </div>
          )}
        </div>

        {/* Flight details: departure and arrival */}
        <div className="flight-card__details">
          {/* Departure info */}
          <div className="flight-card__time-city">
            <div className="flight-card__departure-date">{departureDate}</div>
            <div className="flight-card__departure-time">{departureTime}</div>
            <div className="flight-card__departure-city" data-testid="departure-city">{origin}</div>
          </div>

          {/* Arrow icon between cities */}
          <div className="flight-card__arrow">→</div>

          {/* Arrival info */}
          <div className="flight-card__time-city">
            <div className="flight-card__arrival-date">{arrivalDate}</div>
            <div className="flight-card__arrival-time">{arrivalTime}</div>
            <div className="flight-card__arrival-city" data-testid="arrival-city">{destination}</div>
          </div>
        </div>
      </div>

      {/* Price and booking section */}
      <div className="flight-card__price-section">
        <div className="flight-card__separator"></div>
        <div className="flight-card__price" data-testid="flight-price">
          ${Number(price)}
          <div className="flight-card__per-person">per person</div>
        </div>
        <button
          className="flight-card__book-btn"
          onClick={handleBookClick}
          data-testid="book-button"
        >
          Book Flight
        </button>
      </div>
    </div>
  );
}

export default FlightCard;