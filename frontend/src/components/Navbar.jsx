import React from 'react';
import { ShieldCheck, LogIn, UserPlus, LogOut } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand-logo" onClick={() => setActiveView(currentUser ? 'dashboard' : 'login')}>
        <div className="brand-icon">
          <ShieldCheck size={22} />
        </div>
        <span>AuthVault</span>
      </div>

      <nav className="nav-controls">
        {currentUser ? (
          <>
            <button className="nav-btn nav-btn-ghost" onClick={() => setActiveView('dashboard')}>
              Dashboard
            </button>
            <button className="nav-btn btn-logout" onClick={onLogout} style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className={`nav-btn ${activeView === 'login' ? 'nav-btn-primary' : 'nav-btn-ghost'}`}
              onClick={() => setActiveView('login')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LogIn size={16} />
                Sign In
              </span>
            </button>

            <button
              className={`nav-btn ${activeView === 'signup' ? 'nav-btn-primary' : 'nav-btn-ghost'}`}
              onClick={() => setActiveView('signup')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserPlus size={16} />
                Create Account
              </span>
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
