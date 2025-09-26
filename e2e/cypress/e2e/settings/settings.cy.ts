describe('Settings Page', () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    cy.visit('/settings');
  });

  it('should display settings page', () => {
    cy.get('h1').should('contain', 'Settings');
    cy.get('p').should('contain', 'Manage your account settings and preferences');
  });

  it('should display settings sidebar', () => {
    cy.get('.list-group').should('be.visible');
    cy.get('.list-group-item').should('have.length', 4);
    cy.get('.list-group-item').eq(0).should('contain', 'Profile');
    cy.get('.list-group-item').eq(1).should('contain', 'Password');
    cy.get('.list-group-item').eq(2).should('contain', 'Notifications');
    cy.get('.list-group-item').eq(3).should('contain', 'Preferences');
  });

  it('should display profile tab by default', () => {
    cy.get('.list-group-item').eq(0).should('have.class', 'active');
    cy.get('h5').should('contain', 'Profile Information');
  });

  it('should switch to password tab', () => {
    cy.get('.list-group-item').eq(1).click();
    cy.get('.list-group-item').eq(1).should('have.class', 'active');
    cy.get('h5').should('contain', 'Change Password');
  });

  it('should switch to notifications tab', () => {
    cy.get('.list-group-item').eq(2).click();
    cy.get('.list-group-item').eq(2).should('have.class', 'active');
    cy.get('h5').should('contain', 'Notification Settings');
  });

  it('should switch to preferences tab', () => {
    cy.get('.list-group-item').eq(3).click();
    cy.get('.list-group-item').eq(3).should('have.class', 'active');
    cy.get('h5').should('contain', 'Preferences');
  });

  it('should update profile information', () => {
    cy.get('input[name="firstName"]').clear().type('Updated First Name');
    cy.get('input[name="lastName"]').clear().type('Updated Last Name');
    cy.get('input[name="phoneNumber"]').clear().type('+1-555-9999');
    cy.get('textarea[name="address"]').clear().type('Updated Address');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').should('contain', 'Profile updated successfully');
  });

  it('should change password', () => {
    cy.get('.list-group-item').eq(1).click();
    
    cy.get('input[name="currentPassword"]').type('admin123');
    cy.get('input[name="newPassword"]').type('newpassword123');
    cy.get('input[name="confirmPassword"]').type('newpassword123');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').should('contain', 'Password changed successfully');
  });

  it('should show error for mismatched passwords', () => {
    cy.get('.list-group-item').eq(1).click();
    
    cy.get('input[name="currentPassword"]').type('admin123');
    cy.get('input[name="newPassword"]').type('newpassword123');
    cy.get('input[name="confirmPassword"]').type('differentpassword');
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-danger').should('be.visible');
    cy.get('.alert-danger').should('contain', 'New passwords do not match');
  });

  it('should update notification settings', () => {
    cy.get('.list-group-item').eq(2).click();
    
    cy.get('input[id="emailNotifications"]').uncheck();
    cy.get('input[id="pushNotifications"]').uncheck();
    cy.get('input[id="weeklyReports"]').check();
    
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').should('contain', 'Notification settings updated successfully');
  });

  it('should display all notification toggles', () => {
    cy.get('.list-group-item').eq(2).click();
    
    cy.get('input[id="emailNotifications"]').should('exist');
    cy.get('input[id="pushNotifications"]').should('exist');
    cy.get('input[id="leaveRequestNotifications"]').should('exist');
    cy.get('input[id="performanceReviewNotifications"]').should('exist');
    cy.get('input[id="weeklyReports"]').should('exist');
  });

  it('should show loading state during updates', () => {
    cy.get('input[name="firstName"]').clear().type('Updated Name');
    cy.get('button[type="submit"]').click();
    
    cy.get('button[type="submit"]').should('contain', 'Updating...');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x');
    cy.get('.list-group').should('be.visible');
    cy.get('.card').should('be.visible');
  });

  it('should display current user information in profile form', () => {
    cy.get('input[name="firstName"]').should('have.value', 'Admin');
    cy.get('input[name="lastName"]').should('have.value', 'User');
    cy.get('input[name="email"]').should('have.value', 'admin@hrmanagement.com');
  });

  it('should show success message and dismiss it', () => {
    cy.get('input[name="firstName"]').clear().type('Updated Name');
    cy.get('button[type="submit"]').click();
    
    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success .btn-close').click();
    cy.get('.alert-success').should('not.exist');
  });

  it('should show preferences placeholder', () => {
    cy.get('.list-group-item').eq(3).click();
    
    cy.get('.empty-state').should('be.visible');
    cy.get('.empty-state').should('contain', 'Additional preferences and settings will be available here');
  });
});
