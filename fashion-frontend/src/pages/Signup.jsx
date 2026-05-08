import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css'; // We can reuse the same CSS file for the layout!

const Signup = () => {
    // State to hold the user's input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Send the data to your Spring Boot backend
            await API.post('/users/signup', { name, email, password });

            alert('Account created successfully! Please log in.');
            navigate('/login'); // Send them to the login page after successful signup
        } catch (error) {
            alert('Signup failed. That email might already be registered.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSignup} className="login-form">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Account</h2>

                <input
                    type="text"
                    placeholder="First Name"
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    Sign Up
                </button>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;