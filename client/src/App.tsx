import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ModernNavbar from './components/ModernNavbar';
import ModernLoginPage from './components/ModernLoginPage';
import ModernDashboard from './components/ModernDashboard';

// Mock data for testing
const mockEmployees = [
  { id: '1', name: 'John Doe', email: 'john@company.com', department: 'Engineering', position: 'Senior Developer', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@company.com', department: 'Marketing', position: 'Marketing Manager', status: 'Active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@company.com', department: 'HR', position: 'HR Specialist', status: 'Active' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@company.com', department: 'Finance', position: 'Financial Analyst', status: 'Active' },
];

const mockLeaveRequests = [
  { id: '1', employee: 'John Doe', type: 'Annual Leave', startDate: '2025-10-01', endDate: '2025-10-05', status: 'Pending' },
  { id: '2', employee: 'Jane Smith', type: 'Sick Leave', startDate: '2025-09-28', endDate: '2025-09-30', status: 'Approved' },
  { id: '3', employee: 'Mike Johnson', type: 'Personal Leave', startDate: '2025-10-10', endDate: '2025-10-12', status: 'Pending' },
];

const mockPerformanceReviews = [
  { id: '1', employee: 'John Doe', period: 'Q3 2025', rating: 4.5, status: 'Completed' },
  { id: '2', employee: 'Jane Smith', period: 'Q3 2025', rating: 4.8, status: 'In Progress' },
  { id: '3', employee: 'Mike Johnson', period: 'Q3 2025', rating: 4.2, status: 'Draft' },
];

// Legacy components removed - using ModernNavbar instead

// Legacy LoginPage removed - using ModernLoginPage instead

// Legacy DashboardPage removed - using ModernDashboard instead

// Employees Page
const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment === '' || emp.department === selectedDepartment)
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Employees</h1>
        <p>Manage your organization's employees</p>
      </div>
      
      <div className="action-bar">
        <div className="filters-section">
          <input
            type="text"
            className="form-control"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className="form-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
        <button className="btn btn-success">
          <i className="fas fa-plus"></i>
          Add Employee
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>
                      <span className="badge badge-success">
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-primary btn-sm" style={{ marginRight: '5px' }}>
                        <i className="fas fa-eye"></i> View
                      </button>
                      <button className="btn btn-secondary btn-sm">
                        <i className="fas fa-edit"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Leave Requests Page
const LeaveRequestsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredRequests = mockLeaveRequests.filter(req => 
    selectedStatus === '' || req.status === selectedStatus
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Leave Requests</h1>
        <p>Manage employee leave requests and approvals</p>
      </div>
      
      <div className="action-bar">
        <div className="filters-section">
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button className="btn btn-success">
          <i className="fas fa-plus"></i>
          New Request
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(req => (
                  <tr key={req.id}>
                    <td>{req.employee}</td>
                    <td>{req.type}</td>
                    <td>{req.startDate}</td>
                    <td>{req.endDate}</td>
                    <td>
                      <span className={`badge ${
                        req.status === 'Approved' ? 'badge-success' : 
                        req.status === 'Rejected' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      {req.status === 'Pending' && (
                        <>
                          <button className="btn btn-success btn-sm" style={{ marginRight: '5px' }}>
                            <i className="fas fa-check"></i> Approve
                          </button>
                          <button className="btn btn-danger btn-sm">
                            <i className="fas fa-times"></i> Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Reviews Page
const PerformanceReviewsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredReviews = mockPerformanceReviews.filter(review => 
    selectedStatus === '' || review.status === selectedStatus
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Performance Reviews</h1>
        <p>Manage employee performance reviews and evaluations</p>
      </div>
      
      <div className="action-bar">
        <div className="filters-section">
          <select
            className="form-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button className="btn btn-success">
          <i className="fas fa-plus"></i>
          New Review
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px',
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Employee</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Review Period</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Rating</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map(review => (
              <tr key={review.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{review.employee}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{review.period}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '10px' }}>{review.rating}/5</span>
                    <div style={{ 
                      width: '100px', 
                      height: '8px', 
                      backgroundColor: '#e9ecef', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${(review.rating / 5) * 100}%`, 
                        height: '100%', 
                        backgroundColor: '#28a745' 
                      }}></div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                  <span style={{ 
                    backgroundColor: review.status === 'Completed' ? '#d4edda' : review.status === 'In Progress' ? '#fff3cd' : '#e2e3e5',
                    color: review.status === 'Completed' ? '#155724' : review.status === 'In Progress' ? '#856404' : '#6c757d',
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {review.status}
                  </span>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                  <button style={{ 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '5px'
                  }}>
                    View
                  </button>
                  <button style={{ 
                    backgroundColor: '#ffc107', 
                    color: 'black', 
                    border: 'none', 
                    padding: '6px 12px', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Settings Page
const SettingsPage = () => {
  const [settings, setSettings] = useState({
    companyName: 'HR Management System',
    emailNotifications: true,
    autoApproveLeave: false,
    reviewReminderDays: 30
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your HR management system preferences</p>
      </div>
      
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              value={settings.companyName}
              onChange={(e) => setSettings({...settings, companyName: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              />
              <span className="form-check-label">Enable Email Notifications</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={settings.autoApproveLeave}
                onChange={(e) => setSettings({...settings, autoApproveLeave: e.target.checked})}
              />
              <span className="form-check-label">Auto-approve Leave Requests</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Review Reminder (Days)</label>
            <input
              type="number"
              className="form-control"
              value={settings.reviewReminderDays}
              onChange={(e) => setSettings({...settings, reviewReminderDays: parseInt(e.target.value)})}
            />
          </div>

          <button
            onClick={handleSave}
            className="btn btn-primary"
          >
            <i className="fas fa-save"></i> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <ModernNavbar />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<ModernLoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <ModernDashboard />
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
              path="/leave-requests" 
              element={
                <ProtectedRoute>
                  <LeaveRequestsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/performance" 
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
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
