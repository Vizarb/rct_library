// src/components/MyCart.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, Card, CardContent } from '@mui/material';

const MyCart = ({ cart, onRemove }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const temp = cart.reduce((acc, prod) => acc + Number(prod.price) * prod.quantity, 0);
        setTotal(temp);
    }, [cart]);

    return (
        <Box sx={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", boxShadow: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" align="center">My Cart</Typography>
            <Divider sx={{ mb: 2 }} />

            {cart.length === 0 ? (
                <Typography align="center" color="textSecondary">Your cart is empty.</Typography>
            ) : (
                cart.map((prod, index) => (
                    <Card key={prod.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="subtitle1">{prod.author}</Typography>
                            <Typography variant="subtitle2">{prod.title}</Typography>
                            <Typography color="textSecondary">{prod.price} $ x {prod.quantity}</Typography>
                            <Button variant="contained" color="error" onClick={() => onRemove(index)} sx={{ mt: 1 }}>Remove</Button>
                        </CardContent>
                    </Card>
                ))
            )}

            <Typography variant="h6" align="right" sx={{ mt: 3, fontWeight: 'bold' }}>Total: {total.toFixed(2)} $</Typography>
        </Box>
    );
};

export default MyCart;
