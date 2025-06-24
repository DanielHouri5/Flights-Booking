import React from 'react';
import './OrderCard.css';

function OrderCard({ order }) {
  if (!order || !order.flight) return null;

  const {
    order_id, user_id, user_name, user_email, flight_id,
    order_date, price, num_passengers,
    flight
  } = order;

  return (
    <div className="order-card">
      <h2>Order #{order_id}</h2>

      <section className="order-section">
        <h3>Order Details</h3>
        <ul>
          <li><strong>User ID:</strong> {user_id}</li>
          <li><strong>Name:</strong> {user_name}</li>
          <li><strong>Email:</strong> {user_email}</li>
          <li><strong>Flight Number:</strong> {flight_id}</li>
          <li><strong>Order Date:</strong> {new Date(order_date).toLocaleDateString()}</li>
          <li><strong>Total Price:</strong> ${price}</li>
          <li><strong>Passengers:</strong> {num_passengers}</li>
        </ul>
      </section>

      <section className="flight-section">
        <h3>Flight Details</h3>
        <ul>
          <li><strong>Flight Number:</strong> {flight.flight_id}</li>
          <li><strong>Airline:</strong> {flight.company}</li>
          <li><strong>Origin:</strong> {flight.origin}</li>
          <li><strong>Destination:</strong> {flight.destination}</li>
          <li><strong>Departure Date:</strong> {new Date(flight.departure_date).toLocaleDateString()}</li>
          <li><strong>Flight Price per Passenger:</strong> ${flight.price}</li>
        </ul>
      </section>
    </div>
  );
}

export default OrderCard;
