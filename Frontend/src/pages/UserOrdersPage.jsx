// pages/UserOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import api from '../services/api.js';
import './UserOrdersPage.css';

// UserOrdersPage component displays all orders for a specific user
function UserOrdersPage() {
  // Get the userId from the URL parameters
  const { userId } = useParams();
  // State to hold the list of orders
  const [orders, setOrders] = useState([]);
  // State to indicate loading status
  const [loading, setLoading] = useState(true);
  // State to hold any error messages
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts or userId changes
  useEffect(() => {
    fetchOrders();
  }, [userId]);

  // Function to fetch orders for the user from the API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Make API call to get orders by userId
      const response = await api.get(`/orders/read-orders/${userId}`);
      setOrders(response.data);
    } catch (err) {
      // Set error message if no orders found or request fails
      setError('No orders found for your id number');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Show loading message while fetching orders
  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading orders...
      </p>
    );

  // Show error message if there was an error fetching orders
  if (error)
    return (
      <p
        style={{
          color: '#3a8df3',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
        }}
      >
        {error}
      </p>
    );

  // Show message if no orders are found for the user
  if (orders.length === 0)
    return (
      <p
        style={{
          color: '#3a8df3',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '18px',
          marginTop: '50px',
        }}
      >
        No orders found for this ID.
      </p>
    );

  // Render the list of order cards
  return (
    <div className="orders-list-wrapper">
      {orders.map((order) => (
        <div key={order.order_id} className="order-card-wrapper">
          <OrderCard order={order} />
        </div>
      ))}
    </div>
  );
}

export default UserOrdersPage;
