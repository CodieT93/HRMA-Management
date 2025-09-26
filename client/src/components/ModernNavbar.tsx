import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ModernNavbar.scss';

const ModernNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>HR Management System</h2>
        </div>
        
        <div className="navbar-nav">
          <Link to="/dashboard" className="nav-link">
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </Link>
          <Link to="/employees" className="nav-link">
            <i className="fas fa-users"></i>
            Employees
          </Link>
          <Link to="/leave-requests" className="nav-link">
            <i className="fas fa-calendar-alt"></i>
            Leave Requests
          </Link>
          <Link to="/performance" className="nav-link">
            <i className="fas fa-chart-line"></i>
            Performance
          </Link>
          <Link to="/settings" className="nav-link">
            <i className="fas fa-cog"></i>
            Settings
          </Link>
        </div>
        
        <div className="navbar-actions">
          <button onClick={handleLogout} className="btn btn-logout">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
