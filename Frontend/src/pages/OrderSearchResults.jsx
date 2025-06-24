import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';

function UserOrdersPage(params) {
  console.log('search params:', searchParams);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    fetchOrders();
  }, []);