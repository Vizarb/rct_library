// src/App.js
import React, { useEffect, useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProductCarousel from './components/ProductCarousel';
import MyCart from './components/MyCart';
import AuthContext from './context/AuthContext';
import config from './utils/config';

const App = () => {
    const { isAuthenticated, user, logout, checkAuth } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(config.SERVER_URL + '/library');
                setProducts(res.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
        checkAuth();
    }, [checkAuth]);

    const addItem = (index) => {
        const product = products[index];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        if (existingProductIndex >= 0) {
            const newCart = [...cart];
            newCart[existingProductIndex].quantity += 1;
            setCart(newCart);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeItem = (index) => {
        const productToRemove = cart[index];
        if (productToRemove.quantity > 1) {
            const newCart = [...cart];
            newCart[index].quantity -= 1;
            setCart(newCart);
        } else {
            const newCart = cart.filter((_, ind) => ind !== index);
            setCart(newCart);
        }
    };

    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>Bookstore</Typography>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link to="/testt" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                        <Button color="inherit">Testt</Button>
                    </Link>
                    <Link to="/TeamU" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>
                        <Button color="inherit">TeamU</Button>
                    </Link>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    ) : (
                        <>
                            <Login />
                            <Register />
                        </>
                    )}
                </Toolbar>
            </AppBar>

            <Outlet />

            <ProductCarousel products={products} addItem={addItem} removeItem={removeItem} />
            <MyCart cart={cart} onRemove={removeItem} />

            {user?.isStaff && (
                <div>
                    <h2>Create Book</h2>
                    {/* Book creation form goes here */}
                </div>
            )}
        </div>
    );
};

export default App;
