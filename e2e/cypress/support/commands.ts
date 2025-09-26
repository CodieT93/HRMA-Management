/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login with email and password
       * @example cy.login('user@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;
      
      /**
       * Custom command to login as admin
       * @example cy.loginAsAdmin()
       */
      loginAsAdmin(): Chainable<void>;
      
      /**
       * Custom command to login as HR manager
       * @example cy.loginAsHR()
       */
      loginAsHR(): Chainable<void>;
      
      /**
       * Custom command to login as manager
       * @example cy.loginAsManager()
       */
      loginAsManager(): Chainable<void>;
      
      /**
       * Custom command to login as employee
       * @example cy.loginAsEmployee()
       */
      loginAsEmployee(): Chainable<void>;
      
      /**
       * Custom command to logout
       * @example cy.logout()
       */
      logout(): Chainable<void>;
      
      /**
       * Custom command to wait for API response
       * @example cy.waitForAPI('GET', '/api/employees')
       */
      waitForAPI(method: string, url: string): Chainable<void>;
      
      /**
       * Custom command to create employee via API
       * @example cy.createEmployee(employeeData)
       */
      createEmployee(employeeData: any): Chainable<any>;
      
      /**
       * Custom command to create leave request via API
       * @example cy.createLeaveRequest(leaveData)
       */
      createLeaveRequest(leaveData: any): Chainable<any>;
      
      /**
       * Custom command to check if element is visible in viewport
       * @example cy.isInViewport('.my-element')
       */
      isInViewport(selector: string): Chainable<boolean>;
    }
  }
}

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/login');
  });
});

// Login as specific roles
Cypress.Commands.add('loginAsAdmin', () => {
  cy.login(Cypress.env('adminEmail'), Cypress.env('adminPassword'));
});

Cypress.Commands.add('loginAsHR', () => {
  cy.login(Cypress.env('hrEmail'), Cypress.env('hrPassword'));
});

Cypress.Commands.add('loginAsManager', () => {
  cy.login(Cypress.env('managerEmail'), Cypress.env('managerPassword'));
});

Cypress.Commands.add('loginAsEmployee', () => {
  cy.login(Cypress.env('employeeEmail'), Cypress.env('employeePassword'));
});

// Logout command
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-dropdown"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('include', '/login');
});

// Wait for API response
Cypress.Commands.add('waitForAPI', (method: string, url: string) => {
  cy.intercept(method, url).as('apiCall');
  cy.wait('@apiCall');
});

// Create employee via API
Cypress.Commands.add('createEmployee', (employeeData: any) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/employees`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: employeeData,
  });
});

// Create leave request via API
Cypress.Commands.add('createLeaveRequest', (leaveData: any) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/leave/requests`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: leaveData,
  });
});

// Check if element is in viewport
Cypress.Commands.add('isInViewport', (selector: string) => {
  return cy.get(selector).then(($el) => {
    const rect = $el[0].getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= Cypress.config('viewportHeight') &&
      rect.right <= Cypress.config('viewportWidth')
    );
    return cy.wrap(isInViewport);
  });
});

// Custom assertions
declare global {
  namespace Cypress {
    interface Chainer<Subject> {
      /**
       * Custom assertion to check if element has specific CSS class
       */
      haveClass(className: string): Chainable<Subject>;
      
      /**
       * Custom assertion to check if element is visible and enabled
       */
      beVisibleAndEnabled(): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('haveClass', { prevSubject: 'element' }, (subject, className) => {
  expect(subject).to.have.class(className);
  return cy.wrap(subject);
});

Cypress.Commands.add('beVisibleAndEnabled', { prevSubject: 'element' }, (subject) => {
  expect(subject).to.be.visible;
  expect(subject).to.not.be.disabled;
  return cy.wrap(subject);
});
