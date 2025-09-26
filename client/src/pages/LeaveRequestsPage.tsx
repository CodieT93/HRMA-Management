import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { LeaveRequest, LeaveRequestFilters, LeaveStatus, LeaveType } from '../types';
import './LeaveRequestsPage.scss';

const LeaveRequestsPage: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<LeaveRequestFilters>({});

  useEffect(() => {
    fetchLeaveRequests();
  }, [filters]);

  const fetchLeaveRequests = async () => {
    try {
      setIsLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockRequests: LeaveRequest[] = [
        {
          id: '1',
          employeeId: 'emp1',
          leaveType: LeaveType.ANNUAL,
          startDate: '2024-01-15',
          endDate: '2024-01-20',
          daysRequested: 5,
          reason: 'Family vacation',
          status: LeaveStatus.PENDING,
          submittedAt: '2024-01-10T10:00:00Z',
        },
        {
          id: '2',
          employeeId: 'emp2',
          leaveType: LeaveType.SICK,
          startDate: '2024-01-12',
          endDate: '2024-01-12',
          daysRequested: 1,
          reason: 'Medical appointment',
          status: LeaveStatus.APPROVED,
          submittedAt: '2024-01-11T09:00:00Z',
          reviewedAt: '2024-01-11T14:00:00Z',
        },
      ];
      setLeaveRequests(mockRequests);
    } catch (err: any) {
      setError('Failed to load leave requests');
      console.error('Leave requests error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof LeaveRequestFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const variants = {
      [LeaveStatus.PENDING]: 'warning',
      [LeaveStatus.APPROVED]: 'success',
      [LeaveStatus.REJECTED]: 'danger',
      [LeaveStatus.CANCELLED]: 'secondary',
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getLeaveTypeBadge = (type: LeaveType) => {
    const variants = {
      [LeaveType.ANNUAL]: 'primary',
      [LeaveType.SICK]: 'info',
      [LeaveType.PERSONAL]: 'secondary',
      [LeaveType.MATERNITY]: 'success',
      [LeaveType.PATERNITY]: 'success',
      [LeaveType.BEREAVEMENT]: 'dark',
      [LeaveType.UNPAID]: 'warning',
    };
    return <Badge bg={variants[type]}>{type}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleApprove = (id: string) => {
    // In real app, this would make an API call
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status: LeaveStatus.APPROVED, reviewedAt: new Date().toISOString() }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    // In real app, this would make an API call
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status: LeaveStatus.REJECTED, reviewedAt: new Date().toISOString() }
          : req
      )
    );
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

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Leave Requests</h1>
              <p className="text-muted">Manage employee leave requests</p>
            </div>
            <Button variant="primary">
              <i className="bi bi-plus-lg me-2"></i>
              New Request
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={3}>
              <Form.Select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value={LeaveStatus.PENDING}>Pending</option>
                <option value={LeaveStatus.APPROVED}>Approved</option>
                <option value={LeaveStatus.REJECTED}>Rejected</option>
                <option value={LeaveStatus.CANCELLED}>Cancelled</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filters.leaveType || ''}
                onChange={(e) => handleFilterChange('leaveType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value={LeaveType.ANNUAL}>Annual</option>
                <option value={LeaveType.SICK}>Sick</option>
                <option value={LeaveType.PERSONAL}>Personal</option>
                <option value={LeaveType.MATERNITY}>Maternity</option>
                <option value={LeaveType.PATERNITY}>Paternity</option>
                <option value={LeaveType.BEREAVEMENT}>Bereavement</option>
                <option value={LeaveType.UNPAID}>Unpaid</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-secondary"
                onClick={() => setFilters({})}
                className="w-100"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">john.doe@company.com</small>
                    </div>
                  </td>
                  <td>{getLeaveTypeBadge(request.leaveType)}</td>
                  <td>{formatDate(request.startDate)}</td>
                  <td>{formatDate(request.endDate)}</td>
                  <td>{request.daysRequested}</td>
                  <td>{request.reason}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>
                    {request.status === LeaveStatus.PENDING && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {request.status !== LeaveStatus.PENDING && (
                      <Button variant="outline-primary" size="sm">
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {leaveRequests.length === 0 && !isLoading && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-calendar-event text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No leave requests found</h5>
            <p className="text-muted">Try adjusting your search criteria.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default LeaveRequestsPage;
