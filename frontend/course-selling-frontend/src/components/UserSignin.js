import React, { useState } from 'react';
import axios from 'axios';

const UserSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signin', {
        email,
        password,
      });
      localStorage.setItem('userToken', response.data.token);
      alert('User signed in successfully!');
    } catch (error) {
      console.error('Error signing in', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <h2>Sign In</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign In</button>
    </form>
  );
};

export default UserSignIn;
