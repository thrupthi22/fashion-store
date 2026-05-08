import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'; // Reusing Cart CSS for a consistent layout

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
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
        <div className="cart-page-container">
            <h1 className="cart-title">My Orders</h1>

            {orders.length === 0 ? (
                <div className="empty-cart">
                    <h2>You haven't placed any orders yet.</h2>
                    <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/')}>
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            background: 'white',
                            padding: '20px',
                            marginBottom: '15px',
                            borderRadius: '8px',
                            border: '1px solid #eaeaec',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <p style={{ fontSize: '14px', color: '#535766' }}>
                                    Order ID: #{order.id} • {new Date(order.orderDate).toLocaleDateString()}
                                </p>
                                <h3 style={{ marginTop: '10px', color: '#ff3f6c' }}>Status: {order.status}</h3>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '14px', color: '#535766' }}>Total Amount</p>
                                <h2 style={{ fontSize: '24px' }}>₹{order.totalPrice.toFixed(2)}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;