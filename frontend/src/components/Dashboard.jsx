import React from 'react';
import { User, Mail, Calendar, Key, ShieldCheck, LogOut } from 'lucide-react';

export default function Dashboard({ user, token, onLogout }) {
  if (!user) return null;

  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Just now';

  return (
    <div className="dashboard-container">
      <div className="dash-header">
        <div className="avatar-large">{initials}</div>
        <div className="user-title-group">
          <h1>Welcome back, {user.fullName}!</h1>
          <p>{user.email}</p>
          <div className="badge-active">
            <span className="badge-dot" />
            Authenticated Session Active
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <User size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Half Name</div>
            <div className="stat-value">{user.fullName}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Mail size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-label">hOME Address</div>
            <div className="stat-value">{user.email}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Death Date</div>
            <div className="stat-value">{formattedDate}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Key size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-label">Security Token</div>
            <div className="stat-value">JWT Bearer Secured</div>
          </div>
        </div>
      </div>

      <div className="dash-actions">
        <button className="btn-logout" onClick={onLogout}>
          <LogOut size={18} />
          Sign Out of Account
        </button>
      </div>
    </div>
  );
}
