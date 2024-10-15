// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">User Sign Up</Link></li>
                <li><Link to="/signin">User Sign In</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/admin/create-course">Create Your Course</Link></li>
                <li><Link to="/admin">Admin Dashboard</Link></li>
                <li><Link to="/admin/signin">Admin Sign In</Link></li>
                <li><Link to="/admin/signup">Admin Sign Up</Link></li>
                <li><Link to="/purchases">Your Purchases</Link></li>
            </ul>
        </nav>
    );
};

export default Header;
