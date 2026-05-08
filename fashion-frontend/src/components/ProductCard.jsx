import React from 'react';
import API from '../services/api'; // Import our API tool
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        // 1. Check if the user is logged in
        const userString = localStorage.getItem('user');

        if (!userString) {
            alert('Please login to add items to your cart!');
            navigate('/login'); // Send them to login if they aren't logged in
            return;
        }

        // 2. Parse the user details
        const user = JSON.parse(userString);

        // 3. Send the request to Spring Boot
        try {
            await API.post('/cart/add', {
                userId: user.id,
                productId: product.id,
                quantity: 1
            });
            alert(`${product.title} added to your cart! 🛍️`);
        } catch (error) {
            console.error("Error adding to cart", error);
            alert('Failed to add to cart. Please try again.');
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.title} className="product-image" />
            </div>
            <div className="product-info">
                <h3 className="product-brand">{product.category}</h3>
                <h4 className="product-title">{product.title}</h4>
                <div className="product-price">
                    <span className="price-bold">₹{product.price}</span>
                </div>
                {/* 4. Attach the function to the button! */}
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;