// src/components/ProductCarousel.js
import React from 'react';
import { Button } from '@mui/material';

const ProductCarousel = ({ products, addItem, removeItem }) => {
    return (
        <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {products.map((prod, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={prod.id}>
                        <img src={`https://picsum.photos/300/100?random=${prod.id}`} className="d-block w-100" alt={prod.desc} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{prod.author}</h5>
                            <h5>{prod.title}</h5>
                            <p>Price: {prod.price} $</p>
                            <Button variant="contained" color="success" onClick={() => addItem(prod)}>Buy</Button>
                            <Button variant="contained" color="error" onClick={() => removeItem(prod.id)}>Remove</Button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default ProductCarousel;
