describe('Performance Reviews Management', () => {
  beforeEach(() => {
    cy.loginAsManager();
    cy.visit('/performance-reviews');
  });

  it('should display performance reviews page', () => {
    cy.get('h1').should('contain', 'Performance Reviews');
    cy.get('button').contains('New Review').should('be.visible');
  });

  it('should display performance reviews grid', () => {
    cy.get('.reviews-grid').should('be.visible');
    cy.get('.review-card').should('exist');
  });

  it('should display review cards with correct information', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('.card-header h6').should('exist');
      cy.get('.card-header small').should('exist');
      cy.get('.badge').should('exist');
      cy.get('.rating').should('exist');
      cy.get('h6').contains('Goals Progress').should('exist');
      cy.get('h6').contains('Achievements').should('exist');
      cy.get('h6').contains('Areas for Improvement').should('exist');
    });
  });

  it('should filter reviews by status', () => {
    cy.get('select').select('completed');
    cy.get('.review-card').should('exist');
  });

  it('should clear filters', () => {
    cy.get('select').select('completed');
    cy.get('button').contains('Clear').click();
    cy.get('select').should('have.value', '');
  });

  it('should display rating stars correctly', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('.rating i').should('exist');
    });
  });

  it('should display progress bars for goals', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('.progress').should('exist');
      cy.get('.progress-bar').should('exist');
    });
  });

  it('should show view and edit buttons', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('button').contains('View').should('exist');
      cy.get('button').contains('Edit').should('exist');
    });
  });

  it('should create new performance review', () => {
    cy.get('button').contains('New Review').click();
    
    // Should open performance review form modal or navigate to form page
    cy.get('.modal').should('be.visible');
    cy.get('form').should('be.visible');
  });

  it('should show new review button for managers and admins', () => {
    cy.get('button').contains('New Review').should('be.visible');
    
    cy.logout();
    cy.loginAsAdmin();
    cy.visit('/performance-reviews');
    
    cy.get('button').contains('New Review').should('be.visible');
  });

  it('should not show new review button for employees', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/performance-reviews');
    
    cy.get('button').contains('New Review').should('not.exist');
  });

  it('should show only own reviews for employees', () => {
    cy.logout();
    cy.loginAsEmployee();
    cy.visit('/performance-reviews');
    
    // Should only show performance reviews for the logged-in employee
    cy.get('.review-card').should('exist');
  });

  it('should show all reviews for managers and admins', () => {
    cy.get('.review-card').should('exist');
    
    cy.logout();
    cy.loginAsAdmin();
    cy.visit('/performance-reviews');
    
    cy.get('.review-card').should('exist');
  });

  it('should display status badges correctly', () => {
    cy.get('.review-card').each(($card) => {
      cy.wrap($card).within(() => {
        cy.get('.badge').should('exist');
      });
    });
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('.reviews-grid').should('be.visible');
    cy.get('.review-card').should('be.visible');
  });

  it('should handle empty state', () => {
    cy.get('select').select('draft');
    cy.get('button').contains('Clear').click();
    
    // If no draft reviews exist, should show empty state
    cy.get('.empty-state').should('be.visible');
  });

  it('should display review period and employee information', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('.card-header h6').should('contain', 'Q4 2023');
      cy.get('.card-header small').should('contain', 'John Doe');
    });
  });

  it('should display achievements and areas for improvement', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('ul').should('exist');
      cy.get('li').should('exist');
    });
  });

  it('should display comments section', () => {
    cy.get('.review-card').first().within(() => {
      cy.get('h6').contains('Comments').should('exist');
      cy.get('p').should('exist');
    });
  });
});
