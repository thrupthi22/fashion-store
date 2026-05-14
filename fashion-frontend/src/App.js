import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import our components and pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import Orders from './pages/Orders';
import Profile from './pages/Profile'; // <-- NEW: Imported the Profile page

// Import the global CSS
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar stays fixed on top */}
        <Navbar />

        {/* Main Content Container */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* <-- NEW: Dynamic route for category filtering --> */}
            <Route path="/category/:categoryName" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />

            {/* <-- NEW: Added the Profile route below --> */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Professional Footer stays at the bottom */}
        <footer className="professional-footer">
          <div className="footer-container">
            <p className="copyright-text">
              © {new Date().getFullYear()} Fashion Store. Style That Defines You.
            </p>
            <div className="footer-links">
              <Link to="/" className="footer-link-item">About Us</Link>
              <Link to="/" className="footer-link-item">Contact</Link>
              <Link to="/" className="footer-link-item">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;