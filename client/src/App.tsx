import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

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

// Navigation Component
const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav style={{ 
      backgroundColor: '#343a40', 
      padding: '15px 20px', 
      color: 'white',
      marginBottom: '0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>HR Management System</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link to="/employees" style={{ color: 'white', textDecoration: 'none' }}>Employees</Link>
          <Link to="/leave-requests" style={{ color: 'white', textDecoration: 'none' }}>Leave Requests</Link>
          <Link to="/performance" style={{ color: 'white', textDecoration: 'none' }}>Performance</Link>
          <Link to="/settings" style={{ color: 'white', textDecoration: 'none' }}>Settings</Link>
          <button 
            onClick={handleLogout}
            style={{ 
              backgroundColor: '#dc3545', 
              color: 'white', 
              border: 'none', 
              padding: '8px 16px', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

// Login Page
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center',
      maxWidth: '400px',
      margin: '50px auto',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h1 style={{ color: '#333', marginBottom: '10px' }}>HR Management System</h1>
      <h2 style={{ color: '#666', marginBottom: '30px' }}>Login</h2>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            width: '100%',
            padding: '12px', 
            fontSize: '16px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
      
      <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
        Demo: Use any email and password to test
      </p>
    </div>
  );
};

// Dashboard Page
const DashboardPage = () => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ color: '#333' }}>Dashboard</h1>
    <p style={{ color: '#666' }}>Welcome to the HR Management System Dashboard!</p>
    
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '20px',
      marginTop: '30px'
    }}>
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        border: '1px solid #bbdefb'
      }}>
        <h3>Total Employees</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>150</p>
      </div>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f3e5f5', 
        borderRadius: '8px',
        border: '1px solid #ce93d8'
      }}>
        <h3>Pending Leave Requests</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>12</p>
      </div>
      
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '8px',
        border: '1px solid #a5d6a7'
      }}>
        <h3>Upcoming Reviews</h3>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>8</p>
      </div>
    </div>

    <div style={{ marginTop: '40px' }}>
      <h2>Recent Activity</h2>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>John Doe submitted a leave request</li>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>Jane Smith's performance review was completed</li>
          <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>New employee Mike Johnson was added</li>
        </ul>
      </div>
    </div>
  </div>
);

// Employees Page
const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedDepartment === '' || emp.department === selectedDepartment)
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>Employees</h1>
        <button style={{ 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add Employee
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            flex: 1
          }}
        />
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
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
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Department</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Position</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{emp.name}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{emp.email}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{emp.department}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{emp.position}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                  <span style={{ 
                    backgroundColor: '#d4edda', 
                    color: '#155724', 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {emp.status}
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

// Leave Requests Page
const LeaveRequestsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredRequests = mockLeaveRequests.filter(req => 
    selectedStatus === '' || req.status === selectedStatus
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>Leave Requests</h1>
        <button style={{ 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          New Request
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
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
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Leave Type</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Start Date</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>End Date</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(req => (
              <tr key={req.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{req.employee}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{req.type}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{req.startDate}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>{req.endDate}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                  <span style={{ 
                    backgroundColor: req.status === 'Approved' ? '#d4edda' : req.status === 'Pending' ? '#fff3cd' : '#f8d7da',
                    color: req.status === 'Approved' ? '#155724' : req.status === 'Pending' ? '#856404' : '#721c24',
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                  {req.status === 'Pending' && (
                    <>
                      <button style={{ 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '5px'
                      }}>
                        Approve
                      </button>
                      <button style={{ 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        padding: '6px 12px', 
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}>
                        Reject
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
  );
};

// Performance Reviews Page
const PerformanceReviewsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredReviews = mockPerformanceReviews.filter(review => 
    selectedStatus === '' || review.status === selectedStatus
  );

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333' }}>Performance Reviews</h1>
        <button style={{ 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          New Review
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        >
          <option value="">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
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
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Settings</h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '8px',
        border: '1px solid #ddd',
        maxWidth: '600px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Company Name</label>
          <input
            type="text"
            value={settings.companyName}
            onChange={(e) => setSettings({...settings, companyName: e.target.value})}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
              style={{ marginRight: '10px' }}
            />
            Enable Email Notifications
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoApproveLeave}
              onChange={(e) => setSettings({...settings, autoApproveLeave: e.target.checked})}
              style={{ marginRight: '10px' }}
            />
            Auto-approve Leave Requests
          </label>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Review Reminder (Days)</label>
          <input
            type="number"
            value={settings.reviewReminderDays}
            onChange={(e) => setSettings({...settings, reviewReminderDays: parseInt(e.target.value)})}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <button 
          onClick={handleSave}
          style={{ 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            padding: '12px 24px', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Save Settings
        </button>
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
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 70px)', backgroundColor: '#f8f9fa' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
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
