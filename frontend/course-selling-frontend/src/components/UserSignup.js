import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/user/signup', {
                email,
                password,
                firstName,
                lastName
            });
            alert('User signed up successfully!');
            navigate('/signin'); // Redirect to signin page
        } catch (error) {
            console.error('Signup error:', error);
            alert('Error signing up. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>User Signup</h2>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Signup</button>
        </form>
    );
};

export default UserSignup;
