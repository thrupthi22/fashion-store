import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css'; // Reusing CSS for consistency

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Read the user from local storage
        const userString = localStorage.getItem('user');
        if (!userString) {
            navigate('/login'); // Not logged in? Go to login!
        } else {
            setUser(JSON.parse(userString));
        }
    }, [navigate]);

    // LOGOUT LOGIC
    const handleLogout = () => {
        localStorage.removeItem('user'); // Delete user from browser memory
        alert('You have been logged out successfully.');
        navigate('/login'); // Send back to login screen
    };

    if (!user) return null; // Wait for user to load

    return (
        <div className="cart-page-container" style={{ maxWidth: '600px' }}>
            <h1 className="cart-title">My Profile</h1>

            <div className="cart-summary" style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px', fontWeight: 'bold', margin: '0 auto 20px'
                }}>
                    {user.name.charAt(0).toUpperCase()}
                </div>

                <h2 style={{ marginBottom: '10px' }}>{user.name}</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>{user.email}</p>

                <button
                    onClick={handleLogout}
                    className="btn-primary"
                    style={{ backgroundColor: '#282c3f', width: '100%' }}
                >
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Profile;