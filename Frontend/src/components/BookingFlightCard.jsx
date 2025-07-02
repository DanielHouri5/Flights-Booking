import React from 'react';
import './BookingFlightCard.css';

// BookingFlightCard component displays flight information in a styled card
function BookingFlightCard({ flight }) {
  // Destructure flight details from the flight prop
  const {
    company,
    origin,
    destination,
    departure_date,
    arrival_date,
    price,
    flight_id,
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

  return (
    <div className="booking-flight-card">
      {/* Company logo and name */}
      <div className="booking-flight-card__logo">
        <img
          src={`https://logo.clearbit.com/${company.replace(/\s/g, '').toLowerCase()}.com`}
          alt={`${company} logo`}
          onError={(e) => (e.target.style.display = 'none')}
        />
        <div className="booking-flight-card__company-name">{company}</div>
      </div>

      {/* Flight info section */}
      <div className="booking-flight-card__info">
        <div className="booking-flight-card__company-info">
          {/* Display flight number if available */}
          {flight_id && (
            <div className="booking-flight-card__flight-number">
              Flight Number: {flight_id}
            </div>
          )}
        </div>

        {/* Flight details: departure and arrival */}
        <div className="booking-flight-card__details">
          {/* Departure info */}
          <div className="booking-flight-card__time-city">
            <div className="booking-flight-card__departure-date">{departureDate}</div>
            <div className="booking-flight-card__departure-time">{departureTime}</div>
            <div className="booking-flight-card__departure-city" data-testid="departure-city">{origin}</div>
          </div>

          {/* Arrow icon between cities */}
          <div className="booking-flight-card__arrow">→</div>

          {/* Arrival info */}
          <div className="booking-flight-card__time-city">
            <div className="booking-flight-card__arrival-date">{arrivalDate}</div>
            <div className="booking-flight-card__arrival-time">{arrivalTime}</div>
            <div className="booking-flight-card__arrival-city" data-testid="arrival-city">{destination}</div>
          </div>
        </div>
      </div>

      {/* Price section */}
      <div className="booking-flight-card__price-section">
        <div className="booking-flight-card__separator"></div>
        <div className="booking-flight-card__price" data-testid="flight-price">
          ${Number(price)}
          <div className="booking-flight-card__per-person">per person</div>
        </div>
      </div>
    </div>
  );
}

export default BookingFlightCard;
