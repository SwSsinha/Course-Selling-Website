// src/components/CourseCard.js
import React from 'react';
import axios from 'axios';
import './CourseCard.css'; // Create this file for styles

const CourseCard = ({ course }) => {
  const handlePurchase = async () => {
    const token = localStorage.getItem('userToken');
    try {
      await axios.post(
        'http://localhost:3000/course/purchase', 
        { courseId: course._id }, 
        {
          headers: { token }
        }
      );
      alert('Course purchased successfully!');
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Error purchasing course. Please try again.');
    }
  };

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <p>Price: ${course.price}</p>
      <img src={course.imageUrl} alt={course.title} />
      <button className="buy-button" onClick={handlePurchase}>Buy Now</button>
    </div>
  );
};

export default CourseCard;
