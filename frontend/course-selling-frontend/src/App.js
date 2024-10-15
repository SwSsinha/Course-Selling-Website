// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSignup from './components/UserSignup';
import UserSignin from './components/UserSignin';
import CourseList from './components/CourseList';
import CreateCourse from './components/CreateCourse';
import AdminSignup from './components/AdminSignup';
import AdminSignin from './components/AdminSignin';
import AdminDashboard from './components/AdminDashboard';
import UserPurchases from './components/UserPurchases';
import Header from './components/Header';


const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={ <CourseList />} />
                    <Route path="/signup" element={<UserSignup />} />
                    <Route path="/signin" element={<UserSignin />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/admin/create-course" element={<CreateCourse />} />
                    <Route path="/admin/signup" element={<AdminSignup />} />
                    <Route path="/admin/signin" element={<AdminSignin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/purchases" element={<UserPurchases />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
