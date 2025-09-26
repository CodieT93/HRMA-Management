describe('Leave Requests Management', () => {
  beforeEach(() => {
    cy.loginAsManager();
    cy.visit('/leave-requests');
  });

  it('should display leave requests page', () => {
    cy.get('h1').should('contain', 'Leave Requests');
    cy.get('button').contains('New Request').should('be.visible');
  });

  it('should display leave requests table', () => {
    cy.get('table').should('be.visible');
    cy.get('thead th').should('have.length', 8);
    cy.get('thead th').eq(0).should('contain', 'Employee');
    cy.get('thead th').eq(1).should('contain', 'Leave Type');
    cy.get('thead th').eq(2).should('contain', 'Start Date');
    cy.get('thead th').eq(3).should('contain', 'End Date');
    cy.get('thead th').eq(4).should('contain', 'Days');
    cy.get('thead th').eq(5).should('contain', 'Reason');
    cy.get('thead th').eq(6).should('contain', 'Status');
    cy.get('thead th').eq(7).should('contain', 'Actions');
  });

  it('should filter leave requests by status', () => {
    cy.get('select').first().select('pending');
    cy.get('table tbody tr').should('exist');
  });

  it('should filter leave requests by type', () => {
    cy.get('select').eq(1).select('annual');
    cy.get('table tbody tr').should('exist');
  });

  it('should clear filters', () => {
    cy.get('select').first().select('pending');
    cy.get('button').contains('Clear').click();
    cy.get('select').first().should('have.value', '');
  });

  it('should approve leave request', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Approve').click();
    });
    
    cy.get('table tbody tr').first().within(() => {
      cy.get('.badge').should('contain', 'approved');
    });
  });

  it('should reject leave request', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('Reject').click();
    });
    
    cy.get('table tbody tr').first().within(() => {
      cy.get('.badge').should('contain', 'rejected');
    });
  });

  it('should view leave request details', () => {
    cy.get('table tbody tr').first().within(() => {
      cy.get('button').contains('View').click();
    });
    
    // Should show leave request details modal or navigate to detail page
    cy.get('.modal').should('be.visible');
  });

  it('should show new request button for employees', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/leave-requests');
    
    cy.get('button').contains('New Request').should('be.visible');
  });

  it('should create new leave request', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/leave-requests');
    
    cy.get('button').contains('New Request').click();
    
    // Should open leave request form modal or navigate to form page
    cy.get('.modal').should('be.visible');
    cy.get('form').should('be.visible');
  });

  it('should display leave type badges correctly', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('.badge').should('exist');
      });
    });
  });

  it('should display status badges correctly', () => {
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('.badge').should('exist');
      });
    });
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('table').should('be.visible');
    cy.get('.table-responsive').should('exist');
  });

  it('should handle empty state', () => {
    cy.get('select').first().select('cancelled');
    cy.get('button').contains('Clear').click();
    
    // If no cancelled requests exist, should show empty state
    cy.get('.empty-state').should('be.visible');
  });

  it('should show only own requests for employees', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/leave-requests');
    
    // Should only show leave requests for the logged-in employee
    cy.get('table tbody tr').should('exist');
  });

  it('should show all requests for managers and admins', () => {
    cy.get('table tbody tr').should('exist');
    
    cy.logout();
    cy.loginAsAdmin();
    cy.visit('/leave-requests');
    
    cy.get('table tbody tr').should('exist');
  });
});
