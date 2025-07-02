import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingFlightCard from '../components/BookingFlightCard';
import api from '../services/api'; // Import API service
import './CreateOrderPage.css';

// CreateOrderPage component allows the user to book a selected flight
function CreateOrderPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the selected flight from the location state
  const { flight } = location.state || {};

  // State variables for user input and feedback messages
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [orderCompleted, setOrderCompleted] = useState(false);

  // Number of passengers for the booking
  const passengers = flight?.passengers || 1;

  // If no flight is selected, show a message and a button to return to search
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

  // Handle form submission for booking the flight
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate user input fields
    if (
      !userName.trim() ||
      !userEmail.trim() ||
      passengers < 1 ||
      !userId.trim()
    ) {
      setError('Please fill in all fields correctly.');
      setSuccess('');
      return;
    }

    // Prepare order data to send to the backend
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
      // Send POST request to create the order
      const response = await api.post(`/orders/create-order`, orderData);

      setSuccess('Order created successfully');
      setError('');
      setOrderCompleted(true);
    } catch (err) {
      // Handle errors from the API
      setError(
        err.response?.data?.error || err.message || 'Failed to create order'
      );
      setSuccess('');
    }
  };

  // Show a success message after order completion
  if (orderCompleted) {
    return (
      <div className="create-order">
        <div className="order-container success-completed">
          <h2 data-testid="order-success-title">Order successfully placed!</h2>
          <p>You can view it in My Orders.</p>
        </div>
      </div>
    );
  }

  // Render the booking form and flight details
  return (
    <div className="create-order">
      <div className="order-container">
        <h2>Book your flight</h2>

        {/* Show the selected flight details */}
        <div key={flight.flight_id} className="flight-card-wrapper">
          <BookingFlightCard flight={flight} />
        </div>

        {/* Booking form */}
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

          {/* Display total price if available */}
          {flight.price && passengers > 0 && (
            <div className="total-price">
              Total price:{' '}
              <strong>${(flight.price * passengers).toFixed(2)}</strong>
            </div>
          )}

          {/* Show error or success messages */}
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
