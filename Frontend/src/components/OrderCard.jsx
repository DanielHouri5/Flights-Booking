import React, { useEffect, useState } from 'react';
import './OrderCard.css';
import BookingFlightCard from './BookingFlightCard';
import api from '../services/api';

// OrderCard component displays order details and related flight information
function OrderCard({ order }) {
  // State to hold the flight details fetched from the API
  const [flight, setFlight] = useState(null);

  // Destructure order details from the order prop
  const {
    order_id, user_id, user_name, user_email, flight_id,
    order_date, price, num_passengers
  } = order;

  // Fetch the flight details when the component mounts or flight_id changes
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        // Make an API call to get the flight details by flight_id
        const response = await api.get(`/flights/read-flight/${flight_id}`);
        setFlight(response.data);
      } catch (err) {
        // Log any errors during the fetch
        console.error('Error fetching flight:', err);
      }
    };

    fetchFlight();
  }, [flight_id]);

  return (
    <div className="order-card">
      {/* Display the order ID as the card title */}
      <h2>Order id: #{order_id}</h2>   
      {/* Show the related flight details using BookingFlightCard */}
      {flight && <BookingFlightCard flight={flight} />}
      <section className="order-section">
        {/* User details */}
        <ul>
          <li><strong>User ID:</strong> {user_id}</li>
          <li><strong>Name:</strong> {user_name}</li>
          <li><strong>Email:</strong> {user_email}</li>
         </ul>
        {/* Order details */}
        <ul>
          <li><strong>Order Date:</strong> {new Date(order_date).toLocaleDateString()}</li>
          <li data-testid="order-total-price"><strong>Total Price:</strong> ${price}</li>
          <li data-testid="order-passengers"><strong>Passengers:</strong> {num_passengers}</li>
        </ul>
      </section>
    </div>
  );
}

export default OrderCard;
