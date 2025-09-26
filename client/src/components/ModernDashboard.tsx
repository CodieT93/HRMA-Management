import React from 'react';
import './ModernDashboard.scss';

const ModernDashboard: React.FC = () => {
  const stats = [
    {
      icon: 'fas fa-users',
      number: '150',
      label: 'Total Employees',
      color: 'primary',
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: 'fas fa-calendar-times',
      number: '12',
      label: 'Pending Leave Requests',
      color: 'warning',
      change: '+3',
      changeType: 'neutral'
    },
    {
      icon: 'fas fa-chart-line',
      number: '8',
      label: 'Upcoming Reviews',
      color: 'info',
      change: '-2',
      changeType: 'negative'
    },
    {
      icon: 'fas fa-user-check',
      number: '142',
      label: 'Active Employees',
      color: 'success',
      change: '+5%',
      changeType: 'positive'
    }
  ];

  const recentActivities = [
    {
      icon: 'fas fa-user-plus',
      title: 'New employee added',
      description: 'Mike Johnson joined the Engineering team',
      time: '2 hours ago',
      type: 'success'
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Leave request approved',
      description: 'Jane Smith\'s vacation request was approved',
      time: '4 hours ago',
      type: 'info'
    },
    {
      icon: 'fas fa-star',
      title: 'Performance review completed',
      description: 'John Doe\'s Q3 review was finalized',
      time: '6 hours ago',
      type: 'warning'
    },
    {
      icon: 'fas fa-bell',
      title: 'System maintenance',
      description: 'Scheduled maintenance completed successfully',
      time: '1 day ago',
      type: 'primary'
    }
  ];

  return (
    <div className="modern-dashboard">
      <div className="page-container">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Welcome back! Here's what's happening with your HR management system.</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card stat-card-${stat.color} fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-change stat-change-${stat.changeType}`}>
                  <i className={`fas fa-arrow-${stat.changeType === 'positive' ? 'up' : stat.changeType === 'negative' ? 'down' : 'right'}`}></i>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="content-grid">
          <div className="main-content-section">
            <div className="card">
              <div className="card-header">
                <h3>Recent Activity</h3>
                <button className="btn btn-secondary btn-sm">View All</button>
              </div>
              <div className="card-body">
                <div className="activity-list">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className={`activity-item activity-${activity.type} slide-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="activity-icon">
                        <i className={activity.icon}></i>
                      </div>
                      <div className="activity-content">
                        <div className="activity-title">{activity.title}</div>
                        <div className="activity-description">{activity.description}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-content">
            <div className="card">
              <div className="card-header">
                <h3>Quick Actions</h3>
              </div>
              <div className="card-body">
                <div className="quick-actions">
                  <button className="quick-action-btn">
                    <i className="fas fa-user-plus"></i>
                    <span>Add Employee</span>
                  </button>
                  <button className="quick-action-btn">
                    <i className="fas fa-calendar-plus"></i>
                    <span>New Leave Request</span>
                  </button>
                  <button className="quick-action-btn">
                    <i className="fas fa-chart-bar"></i>
                    <span>Performance Review</span>
                  </button>
                  <button className="quick-action-btn">
                    <i className="fas fa-download"></i>
                    <span>Export Data</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>System Status</h3>
              </div>
              <div className="card-body">
                <div className="status-list">
                  <div className="status-item">
                    <div className="status-indicator status-online"></div>
                    <span>Database</span>
                    <span className="status-value">Online</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator status-online"></div>
                    <span>API Services</span>
                    <span className="status-value">Online</span>
                  </div>
                  <div className="status-item">
                    <div className="status-indicator status-warning"></div>
                    <span>Backup</span>
                    <span className="status-value">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;
