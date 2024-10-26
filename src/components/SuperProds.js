import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyCart from './MyCart';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const SERVER = "http://localhost:5000/products";

    useEffect(() => {
        axios(SERVER).then(res => setProducts(res.data));
    }, []);

    const addItem = (index) => {
        const product = products[index];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);

        if (existingProductIndex >= 0) {
            // If product already exists in cart, increase the quantity
            const newCart = [...cart];
            newCart[existingProductIndex].quantity += 1;
            setCart(newCart);
        } else {
            // If not, add it to the cart with quantity 1
            setCart([...cart, { id: product.id, desc: product.desc, price: product.price, quantity: 1 }]);
        }
    };

    const removeItem = (index) => {
        const productToRemove = cart[index];

        if (productToRemove.quantity > 1) {
            // Decrease the quantity if more than 1
            const newCart = [...cart];
            newCart[index].quantity -= 1;
            setCart(newCart);
        } else {
            // Remove the item from cart if quantity is 1
            const newCart = cart.filter((_, ind) => ind !== index);
            setCart(newCart);
        }
    };

    return (
        <div>
            <Link to="/">Home</Link> |{" "}
            <Link to="/mycart">My cart</Link> |{" "}
            <Outlet></Outlet>
            <div style={{ display: 'flex', maxWidth: '180rem' }}>
                <div style={{ flex: 1 }}>
                    <hr />
                    &nbsp;&nbsp;&nbsp;&nbsp; {products.length}
                    <div className="row row-cols-1 row-cols-md-5 g-1">
                        {products.map((prod, index) => (
                            <div key={prod.id} className="col">
                                <div className="card">
                                    <img src={`https://picsum.photos/10${index}`} className="card-img-top" alt={prod.desc} />
                                    <div className="card-body">
                                        <h5 className="card-title">{prod.desc}</h5>
                                        <p className="card-text">{prod.price} $</p>
                                        <button className='btn btn-success' onClick={() => addItem(index)}>Buy</button>&nbsp;&nbsp;&nbsp;
                                        <button className='btn btn-danger' onClick={() => removeItem(index)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
                <div style={{ width: '300px', marginLeft: '20px' }}>
                    <MyCart cart={cart} onRemove={removeItem} />
                </div>
            </div>
        </div>
    );
};

export default App;
