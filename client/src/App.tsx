import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import PerformanceReviewsPage from './pages/PerformanceReviewsPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.scss';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Container fluid className="main-content">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/:id" 
            element={
              <ProtectedRoute>
                <EmployeeDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leave-requests" 
            element={
              <ProtectedRoute>
                <LeaveRequestsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/performance-reviews" 
            element={
              <ProtectedRoute>
                <PerformanceReviewsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />} 
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
