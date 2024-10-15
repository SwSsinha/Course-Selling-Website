// src/components/AdminSignin.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/signin', {
                email,
                password,
            });
            alert(response.data.message);
            // Store the token securely
            localStorage.setItem('adminToken', response.data.token);
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Failed to sign in');
        }
    };

    return (
        <div>
            <h2>Admin Sign In</h2>
            <form onSubmit={handleSignin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default AdminSignin;
