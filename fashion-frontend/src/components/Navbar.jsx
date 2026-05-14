import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api'; // NEW: Need API to fetch the cart
import '../styles/Navbar.css';

const Navbar = () => {
    // NEW: State to hold the number of items in the cart
    const [cartCount, setCartCount] = useState(0);

    // NEW: Function to check the database for the user's cart items
    const fetchCartCount = async () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            try {
                // Call your CartController GET endpoint
                const response = await API.get(`/cart/${user.id}`);
                // Add up all the quantities of the items in the cart
                const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(totalItems);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        } else {
            setCartCount(0); // If not logged in, cart is 0
        }
    };

    // NEW: Run this when the Navbar loads, AND listen for our custom update event
    useEffect(() => {
        fetchCartCount();

        // Listen for the signal that a product was added
        window.addEventListener('cartUpdated', fetchCartCount);

        // Cleanup the listener
        return () => {
            window.removeEventListener('cartUpdated', fetchCartCount);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    FASHION<span>STORE</span>
                </Link>

                <div className="nav-links">
                    <Link to="/category/Men" className="nav-item">Men</Link>
                    <Link to="/category/Women" className="nav-item">Women</Link>
                    <Link to="/category/Kids" className="nav-item">Kids</Link>
                    <Link to="/" className="nav-item">All</Link>
                </div>

                <div className="nav-icons">
                    <Link to="/orders" className="nav-icon-btn">Orders</Link>
                    <Link to="/profile" className="nav-icon-btn">Profile</Link>
                    <Link to="/cart" className="nav-icon-btn">
                        Cart
                        {/* NEW: Only show the badge if there are items in the cart! */}
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;