import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    FASHION<span>STORE</span>
                </Link>

                {/* Center Category Links */}
                <div className="nav-links">
                    {/* <-- UPDATED: Now pointing to our dynamic category routes --> */}
                    <Link to="/category/Men" className="nav-item">Men</Link>
                    <Link to="/category/Women" className="nav-item">Women</Link>
                    <Link to="/category/Kids" className="nav-item">Kids</Link>
                    <Link to="/" className="nav-item">All</Link>
                </div>

                {/* Right Side Icons/Links */}
                <div className="nav-icons">
                    <Link to="/orders" className="nav-icon-btn">Orders</Link>

                    {/* <-- UPDATED: Now points to the Profile page --> */}
                    <Link to="/profile" className="nav-icon-btn">Profile</Link>

                    <Link to="/cart" className="nav-icon-btn">Cart</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;