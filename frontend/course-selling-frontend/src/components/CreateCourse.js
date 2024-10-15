// src/components/CreateCourse.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken'); // Make sure to have the admin token

        try {
            const response = await axios.post('http://localhost:3000/admin/createCourse', {
                title,
                description,
                price,
                imageUrl,
            }, {
                headers: {
                    token, // Replace with the actual admin token
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create course');
        }
    };

    return (
        <div>
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

export default CreateCourse;
