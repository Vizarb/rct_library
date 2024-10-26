// src/pages/HomePage.js
import React from 'react';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = ({ products, addItem, removeItem }) => {
    return (
        <div>
            <h1>Welcome to the Bookstore</h1>
            <ProductCarousel products={products} addItem={addItem} removeItem={removeItem} />
        </div>
    );
};

export default HomePage;
