# HR Transformation System Project Guide

This document provides a complete overview of the project's technology stack, file structure, and essential commands. Its purpose is to onboard developers quickly and serve as a central reference point.

---

## Technology Stack

The application is a modern web application built with a TypeScript based stack.

### Frontend
* **Framework:** React 18+
* **Language:** TypeScript
* **Styling:** Bootstrap 5 and SCSS
* **State Management:** React Context or a lightweight library like Zustand
* **API Communication:** Axios

### Backend
* **Runtime:** Node.js (LTS Version)
* **Framework:** Express.js
* **Language:** TypeScript
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens) with MFA support

### Testing
* **Unit/Integration:** Jest & React Testing Library
* **End to End (UAT):** Cypress

### DevOps
* **Containerization:** Docker
* **Infrastructure:** AWS (Amazon Web Services)
* **Infrastructure as Code:** Terraform
* **CI/CD:** GitHub Actions

---

## Project File Structure

The project is organized into a monorepo structure with separate directories for the client (frontend) and server (backend).

.
├── client/                   # React frontend application
│   ├── public/
│   └── src/
│       ├── api/              # Functions for making API calls
│       ├── components/       # Reusable UI components (e.g., Button, Modal)
│       ├── context/          # Global state management
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Top level page components (e.g., DashboardPage)
│       ├── styles/           # Global styles and Bootstrap overrides
│       ├── types/            # TypeScript type definitions
│       ├── utils/            # Utility functions
│       ├── App.tsx           # Main application component
│       └── index.tsx         # Application entry point
├── server/                   # Node.js backend application
│   └── src/
│       ├── api/              # API routes and controllers
│       ├── config/           # Configuration (db, environment variables)
│       ├── middleware/       # Express middleware (e.g., auth checks)
│       ├── models/           # Database models and schemas
│       ├── services/         # Business logic
│       └── server.ts         # Server entry point
├── database/                 # Database migration and seed files
│   ├── migrations/
│   └── seeds/
├── e2e/                      # End to end Cypress tests
├── .github/workflows/        # CI/CD pipeline configurations
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Project scripts and dependencies
└── README.md                 # Project documentation


---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites
1.  **Node.js** (LTS version)
2.  **Docker** and Docker Compose
3.  **Git**

### Installation and Setup
1.  Clone the repository: `git clone <repository_url>`
2.  Navigate to the project root: `cd <project_directory>`
3.  Install all dependencies for both client and server: `npm install`
4.  Copy the example environment file: `cp .env.example .env`
5.  Fill in the required variables in the `.env` file (e.g., database credentials, JWT secret).
6.  Start the local development environment (database, client, server): `docker compose up --build`

### Key Commands
* **Run local development server:** `npm run dev`
* **Run all tests:** `npm test`
* **Lint and format code:** `npm run lint`
* **Build for production:** `npm run build`