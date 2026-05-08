import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom'; // NEW IMPORT
import '../styles/Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams(); // NEW: Grabs "Men" or "Women" from the URL!

    // Run this whenever the page loads OR when the categoryName changes
    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryName]);

    const fetchProducts = async () => {
        try {
            // If we clicked a category, use that API. Otherwise, get everything!
            const endpoint = categoryName ? `/products/category/${categoryName}` : '/products';
            const response = await API.get(endpoint);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="home-container">
            {/* Hero section stays exactly the same... */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-hook">Style That Defines You</h1>
                    <p className="hero-subtext">Discover the latest trends in fashion. Wear your confidence every single day.</p>
                    <button className="btn-primary">Shop The Collection</button>
                </div>
            </section>

            <section className="trending-section">
                {/* Dynamically update the title based on the category */}
                <h2 className="section-title">
                    {categoryName ? `${categoryName}'s Collection` : "Trending Now"}
                </h2>

                <div className="product-grid">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No products found for this category.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;