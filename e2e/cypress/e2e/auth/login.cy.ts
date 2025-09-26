describe('Authentication - Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.get('h2').should('contain', 'HR Management');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.get('a[href="/forgot-password"]').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();
    
    // Check for validation messages
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-danger').should('be.visible');
    cy.get('.alert-danger').should('contain', 'Invalid credentials');
  });

  it('should login successfully as admin', () => {
    cy.get('input[name="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[name="password"]').type(Cypress.env('adminPassword'));
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome back');
  });

  it('should login successfully as HR manager', () => {
    cy.get('input[name="email"]').type(Cypress.env('hrEmail'));
    cy.get('input[name="password"]').type(Cypress.env('hrPassword'));
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome back');
  });

  it('should login successfully as manager', () => {
    cy.get('input[name="email"]').type(Cypress.env('managerEmail'));
    cy.get('input[name="password"]').type(Cypress.env('managerPassword'));
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome back');
  });

  it('should login successfully as employee', () => {
    cy.get('input[name="email"]').type(Cypress.env('employeeEmail'));
    cy.get('input[name="password"]').type(Cypress.env('employeePassword'));
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Welcome back');
  });

  it('should remember me functionality work', () => {
    cy.get('input[name="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[name="password"]').type(Cypress.env('adminPassword'));
    cy.get('input[name="rememberMe"]').check();
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    
    // Check if token is stored in localStorage
    cy.window().its('localStorage.token').should('exist');
  });

  it('should redirect to dashboard if already logged in', () => {
    cy.loginAsAdmin();
    cy.visit('/login');
    cy.url().should('include', '/dashboard');
  });

  it('should show loading state during login', () => {
    cy.get('input[name="email"]').type(Cypress.env('adminEmail'));
    cy.get('input[name="password"]').type(Cypress.env('adminPassword'));
    cy.get('button[type="submit"]').click();
    
    cy.get('button[type="submit"]').should('contain', 'Signing in...');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});
