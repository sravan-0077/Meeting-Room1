import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { fetchCurrentUser } from './services/api';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('auth_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [activeView, setActiveView] = useState(token && user ? 'dashboard' : 'login');
  const [globalBanner, setGlobalBanner] = useState('');

  // Validate existing token on load
  useEffect(() => {
    if (token) {
      fetchCurrentUser(token)
        .then((userData) => {
          setUser(userData);
          localStorage.setItem('auth_user', JSON.stringify(userData));
        })
        .catch(() => {
          // Token expired or backend restarted
          handleLogout();
        });
    }
  }, [token]);

  const handleLoginSuccess = ({ token, user }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));
    setActiveView('dashboard');
    setGlobalBanner('');
  };

  const handleSignupSuccess = ({ token, user }) => {
    if (token && user) {
      handleLoginSuccess({ token, user });
    } else {
      setActiveView('login');
      setGlobalBanner('Registration successful! Please log in with your credentials.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setActiveView('login');
    setGlobalBanner('');
  };

  return (
    <div className="app-viewport">
      {/* Background Animated Gradient Orbs */}
      <div className="background-wrapper">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        currentUser={user}
        onLogout={handleLogout}
      />

      <main className="page-content">
        {activeView === 'dashboard' && user ? (
          <Dashboard user={user} token={token} onLogout={handleLogout} />
        ) : activeView === 'signup' ? (
          <Signup
            onSignupSuccess={handleSignupSuccess}
            switchToLogin={() => {
              setGlobalBanner('');
              setActiveView('login');
            }}
          />
        ) : (
          <Login
            onLoginSuccess={handleLoginSuccess}
            switchToSignup={() => {
              setGlobalBanner('');
              setActiveView('signup');
            }}
            initialSuccessMsg={globalBanner}
          />
        )}
      </main>
    </div>
  );
}
