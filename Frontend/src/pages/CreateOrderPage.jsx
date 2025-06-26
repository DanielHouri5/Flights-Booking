import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingFlightCard from '../components/BookingFlightCard';
import api from '../services/api';  // ייבוא api
import './CreateOrderPage.css';

function CreateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { flight } = location.state || {};

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);

  const passengers = flight?.passengers || 1;

  if (!flight) {
    return (
      <div className="create-order">
        <div className="order-container">
          <h2>No flight selected</h2>
          <p>Please go back and select a flight to book.</p>
          <button className="book-btn" onClick={() => navigate('/')}>
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || !userEmail.trim() || passengers < 1 || !userId.trim()) {
      setError('Please fill in all fields correctly.');
      setSuccess('');
      return;
    }

    const orderData = {
      user_id: userId,
      user_name: userName,
      user_email: userEmail,
      flight_id: flight.flight_id,
      order_date: new Date().toISOString(),
      price: flight.price * passengers,
      num_passengers: String(passengers),
    };

    try {
      const response = await api.post(`/orders/create-order`, orderData);

      setSuccess('Order created successfully');
      setError('');
      setOrderCompleted(true);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create order');
      setSuccess('');
    }
  };

  if (orderCompleted) {
    return (
      <div className="create-order">
        <div className="order-container success-completed">
          <h2>Order successfully placed!</h2>
          <p>You can view it in My Orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="create-order">
      <div className="order-container">
        <h2>Book your flight</h2>

        <div key={flight.flight_id} className="flight-card-wrapper">
          <BookingFlightCard flight={flight} />
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your full name"
            />
          </label>

          <label>
            ID Number:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your ID number"
            />
          </label>

          <label>
            Email Address:
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </label>

          <label>
            Passengers selected: <strong>{passengers}</strong>
          </label>

          {flight.price && passengers > 0 && (
            <div className="total-price">
              Total price: <strong>${(flight.price * passengers).toFixed(2)}</strong>
            </div>
          )}

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <button type="submit" className="book-btn">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrderPage;
