import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Orders.css'; // We are creating this next!

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchOrders = async () => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userString);
        try {
            const response = await API.get(`/orders/${user.id}`);
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    };

    return (
        <div className="orders-page-container">
            <h1 className="orders-title">Order Archive</h1>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <h2>Your archive is currently empty.</h2>
                    <p>Discover timeless pieces to add to your collection.</p>
                    <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
                        Explore Collection
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-receipt-card">
                            <div className="receipt-header">
                                <span className="receipt-number">Order #{order.id}</span>
                                <span className="receipt-date">
                                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div className="receipt-body">
                                <div className="receipt-detail">
                                    <span className="detail-label">Status</span>
                                    <span className={`detail-value status-${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="receipt-detail">
                                    <span className="detail-label">Total Investment</span>
                                    <span className="detail-value price">₹{order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;