import React from 'react';
import './BookingFlightCard.css';

function BookingFlightCard({ flight }) {
  const {
    company,
    origin,
    destination,
    departure_date,
    arrival_date,
    price,
    flight_id,
  } = flight;

  const departureDate = new Date(departure_date).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  const departureTime = new Date(departure_date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const arrivalDate = new Date(arrival_date).toLocaleDateString('en-US', {
    dateStyle: 'medium',
  });
  const arrivalTime = new Date(arrival_date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <div className="booking-flight-card">
    <div className="booking-flight-card__logo">
      <img
        src={`https://logo.clearbit.com/${company.replace(/\s/g, '').toLowerCase()}.com`}
        alt={`${company} logo`}
        onError={(e) => (e.target.style.display = 'none')}
      />
      <div className="booking-flight-card__company-name">{company}</div>
    </div>

    <div className="booking-flight-card__info">
      <div className="booking-flight-card__company-info">
        {flight_id && (
            <div className="booking-flight-card__flight-number">
              Flight Number: {flight_id}
            </div>
          )}
        </div>

        <div className="booking-flight-card__details">
          <div className="booking-flight-card__time-city">
            <div className="booking-flight-card__departure-date">{departureDate}</div>
            <div className="booking-flight-card__departure-time">{departureTime}</div>
            <div className="booking-flight-card__departure-city" data-testid="departure-city">{origin}</div>
          </div>

          <div className="booking-flight-card__arrow">→</div>

          <div className="booking-flight-card__time-city">
            <div className="booking-flight-card__arrival-date">{arrivalDate}</div>
            <div className="booking-flight-card__arrival-time">{arrivalTime}</div>
            <div className="booking-flight-card__arrival-city" data-testid="arrival-city">{destination}</div>
          </div>
        </div>
      </div>

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
