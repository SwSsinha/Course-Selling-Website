// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const response = await axios.get('http://localhost:3000/admin/course/bulk', {
                headers: { token }
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching admin courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Your Courses</h3>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>
                        <p>Price: ${course.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
