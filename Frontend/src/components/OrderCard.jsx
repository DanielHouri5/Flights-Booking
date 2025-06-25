import React, { useEffect, useState } from 'react';
import './OrderCard.css';
import BookingFlightCard from './BookingFlightCard';
import api from '../services/api';

function OrderCard({ order }) {
  const [flight, setFlight] = useState(null);

  const {
    order_id, user_id, user_name, user_email, flight_id,
    order_date, price, num_passengers
  } = order;

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const response = await api.get(`/flights/read-flight/${flight_id}`);
        setFlight(response.data);
      } catch (err) {
        console.error('Error fetching flight:', err);
      }
    };

    fetchFlight();
  }, [flight_id]);

  return (
    <div className="order-card">
      <h2>Order id: #{order_id}</h2>   
      {flight && <BookingFlightCard flight={flight} />}
      <section className="order-section">
        <ul>
          <li><strong>User ID:</strong> {user_id}</li>
          <li><strong>Name:</strong> {user_name}</li>
          <li><strong>Email:</strong> {user_email}</li>
          <li><strong>Order Date:</strong> {new Date(order_date).toLocaleDateString()}</li>
          <li><strong>Total Price:</strong> ${price}</li>
          <li><strong>Passengers:</strong> {num_passengers}</li>
        </ul>
      </section>
    </div>
  );
}

export default OrderCard;
