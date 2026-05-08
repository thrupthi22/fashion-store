import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send the login request to the Spring Boot backend
            const response = await API.post('/users/login', { email, password });

            // Save the user details to the browser's local storage
            localStorage.setItem('user', JSON.stringify(response.data));

            // Redirect to the home page upon successful login
            navigate('/');
        } catch (error) {
            alert('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome Back</h2>

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

                <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '10px' }}
                >
                    Sign In
                </button>

                {/* Link to navigate to the Signup page */}
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                    New to FashionStore? <Link to="/signup" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '600' }}>Create an account</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;