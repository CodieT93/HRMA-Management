import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModernLoginPage.scss';

const ModernLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <i className="fas fa-users-cog"></i>
            </div>
            <h1 className="gradient-text">HR Management System</h1>
            <p>Welcome back! Please sign in to your account.</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary btn-login ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner-border spinner-border-sm"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Sign In
                </>
              )}
            </button>
          </form>
          
          <div className="login-footer">
            <p className="demo-info">
              <i className="fas fa-info-circle"></i>
              Demo: Use any email and password to test the system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoginPage;
