// pages/UserOrdersPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import api from '../services/api.js';


function UserOrdersPage() {
  const { userId } = useParams(); // מקבל את ה-ID מהכתובת
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/orders/read-orders/${userId}`);
      setOrders(response.data);
    } catch (err) {
      setError('No orders found for your id number');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading orders...
      </p>
    );
    
  if (error)
  return (
    <p style={{ 
      color: '#3a8df3', 
      textAlign: 'center', 
      fontWeight: 'bold', 
      fontSize: '18px' ,
    }}>
      {error}
    </p>
  );

  if (orders.length === 0)
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>No orders found</p>;

  return (
    <div className="orders-list-wrapper">
      {orders.map((order) => (
        <div key={order.userId} className="order-card-wrapper">
          <OrderCard order={order} />
        </div>
      ))}
    </div>
  );
}

export default UserOrdersPage;