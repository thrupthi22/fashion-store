import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCart = async () => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            navigate('/login');
            return;
        }
        const user = JSON.parse(userString);
        try {
            const response = await API.get(`/cart/${user.id}`);
            setCartItems(response.data);
            calculateTotal(response.data);
        } catch (error) {
            console.error("Error fetching cart", error);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        setTotalPrice(total);
    };

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        // Prevent quantity from going below 1
        if (newQuantity < 1) return;

        try {
            await API.put(`/cart/update/${cartItemId}?quantity=${newQuantity}`);
            fetchCart(); // Refresh the cart to update the total price immediately
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await API.delete(`/cart/remove/${cartItemId}`);
            fetchCart();
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    // --- NEW CHECKOUT FUNCTION ---
    const handleCheckout = async () => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            navigate('/login');
            return;
        }

        const user = JSON.parse(userString);
        try {
            // Tell Spring Boot to process the order and clear the cart
            await API.post(`/orders/checkout/${user.id}`);
            alert('🎉 Order Placed Successfully!');
            navigate('/orders'); // Redirect them to their new Orders page!
        } catch (error) {
            console.error("Checkout failed", error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="cart-page-container">
            <h1 className="cart-title">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is completely empty!</h2>
                    <p>Looks like you haven't added anything yet.</p>
                    <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'none' }}>
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <img src={item.product.imageUrl} alt={item.product.title} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.product.title}</h3>
                                    <p className="cart-item-brand">{item.product.category}</p>
                                    <p className="cart-item-price">₹{item.product.price}</p>

                                    <div className="cart-item-quantity">
                                        <button className="qty-btn" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span className="qty-value">{item.quantity}</span>
                                        <button className="qty-btn" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item-actions">
                                    <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>✕ Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Price Details</h3>
                        <div className="summary-row">
                            <span>Total MRP ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping Fee</span>
                            <span style={{ color: 'green' }}>FREE</span>
                        </div>
                        <hr className="summary-divider" />
                        <div className="summary-row total-row">
                            <span>Total Amount</span>
                            <span>₹{totalPrice.toFixed(2)}</span>
                        </div>

                        {/* --- UPDATED BUTTON --- */}
                        <button className="btn-primary checkout-btn" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;