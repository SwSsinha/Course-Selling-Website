// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/course/preview');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;
