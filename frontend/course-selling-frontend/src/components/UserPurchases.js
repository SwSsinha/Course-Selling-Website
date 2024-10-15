// src/components/UserPurchases.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const UserPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const token = localStorage.getItem('userToken');
      try {
        const response = await axios.post(
          'http://localhost:3000/user/purchases',
          {},
          {
            headers: { token }
          }
        );
        setPurchases(response.data.purchases);
        setCourseData(response.data.courseData);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div>
      <h2>Your Purchases</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {courseData.length > 0 ? (
          courseData.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <p>No purchased courses available.</p>
        )}
      </div>
    </div>
  );
};

export default UserPurchases;
