import React, { useState, useEffect, useRef } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(3000);
    const { categoryName } = useParams();

    // NEW: Reference to the product section for the scroll hook
    const trendingRef = useRef(null);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryName]);

    const fetchProducts = async () => {
        try {
            const endpoint = categoryName ? `/products/category/${categoryName}` : '/products';
            const response = await API.get(endpoint);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // NEW: Smooth scroll function
    const scrollToCollection = () => {
        trendingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="home-container">
            {/* The Hero Section with animation */}
            <section className="hero-section">
                <div className="hero-content hero-fade-in">
                    <h1 className="hero-hook">Timeless Elegance.</h1>
                    <p className="hero-subtext">Curated vintage-inspired pieces to define your personal narrative.</p>
                    <button className="btn-primary shop-btn" onClick={scrollToCollection}>
                        Shop The Collection
                    </button>
                </div>
            </section>

            {/* Added the ref here so the button knows where to scroll! */}
            <section className="trending-section" ref={trendingRef}>
                <h2 className="section-title">
                    {categoryName ? `${categoryName}'s Archive` : "Curated Collection"}
                </h2>

                <div className="filter-container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <label style={{ fontFamily: 'var(--body-font)', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--text-muted)', marginRight: '15px' }}>
                        Maximum Investment: ₹{maxPrice}
                    </label>
                    <input
                        type="range"
                        min="100"
                        max="3000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        style={{ cursor: 'pointer', accentColor: 'var(--accent-color)' }}
                    />
                </div>

                <div className="product-grid">
                    {products.length > 0 ? (
                        products
                            .filter(product => product.price <= maxPrice)
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                    ) : (
                        <p style={{textAlign: 'center', width: '100%', color: 'var(--text-muted)'}}>No archive pieces found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;