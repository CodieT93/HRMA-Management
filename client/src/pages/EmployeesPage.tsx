import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Spinner, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Employee, EmployeeFilters } from '../types';
import { employeeApi } from '../api/employeeApi';
import './EmployeesPage.scss';

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<EmployeeFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, [filters]);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await employeeApi.getEmployees(filters);
      setEmployees(response.data);
    } catch (err: any) {
      setError('Failed to load employees');
      console.error('Employees error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  const handleFilterChange = (key: keyof EmployeeFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  const getStatusBadge = (isActive: boolean) => {
    return (
      <Badge bg={isActive ? 'success' : 'secondary'}>
        {isActive ? 'Active' : 'Inactive'}
      </Badge>
    );
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

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-0">Employees</h1>
              <p className="text-muted">Manage your organization's employees</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/employees/new')}>
              <i className="bi bi-plus-lg me-2"></i>
              Add Employee
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
            <Col md={4}>
              <Form onSubmit={handleSearch}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline-secondary" type="submit">
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filters.department || ''}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setFilters({});
                  setSearchTerm('');
                }}
                className="w-100"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Employees Table */}
      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Hire Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
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
                        <small className="text-muted">{employee.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{formatDate(employee.hireDate)}</td>
                  <td>{formatCurrency(employee.salary)}</td>
                  <td>{getStatusBadge(employee.isActive)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => navigate(`/employees/${employee.id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {employees.length === 0 && !isLoading && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-people text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No employees found</h5>
            <p className="text-muted">Try adjusting your search criteria or add a new employee.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EmployeesPage;
