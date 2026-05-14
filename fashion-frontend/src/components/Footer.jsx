import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-brand-section">
                    <h2 className="footer-logo">FASHION<span>STORE</span></h2>
                    <p className="footer-tagline">
                        Timeless Elegance. Curated vintage-inspired pieces to define your personal narrative.
                    </p>
                </div>

                <div className="footer-links-section">
                    <div className="footer-column">
                        <h3>Shop</h3>
                        <Link to="/category/Men">Men's Archive</Link>
                        <Link to="/category/Women">Women's Archive</Link>
                        <Link to="/category/Kids">Kids' Collection</Link>
                    </div>
                    <div className="footer-column">
                        <h3>Support</h3>
                        <Link to="/orders">Order Archive</Link>
                        <Link to="/cart">Shopping Cart</Link>
                        <Link to="/profile">My Account</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Fashion Store. Crafted with elegance.</p>
            </div>
        </footer>
    );
};

export default Footer;