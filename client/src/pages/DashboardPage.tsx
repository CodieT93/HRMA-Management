import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { DashboardStats } from '../types';
import { employeeApi } from '../api/employeeApi';
import './DashboardPage.scss';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you'd have a dedicated dashboard API endpoint
        const [employeeStats, recentHires, recentLeaveRequests] = await Promise.all([
          employeeApi.getEmployeeStats(),
          employeeApi.getEmployees({}, 1, 5),
          // leaveApi.getRecentLeaveRequests(),
        ]);

        setStats({
          totalEmployees: employeeStats.total,
          activeEmployees: employeeStats.active,
          pendingLeaveRequests: 0, // Would come from leave API
          upcomingReviews: 0, // Would come from performance API
          recentHires: recentHires.data,
          recentLeaveRequests: [],
        });
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted">Here's what's happening in your organization today.</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-primary">
                <i className="bi bi-people"></i>
              </div>
              <h3 className="stat-number">{stats?.totalEmployees || 0}</h3>
              <p className="stat-label">Total Employees</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-success">
                <i className="bi bi-person-check"></i>
              </div>
              <h3 className="stat-number">{stats?.activeEmployees || 0}</h3>
              <p className="stat-label">Active Employees</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-warning">
                <i className="bi bi-calendar-event"></i>
              </div>
              <h3 className="stat-number">{stats?.pendingLeaveRequests || 0}</h3>
              <p className="stat-label">Pending Leave Requests</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-info">
                <i className="bi bi-clipboard-check"></i>
              </div>
              <h3 className="stat-number">{stats?.upcomingReviews || 0}</h3>
              <p className="stat-label">Upcoming Reviews</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Hires</h5>
            </Card.Header>
            <Card.Body>
              {stats?.recentHires && stats.recentHires.length > 0 ? (
                <div className="list-group list-group-flush">
                  {stats.recentHires.map((employee) => (
                    <div key={employee.id} className="list-group-item px-0">
                      <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                          {employee.profileImage ? (
                            <img
                              src={employee.profileImage}
                              alt={`${employee.firstName} ${employee.lastName}`}
                              className="rounded-circle"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                              {employee.firstName[0]}{employee.lastName[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <h6 className="mb-0">{employee.firstName} {employee.lastName}</h6>
                          <small className="text-muted">{employee.position} • {employee.department}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No recent hires</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Leave Requests</h5>
            </Card.Header>
            <Card.Body>
              {stats?.recentLeaveRequests && stats.recentLeaveRequests.length > 0 ? (
                <div className="list-group list-group-flush">
                  {stats.recentLeaveRequests.map((request) => (
                    <div key={request.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">{request.employee?.firstName} {request.employee?.lastName}</h6>
                          <small className="text-muted">{request.leaveType} • {request.daysRequested} days</small>
                        </div>
                        <span className={`badge bg-${request.status === 'pending' ? 'warning' : request.status === 'approved' ? 'success' : 'danger'}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No recent leave requests</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
