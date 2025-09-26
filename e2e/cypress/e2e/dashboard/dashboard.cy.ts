describe('Dashboard', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/dashboard');
  });

  it('should display dashboard for admin user', () => {
    cy.get('h1').should('contain', 'Welcome back');
    cy.get('.stat-card').should('have.length', 4);
    
    // Check stat cards
    cy.get('.stat-card').eq(0).should('contain', 'Total Employees');
    cy.get('.stat-card').eq(1).should('contain', 'Active Employees');
    cy.get('.stat-card').eq(2).should('contain', 'Pending Leave Requests');
    cy.get('.stat-card').eq(3).should('contain', 'Upcoming Reviews');
  });

  it('should display recent hires section', () => {
    cy.get('h5').contains('Recent Hires').should('be.visible');
    cy.get('.list-group-item').should('exist');
  });

  it('should display recent leave requests section', () => {
    cy.get('h5').contains('Recent Leave Requests').should('be.visible');
  });

  it('should navigate to employees page from dashboard', () => {
    cy.get('a[href="/employees"]').click();
    cy.url().should('include', '/employees');
  });

  it('should navigate to leave requests page from dashboard', () => {
    cy.get('a[href="/leave-requests"]').click();
    cy.url().should('include', '/leave-requests');
  });

  it('should navigate to performance reviews page from dashboard', () => {
    cy.get('a[href="/performance-reviews"]').click();
    cy.url().should('include', '/performance-reviews');
  });

  it('should display user information in navbar', () => {
    cy.get('.navbar-brand').should('contain', 'HR Management');
    cy.get('#user-dropdown').should('be.visible');
    cy.get('#user-dropdown').should('contain', 'Admin User');
  });

  it('should logout successfully', () => {
    cy.get('#user-dropdown').click();
    cy.get('a').contains('Logout').click();
    cy.url().should('include', '/login');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('.navbar-toggler').should('be.visible');
    cy.get('.stat-card').should('be.visible');
  });

  it('should display correct stats for HR manager', () => {
    cy.logout();
    cy.loginAsHR();
    cy.visit('/dashboard');
    
    cy.get('h1').should('contain', 'Welcome back');
    cy.get('.stat-card').should('have.length', 4);
  });

  it('should display correct stats for manager', () => {
    cy.logout();
    cy.loginAsManager();
    cy.visit('/dashboard');
    
    cy.get('h1').should('contain', 'Welcome back');
    cy.get('.stat-card').should('have.length', 4);
  });

  it('should display correct stats for employee', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/dashboard');
    
    cy.get('h1').should('contain', 'Welcome back');
    cy.get('.stat-card').should('have.length', 4);
  });
});
