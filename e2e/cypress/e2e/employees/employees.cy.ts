describe('Employees Management', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/employees');
  });

  it('should display employees page', () => {
    cy.get('h1').should('contain', 'Employees');
    cy.get('button').contains('Add Employee').should('be.visible');
  });

  it('should display employees table', () => {
    cy.get('table').should('be.visible');
    cy.get('thead th').should('have.length', 7);
    cy.get('thead th').eq(0).should('contain', 'Employee');
    cy.get('thead th').eq(1).should('contain', 'Position');
    cy.get('thead th').eq(2).should('contain', 'Department');
    cy.get('thead th').eq(3).should('contain', 'Hire Date');
    cy.get('thead th').eq(4).should('contain', 'Salary');
    cy.get('thead th').eq(5).should('contain', 'Status');
    cy.get('thead th').eq(6).should('contain', 'Actions');
  });

  it('should filter employees by department', () => {
    cy.get('select').first().select('Engineering');
    cy.get('table tbody tr').should('exist');
  });

  it('should filter employees by status', () => {
    cy.get('select').eq(1).select('active');
    cy.get('table tbody tr').should('exist');
  });

  it('should search employees', () => {
    cy.get('input[placeholder*="Search"]').type('John');
    cy.get('button[type="submit"]').click();
    cy.get('table tbody tr').should('exist');
  });

  it('should clear filters', () => {
    cy.get('select').first().select('Engineering');
    cy.get('button').contains('Clear').click();
    cy.get('select').first().should('have.value', '');
  });

  it('should navigate to employee detail page', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('View').click();
    });
    cy.url().should('include', '/employees/');
  });

  it('should display employee detail page', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('View').click();
    });
    
    cy.get('h1').should('contain', 'John');
    cy.get('.profile-card').should('be.visible');
    cy.get('.nav-tabs').should('be.visible');
  });

  it('should display employee overview tab', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('View').click();
    });
    
    cy.get('.nav-link').contains('Overview').click();
    cy.get('.info-list').should('be.visible');
  });

  it('should display employee performance tab', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('View').click();
    });
    
    cy.get('.nav-link').contains('Performance').click();
    cy.get('.performance-reviews').should('be.visible');
  });

  it('should display employee leave history tab', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('View').click();
    });
    
    cy.get('.nav-link').contains('Leave History').click();
    cy.get('.leave-requests').should('be.visible');
  });

  it('should show add employee button for admin', () => {
    cy.get('button').contains('Add Employee').should('be.visible');
  });

  it('should not show add employee button for employee role', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/employees');
    
    cy.get('button').contains('Add Employee').should('not.exist');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('table').should('be.visible');
    cy.get('.table-responsive').should('exist');
  });

  it('should handle empty state', () => {
    cy.get('input[placeholder*="Search"]').type('nonexistentemployee');
    cy.get('button[type="submit"]').click();
    
    cy.get('.empty-state').should('be.visible');
    cy.get('.empty-state').should('contain', 'No employees found');
  });
});
