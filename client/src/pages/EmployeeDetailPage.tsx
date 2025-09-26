import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Tab, Tabs } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../types';
import { employeeApi } from '../api/employeeApi';
import './EmployeeDetailPage.scss';

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (employeeId: string) => {
    try {
      setIsLoading(true);
      const employeeData = await employeeApi.getEmployee(employeeId);
      setEmployee(employeeData);
    } catch (err: any) {
      setError('Failed to load employee details');
      console.error('Employee detail error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

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

  if (error || !employee) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error || 'Employee not found'}
        </Alert>
        <Button variant="outline-primary" onClick={() => navigate('/employees')}>
          Back to Employees
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/employees')}
                className="me-3"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Employees
              </Button>
              <h1 className="h3 mb-0 d-inline">
                {employee.firstName} {employee.lastName}
              </h1>
            </div>
            <div>
              <Button variant="outline-primary" className="me-2">
                <i className="bi bi-pencil me-2"></i>
                Edit
              </Button>
              <Button variant="primary">
                <i className="bi bi-download me-2"></i>
                Export
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          {/* Employee Profile Card */}
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="rounded-circle"
                    width="120"
                    height="120"
                  />
                ) : (
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '120px', height: '120px', fontSize: '2rem' }}>
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>
                )}
              </div>
              <h4>{employee.firstName} {employee.lastName}</h4>
              <p className="text-muted">{employee.position}</p>
              <Badge bg={employee.isActive ? 'success' : 'secondary'} className="mb-3">
                {employee.isActive ? 'Active' : 'Inactive'}
              </Badge>
              
              <div className="employee-info">
                <div className="info-item">
                  <i className="bi bi-envelope me-2"></i>
                  {employee.email}
                </div>
                {employee.phoneNumber && (
                  <div className="info-item">
                    <i className="bi bi-telephone me-2"></i>
                    {employee.phoneNumber}
                  </div>
                )}
                <div className="info-item">
                  <i className="bi bi-building me-2"></i>
                  {employee.department}
                </div>
                <div className="info-item">
                  <i className="bi bi-calendar me-2"></i>
                  Hired: {formatDate(employee.hireDate)}
                </div>
                <div className="info-item">
                  <i className="bi bi-currency-dollar me-2"></i>
                  {formatCurrency(employee.salary)}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Manager Information */}
          {employee.manager && (
            <Card>
              <Card.Header>
                <h6 className="mb-0">Manager</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="avatar me-3">
                    {employee.manager.profileImage ? (
                      <img
                        src={employee.manager.profileImage}
                        alt={`${employee.manager.firstName} ${employee.manager.lastName}`}
                        className="rounded-circle"
                        width="40"
                        height="40"
                      />
                    ) : (
                      <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        {employee.manager.firstName[0]}{employee.manager.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h6 className="mb-0">{employee.manager.firstName} {employee.manager.lastName}</h6>
                    <small className="text-muted">{employee.manager.position}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={8}>
          <Tabs defaultActiveKey="overview" className="mb-3">
            <Tab eventKey="overview" title="Overview">
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Employee Overview</h6>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h6>Personal Information</h6>
                      <div className="info-list">
                        <div className="info-item">
                          <strong>Employee ID:</strong> {employee.employeeId}
                        </div>
                        <div className="info-item">
                          <strong>Role:</strong> {employee.role}
                        </div>
                        {employee.address && (
                          <div className="info-item">
                            <strong>Address:</strong> {employee.address}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6>Employment Details</h6>
                      <div className="info-list">
                        <div className="info-item">
                          <strong>Position:</strong> {employee.position}
                        </div>
                        <div className="info-item">
                          <strong>Department:</strong> {employee.department}
                        </div>
                        <div className="info-item">
                          <strong>Hire Date:</strong> {formatDate(employee.hireDate)}
                        </div>
                        <div className="info-item">
                          <strong>Salary:</strong> {formatCurrency(employee.salary)}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {employee.skills && employee.skills.length > 0 && (
                    <div className="mt-4">
                      <h6>Skills</h6>
                      <div className="skills-list">
                        {employee.skills.map((skill, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="performance" title="Performance">
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Performance Reviews</h6>
                </Card.Header>
                <Card.Body>
                  {employee.performanceReviews && employee.performanceReviews.length > 0 ? (
                    <div className="performance-reviews">
                      {employee.performanceReviews.map((review) => (
                        <div key={review.id} className="review-item mb-3 p-3 border rounded">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{review.reviewPeriod}</h6>
                              <p className="text-muted mb-2">{review.comments}</p>
                              <div className="d-flex align-items-center">
                                <span className="me-3">Overall Rating: </span>
                                <div className="rating">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`bi bi-star${i < review.overallRating ? '-fill' : ''} text-warning`}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Badge bg="secondary">{review.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No performance reviews available.</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="leave" title="Leave History">
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Leave Requests</h6>
                </Card.Header>
                <Card.Body>
                  {employee.leaveRequests && employee.leaveRequests.length > 0 ? (
                    <div className="leave-requests">
                      {employee.leaveRequests.map((request) => (
                        <div key={request.id} className="leave-item mb-3 p-3 border rounded">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{request.leaveType}</h6>
                              <p className="text-muted mb-1">
                                {formatDate(request.startDate)} - {formatDate(request.endDate)}
                              </p>
                              <p className="mb-0">{request.reason}</p>
                            </div>
                            <Badge bg={
                              request.status === 'approved' ? 'success' :
                              request.status === 'pending' ? 'warning' : 'danger'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No leave requests found.</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetailPage;
