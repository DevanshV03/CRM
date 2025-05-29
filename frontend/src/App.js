import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

// Example: Pass setUser to Login, Signup (to set user on login/signup success)
function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing gotoSignup={() => window.location.href = '/signup'} />} />
        <Route path="/signup" element={<Signup gotoLogin={() => window.location.href = '/login'} />} />
        <Route path="/login" element={<Login gotoSignup={() => window.location.href = '/signup'} setUser={setUser} />} />
        {/* Protected dashboard route */}
        <Route path="/dashboard" element={
          user
            ? <Dashboard user={user} />
            : <Navigate to="/login" replace />
        } />
        {/* Optional: catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
export default App;
