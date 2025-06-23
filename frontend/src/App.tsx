// import React, { useState } from 'react';
// import { Routes, Route, useNavigate } from 'react-router-dom';
// import UserRegistration from '@/components/UserRegistration';
// import LearningDashboard from '@/components/LearningDashboard';
// import AdminDashboard from '@/components/AdminDashboard';
// import Login from '@/components/Login';
// import Index from '@/pages/Index';
// import NotFound from '@/pages/NotFound';
// import { User } from '@/types/types';

// const App = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();

//   const handleUserRegistered = (newUser: User) => {
//     setUser(newUser);
//     localStorage.setItem('learning_platform_current_user', JSON.stringify(newUser));
//     navigate('/learning');
//   };

//   const handleLoginSuccess = (loggedInUser: User) => {
//     setUser(loggedInUser);
//     localStorage.setItem('learning_platform_current_user', JSON.stringify(loggedInUser));
//     if (loggedInUser.isAdmin) {
//       navigate('/admin');
//     } else {
//       navigate('/learning');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('learning_platform_current_user');
//     setUser(null);
//     navigate('/');
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Index />} />
//       <Route path="/register" element={<UserRegistration onUserRegistered={handleUserRegistered} />} />
//       <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} onBackToHome={() => navigate('/')} />} />
//       <Route path="/learning" element={user ? <LearningDashboard user={user} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} onBackToHome={() => navigate('/')} />} />
//       <Route path="/admin" element={<AdminDashboard onBack={() => navigate('/')} />} />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRegistration from '@/components/UserRegistration';
import LearningDashboard from '@/components/LearningDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import Login from '@/components/Login';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/register" element={<UserRegistration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/learning" element={<LearningDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;