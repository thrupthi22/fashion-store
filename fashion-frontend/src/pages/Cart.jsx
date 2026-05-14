import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] = useState('');

    // NEW: States for dummy payment integration
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

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
        if (newQuantity < 1) return;
        try {
            await API.put(`/cart/update/${cartItemId}?quantity=${newQuantity}`);
            fetchCart();
        } catch (error) {
            console.error("Error updating quantity", error);
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await API.delete(`/cart/remove/${cartItemId}`);
            fetchCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    const handleCheckout = async () => {
        if (!address.trim()) {
            alert('Please enter a delivery address before checking out!');
            return;
        }

        const userString = localStorage.getItem('user');
        if (!userString) {
            navigate('/login');
            return;
        }

        // NEW: Start the dummy payment processing!
        setIsProcessing(true);

        // We use setTimeout to create a fake 2-second delay simulating a bank connection
        setTimeout(async () => {
            const user = JSON.parse(userString);
            try {
                await API.post(`/orders/checkout/${user.id}?address=${encodeURIComponent(address)}`);

                window.dispatchEvent(new Event('cartUpdated'));

                // Stop the loading spinner
                setIsProcessing(false);

                alert(`🎉 Payment Successful via ${paymentMethod.toUpperCase()}! Order Placed.`);
                navigate('/orders');
            } catch (error) {
                console.error("Checkout failed", error);
                setIsProcessing(false);
                alert('Failed to place order. Please try again.');
            }
        }, 2000); // 2000 milliseconds = 2 seconds
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

                        {/* Address Input Area */}
                        <div style={{ marginTop: '20px', marginBottom: '10px', textAlign: 'left' }}>
                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                                Delivery Address:
                            </label>
                            <textarea
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full street address, city, and zip code..."
                                rows="3"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* NEW: Dummy Payment Integration UI */}
                        <div style={{ marginTop: '10px', marginBottom: '20px', textAlign: 'left' }}>
                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                                Payment Method:
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    Credit / Debit Card (Dummy)
                                </label>
                                <label style={{ cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="upi"
                                        checked={paymentMethod === 'upi'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    UPI / Google Pay (Dummy)
                                </label>
                                <label style={{ cursor: 'pointer' }}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>

                        {/* UPDATED: Dynamic Button that shows "Processing..." when clicked */}
                        <button
                            className="btn-primary checkout-btn"
                            onClick={handleCheckout}
                            disabled={isProcessing} // Disable button while loading
                            style={{ opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                        >
                            {isProcessing ? 'Processing Payment...' : `Pay ₹${totalPrice.toFixed(2)}`}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;