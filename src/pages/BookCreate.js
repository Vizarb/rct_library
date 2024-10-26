// src/pages/BookCreate.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import config from '../utils/config';

const BookCreate = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.SERVER_URL}/books/`, {
                title,
                author,
                price,
                description,
            });
            alert('Book created successfully!');
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Failed to create book');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Create a New Book</Typography>
            <form onSubmit={handleCreateBook}>
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
                <TextField label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth margin="normal" />
                <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" type="number" />
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary">Create Book</Button>
            </form>
        </Container>
    );
};

export default BookCreate;
