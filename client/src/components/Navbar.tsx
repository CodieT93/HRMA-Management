import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.scss';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <BootstrapNavbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
      <Container fluid>
        <BootstrapNavbar.Brand 
          href="/dashboard" 
          className="fw-bold"
        >
          HR Management
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="/dashboard" 
              className={isActive('/dashboard') ? 'active' : ''}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link 
              href="/employees" 
              className={isActive('/employees') ? 'active' : ''}
            >
              Employees
            </Nav.Link>
            <Nav.Link 
              href="/leave-requests" 
              className={isActive('/leave-requests') ? 'active' : ''}
            >
              Leave Requests
            </Nav.Link>
            <Nav.Link 
              href="/performance-reviews" 
              className={isActive('/performance-reviews') ? 'active' : ''}
            >
              Performance
            </Nav.Link>
          </Nav>
          
          <Nav>
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                <i className="bi bi-person-circle me-2"></i>
                {user?.firstName} {user?.lastName}
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                  <i className="bi bi-person me-2"></i>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="/settings">
                  <i className="bi bi-gear me-2"></i>
                  Settings
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
