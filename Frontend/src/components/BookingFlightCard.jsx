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
    flightNumber,
  } = flight;

  // Full readable date and time
    const departureDateTime = new Date(departure_date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    });

    const arrivalDateTime = new Date(arrival_date).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    });

  return (
    <div className="booking-flight-card">
      <div className="booking-flight-card__logo">
        <img
          src={`https://logo.clearbit.com/${company.replace(/\s/g, '').toLowerCase()}.com`}
          alt={`${company} logo`}
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>

      <div className="booking-flight-card__info">
        <div className="booking-flight-card__company-info">
          {flightNumber && (
            <div className="booking-flight-card__flight-number">
              Flight Number: {flightNumber}
            </div>
          )}
        </div>

        <div className="booking-flight-card__time-city">
          <div className="booking-flight-card__departure-time">{departureDateTime}</div>
          <div className="booking-flight-card__departure-city">{origin}</div>
        </div>

        <div className="booking-flight-card__arrow">→</div>

        <div className="booking-flight-card__time-city">
          <div className="booking-flight-card__arrival-time">{arrivalDateTime}</div>
          <div className="booking-flight-card__arrival-city">{destination}</div>
        </div>
      </div>

      <div className="booking-flight-card__price-section">
        <div className="booking-flight-card__separator"></div>
        <div className="booking-flight-card__price">
          ${Number(price).toFixed(2)}
          <div className="booking-flight-card__per-person">per person</div>
        </div>
      </div>
    </div>
  );
}

export default BookingFlightCard;
