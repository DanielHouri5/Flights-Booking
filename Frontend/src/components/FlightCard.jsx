import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightCard.css'; 

function FlightCard({ flight }) {
  const navigate = useNavigate();

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


  const handleBookClick = () => {
    navigate('/create-order', {
      state: { flight: { ...flight, passengers } },
    });
  };

  return (
    <div className="flight-card">
      <div className="flight-card__logo">
        <img
          src={`https://logo.clearbit.com/${company.replace(/\s/g, '').toLowerCase()}.com`}
          alt={`${company} logo`}
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>

      <div className="flight-card__info">
        <div className="flight-card__company-info">
          {flight_id && (
            <div className="flight-card__flight-number" data-testid="flight-company">
              Flight Number: {flight_id}
            </div>
          )}
        </div>

        <div className="flight-card__details">
          <div className="flight-card__time-city">
            <div className="flight-card__departure-date">{departureDate}</div>
            <div className="flight-card__departure-time">{departureTime}</div>
            <div className="flight-card__departure-city" data-testid="departure-city">{origin}</div>
          </div>

          <div className="flight-card__arrow">→</div>

          <div className="flight-card__time-city">
            <div className="flight-card__arrival-date">{arrivalDate}</div>
            <div className="flight-card__arrival-time">{arrivalTime}</div>
            <div className="flight-card__arrival-city" data-testid="arrival-city">{destination}</div>
          </div>

        </div>
      </div>

      <div className="flight-card__price-section">
        <div className="flight-card__separator"></div>
        <div className="flight-card__price" data-testid="flight-price">
          ${Number(price).toFixed(2)}
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