// OrderCard.jsx
import React from 'react';
import './OrderCard.css';

function OrderCard({ order }) {
  if (!order) return null;

  const {
    order_id, user_id, user_name, user_email, flight_id,
    order_date, price, num_passengers
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
    </div>
  );
}

export default OrderCard;
