import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import '../styles/Login.css'; // This imports the beautiful styling we just made!

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Adjust this URL if your Spring Boot login endpoint is named differently
            const response = await API.post('/users/login', { email, password });

            // Save the user data to localStorage so the app knows who is logged in
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirect smoothly to the home page
            navigate('/');
        } catch (error) {
            console.error("Login failed", error);
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Enter your details to access your curated collection.</p>

                <form className="auth-form" onSubmit={handleLogin}>
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
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">Sign In</button>
                </form>

                <div className="auth-link">
                    <p>Don't have an account? <Link to="/signup">Create one here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;