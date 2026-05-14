import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../styles/Login.css'; // We share the exact same CSS file!

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Adjust this URL if your Spring Boot register endpoint is named differently
            await API.post('/users/register', { name, email, password });

            alert('Account created successfully! Please sign in.');
            navigate('/login'); // Send them to the login page after success
        } catch (error) {
            console.error("Signup failed", error);
            alert('Error creating account. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Join the Archive</h2>
                <p className="auth-subtitle">Create an account to begin your personal narrative.</p>

                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a strong password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">Create Account</button>
                </form>

                <div className="auth-link">
                    <p>Already have an account? <Link to="/login">Sign in here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;