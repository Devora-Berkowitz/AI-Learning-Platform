import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRegistration from '@/components/UserRegistration';
import LearningDashboard from '@/components/LearningDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import Login from '@/components/Login';
import Index from '@/pages/Index';
import About from '@/pages/AboutPage';
import Layout from '@/components/Layout';
import NotFound from '@/pages/NotFound';
import ScrollToTop from '@/components/ScrollToTop'; 

const App = () => {
  return (
    <>
      <ScrollToTop /> 
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learning" element={<LearningDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
