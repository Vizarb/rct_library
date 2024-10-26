// src/components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';

// Function to get CSRF token from cookies
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const csrfToken = getCookie('csrftoken'); // Get CSRF token

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/token/',
                { username, password },
                { headers: { 'X-CSRFToken': csrfToken } } // Include CSRF token in headers
            );

            const { access, refresh } = response.data;
            onLogin(access, response.data.is_staff); // Pass tokens and staff status to parent
        } catch (error) {
            setError('Login failed: ' + (error.response?.data?.message || 'An error occurred.'));
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', my: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
            <Typography variant="h5" align="center" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default Login;
