# Create project from _cursor.md
_Exported on 9/26/2025 at 11:22:49 GMT+8 from Cursor (1.6.45)_

---

**User**

please create the project based on the _cursor.md file

---

**Cursor**

I'll help you create the HR Management Application project based on the `_cursor.md` file. Let me first read the file to understand the requirements and then create the project structure.


Now I'll create the complete HR Management Application project structure based on the specifications in the `_cursor.md` file. Let me start by creating the project structure and all necessary files.


```json
{
  "name": "hr-management-application",
  "version": "1.0.0",
  "description": "A modern HR Management Application built with React, Node.js, and PostgreSQL",
  "main": "index.js",
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev",
    "build": "npm run build:client && npm run build:server",
    "build:client": "cd client && npm run build",
    "build:server": "cd server && npm run build",
    "test": "npm run test:client && npm run test:server",
    "test:client": "cd client && npm test",
    "test:server": "cd server && npm test",
    "test:e2e": "cd e2e && npm run cypress:run",
    "lint": "npm run lint:client && npm run lint:server",
    "lint:client": "cd client && npm run lint",
    "lint:server": "cd server && npm run lint",
    "install:all": "npm install && cd client && npm install && cd ../server && npm install && cd ../e2e && npm install",
    "docker:up": "docker-compose up --build",
    "docker:down": "docker-compose down",
    "db:migrate": "cd server && npm run db:migrate",
    "db:seed": "cd server && npm run db:seed"
  },
  "keywords": [
    "hr",
    "management",
    "react",
    "nodejs",
    "typescript",
    "postgresql"
  ],
  "author": "HR Development Team",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.2.2"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}
```

```ignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
client/build/
client/dist/
server/dist/
server/build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Docker
.dockerignore

# Database
*.sqlite
*.db

# Cypress
e2e/cypress/videos/
e2e/cypress/screenshots/

# Terraform
*.tfstate
*.tfstate.*
.terraform/
.terraform.lock.hcl

# AWS
.aws/
```

```plaintext
# Database Configuration
DATABASE_URL=postgresql://hr_user:hr_password@localhost:5432/hr_management
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hr_management
DB_USER=hr_user
DB_PASSWORD=hr_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
API_BASE_URL=http://localhost:5000/api

# Client Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# AWS Configuration (for production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
S3_BUCKET_NAME=hr-management-bucket

# MFA Configuration
MFA_ISSUER=HR Management System
MFA_ALGORITHM=sha1
MFA_DIGITS=6
MFA_PERIOD=30

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info
LOG_FILE=logs/app.log
```

```dockercompose
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: hr_postgres
    environment:
      POSTGRES_DB: hr_management
      POSTGRES_USER: hr_user
      POSTGRES_PASSWORD: hr_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    networks:
      - hr_network

  # Redis for caching and sessions
  redis:
    image: redis:7-alpine
    container_name: hr_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - hr_network

  # Backend Server
  server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: hr_server
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://hr_user:hr_password@postgres:5432/hr_management
      - REDIS_URL=redis://redis:6379
    ports:
      - "5000:5000"
    volumes:
      - ./server:/app
      - /app/node_modules
    depends_on:
      - postgres
      - redis
    networks:
      - hr_network
    command: npm run dev

  # Frontend Client
  client:
    build:
      context: ./client
      dockerfile: Dockerfile
    container_name: hr_client
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
    ports:
      - "3000:3000"
    volumes:
      - ./client:/app
      - /app/node_modules
    depends_on:
      - server
    networks:
      - hr_network
    command: npm start

volumes:
  postgres_data:
  redis_data:

networks:
  hr_network:
    driver: bridge
```

```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT with MFA support

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress

### DevOps
- **Containerization:** Docker
- **Infrastructure:** AWS
- **Infrastructure as Code:** Terraform
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   └── src/
│       ├── api/              # Functions for making API calls
│       ├── components/       # Reusable UI components
│       ├── context/          # Global state management
│       ├── hooks/            # Custom React hooks
│       ├── pages/            # Top level page components
│       ├── styles/           # Global styles and Bootstrap overrides
│       ├── types/            # TypeScript type definitions
│       ├── utils/            # Utility functions
│       ├── App.tsx           # Main application component
│       └── index.tsx         # Application entry point
├── server/                   # Node.js backend application
│   └── src/
│       ├── api/              # API routes and controllers
│       ├── config/           # Configuration
│       ├── middleware/       # Express middleware
│       ├── models/           # Database models and schemas
│       ├── services/         # Business logic
│       └── server.ts         # Server entry point
├── database/                 # Database migration and seed files
│   ├── migrations/
│   └── seeds/
├── e2e/                      # End to end Cypress tests
├── .github/workflows/        # CI/CD pipeline configurations
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration
├── package.json              # Project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Unit Tests
```bash
npm run test:client  # Frontend tests
npm run test:server  # Backend tests
```

### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

Key environment variables that need to be configured:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `REACT_APP_API_URL` - Backend API URL for frontend
- `SMTP_*` - Email configuration for notifications

See `env.example` for a complete list of configuration options.

## 📚 API Documentation

The API documentation is available at `http://localhost:5000/api/docs` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**
```

Now let me create the client directory structure with React/TypeScript frontend:


```json
{
  "name": "hr-management-client",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.9.1",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "sass": "^1.69.5",
    "typescript": "^5.3.2",
    "web-vitals": "^3.5.0",
    "zustand": "^4.4.7"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "react-scripts start",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^14.5.1",
    "@types/jest": "^29.5.8",
    "eslint": "^8.55.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0"
  },
  "proxy": "http://localhost:5000"
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="HR Management Application - Modern HR solution for employee management"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>HR Management System</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

```json
{
  "short_name": "HR Management",
  "name": "HR Management System",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

```typescriptreact
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

```typescriptreact
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import LeaveRequestsPage from './pages/LeaveRequestsPage';
import PerformanceReviewsPage from './pages/PerformanceReviewsPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.scss';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Container fluid className="main-content">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <ProtectedRoute>
                <EmployeesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employees/:id" 
            element={
              <ProtectedRoute>
                <EmployeeDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leave-requests" 
            element={
              <ProtectedRoute>
                <LeaveRequestsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/performance-reviews" 
            element={
              <ProtectedRoute>
                <PerformanceReviewsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to="/dashboard" replace />} 
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
```

```typescript
// User and Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  position: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  emergencyContact?: EmergencyContact;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  HR_MANAGER = 'hr_manager',
  MANAGER = 'manager',
  EMPLOYEE = 'employee'
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Employee Types
export interface Employee extends User {
  employeeId: string;
  hireDate: string;
  salary: number;
  managerId?: string;
  manager?: Employee;
  directReports?: Employee[];
  skills: string[];
  certifications: Certification[];
  performanceReviews: PerformanceReview[];
  leaveRequests: LeaveRequest[];
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

// Leave Management Types
export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee?: Employee;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  daysRequested: number;
  reason: string;
  status: LeaveStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewer?: User;
  comments?: string;
}

export enum LeaveType {
  ANNUAL = 'annual',
  SICK = 'sick',
  PERSONAL = 'personal',
  MATERNITY = 'maternity',
  PATERNITY = 'paternity',
  BEREAVEMENT = 'bereavement',
  UNPAID = 'unpaid'
}

export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled'
}

// Performance Review Types
export interface PerformanceReview {
  id: string;
  employeeId: string;
  employee?: Employee;
  reviewerId: string;
  reviewer?: User;
  reviewPeriod: string;
  overallRating: number;
  goals: PerformanceGoal[];
  achievements: string[];
  areasForImprovement: string[];
  comments: string;
  status: ReviewStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PerformanceGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  status: GoalStatus;
  progress: number;
  comments?: string;
}

export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ReviewStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  APPROVED = 'approved'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface EmployeeForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
  managerId?: string;
  skills: string[];
}

export interface LeaveRequestForm {
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
}

// Dashboard Types
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  pendingLeaveRequests: number;
  upcomingReviews: number;
  recentHires: Employee[];
  recentLeaveRequests: LeaveRequest[];
}

// Filter and Search Types
export interface EmployeeFilters {
  department?: string;
  position?: string;
  status?: 'active' | 'inactive';
  search?: string;
}

export interface LeaveRequestFilters {
  status?: LeaveStatus;
  leaveType?: LeaveType;
  employeeId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error'
}
```

```typescriptreact
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginForm } from '../types';
import { authApi } from '../api/authApi';

interface AuthContextType extends AuthState {
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await authApi.getCurrentUser();
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        } catch (error) {
          localStorage.removeItem('token');
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginForm) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await authApi.login(credentials);
      const { user, token } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (user: User) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

```typescript
import axios from 'axios';
import { LoginForm, User, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    await api.post('/auth/change-password', data);
  },

  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  resetPassword: async (data: { token: string; password: string }): Promise<void> => {
    await api.post('/auth/reset-password', data);
  },
};
```

```typescript
import axios from 'axios';
import { Employee, EmployeeForm, PaginatedResponse, EmployeeFilters, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const employeeApi = {
  getEmployees: async (filters?: EmployeeFilters, page = 1, limit = 10): Promise<PaginatedResponse<Employee>> => {
    const params = new URLSearchParams();
    if (filters?.department) params.append('department', filters.department);
    if (filters?.position) params.append('position', filters.position);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const response = await api.get(`/employees?${params.toString()}`);
    return response.data.data;
  },

  getEmployee: async (id: string): Promise<Employee> => {
    const response = await api.get(`/employees/${id}`);
    return response.data.data;
  },

  createEmployee: async (employeeData: EmployeeForm): Promise<Employee> => {
    const response = await api.post('/employees', employeeData);
    return response.data.data;
  },

  updateEmployee: async (id: string, employeeData: Partial<EmployeeForm>): Promise<Employee> => {
    const response = await api.put(`/employees/${id}`, employeeData);
    return response.data.data;
  },

  deleteEmployee: async (id: string): Promise<void> => {
    await api.delete(`/employees/${id}`);
  },

  getEmployeeStats: async (): Promise<{ total: number; active: number; byDepartment: Record<string, number> }> => {
    const response = await api.get('/employees/stats');
    return response.data.data;
  },

  searchEmployees: async (query: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/search?q=${encodeURIComponent(query)}`);
    return response.data.data;
  },

  getEmployeesByDepartment: async (department: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/department/${department}`);
    return response.data.data;
  },

  getDirectReports: async (managerId: string): Promise<Employee[]> => {
    const response = await api.get(`/employees/manager/${managerId}/reports`);
    return response.data.data;
  },
};
```

```typescriptreact
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
```

```typescriptreact
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Row>
          <Col className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-3">Loading...</p>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

```typescriptreact
import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../types';
import './LoginPage.scss';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">HR Management</h2>
                <p className="text-muted">Sign in to your account</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    label="Remember me"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none">
                  Forgot your password?
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { DashboardStats } from '../types';
import { employeeApi } from '../api/employeeApi';
import './DashboardPage.scss';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you'd have a dedicated dashboard API endpoint
        const [employeeStats, recentHires, recentLeaveRequests] = await Promise.all([
          employeeApi.getEmployeeStats(),
          employeeApi.getEmployees({}, 1, 5),
          // leaveApi.getRecentLeaveRequests(),
        ]);

        setStats({
          totalEmployees: employeeStats.total,
          activeEmployees: employeeStats.active,
          pendingLeaveRequests: 0, // Would come from leave API
          upcomingReviews: 0, // Would come from performance API
          recentHires: recentHires.data,
          recentLeaveRequests: [],
        });
      } catch (err: any) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted">Here's what's happening in your organization today.</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-primary">
                <i className="bi bi-people"></i>
              </div>
              <h3 className="stat-number">{stats?.totalEmployees || 0}</h3>
              <p className="stat-label">Total Employees</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-success">
                <i className="bi bi-person-check"></i>
              </div>
              <h3 className="stat-number">{stats?.activeEmployees || 0}</h3>
              <p className="stat-label">Active Employees</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-warning">
                <i className="bi bi-calendar-event"></i>
              </div>
              <h3 className="stat-number">{stats?.pendingLeaveRequests || 0}</h3>
              <p className="stat-label">Pending Leave Requests</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body className="text-center">
              <div className="stat-icon bg-info">
                <i className="bi bi-clipboard-check"></i>
              </div>
              <h3 className="stat-number">{stats?.upcomingReviews || 0}</h3>
              <p className="stat-label">Upcoming Reviews</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Hires</h5>
            </Card.Header>
            <Card.Body>
              {stats?.recentHires && stats.recentHires.length > 0 ? (
                <div className="list-group list-group-flush">
                  {stats.recentHires.map((employee) => (
                    <div key={employee.id} className="list-group-item px-0">
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
                          <small className="text-muted">{employee.position} • {employee.department}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No recent hires</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Leave Requests</h5>
            </Card.Header>
            <Card.Body>
              {stats?.recentLeaveRequests && stats.recentLeaveRequests.length > 0 ? (
                <div className="list-group list-group-flush">
                  {stats.recentLeaveRequests.map((request) => (
                    <div key={request.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-0">{request.employee?.firstName} {request.employee?.lastName}</h6>
                          <small className="text-muted">{request.leaveType} • {request.daysRequested} days</small>
                        </div>
                        <span className={`badge bg-${request.status === 'pending' ? 'warning' : request.status === 'approved' ? 'success' : 'danger'}`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted mb-0">No recent leave requests</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
```

Now let me create the remaining page components and styles:


```typescriptreact
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
```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Tab, Tabs } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Employee } from '../types';
import { employeeApi } from '../api/employeeApi';
import './EmployeeDetailPage.scss';

const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (employeeId: string) => {
    try {
      setIsLoading(true);
      const employeeData = await employeeApi.getEmployee(employeeId);
      setEmployee(employeeData);
    } catch (err: any) {
      setError('Failed to load employee details');
      console.error('Employee detail error:', err);
    } finally {
      setIsLoading(false);
    }
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

  if (error || !employee) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          {error || 'Employee not found'}
        </Alert>
        <Button variant="outline-primary" onClick={() => navigate('/employees')}>
          Back to Employees
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/employees')}
                className="me-3"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Employees
              </Button>
              <h1 className="h3 mb-0 d-inline">
                {employee.firstName} {employee.lastName}
              </h1>
            </div>
            <div>
              <Button variant="outline-primary" className="me-2">
                <i className="bi bi-pencil me-2"></i>
                Edit
              </Button>
              <Button variant="primary">
                <i className="bi bi-download me-2"></i>
                Export
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          {/* Employee Profile Card */}
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="rounded-circle"
                    width="120"
                    height="120"
                  />
                ) : (
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '120px', height: '120px', fontSize: '2rem' }}>
                    {employee.firstName[0]}{employee.lastName[0]}
                  </div>
                )}
              </div>
              <h4>{employee.firstName} {employee.lastName}</h4>
              <p className="text-muted">{employee.position}</p>
              <Badge bg={employee.isActive ? 'success' : 'secondary'} className="mb-3">
                {employee.isActive ? 'Active' : 'Inactive'}
              </Badge>
              
              <div className="employee-info">
                <div className="info-item">
                  <i className="bi bi-envelope me-2"></i>
                  {employee.email}
                </div>
                {employee.phoneNumber && (
                  <div className="info-item">
                    <i className="bi bi-telephone me-2"></i>
                    {employee.phoneNumber}
                  </div>
                )}
                <div className="info-item">
                  <i className="bi bi-building me-2"></i>
                  {employee.department}
                </div>
                <div className="info-item">
                  <i className="bi bi-calendar me-2"></i>
                  Hired: {formatDate(employee.hireDate)}
                </div>
                <div className="info-item">
                  <i className="bi bi-currency-dollar me-2"></i>
                  {formatCurrency(employee.salary)}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Manager Information */}
          {employee.manager && (
            <Card>
              <Card.Header>
                <h6 className="mb-0">Manager</h6>
              </Card.Header>
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="avatar me-3">
                    {employee.manager.profileImage ? (
                      <img
                        src={employee.manager.profileImage}
                        alt={`${employee.manager.firstName} ${employee.manager.lastName}`}
                        className="rounded-circle"
                        width="40"
                        height="40"
                      />
                    ) : (
                      <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        {employee.manager.firstName[0]}{employee.manager.lastName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h6 className="mb-0">{employee.manager.firstName} {employee.manager.lastName}</h6>
                    <small className="text-muted">{employee.manager.position}</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={8}>
          <Tabs defaultActiveKey="overview" className="mb-3">
            <Tab eventKey="overview" title="Overview">
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Employee Overview</h6>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h6>Personal Information</h6>
                      <div className="info-list">
                        <div className="info-item">
                          <strong>Employee ID:</strong> {employee.employeeId}
                        </div>
                        <div className="info-item">
                          <strong>Role:</strong> {employee.role}
                        </div>
                        {employee.address && (
                          <div className="info-item">
                            <strong>Address:</strong> {employee.address}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col md={6}>
                      <h6>Employment Details</h6>
                      <div className="info-list">
                        <div className="info-item">
                          <strong>Position:</strong> {employee.position}
                        </div>
                        <div className="info-item">
                          <strong>Department:</strong> {employee.department}
                        </div>
                        <div className="info-item">
                          <strong>Hire Date:</strong> {formatDate(employee.hireDate)}
                        </div>
                        <div className="info-item">
                          <strong>Salary:</strong> {formatCurrency(employee.salary)}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  {employee.skills && employee.skills.length > 0 && (
                    <div className="mt-4">
                      <h6>Skills</h6>
                      <div className="skills-list">
                        {employee.skills.map((skill, index) => (
                          <Badge key={index} bg="light" text="dark" className="me-2 mb-2">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="performance" title="Performance">
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Performance Reviews</h6>
                </Card.Header>
                <Card.Body>
                  {employee.performanceReviews && employee.performanceReviews.length > 0 ? (
                    <div className="performance-reviews">
                      {employee.performanceReviews.map((review) => (
                        <div key={review.id} className="review-item mb-3 p-3 border rounded">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{review.reviewPeriod}</h6>
                              <p className="text-muted mb-2">{review.comments}</p>
                              <div className="d-flex align-items-center">
                                <span className="me-3">Overall Rating: </span>
                                <div className="rating">
                                  {[...Array(5)].map((_, i) => (
                                    <i
                                      key={i}
                                      className={`bi bi-star${i < review.overallRating ? '-fill' : ''} text-warning`}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Badge bg="secondary">{review.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No performance reviews available.</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="leave" title="Leave History">
              <Card>
                <Card.Header>
                  <h6 className="mb-0">Leave Requests</h6>
                </Card.Header>
                <Card.Body>
                  {employee.leaveRequests && employee.leaveRequests.length > 0 ? (
                    <div className="leave-requests">
                      {employee.leaveRequests.map((request) => (
                        <div key={request.id} className="leave-item mb-3 p-3 border rounded">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6 className="mb-1">{request.leaveType}</h6>
                              <p className="text-muted mb-1">
                                {formatDate(request.startDate)} - {formatDate(request.endDate)}
                              </p>
                              <p className="mb-0">{request.reason}</p>
                            </div>
                            <Badge bg={
                              request.status === 'approved' ? 'success' :
                              request.status === 'pending' ? 'warning' : 'danger'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No leave requests found.</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeDetailPage;
```

Now let me create the remaining page components and styles:


```typescriptreact
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Spinner, Alert, Badge } from 'react-bootstrap';
import { LeaveRequest, LeaveRequestFilters, LeaveStatus, LeaveType } from '../types';
import './LeaveRequestsPage.scss';

const LeaveRequestsPage: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<LeaveRequestFilters>({});

  useEffect(() => {
    fetchLeaveRequests();
  }, [filters]);

  const fetchLeaveRequests = async () => {
    try {
      setIsLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockRequests: LeaveRequest[] = [
        {
          id: '1',
          employeeId: 'emp1',
          leaveType: LeaveType.ANNUAL,
          startDate: '2024-01-15',
          endDate: '2024-01-20',
          daysRequested: 5,
          reason: 'Family vacation',
          status: LeaveStatus.PENDING,
          submittedAt: '2024-01-10T10:00:00Z',
        },
        {
          id: '2',
          employeeId: 'emp2',
          leaveType: LeaveType.SICK,
          startDate: '2024-01-12',
          endDate: '2024-01-12',
          daysRequested: 1,
          reason: 'Medical appointment',
          status: LeaveStatus.APPROVED,
          submittedAt: '2024-01-11T09:00:00Z',
          reviewedAt: '2024-01-11T14:00:00Z',
        },
      ];
      setLeaveRequests(mockRequests);
    } catch (err: any) {
      setError('Failed to load leave requests');
      console.error('Leave requests error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof LeaveRequestFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value || undefined }));
  };

  const getStatusBadge = (status: LeaveStatus) => {
    const variants = {
      [LeaveStatus.PENDING]: 'warning',
      [LeaveStatus.APPROVED]: 'success',
      [LeaveStatus.REJECTED]: 'danger',
      [LeaveStatus.CANCELLED]: 'secondary',
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const getLeaveTypeBadge = (type: LeaveType) => {
    const variants = {
      [LeaveType.ANNUAL]: 'primary',
      [LeaveType.SICK]: 'info',
      [LeaveType.PERSONAL]: 'secondary',
      [LeaveType.MATERNITY]: 'success',
      [LeaveType.PATERNITY]: 'success',
      [LeaveType.BEREAVEMENT]: 'dark',
      [LeaveType.UNPAID]: 'warning',
    };
    return <Badge bg={variants[type]}>{type}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleApprove = (id: string) => {
    // In real app, this would make an API call
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status: LeaveStatus.APPROVED, reviewedAt: new Date().toISOString() }
          : req
      )
    );
  };

  const handleReject = (id: string) => {
    // In real app, this would make an API call
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === id 
          ? { ...req, status: LeaveStatus.REJECTED, reviewedAt: new Date().toISOString() }
          : req
      )
    );
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
              <h1 className="h3 mb-0">Leave Requests</h1>
              <p className="text-muted">Manage employee leave requests</p>
            </div>
            <Button variant="primary">
              <i className="bi bi-plus-lg me-2"></i>
              New Request
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
            <Col md={3}>
              <Form.Select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Status</option>
                <option value={LeaveStatus.PENDING}>Pending</option>
                <option value={LeaveStatus.APPROVED}>Approved</option>
                <option value={LeaveStatus.REJECTED}>Rejected</option>
                <option value={LeaveStatus.CANCELLED}>Cancelled</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filters.leaveType || ''}
                onChange={(e) => handleFilterChange('leaveType', e.target.value)}
              >
                <option value="">All Types</option>
                <option value={LeaveType.ANNUAL}>Annual</option>
                <option value={LeaveType.SICK}>Sick</option>
                <option value={LeaveType.PERSONAL}>Personal</option>
                <option value={LeaveType.MATERNITY}>Maternity</option>
                <option value={LeaveType.PATERNITY}>Paternity</option>
                <option value={LeaveType.BEREAVEMENT}>Bereavement</option>
                <option value={LeaveType.UNPAID}>Unpaid</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-secondary"
                onClick={() => setFilters({})}
                className="w-100"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Leave Requests Table */}
      <Card>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">john.doe@company.com</small>
                    </div>
                  </td>
                  <td>{getLeaveTypeBadge(request.leaveType)}</td>
                  <td>{formatDate(request.startDate)}</td>
                  <td>{formatDate(request.endDate)}</td>
                  <td>{request.daysRequested}</td>
                  <td>{request.reason}</td>
                  <td>{getStatusBadge(request.status)}</td>
                  <td>
                    {request.status === LeaveStatus.PENDING && (
                      <div className="d-flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleReject(request.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                    {request.status !== LeaveStatus.PENDING && (
                      <Button variant="outline-primary" size="sm">
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {leaveRequests.length === 0 && !isLoading && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-calendar-event text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No leave requests found</h5>
            <p className="text-muted">Try adjusting your search criteria.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default LeaveRequestsPage;
```

```typescriptreact
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Spinner, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { PerformanceReview, ReviewStatus } from '../types';
import './PerformanceReviewsPage.scss';

const PerformanceReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchPerformanceReviews();
  }, [statusFilter]);

  const fetchPerformanceReviews = async () => {
    try {
      setIsLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockReviews: PerformanceReview[] = [
        {
          id: '1',
          employeeId: 'emp1',
          reviewerId: 'mgr1',
          reviewPeriod: 'Q4 2023',
          overallRating: 4,
          goals: [
            {
              id: '1',
              title: 'Complete project delivery',
              description: 'Deliver the new feature on time',
              targetDate: '2023-12-31',
              status: 'completed' as any,
              progress: 100,
            },
            {
              id: '2',
              title: 'Improve team collaboration',
              description: 'Lead weekly team meetings',
              targetDate: '2023-12-15',
              status: 'completed' as any,
              progress: 100,
            },
          ],
          achievements: [
            'Successfully delivered the new feature ahead of schedule',
            'Improved team productivity by 20%',
            'Mentored 2 junior developers',
          ],
          areasForImprovement: [
            'Better documentation practices',
            'More proactive communication',
          ],
          comments: 'Excellent performance this quarter. Keep up the great work!',
          status: ReviewStatus.COMPLETED,
          createdAt: '2023-12-01T10:00:00Z',
          updatedAt: '2023-12-15T14:00:00Z',
        },
        {
          id: '2',
          employeeId: 'emp2',
          reviewerId: 'mgr1',
          reviewPeriod: 'Q4 2023',
          overallRating: 3,
          goals: [
            {
              id: '3',
              title: 'Learn new technology',
              description: 'Complete React certification',
              targetDate: '2024-01-31',
              status: 'in_progress' as any,
              progress: 60,
            },
          ],
          achievements: [
            'Completed 3 major bug fixes',
            'Improved code quality metrics',
          ],
          areasForImprovement: [
            'Time management',
            'Technical documentation',
          ],
          comments: 'Good progress, but needs to focus on time management.',
          status: ReviewStatus.IN_PROGRESS,
          createdAt: '2023-12-01T10:00:00Z',
          updatedAt: '2023-12-10T14:00:00Z',
        },
      ];
      setReviews(mockReviews);
    } catch (err: any) {
      setError('Failed to load performance reviews');
      console.error('Performance reviews error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: ReviewStatus) => {
    const variants = {
      [ReviewStatus.DRAFT]: 'secondary',
      [ReviewStatus.IN_PROGRESS]: 'warning',
      [ReviewStatus.COMPLETED]: 'info',
      [ReviewStatus.APPROVED]: 'success',
    };
    return <Badge bg={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`bi bi-star${i < rating ? '-fill' : ''} text-warning`}
          ></i>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
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
              <h1 className="h3 mb-0">Performance Reviews</h1>
              <p className="text-muted">Manage employee performance reviews</p>
            </div>
            <Button variant="primary">
              <i className="bi bi-plus-lg me-2"></i>
              New Review
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
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value={ReviewStatus.DRAFT}>Draft</option>
                <option value={ReviewStatus.IN_PROGRESS}>In Progress</option>
                <option value={ReviewStatus.COMPLETED}>Completed</option>
                <option value={ReviewStatus.APPROVED}>Approved</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button
                variant="outline-secondary"
                onClick={() => setStatusFilter('')}
                className="w-100"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Performance Reviews */}
      <Row>
        {reviews.map((review) => (
          <Col md={6} key={review.id} className="mb-4">
            <Card className="h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{review.reviewPeriod}</h6>
                  <small className="text-muted">John Doe</small>
                </div>
                {getStatusBadge(review.status)}
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>Overall Rating:</span>
                    {getRatingStars(review.overallRating)}
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Goals Progress</h6>
                  {review.goals.map((goal) => (
                    <div key={goal.id} className="mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small">{goal.title}</span>
                        <span className="small text-muted">{goal.progress}%</span>
                      </div>
                      <ProgressBar
                        now={goal.progress}
                        variant={goal.progress === 100 ? 'success' : goal.progress > 50 ? 'info' : 'warning'}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-3">
                  <h6>Achievements</h6>
                  <ul className="small mb-0">
                    {review.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <h6>Areas for Improvement</h6>
                  <ul className="small mb-0">
                    {review.areasForImprovement.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>

                {review.comments && (
                  <div className="mb-3">
                    <h6>Comments</h6>
                    <p className="small mb-0">{review.comments}</p>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Updated: {formatDate(review.updatedAt)}
                  </small>
                  <div>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      View
                    </Button>
                    {review.status === ReviewStatus.DRAFT && (
                      <Button variant="primary" size="sm">
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {reviews.length === 0 && !isLoading && (
        <Card>
          <Card.Body className="text-center py-5">
            <i className="bi bi-clipboard-check text-muted" style={{ fontSize: '3rem' }}></i>
            <h5 className="mt-3">No performance reviews found</h5>
            <p className="text-muted">Try adjusting your search criteria or create a new review.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PerformanceReviewsPage;
```

```typescriptreact
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.scss';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    leaveRequestNotifications: true,
    performanceReviewNotifications: true,
    weeklyReports: false,
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        updateUser({ ...user, ...profileData });
      }
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'danger', text: 'New passwords do not match.' });
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to change password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Notification settings updated successfully!' });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Failed to update notification settings. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h3 mb-0">Settings</h1>
          <p className="text-muted">Manage your account settings and preferences</p>
        </Col>
      </Row>

      {message && (
        <Alert variant={message.type} className="mb-4" dismissible onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Row>
        <Col md={3}>
          <Card>
            <Card.Body className="p-0">
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="bi bi-person me-2"></i>
                  Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === 'password' ? 'active' : ''}`}
                  onClick={() => setActiveTab('password')}
                >
                  <i className="bi bi-lock me-2"></i>
                  Password
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="bi bi-bell me-2"></i>
                  Notifications
                </button>
                <button
                  className={`list-group-item list-group-item-action ${activeTab === 'preferences' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preferences')}
                >
                  <i className="bi bi-gear me-2"></i>
                  Preferences
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          {activeTab === 'profile' && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Profile Information</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleProfileSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={profileData.phoneNumber}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'password' && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Change Password</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handlePasswordSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      required
                      minLength={8}
                    />
                    <Form.Text className="text-muted">
                      Password must be at least 8 characters long.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Changing...' : 'Change Password'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Notification Settings</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleNotificationSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="emailNotifications"
                      label="Email Notifications"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="pushNotifications"
                      label="Push Notifications"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="leaveRequestNotifications"
                      label="Leave Request Notifications"
                      checked={notificationSettings.leaveRequestNotifications}
                      onChange={(e) => handleNotificationChange('leaveRequestNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="performanceReviewNotifications"
                      label="Performance Review Notifications"
                      checked={notificationSettings.performanceReviewNotifications}
                      onChange={(e) => handleNotificationChange('performanceReviewNotifications', e.target.checked)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Check
                      type="switch"
                      id="weeklyReports"
                      label="Weekly Reports"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => handleNotificationChange('weeklyReports', e.target.checked)}
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Notifications'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card>
              <Card.Header>
                <h5 className="mb-0">Preferences</h5>
              </Card.Header>
              <Card.Body>
                <div className="text-center py-5">
                  <i className="bi bi-gear text-muted" style={{ fontSize: '3rem' }}></i>
                  <h5 className="mt-3">Preferences</h5>
                  <p className="text-muted">Additional preferences and settings will be available here.</p>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;
```

Now let me create the SCSS styles for the components:


```scss
// Import Bootstrap
@import '~bootstrap/scss/bootstrap';

// Custom Variables
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --success-color: #198754;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #0dcaf0;
  --light-color: #f8f9fa;
  --dark-color: #212529;
  
  --sidebar-width: 250px;
  --navbar-height: 60px;
  --border-radius: 0.375rem;
  --box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  --box-shadow-lg: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

// Global Styles
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8f9fa;
}

.App {
  min-height: 100vh;
}

.main-content {
  padding-top: 1rem;
  min-height: calc(100vh - var(--navbar-height));
}

// Custom Components
.stat-card {
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--box-shadow-lg);
  }
  
  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    color: white;
  }
  
  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--dark-color);
  }
  
  .stat-label {
    color: var(--secondary-color);
    font-size: 0.875rem;
    margin-bottom: 0;
  }
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  i {
    width: 16px;
    margin-right: 0.5rem;
  }
}

.info-list {
  .info-item {
    margin-bottom: 0.75rem;
    
    strong {
      display: inline-block;
      width: 120px;
      color: var(--dark-color);
    }
  }
}

.skills-list {
  .badge {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }
}

.rating {
  i {
    font-size: 1rem;
    margin-right: 0.125rem;
  }
}

// Table Styles
.table {
  th {
    border-top: none;
    font-weight: 600;
    color: var(--dark-color);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  td {
    vertical-align: middle;
    border-color: #e9ecef;
  }
}

// Card Styles
.card {
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  
  .card-header {
    background-color: white;
    border-bottom: 1px solid #e9ecef;
    font-weight: 600;
  }
}

// Button Styles
.btn {
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
}

// Form Styles
.form-control {
  border-radius: var(--border-radius);
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
}

.form-select {
  border-radius: var(--border-radius);
  border: 1px solid #ced4da;
  transition: all 0.2s ease;
  
  &:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
}

// Alert Styles
.alert {
  border: none;
  border-radius: var(--border-radius);
  
  &.alert-success {
    background-color: #d1e7dd;
    color: #0f5132;
  }
  
  &.alert-danger {
    background-color: #f8d7da;
    color: #842029;
  }
  
  &.alert-warning {
    background-color: #fff3cd;
    color: #664d03;
  }
  
  &.alert-info {
    background-color: #d1ecf1;
    color: #055160;
  }
}

// Badge Styles
.badge {
  font-weight: 500;
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

// Progress Bar Styles
.progress {
  height: 0.5rem;
  border-radius: var(--border-radius);
  
  .progress-bar {
    border-radius: var(--border-radius);
  }
}

// List Group Styles
.list-group-item {
  border: none;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.active {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }
}

// Responsive Utilities
@media (max-width: 768px) {
  .main-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .stat-card {
    margin-bottom: 1rem;
  }
  
  .table-responsive {
    font-size: 0.875rem;
  }
}

// Loading Spinner
.spinner-border {
  width: 3rem;
  height: 3rem;
}

// Custom Scrollbar
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

// Animation Classes
.fade-in {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

```scss
// App-specific styles
.App {
  min-height: 100vh;
  background-color: #f8f9fa;
}

// Main content area
.main-content {
  padding: 2rem 0;
  min-height: calc(100vh - 60px);
}

// Page transitions
.page-enter {
  opacity: 0;
  transform: translateX(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-20px);
  transition: opacity 300ms, transform 300ms;
}
```

```scss
.custom-navbar {
  background-color: var(--primary-color) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
  
  .navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    color: white !important;
    
    &:hover {
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
  
  .navbar-nav {
    .nav-link {
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius);
      transition: all 0.2s ease;
      
      &:hover {
        color: white !important;
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      &.active {
        color: white !important;
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
  
  .dropdown-toggle {
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white !important;
    background-color: transparent;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
    }
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: var(--box-shadow-lg);
    border-radius: var(--border-radius);
    margin-top: 0.5rem;
    
    .dropdown-item {
      padding: 0.5rem 1rem;
      color: var(--dark-color);
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--light-color);
        color: var(--primary-color);
      }
      
      i {
        width: 16px;
        margin-right: 0.5rem;
      }
    }
  }
}

// Mobile responsiveness
@media (max-width: 991.98px) {
  .custom-navbar {
    .navbar-collapse {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .navbar-nav {
      .nav-link {
        margin-bottom: 0.25rem;
      }
    }
  }
}
```

```scss
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .card {
    border: none;
    border-radius: 1rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
    
    .card-body {
      padding: 2rem;
    }
  }
  
  .fw-bold {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  .text-muted {
    color: #6c757d !important;
  }
  
  .form-control {
    border: 2px solid #e9ecef;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
    }
  }
  
  .btn-primary {
    background: linear-gradient(135deg, var(--primary-color) 0%, #0056b3 100%);
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(13, 110, 253, 0.3);
    }
    
    &:disabled {
      transform: none;
      box-shadow: none;
    }
  }
  
  .form-check-input {
    border-radius: 0.25rem;
    border: 2px solid #e9ecef;
    
    &:checked {
      background-color: var(--primary-color);
      border-color: var(--primary-color);
    }
  }
  
  .text-decoration-none {
    color: var(--primary-color) !important;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: #0056b3 !important;
    }
  }
}

// Animation for form elements
.form-group {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive design
@media (max-width: 576px) {
  .login-container {
    padding: 1rem;
    
    .card {
      margin: 0;
      border-radius: 0.75rem;
      
      .card-body {
        padding: 1.5rem;
      }
    }
  }
}
```

```scss
.dashboard-page {
  .welcome-section {
    background: linear-gradient(135deg, var(--primary-color) 0%, #0056b3 100%);
    color: white;
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 1.1rem;
      opacity: 0.9;
      margin-bottom: 0;
    }
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 1px solid #e9ecef;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      color: white;
      
      &.bg-primary { background: linear-gradient(135deg, var(--primary-color), #0056b3); }
      &.bg-success { background: linear-gradient(135deg, var(--success-color), #146c43); }
      &.bg-warning { background: linear-gradient(135deg, var(--warning-color), #e0a800); }
      &.bg-info { background: linear-gradient(135deg, var(--info-color), #0aa2c0); }
    }
    
    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
      line-height: 1;
    }
    
    .stat-label {
      color: var(--secondary-color);
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 0;
    }
  }
  
  .activity-section {
    .card {
      border: none;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      
      .card-header {
        background: white;
        border-bottom: 1px solid #e9ecef;
        border-radius: 1rem 1rem 0 0 !important;
        padding: 1.25rem 1.5rem;
        
        h5 {
          margin-bottom: 0;
          font-weight: 600;
          color: var(--dark-color);
        }
      }
      
      .card-body {
        padding: 1.5rem;
      }
    }
    
    .list-group-item {
      border: none;
      border-bottom: 1px solid #f8f9fa;
      padding: 1rem 0;
      
      &:last-child {
        border-bottom: none;
      }
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
        color: white;
        background: var(--primary-color);
        margin-right: 0.75rem;
        flex-shrink: 0;
      }
      
      h6 {
        margin-bottom: 0.25rem;
        font-weight: 600;
        color: var(--dark-color);
      }
      
      small {
        color: var(--secondary-color);
        font-size: 0.8rem;
      }
    }
  }
  
  .quick-actions {
    .btn {
      border-radius: 0.75rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .dashboard-page {
    .welcome-section {
      padding: 1.5rem;
      text-align: center;
      
      h1 {
        font-size: 2rem;
      }
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .stat-card {
      padding: 1.25rem;
      
      .stat-number {
        font-size: 2rem;
      }
    }
  }
}

// Animation classes
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

.slide-in-left {
  animation: slideInLeft 0.6s ease-out;
}

.slide-in-right {
  animation: slideInRight 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

```scss
.employees-page {
  .page-header {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, var(--primary-color), #0056b3);
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
      }
    }
  }
  
  .filters-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    .form-control,
    .form-select {
      border: 2px solid #e9ecef;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
      }
    }
    
    .btn-outline-secondary {
      border: 2px solid #e9ecef;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #e9ecef;
        border-color: #e9ecef;
        color: var(--dark-color);
      }
    }
  }
  
  .employees-table-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    overflow: hidden;
    
    .table {
      margin-bottom: 0;
      
      thead {
        background-color: #f8f9fa;
        
        th {
          border: none;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: var(--dark-color);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
      
      tbody {
        tr {
          transition: all 0.2s ease;
          
          &:hover {
            background-color: #f8f9fa;
          }
          
          td {
            border: none;
            padding: 1rem 1.5rem;
            vertical-align: middle;
            border-bottom: 1px solid #f8f9fa;
            
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
    
    .employee-info {
      display: flex;
      align-items: center;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
        color: white;
        background: var(--primary-color);
        margin-right: 0.75rem;
        flex-shrink: 0;
      }
      
      .employee-details {
        h6 {
          margin-bottom: 0.25rem;
          font-weight: 600;
          color: var(--dark-color);
          font-size: 0.9rem;
        }
        
        small {
          color: var(--secondary-color);
          font-size: 0.8rem;
        }
      }
    }
    
    .btn-outline-primary {
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      border-radius: 0.375rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
        transform: translateY(-1px);
      }
    }
  }
  
  .empty-state {
    background: white;
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    i {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    h5 {
      color: var(--dark-color);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
  }
}

// Badge styles
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  
  &.bg-success {
    background-color: var(--success-color) !important;
  }
  
  &.bg-secondary {
    background-color: var(--secondary-color) !important;
  }
}

// Responsive design
@media (max-width: 768px) {
  .employees-page {
    .page-header {
      padding: 1rem;
      text-align: center;
      
      .d-flex {
        flex-direction: column;
        gap: 1rem;
      }
    }
    
    .filters-card {
      padding: 1rem;
      
      .row {
        gap: 1rem;
      }
    }
    
    .employees-table-card {
      .table {
        font-size: 0.875rem;
        
        th,
        td {
          padding: 0.75rem 1rem;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .employees-page {
    .employees-table-card {
      .table {
        font-size: 0.8rem;
        
        th,
        td {
          padding: 0.5rem 0.75rem;
        }
      }
      
      .employee-info {
        .avatar {
          width: 32px;
          height: 32px;
          font-size: 0.75rem;
          margin-right: 0.5rem;
        }
        
        .employee-details {
          h6 {
            font-size: 0.8rem;
          }
          
          small {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
}
```

```scss
.employee-detail-page {
  .page-header {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0;
    }
    
    .btn {
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &.btn-outline-secondary {
        border: 2px solid #e9ecef;
        color: var(--secondary-color);
        
        &:hover {
          background-color: #e9ecef;
          border-color: #e9ecef;
          color: var(--dark-color);
        }
      }
      
      &.btn-outline-primary {
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        
        &:hover {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }
      }
      
      &.btn-primary {
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        border: none;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }
      }
    }
  }
  
  .profile-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    text-align: center;
    
    .profile-image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 600;
      color: white;
      background: linear-gradient(135deg, var(--primary-color), #0056b3);
    }
    
    h4 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .badge {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .employee-info {
      text-align: left;
      
      .info-item {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        font-size: 0.9rem;
        color: var(--dark-color);
        
        i {
          width: 20px;
          margin-right: 0.75rem;
          color: var(--secondary-color);
        }
      }
    }
  }
  
  .manager-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    .card-header {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      border-radius: 1rem 1rem 0 0 !important;
      padding: 1rem 1.5rem;
      
      h6 {
        margin-bottom: 0;
        font-weight: 600;
        color: var(--dark-color);
      }
    }
    
    .card-body {
      padding: 1.5rem;
    }
    
    .manager-info {
      display: flex;
      align-items: center;
      
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.875rem;
        color: white;
        background: var(--secondary-color);
        margin-right: 0.75rem;
        flex-shrink: 0;
      }
      
      .manager-details {
        h6 {
          margin-bottom: 0.25rem;
          font-weight: 600;
          color: var(--dark-color);
          font-size: 0.9rem;
        }
        
        small {
          color: var(--secondary-color);
          font-size: 0.8rem;
        }
      }
    }
  }
  
  .tabs-section {
    .nav-tabs {
      border-bottom: 2px solid #e9ecef;
      margin-bottom: 1.5rem;
      
      .nav-link {
        border: none;
        border-radius: 0.5rem 0.5rem 0 0;
        padding: 0.75rem 1.5rem;
        font-weight: 500;
        color: var(--secondary-color);
        transition: all 0.3s ease;
        
        &:hover {
          border-color: transparent;
          color: var(--primary-color);
          background-color: #f8f9fa;
        }
        
        &.active {
          color: var(--primary-color);
          background-color: white;
          border-bottom: 2px solid var(--primary-color);
        }
      }
    }
    
    .tab-content {
      .card {
        border: none;
        border-radius: 1rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        border: 1px solid #e9ecef;
        
        .card-header {
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
          border-radius: 1rem 1rem 0 0 !important;
          padding: 1rem 1.5rem;
          
          h6 {
            margin-bottom: 0;
            font-weight: 600;
            color: var(--dark-color);
          }
        }
        
        .card-body {
          padding: 1.5rem;
        }
      }
    }
  }
  
  .info-list {
    .info-item {
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid #f8f9fa;
      
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      
      strong {
        display: inline-block;
        width: 140px;
        color: var(--dark-color);
        font-weight: 600;
      }
    }
  }
  
  .skills-list {
    .badge {
      font-size: 0.8rem;
      padding: 0.5rem 0.75rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      border-radius: 0.375rem;
    }
  }
  
  .review-item,
  .leave-item {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h6 {
      font-weight: 600;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
    }
    
    .rating {
      i {
        font-size: 1rem;
        margin-right: 0.125rem;
        color: #ffc107;
      }
    }
    
    .badge {
      font-size: 0.75rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .employee-detail-page {
    .page-header {
      padding: 1rem;
      
      .d-flex {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
    }
    
    .profile-card {
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .tabs-section {
      .nav-tabs {
        .nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .employee-detail-page {
    .profile-card {
      .profile-image {
        width: 100px;
        height: 100px;
        font-size: 1.5rem;
      }
      
      h4 {
        font-size: 1.25rem;
      }
    }
    
    .info-list {
      .info-item {
        strong {
          width: 100px;
          font-size: 0.9rem;
        }
      }
    }
  }
}
```

```scss
.leave-requests-page {
  .page-header {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, var(--primary-color), #0056b3);
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
      }
    }
  }
  
  .filters-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    .form-select {
      border: 2px solid #e9ecef;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
      }
    }
    
    .btn-outline-secondary {
      border: 2px solid #e9ecef;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #e9ecef;
        border-color: #e9ecef;
        color: var(--dark-color);
      }
    }
  }
  
  .leave-requests-table-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    overflow: hidden;
    
    .table {
      margin-bottom: 0;
      
      thead {
        background-color: #f8f9fa;
        
        th {
          border: none;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: var(--dark-color);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }
      
      tbody {
        tr {
          transition: all 0.2s ease;
          
          &:hover {
            background-color: #f8f9fa;
          }
          
          td {
            border: none;
            padding: 1rem 1.5rem;
            vertical-align: middle;
            border-bottom: 1px solid #f8f9fa;
            
            &:last-child {
              border-bottom: none;
            }
          }
        }
      }
    }
    
    .employee-info {
      h6 {
        margin-bottom: 0.25rem;
        font-weight: 600;
        color: var(--dark-color);
        font-size: 0.9rem;
      }
      
      small {
        color: var(--secondary-color);
        font-size: 0.8rem;
      }
    }
    
    .btn {
      border-radius: 0.375rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &.btn-success {
        background-color: var(--success-color);
        border-color: var(--success-color);
        
        &:hover {
          background-color: #146c43;
          border-color: #146c43;
          transform: translateY(-1px);
        }
      }
      
      &.btn-danger {
        background-color: var(--danger-color);
        border-color: var(--danger-color);
        
        &:hover {
          background-color: #b02a37;
          border-color: #b02a37;
          transform: translateY(-1px);
        }
      }
      
      &.btn-outline-primary {
        border: 2px solid var(--primary-color);
        color: var(--primary-color);
        
        &:hover {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
        }
      }
    }
  }
  
  .empty-state {
    background: white;
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    i {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    h5 {
      color: var(--dark-color);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
  }
}

// Badge styles for leave types and status
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  
  // Leave type badges
  &.bg-primary { background-color: var(--primary-color) !important; }
  &.bg-info { background-color: var(--info-color) !important; }
  &.bg-secondary { background-color: var(--secondary-color) !important; }
  &.bg-success { background-color: var(--success-color) !important; }
  &.bg-dark { background-color: var(--dark-color) !important; }
  &.bg-warning { background-color: var(--warning-color) !important; }
  
  // Status badges
  &.bg-warning { background-color: var(--warning-color) !important; }
  &.bg-danger { background-color: var(--danger-color) !important; }
}

// Action buttons container
.actions-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

// Responsive design
@media (max-width: 768px) {
  .leave-requests-page {
    .page-header {
      padding: 1rem;
      text-align: center;
      
      .d-flex {
        flex-direction: column;
        gap: 1rem;
      }
    }
    
    .filters-card {
      padding: 1rem;
      
      .row {
        gap: 1rem;
      }
    }
    
    .leave-requests-table-card {
      .table {
        font-size: 0.875rem;
        
        th,
        td {
          padding: 0.75rem 1rem;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .leave-requests-page {
    .leave-requests-table-card {
      .table {
        font-size: 0.8rem;
        
        th,
        td {
          padding: 0.5rem 0.75rem;
        }
      }
      
      .actions-container {
        flex-direction: column;
        gap: 0.25rem;
        
        .btn {
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
        }
      }
    }
  }
}
```

```scss
.performance-reviews-page {
  .page-header {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, var(--primary-color), #0056b3);
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
      }
    }
  }
  
  .filters-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    .form-select {
      border: 2px solid #e9ecef;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      transition: all 0.3s ease;
      
      &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
      }
    }
    
    .btn-outline-secondary {
      border: 2px solid #e9ecef;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #e9ecef;
        border-color: #e9ecef;
        color: var(--dark-color);
      }
    }
  }
  
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 1.5rem;
  }
  
  .review-card {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    transition: all 0.3s ease;
    height: 100%;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      border-radius: 1rem 1rem 0 0 !important;
      padding: 1.25rem 1.5rem;
      
      h6 {
        margin-bottom: 0.25rem;
        font-weight: 600;
        color: var(--dark-color);
        font-size: 1rem;
      }
      
      small {
        color: var(--secondary-color);
        font-size: 0.875rem;
      }
      
      .badge {
        font-size: 0.75rem;
        padding: 0.375rem 0.75rem;
        border-radius: 0.375rem;
      }
    }
    
    .card-body {
      padding: 1.5rem;
      
      .rating-section {
        margin-bottom: 1.5rem;
        
        .rating-label {
          font-size: 0.9rem;
          color: var(--secondary-color);
          margin-bottom: 0.5rem;
        }
        
        .rating {
          i {
            font-size: 1.25rem;
            margin-right: 0.25rem;
            color: #ffc107;
          }
        }
      }
      
      .goals-section {
        margin-bottom: 1.5rem;
        
        h6 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 1rem;
        }
        
        .goal-item {
          margin-bottom: 1rem;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .goal-header {
            display: flex;
            justify-content: between;
            align-items: center;
            margin-bottom: 0.5rem;
            
            .goal-title {
              font-size: 0.85rem;
              font-weight: 500;
              color: var(--dark-color);
              flex: 1;
            }
            
            .goal-progress {
              font-size: 0.8rem;
              color: var(--secondary-color);
              font-weight: 500;
            }
          }
          
          .progress {
            height: 0.5rem;
            border-radius: 0.25rem;
            background-color: #e9ecef;
            
            .progress-bar {
              border-radius: 0.25rem;
              transition: width 0.6s ease;
              
              &.bg-success {
                background: linear-gradient(90deg, var(--success-color), #20c997);
              }
              
              &.bg-info {
                background: linear-gradient(90deg, var(--info-color), #6f42c1);
              }
              
              &.bg-warning {
                background: linear-gradient(90deg, var(--warning-color), #fd7e14);
              }
            }
          }
        }
      }
      
      .achievements-section,
      .improvements-section {
        margin-bottom: 1.5rem;
        
        h6 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 0.75rem;
        }
        
        ul {
          margin-bottom: 0;
          padding-left: 1.25rem;
          
          li {
            font-size: 0.85rem;
            color: var(--secondary-color);
            margin-bottom: 0.25rem;
            line-height: 1.4;
            
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      
      .comments-section {
        margin-bottom: 1.5rem;
        
        h6 {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--dark-color);
          margin-bottom: 0.75rem;
        }
        
        p {
          font-size: 0.85rem;
          color: var(--secondary-color);
          margin-bottom: 0;
          line-height: 1.5;
          font-style: italic;
        }
      }
      
      .card-footer {
        background: transparent;
        border-top: 1px solid #f8f9fa;
        padding: 1rem 0 0;
        margin-top: 1rem;
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          small {
            color: var(--secondary-color);
            font-size: 0.8rem;
          }
          
          .action-buttons {
            display: flex;
            gap: 0.5rem;
            
            .btn {
              border-radius: 0.375rem;
              padding: 0.375rem 0.75rem;
              font-size: 0.8rem;
              font-weight: 500;
              transition: all 0.3s ease;
              
              &.btn-outline-primary {
                border: 2px solid var(--primary-color);
                color: var(--primary-color);
                
                &:hover {
                  background-color: var(--primary-color);
                  border-color: var(--primary-color);
                  color: white;
                }
              }
              
              &.btn-primary {
                background-color: var(--primary-color);
                border-color: var(--primary-color);
                
                &:hover {
                  background-color: #0056b3;
                  border-color: #0056b3;
                  transform: translateY(-1px);
                }
              }
            }
          }
        }
      }
    }
  }
  
  .empty-state {
    background: white;
    border-radius: 1rem;
    padding: 3rem 2rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    i {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    h5 {
      color: var(--dark-color);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
  }
}

// Badge styles for review status
.badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  
  &.bg-secondary { background-color: var(--secondary-color) !important; }
  &.bg-warning { background-color: var(--warning-color) !important; }
  &.bg-info { background-color: var(--info-color) !important; }
  &.bg-success { background-color: var(--success-color) !important; }
}

// Responsive design
@media (max-width: 768px) {
  .performance-reviews-page {
    .page-header {
      padding: 1rem;
      text-align: center;
      
      .d-flex {
        flex-direction: column;
        gap: 1rem;
      }
    }
    
    .filters-card {
      padding: 1rem;
    }
    
    .reviews-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    
    .review-card {
      .card-header {
        padding: 1rem 1.25rem;
      }
      
      .card-body {
        padding: 1.25rem;
      }
    }
  }
}

@media (max-width: 576px) {
  .performance-reviews-page {
    .review-card {
      .card-body {
        .card-footer {
          .footer-content {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
            
            .action-buttons {
              width: 100%;
              justify-content: flex-end;
            }
          }
        }
      }
    }
  }
}
```

```scss
.settings-page {
  .page-header {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e9ecef;
    
    h1 {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--dark-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
  }
  
  .settings-sidebar {
    .card {
      border: none;
      border-radius: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e9ecef;
      overflow: hidden;
      
      .list-group {
        .list-group-item {
          border: none;
          border-bottom: 1px solid #f8f9fa;
          padding: 1rem 1.5rem;
          background: transparent;
          transition: all 0.3s ease;
          cursor: pointer;
          
          &:last-child {
            border-bottom: none;
          }
          
          &:hover {
            background-color: #f8f9fa;
            color: var(--primary-color);
          }
          
          &.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
            
            i {
              color: white;
            }
          }
          
          i {
            width: 20px;
            margin-right: 0.75rem;
            color: var(--secondary-color);
            transition: color 0.3s ease;
          }
          
          &:hover i,
          &.active i {
            color: inherit;
          }
        }
      }
    }
  }
  
  .settings-content {
    .card {
      border: none;
      border-radius: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid #e9ecef;
      
      .card-header {
        background: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        border-radius: 1rem 1rem 0 0 !important;
        padding: 1.25rem 1.5rem;
        
        h5 {
          margin-bottom: 0;
          font-weight: 600;
          color: var(--dark-color);
        }
      }
      
      .card-body {
        padding: 1.5rem;
      }
    }
    
    .form-group {
      margin-bottom: 1.5rem;
      
      .form-label {
        font-weight: 500;
        color: var(--dark-color);
        margin-bottom: 0.5rem;
      }
      
      .form-control,
      .form-select {
        border: 2px solid #e9ecef;
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }
      }
      
      .form-control[type="password"] {
        font-family: monospace;
      }
      
      .form-text {
        font-size: 0.8rem;
        color: var(--secondary-color);
        margin-top: 0.25rem;
      }
    }
    
    .form-check {
      margin-bottom: 1rem;
      
      .form-check-input {
        border: 2px solid #e9ecef;
        border-radius: 0.25rem;
        width: 1.25rem;
        height: 1.25rem;
        transition: all 0.3s ease;
        
        &:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        &:focus {
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }
      }
      
      .form-check-label {
        font-weight: 500;
        color: var(--dark-color);
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
    
    .btn {
      border-radius: 0.5rem;
      padding: 0.75rem 1.5rem;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &.btn-primary {
        background: linear-gradient(135deg, var(--primary-color), #0056b3);
        border: none;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }
        
        &:disabled {
          transform: none;
          box-shadow: none;
          opacity: 0.6;
        }
      }
    }
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 2rem;
    
    i {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    h5 {
      color: var(--dark-color);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: var(--secondary-color);
      margin-bottom: 0;
    }
  }
}

// Alert styles
.alert {
  border: none;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  
  &.alert-success {
    background-color: #d1e7dd;
    color: #0f5132;
    border-left: 4px solid var(--success-color);
  }
  
  &.alert-danger {
    background-color: #f8d7da;
    color: #842029;
    border-left: 4px solid var(--danger-color);
  }
  
  .btn-close {
    padding: 0.75rem 1rem;
  }
}

// Responsive design
@media (max-width: 768px) {
  .settings-page {
    .page-header {
      padding: 1rem;
      text-align: center;
    }
    
    .settings-sidebar {
      margin-bottom: 1.5rem;
      
      .card {
        .list-group {
          .list-group-item {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }
      }
    }
    
    .settings-content {
      .card {
        .card-header {
          padding: 1rem 1.25rem;
        }
        
        .card-body {
          padding: 1.25rem;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .settings-page {
    .settings-content {
      .form-group {
        margin-bottom: 1rem;
        
        .form-control,
        .form-select {
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
        }
      }
      
      .btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.9rem;
      }
    }
  }
}

// Animation for form elements
.form-group {
  animation: slideInUp 0.4s ease-out;
  animation-fill-mode: both;
  
  &:nth-child(1) { animation-delay: 0.1s; }
  &:nth-child(2) { animation-delay: 0.2s; }
  &:nth-child(3) { animation-delay: 0.3s; }
  &:nth-child(4) { animation-delay: 0.4s; }
  &:nth-child(5) { animation-delay: 0.5s; }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Now let me create the Dockerfile for the client:


```dockerfile
# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

Now let me create the server directory structure with Node.js/Express backend:


```json
{
  "name": "hr-management-server",
  "version": "1.0.0",
  "description": "Backend server for HR Management Application",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "db:migrate": "npx prisma migrate dev",
    "db:seed": "npx prisma db seed",
    "db:generate": "npx prisma generate",
    "db:studio": "npx prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.7.0",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "compression": "^1.7.4",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.7",
    "speakeasy": "^2.0.0",
    "qrcode": "^1.5.3",
    "redis": "^4.6.10",
    "winston": "^3.11.0",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/morgan": "^1.9.9",
    "@types/compression": "^1.7.5",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/multer": "^1.4.11",
    "@types/nodemailer": "^6.4.14",
    "@types/speakeasy": "^2.0.10",
    "@types/qrcode": "^1.5.5",
    "@types/swagger-jsdoc": "^6.0.4",
    "@types/swagger-ui-express": "^4.1.6",
    "@types/jest": "^29.5.8",
    "@types/supertest": "^2.0.16",
    "typescript": "^5.3.2",
    "nodemon": "^3.0.2",
    "ts-node": "^10.9.1",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "supertest": "^6.3.3",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.13.1",
    "@typescript-eslint/parser": "^6.13.1",
    "prisma": "^5.7.0"
  },
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/config/*": ["src/config/*"],
      "@/models/*": ["src/models/*"],
      "@/services/*": ["src/services/*"],
      "@/middleware/*": ["src/middleware/*"],
      "@/api/*": ["src/api/*"],
      "@/utils/*": ["src/utils/*"]
    },
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "src/**/*",
    "prisma/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ]
}
```

```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { logger } from './utils/logger';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';

// Import routes
import authRoutes from './api/routes/authRoutes';
import employeeRoutes from './api/routes/employeeRoutes';
import leaveRoutes from './api/routes/leaveRoutes';
import performanceRoutes from './api/routes/performanceRoutes';
import userRoutes from './api/routes/userRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HR Management API',
      version: '1.0.0',
      description: 'API documentation for HR Management Application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/api/routes/*.ts'], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    logger.info('Database connected successfully');

    // Connect to Redis
    await connectRedis();
    logger.info('Redis connected successfully');

    // Start the server
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`API Documentation available at http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

startServer();

export default app;
```

```typescript
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
});

// Log database queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    logger.debug('Query: ' + e.query);
    logger.debug('Params: ' + e.params);
    logger.debug('Duration: ' + e.duration + 'ms');
  });
}

// Log database errors
prisma.$on('error', (e) => {
  logger.error('Database error:', e);
});

// Log database info
prisma.$on('info', (e) => {
  logger.info('Database info:', e);
});

// Log database warnings
prisma.$on('warn', (e) => {
  logger.warn('Database warning:', e);
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('Database disconnected successfully');
  } catch (error) {
    logger.error('Failed to disconnect from database:', error);
    throw error;
  }
};

export { prisma };
```

```typescript
import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

let redisClient: RedisClientType;

export const connectRedis = async (): Promise<void> => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis connection failed after 10 retries');
            return new Error('Redis connection failed');
          }
          return Math.min(retries * 100, 3000);
        },
      },
    });

    redisClient.on('error', (error) => {
      logger.error('Redis client error:', error);
    });

    redisClient.on('connect', () => {
      logger.info('Redis client connected');
    });

    redisClient.on('ready', () => {
      logger.info('Redis client ready');
    });

    redisClient.on('end', () => {
      logger.info('Redis client disconnected');
    });

    await redisClient.connect();
    logger.info('Redis connected successfully');
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis disconnected successfully');
    }
  } catch (error) {
    logger.error('Failed to disconnect from Redis:', error);
    throw error;
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

// Cache utility functions
export const cache = {
  async get(key: string): Promise<string | null> {
    try {
      return await redisClient.get(key);
    } catch (error) {
      logger.error('Redis get error:', error);
      return null;
    }
  },

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await redisClient.setEx(key, ttl, value);
      } else {
        await redisClient.set(key, value);
      }
    } catch (error) {
      logger.error('Redis set error:', error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      logger.error('Redis delete error:', error);
    }
  },

  async exists(key: string): Promise<boolean> {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Redis exists error:', error);
      return false;
    }
  },

  async expire(key: string, ttl: number): Promise<void> {
    try {
      await redisClient.expire(key, ttl);
    } catch (error) {
      logger.error('Redis expire error:', error);
    }
  },
};
```

```typescript
import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which level to log based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define format for logs
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  
  // File transport for errors
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'error.log'),
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
  
  // File transport for all logs
  new winston.transports.File({
    filename: path.join(process.cwd(), 'logs', 'combined.log'),
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
  }),
];

// Create the logger
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
  exitOnError: false,
});

// Create logs directory if it doesn't exist
import fs from 'fs';
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
```

```typescript
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode = 500, message } = error;

  // Log error
  logger.error(`Error ${statusCode}: ${message}`, {
    error: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    },
  });
};

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

```typescript
import { Request, Response, NextFunction } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
```

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { createError } from './errorHandler';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Access token required', 401);
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      throw createError('JWT secret not configured', 500);
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    
    // Check if user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      throw createError('User not found or inactive', 401);
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      next(createError('Invalid token', 401));
    } else if (error.name === 'TokenExpiredError') {
      next(createError('Token expired', 401));
    } else {
      next(error);
    }
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(createError('Authentication required', 401));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(createError('Insufficient permissions', 403));
      return;
    }

    next();
  };
};

export const optionalAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      next();
      return;
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (user && user.isActive) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }

    next();
  } catch (error) {
    // For optional auth, we don't throw errors, just continue without user
    next();
  }
};
```

```typescript
import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate } from '../../middleware/auth';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - firstName
 *         - lastName
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The user's email
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         role:
 *           type: string
 *           enum: [admin, hr_manager, manager, employee]
 *           description: The user's role
 *         isActive:
 *           type: boolean
 *           description: Whether the user is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the user was last updated
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               rememberMe:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     token:
 *                       type: string
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Unauthorized
 */
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('rememberMe').optional().isBoolean().withMessage('Remember me must be a boolean'),
  validateRequest,
], authController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authenticate, authController.logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/me', authenticate, authController.getCurrentUser);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/refresh', authenticate, authController.refreshToken);

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post('/change-password', [
  authenticate,
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  validateRequest,
], authController.changePassword);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Invalid email
 */
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  validateRequest,
], authController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid token or password
 */
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validateRequest,
], authController.resetPassword);

export default router;
```

```typescript
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { createError } from './errorHandler';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.type === 'field' ? (error as any).path : 'unknown',
      message: error.msg,
    }));
    
    const error = createError('Validation failed', 400);
    (error as any).errors = errorMessages;
    next(error);
    return;
  }
  
  next();
};
```

```typescript
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database';
import { AuthRequest } from '../../middleware/auth';
import { createError, asyncHandler } from '../../middleware/errorHandler';
import { logger } from '../../utils/logger';

export class AuthController {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: User login
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *               password:
   *                 type: string
   *               rememberMe:
   *                 type: boolean
   *     responses:
   *       200:
   *         description: Login successful
   *       400:
   *         description: Invalid credentials
   */
  login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, rememberMe } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        employee: true,
      },
    });

    if (!user || !user.isActive) {
      throw createError('Invalid credentials', 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw createError('Invalid credentials', 401);
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw createError('JWT secret not configured', 500);
    }

    const tokenExpiry = rememberMe ? '30d' : '24h';
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    logger.info(`User ${user.email} logged in successfully`);

    res.status(200).json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  });

  /**
   * @swagger
   * /api/auth/logout:
   *   post:
   *     summary: User logout
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Logout successful
   */
  logout = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return success
    logger.info(`User ${req.user?.email} logged out`);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });

  /**
   * @swagger
   * /api/auth/me:
   *   get:
   *     summary: Get current user
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Current user information
   */
  getCurrentUser = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        employee: true,
      },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  });

  /**
   * @swagger
   * /api/auth/refresh:
   *   post:
   *     summary: Refresh access token
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Token refreshed successfully
   */
  refreshToken = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw createError('JWT secret not configured', 500);
    }

    const token = jwt.sign(
      { 
        userId: req.user!.id,
        email: req.user!.email,
        role: req.user!.role,
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      success: true,
      data: { token },
    });
  });

  /**
   * @swagger
   * /api/auth/change-password:
   *   post:
   *     summary: Change user password
   *     tags: [Authentication]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - currentPassword
   *               - newPassword
   *             properties:
   *               currentPassword:
   *                 type: string
   *               newPassword:
   *                 type: string
   *     responses:
   *       200:
   *         description: Password changed successfully
   */
  changePassword = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      throw createError('Current password is incorrect', 400);
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    logger.info(`User ${user.email} changed password`);

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  });

  /**
   * @swagger
   * /api/auth/forgot-password:
   *   post:
   *     summary: Request password reset
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *     responses:
   *       200:
   *         description: Password reset email sent
   */
  forgotPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      res.status(200).json({
        success: true,
        message: 'If the email exists, a password reset link has been sent',
      });
      return;
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, type: 'password-reset' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // In a real application, you would send an email here
    logger.info(`Password reset requested for ${email}. Token: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'If the email exists, a password reset link has been sent',
    });
  });

  /**
   * @swagger
   * /api/auth/reset-password:
   *   post:
   *     summary: Reset password with token
   *     tags: [Authentication]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - token
   *               - password
   *             properties:
   *               token:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Password reset successfully
   */
  resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { token, password } = req.body;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      if (decoded.type !== 'password-reset') {
        throw createError('Invalid reset token', 400);
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw createError('User not found', 404);
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      logger.info(`User ${user.email} reset password`);

      res.status(200).json({
        success: true,
        message: 'Password reset successfully',
      });
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw createError('Invalid or expired reset token', 400);
      }
      throw error;
    }
  });
}
```

Now let me create the remaining route files and the Prisma schema:


```typescript
import { Router } from 'express';
import { query, param, body } from 'express-validator';
import { EmployeeController } from '../controllers/EmployeeController';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();
const employeeController = new EmployeeController();

// Apply authentication to all routes
router.use(authenticate);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees with pagination and filters
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of employees per page
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filter by position
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive]
 *         description: Filter by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name or email
 *     responses:
 *       200:
 *         description: List of employees
 *       401:
 *         description: Unauthorized
 */
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('department').optional().isString().withMessage('Department must be a string'),
  query('position').optional().isString().withMessage('Position must be a string'),
  query('status').optional().isIn(['active', 'inactive']).withMessage('Status must be active or inactive'),
  query('search').optional().isString().withMessage('Search must be a string'),
  validateRequest,
], employeeController.getEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee details
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', [
  param('id').isUUID().withMessage('Invalid employee ID'),
  validateRequest,
], employeeController.getEmployee);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create new employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - department
 *               - position
 *               - salary
 *               - hireDate
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               hireDate:
 *                 type: string
 *                 format: date
 *               managerId:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 */
router.post('/', [
  authorize('admin', 'hr_manager'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phoneNumber').optional().isString().withMessage('Phone number must be a string'),
  body('department').notEmpty().withMessage('Department is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('hireDate').isISO8601().withMessage('Valid hire date is required'),
  body('managerId').optional().isUUID().withMessage('Invalid manager ID'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  validateRequest,
], employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               department:
 *                 type: string
 *               position:
 *                 type: string
 *               salary:
 *                 type: number
 *               managerId:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Employee not found
 */
router.put('/:id', [
  authorize('admin', 'hr_manager'),
  param('id').isUUID().withMessage('Invalid employee ID'),
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phoneNumber').optional().isString().withMessage('Phone number must be a string'),
  body('department').optional().notEmpty().withMessage('Department cannot be empty'),
  body('position').optional().notEmpty().withMessage('Position cannot be empty'),
  body('salary').optional().isNumeric().withMessage('Salary must be a number'),
  body('managerId').optional().isUUID().withMessage('Invalid manager ID'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  validateRequest,
], employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Employee not found
 */
router.delete('/:id', [
  authorize('admin', 'hr_manager'),
  param('id').isUUID().withMessage('Invalid employee ID'),
  validateRequest,
], employeeController.deleteEmployee);

/**
 * @swagger
 * /api/employees/stats:
 *   get:
 *     summary: Get employee statistics
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee statistics
 *       401:
 *         description: Unauthorized
 */
router.get('/stats', employeeController.getEmployeeStats);

/**
 * @swagger
 * /api/employees/search:
 *   get:
 *     summary: Search employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *       401:
 *         description: Unauthorized
 */
router.get('/search', [
  query('q').notEmpty().withMessage('Search query is required'),
  validateRequest,
], employeeController.searchEmployees);

export default router;
```

```typescript
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { AuthRequest } from '../../middleware/auth';
import { createError, asyncHandler } from '../../middleware/errorHandler';
import { logger } from '../../utils/logger';

export class EmployeeController {
  /**
   * Get all employees with pagination and filters
   */
  getEmployees = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = 1,
      limit = 10,
      department,
      position,
      status,
      search,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (department) {
      where.department = department;
    }

    if (position) {
      where.position = position;
    }

    if (status) {
      where.isActive = status === 'active';
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search as string, mode: 'insensitive' } },
        { lastName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.employee.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        data: employees,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      },
    });
  });

  /**
   * Get employee by ID
   */
  getEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
          },
        },
        directReports: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
          },
        },
        certifications: true,
        performanceReviews: {
          include: {
            reviewer: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        leaveRequests: {
          orderBy: { submittedAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!employee) {
      throw createError('Employee not found', 404);
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  });

  /**
   * Create new employee
   */
  createEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      department,
      position,
      salary,
      hireDate,
      managerId,
      skills = [],
    } = req.body;

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError('User with this email already exists', 400);
    }

    // Generate employee ID
    const employeeId = `EMP${Date.now().toString().slice(-6)}`;

    // Create user and employee in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          firstName,
          lastName,
          role: 'employee',
          password: 'temp_password', // This should be set by admin or through invitation
        },
      });

      // Create employee
      const employee = await tx.employee.create({
        data: {
          id: user.id,
          employeeId,
          firstName,
          lastName,
          email,
          phoneNumber,
          department,
          position,
          salary: parseFloat(salary),
          hireDate: new Date(hireDate),
          managerId,
          skills,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
              isActive: true,
            },
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      });

      return employee;
    });

    logger.info(`Employee created: ${result.email} by ${(req as AuthRequest).user?.email}`);

    res.status(201).json({
      success: true,
      data: result,
    });
  });

  /**
   * Update employee
   */
  updateEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw createError('Employee not found', 404);
    }

    // Update employee
    const employee = await prisma.employee.update({
      where: { id },
      data: {
        ...updateData,
        salary: updateData.salary ? parseFloat(updateData.salary) : undefined,
        hireDate: updateData.hireDate ? new Date(updateData.hireDate) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
        manager: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    logger.info(`Employee updated: ${employee.email} by ${(req as AuthRequest).user?.email}`);

    res.status(200).json({
      success: true,
      data: employee,
    });
  });

  /**
   * Delete employee
   */
  deleteEmployee = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // Check if employee exists
    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      throw createError('Employee not found', 404);
    }

    // Delete employee and user in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.employee.delete({
        where: { id },
      });

      await tx.user.delete({
        where: { id },
      });
    });

    logger.info(`Employee deleted: ${existingEmployee.email} by ${(req as AuthRequest).user?.email}`);

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
    });
  });

  /**
   * Get employee statistics
   */
  getEmployeeStats = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [total, active, byDepartment] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { isActive: true } }),
      prisma.employee.groupBy({
        by: ['department'],
        _count: {
          id: true,
        },
      }),
    ]);

    const departmentStats = byDepartment.reduce((acc, item) => {
      acc[item.department] = item._count.id;
      return acc;
    }, {} as Record<string, number>);

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        byDepartment: departmentStats,
      },
    });
  });

  /**
   * Search employees
   */
  searchEmployees = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;

    const employees = await prisma.employee.findMany({
      where: {
        OR: [
          { firstName: { contains: q as string, mode: 'insensitive' } },
          { lastName: { contains: q as string, mode: 'insensitive' } },
          { email: { contains: q as string, mode: 'insensitive' } },
          { employeeId: { contains: q as string, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        employeeId: true,
        firstName: true,
        lastName: true,
        email: true,
        position: true,
        department: true,
      },
      take: 10,
    });

    res.status(200).json({
      success: true,
      data: employees,
    });
  });
}
```

Now let me create the remaining route files and the Prisma schema:


```typescript
import { Router } from 'express';
import { query, param, body } from 'express-validator';
import { LeaveController } from '../controllers/LeaveController';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();
const leaveController = new LeaveController();

// Apply authentication to all routes
router.use(authenticate);

/**
 * @swagger
 * /api/leave/requests:
 *   get:
 *     summary: Get all leave requests with pagination and filters
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of requests per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, cancelled]
 *         description: Filter by status
 *       - in: query
 *         name: leaveType
 *         schema:
 *           type: string
 *           enum: [annual, sick, personal, maternity, paternity, bereavement, unpaid]
 *         description: Filter by leave type
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         description: Filter by employee ID
 *     responses:
 *       200:
 *         description: List of leave requests
 *       401:
 *         description: Unauthorized
 */
router.get('/requests', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'approved', 'rejected', 'cancelled']).withMessage('Invalid status'),
  query('leaveType').optional().isIn(['annual', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'unpaid']).withMessage('Invalid leave type'),
  query('employeeId').optional().isUUID().withMessage('Invalid employee ID'),
  validateRequest,
], leaveController.getLeaveRequests);

/**
 * @swagger
 * /api/leave/requests/{id}:
 *   get:
 *     summary: Get leave request by ID
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     responses:
 *       200:
 *         description: Leave request details
 *       404:
 *         description: Leave request not found
 *       401:
 *         description: Unauthorized
 */
router.get('/requests/:id', [
  param('id').isUUID().withMessage('Invalid leave request ID'),
  validateRequest,
], leaveController.getLeaveRequest);

/**
 * @swagger
 * /api/leave/requests:
 *   post:
 *     summary: Create new leave request
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leaveType
 *               - startDate
 *               - endDate
 *               - reason
 *             properties:
 *               leaveType:
 *                 type: string
 *                 enum: [annual, sick, personal, maternity, paternity, bereavement, unpaid]
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Leave request created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/requests', [
  body('leaveType').isIn(['annual', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'unpaid']).withMessage('Invalid leave type'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('reason').notEmpty().withMessage('Reason is required'),
  validateRequest,
], leaveController.createLeaveRequest);

/**
 * @swagger
 * /api/leave/requests/{id}/approve:
 *   post:
 *     summary: Approve leave request
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave request approved successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Leave request not found
 */
router.post('/requests/:id/approve', [
  authorize('admin', 'hr_manager', 'manager'),
  param('id').isUUID().withMessage('Invalid leave request ID'),
  body('comments').optional().isString().withMessage('Comments must be a string'),
  validateRequest,
], leaveController.approveLeaveRequest);

/**
 * @swagger
 * /api/leave/requests/{id}/reject:
 *   post:
 *     summary: Reject leave request
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comments
 *             properties:
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Leave request rejected successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Leave request not found
 */
router.post('/requests/:id/reject', [
  authorize('admin', 'hr_manager', 'manager'),
  param('id').isUUID().withMessage('Invalid leave request ID'),
  body('comments').notEmpty().withMessage('Comments are required for rejection'),
  validateRequest,
], leaveController.rejectLeaveRequest);

/**
 * @swagger
 * /api/leave/requests/{id}/cancel:
 *   post:
 *     summary: Cancel leave request
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Leave request ID
 *     responses:
 *       200:
 *         description: Leave request cancelled successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Leave request not found
 */
router.post('/requests/:id/cancel', [
  param('id').isUUID().withMessage('Invalid leave request ID'),
  validateRequest,
], leaveController.cancelLeaveRequest);

/**
 * @swagger
 * /api/leave/balance/{employeeId}:
 *   get:
 *     summary: Get leave balance for employee
 *     tags: [Leave Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: string
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Leave balance information
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 */
router.get('/balance/:employeeId', [
  param('employeeId').isUUID().withMessage('Invalid employee ID'),
  validateRequest,
], leaveController.getLeaveBalance);

export default router;
```

```typescript
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { AuthRequest } from '../../middleware/auth';
import { createError, asyncHandler } from '../../middleware/errorHandler';
import { logger } from '../../utils/logger';

export class LeaveController {
  /**
   * Get all leave requests with pagination and filters
   */
  getLeaveRequests = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = 1,
      limit = 10,
      status,
      leaveType,
      employeeId,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (leaveType) {
      where.leaveType = leaveType;
    }

    if (employeeId) {
      where.employeeId = employeeId;
    }

    // If user is not admin/hr_manager, only show their own requests
    const authReq = req as AuthRequest;
    if (authReq.user?.role === 'employee') {
      const employee = await prisma.employee.findFirst({
        where: { userId: authReq.user.id },
      });
      if (employee) {
        where.employeeId = employee.id;
      }
    }

    const [leaveRequests, total] = await Promise.all([
      prisma.leaveRequest.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
              department: true,
            },
          },
          reviewer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { submittedAt: 'desc' },
      }),
      prisma.leaveRequest.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        data: leaveRequests,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      },
    });
  });

  /**
   * Get leave request by ID
   */
  getLeaveRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (!leaveRequest) {
      throw createError('Leave request not found', 404);
    }

    // Check if user has permission to view this request
    const authReq = req as AuthRequest;
    if (authReq.user?.role === 'employee') {
      const employee = await prisma.employee.findFirst({
        where: { userId: authReq.user.id },
      });
      if (!employee || leaveRequest.employeeId !== employee.id) {
        throw createError('Access denied', 403);
      }
    }

    res.status(200).json({
      success: true,
      data: leaveRequest,
    });
  });

  /**
   * Create new leave request
   */
  createLeaveRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { leaveType, startDate, endDate, reason } = req.body;
    const authReq = req as AuthRequest;

    // Get employee ID from user
    const employee = await prisma.employee.findFirst({
      where: { userId: authReq.user!.id },
    });

    if (!employee) {
      throw createError('Employee record not found', 404);
    }

    // Calculate days requested
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const daysRequested = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    // Check for overlapping requests
    const overlappingRequest = await prisma.leaveRequest.findFirst({
      where: {
        employeeId: employee.id,
        status: { in: ['pending', 'approved'] },
        OR: [
          {
            startDate: { lte: end },
            endDate: { gte: start },
          },
        ],
      },
    });

    if (overlappingRequest) {
      throw createError('You already have a leave request for this period', 400);
    }

    // Create leave request
    const leaveRequest = await prisma.leaveRequest.create({
      data: {
        employeeId: employee.id,
        leaveType,
        startDate: start,
        endDate: end,
        daysRequested,
        reason,
        status: 'pending',
        submittedAt: new Date(),
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
      },
    });

    logger.info(`Leave request created: ${leaveRequest.id} by ${employee.email}`);

    res.status(201).json({
      success: true,
      data: leaveRequest,
    });
  });

  /**
   * Approve leave request
   */
  approveLeaveRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { comments } = req.body;
    const authReq = req as AuthRequest;

    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });

    if (!leaveRequest) {
      throw createError('Leave request not found', 404);
    }

    if (leaveRequest.status !== 'pending') {
      throw createError('Leave request is not pending', 400);
    }

    // Update leave request
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: authReq.user!.id,
        comments,
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    logger.info(`Leave request approved: ${id} by ${authReq.user?.email}`);

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  });

  /**
   * Reject leave request
   */
  rejectLeaveRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { comments } = req.body;
    const authReq = req as AuthRequest;

    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id },
    });

    if (!leaveRequest) {
      throw createError('Leave request not found', 404);
    }

    if (leaveRequest.status !== 'pending') {
      throw createError('Leave request is not pending', 400);
    }

    // Update leave request
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'rejected',
        reviewedAt: new Date(),
        reviewedBy: authReq.user!.id,
        comments,
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    logger.info(`Leave request rejected: ${id} by ${authReq.user?.email}`);

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  });

  /**
   * Cancel leave request
   */
  cancelLeaveRequest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const authReq = req as AuthRequest;

    const leaveRequest = await prisma.leaveRequest.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });

    if (!leaveRequest) {
      throw createError('Leave request not found', 404);
    }

    // Check if user has permission to cancel this request
    if (authReq.user?.role === 'employee') {
      const employee = await prisma.employee.findFirst({
        where: { userId: authReq.user.id },
      });
      if (!employee || leaveRequest.employeeId !== employee.id) {
        throw createError('Access denied', 403);
      }
    }

    if (leaveRequest.status !== 'pending') {
      throw createError('Only pending leave requests can be cancelled', 400);
    }

    // Update leave request
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'cancelled',
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
      },
    });

    logger.info(`Leave request cancelled: ${id} by ${authReq.user?.email}`);

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  });

  /**
   * Get leave balance for employee
   */
  getLeaveBalance = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { employeeId } = req.params;

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw createError('Employee not found', 404);
    }

    // Get leave requests for current year
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);

    const leaveRequests = await prisma.leaveRequest.findMany({
      where: {
        employeeId,
        status: 'approved',
        startDate: { gte: yearStart },
        endDate: { lte: yearEnd },
      },
    });

    // Calculate leave balance (assuming 20 days annual leave per year)
    const annualLeaveDays = 20;
    const usedAnnualLeave = leaveRequests
      .filter(req => req.leaveType === 'annual')
      .reduce((total, req) => total + req.daysRequested, 0);

    const usedSickLeave = leaveRequests
      .filter(req => req.leaveType === 'sick')
      .reduce((total, req) => total + req.daysRequested, 0);

    const usedPersonalLeave = leaveRequests
      .filter(req => req.leaveType === 'personal')
      .reduce((total, req) => total + req.daysRequested, 0);

    const balance = {
      annual: {
        total: annualLeaveDays,
        used: usedAnnualLeave,
        remaining: annualLeaveDays - usedAnnualLeave,
      },
      sick: {
        used: usedSickLeave,
      },
      personal: {
        used: usedPersonalLeave,
      },
    };

    res.status(200).json({
      success: true,
      data: balance,
    });
  });
}
```

Now let me create the remaining route files:


```typescript
import { Router } from 'express';
import { query, param, body } from 'express-validator';
import { PerformanceController } from '../controllers/PerformanceController';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();
const performanceController = new PerformanceController();

// Apply authentication to all routes
router.use(authenticate);

/**
 * @swagger
 * /api/performance/reviews:
 *   get:
 *     summary: Get all performance reviews with pagination and filters
 *     tags: [Performance Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of reviews per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, in_progress, completed, approved]
 *         description: Filter by status
 *       - in: query
 *         name: employeeId
 *         schema:
 *           type: string
 *         description: Filter by employee ID
 *     responses:
 *       200:
 *         description: List of performance reviews
 *       401:
 *         description: Unauthorized
 */
router.get('/reviews', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['draft', 'in_progress', 'completed', 'approved']).withMessage('Invalid status'),
  query('employeeId').optional().isUUID().withMessage('Invalid employee ID'),
  validateRequest,
], performanceController.getPerformanceReviews);

/**
 * @swagger
 * /api/performance/reviews/{id}:
 *   get:
 *     summary: Get performance review by ID
 *     tags: [Performance Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Performance review ID
 *     responses:
 *       200:
 *         description: Performance review details
 *       404:
 *         description: Performance review not found
 *       401:
 *         description: Unauthorized
 */
router.get('/reviews/:id', [
  param('id').isUUID().withMessage('Invalid performance review ID'),
  validateRequest,
], performanceController.getPerformanceReview);

/**
 * @swagger
 * /api/performance/reviews:
 *   post:
 *     summary: Create new performance review
 *     tags: [Performance Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - reviewPeriod
 *               - overallRating
 *             properties:
 *               employeeId:
 *                 type: string
 *               reviewPeriod:
 *                 type: string
 *               overallRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               goals:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     targetDate:
 *                       type: string
 *                       format: date
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               areasForImprovement:
 *                 type: array
 *                 items:
 *                   type: string
 *               comments:
 *                 type: string
 *     responses:
 *       201:
 *         description: Performance review created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 */
router.post('/reviews', [
  authorize('admin', 'hr_manager', 'manager'),
  body('employeeId').isUUID().withMessage('Invalid employee ID'),
  body('reviewPeriod').notEmpty().withMessage('Review period is required'),
  body('overallRating').isInt({ min: 1, max: 5 }).withMessage('Overall rating must be between 1 and 5'),
  body('goals').optional().isArray().withMessage('Goals must be an array'),
  body('achievements').optional().isArray().withMessage('Achievements must be an array'),
  body('areasForImprovement').optional().isArray().withMessage('Areas for improvement must be an array'),
  body('comments').optional().isString().withMessage('Comments must be a string'),
  validateRequest,
], performanceController.createPerformanceReview);

/**
 * @swagger
 * /api/performance/reviews/{id}:
 *   put:
 *     summary: Update performance review
 *     tags: [Performance Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Performance review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               overallRating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               goals:
 *                 type: array
 *                 items:
 *                   type: object
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               areasForImprovement:
 *                 type: array
 *                 items:
 *                   type: string
 *               comments:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, in_progress, completed, approved]
 *     responses:
 *       200:
 *         description: Performance review updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Performance review not found
 */
router.put('/reviews/:id', [
  authorize('admin', 'hr_manager', 'manager'),
  param('id').isUUID().withMessage('Invalid performance review ID'),
  body('overallRating').optional().isInt({ min: 1, max: 5 }).withMessage('Overall rating must be between 1 and 5'),
  body('goals').optional().isArray().withMessage('Goals must be an array'),
  body('achievements').optional().isArray().withMessage('Achievements must be an array'),
  body('areasForImprovement').optional().isArray().withMessage('Areas for improvement must be an array'),
  body('comments').optional().isString().withMessage('Comments must be a string'),
  body('status').optional().isIn(['draft', 'in_progress', 'completed', 'approved']).withMessage('Invalid status'),
  validateRequest,
], performanceController.updatePerformanceReview);

/**
 * @swagger
 * /api/performance/reviews/{id}:
 *   delete:
 *     summary: Delete performance review
 *     tags: [Performance Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Performance review ID
 *     responses:
 *       200:
 *         description: Performance review deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions
 *       404:
 *         description: Performance review not found
 */
router.delete('/reviews/:id', [
  authorize('admin', 'hr_manager'),
  param('id').isUUID().withMessage('Invalid performance review ID'),
  validateRequest,
], performanceController.deletePerformanceReview);

/**
 * @swagger
 * /api/performance/goals/{id}:
 *   put:
 *     summary: Update performance goal
 *     tags: [Performance Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Performance goal ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [not_started, in_progress, completed, cancelled]
 *               progress:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: Performance goal updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Performance goal not found
 */
router.put('/goals/:id', [
  param('id').isUUID().withMessage('Invalid performance goal ID'),
  body('status').optional().isIn(['not_started', 'in_progress', 'completed', 'cancelled']).withMessage('Invalid status'),
  body('progress').optional().isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('comments').optional().isString().withMessage('Comments must be a string'),
  validateRequest,
], performanceController.updatePerformanceGoal);

export default router;
```

```typescript
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { AuthRequest } from '../../middleware/auth';
import { createError, asyncHandler } from '../../middleware/errorHandler';
import { logger } from '../../utils/logger';

export class PerformanceController {
  /**
   * Get all performance reviews with pagination and filters
   */
  getPerformanceReviews = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = 1,
      limit = 10,
      status,
      employeeId,
    } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (employeeId) {
      where.employeeId = employeeId;
    }

    // If user is employee, only show their own reviews
    const authReq = req as AuthRequest;
    if (authReq.user?.role === 'employee') {
      const employee = await prisma.employee.findFirst({
        where: { userId: authReq.user.id },
      });
      if (employee) {
        where.employeeId = employee.id;
      }
    }

    const [reviews, total] = await Promise.all([
      prisma.performanceReview.findMany({
        where,
        skip,
        take: limitNum,
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              position: true,
              department: true,
            },
          },
          reviewer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          goals: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.performanceReview.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      data: {
        data: reviews,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages,
        },
      },
    });
  });

  /**
   * Get performance review by ID
   */
  getPerformanceReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const review = await prisma.performanceReview.findUnique({
      where: { id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        goals: true,
      },
    });

    if (!review) {
      throw createError('Performance review not found', 404);
    }

    // Check if user has permission to view this review
    const authReq = req as AuthRequest;
    if (authReq.user?.role === 'employee') {
      const employee = await prisma.employee.findFirst({
        where: { userId: authReq.user.id },
      });
      if (!employee || review.employeeId !== employee.id) {
        throw createError('Access denied', 403);
      }
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  });

  /**
   * Create new performance review
   */
  createPerformanceReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
      employeeId,
      reviewPeriod,
      overallRating,
      goals = [],
      achievements = [],
      areasForImprovement = [],
      comments = '',
    } = req.body;

    const authReq = req as AuthRequest;

    // Check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw createError('Employee not found', 404);
    }

    // Create performance review with goals in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const review = await tx.performanceReview.create({
        data: {
          employeeId,
          reviewerId: authReq.user!.id,
          reviewPeriod,
          overallRating,
          achievements,
          areasForImprovement,
          comments,
          status: 'draft',
        },
      });

      // Create goals if provided
      if (goals.length > 0) {
        await tx.performanceGoal.createMany({
          data: goals.map((goal: any) => ({
            reviewId: review.id,
            title: goal.title,
            description: goal.description,
            targetDate: new Date(goal.targetDate),
            status: 'not_started',
            progress: 0,
          })),
        });
      }

      return review;
    });

    // Fetch the complete review with goals
    const completeReview = await prisma.performanceReview.findUnique({
      where: { id: result.id },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        goals: true,
      },
    });

    logger.info(`Performance review created: ${result.id} by ${authReq.user?.email}`);

    res.status(201).json({
      success: true,
      data: completeReview,
    });
  });

  /**
   * Update performance review
   */
  updatePerformanceReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateData = req.body;

    const review = await prisma.performanceReview.findUnique({
      where: { id },
    });

    if (!review) {
      throw createError('Performance review not found', 404);
    }

    // Update performance review
    const updatedReview = await prisma.performanceReview.update({
      where: { id },
      data: {
        ...updateData,
        updatedAt: new Date(),
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            position: true,
            department: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        goals: true,
      },
    });

    logger.info(`Performance review updated: ${id} by ${(req as AuthRequest).user?.email}`);

    res.status(200).json({
      success: true,
      data: updatedReview,
    });
  });

  /**
   * Delete performance review
   */
  deletePerformanceReview = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const review = await prisma.performanceReview.findUnique({
      where: { id },
    });

    if (!review) {
      throw createError('Performance review not found', 404);
    }

    // Delete performance review and related goals in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.performanceGoal.deleteMany({
        where: { reviewId: id },
      });

      await tx.performanceReview.delete({
        where: { id },
      });
    });

    logger.info(`Performance review deleted: ${id} by ${(req as AuthRequest).user?.email}`);

    res.status(200).json({
      success: true,
      message: 'Performance review deleted successfully',
    });
  });

  /**
   * Update performance goal
   */
  updatePerformanceGoal = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, progress, comments } = req.body;

    const goal = await prisma.performanceGoal.findUnique({
      where: { id },
    });

    if (!goal) {
      throw createError('Performance goal not found', 404);
    }

    // Update performance goal
    const updatedGoal = await prisma.performanceGoal.update({
      where: { id },
      data: {
        status,
        progress,
        comments,
      },
    });

    logger.info(`Performance goal updated: ${id} by ${(req as AuthRequest).user?.email}`);

    res.status(200).json({
      success: true,
      data: updatedGoal,
    });
  });
}
```

```typescript
import { Router } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../../middleware/validateRequest';
import { authenticate } from '../../middleware/auth';

const router = Router();
const userController = new UserController();

// Apply authentication to all routes
router.use(authenticate);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', [
  body('firstName').optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName').optional().notEmpty().withMessage('Last name cannot be empty'),
  body('phoneNumber').optional().isString().withMessage('Phone number must be a string'),
  body('address').optional().isString().withMessage('Address must be a string'),
  validateRequest,
], userController.updateProfile);

/**
 * @swagger
 * /api/users/notifications:
 *   get:
 *     summary: Get user notifications
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User notifications
 *       401:
 *         description: Unauthorized
 */
router.get('/notifications', userController.getNotifications);

/**
 * @swagger
 * /api/users/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 */
router.put('/notifications/:id/read', userController.markNotificationAsRead);

/**
 * @swagger
 * /api/users/notifications/read-all:
 *   put:
 *     summary: Mark all notifications as read
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 *       401:
 *         description: Unauthorized
 */
router.put('/notifications/read-all', userController.markAllNotificationsAsRead);

export default router;
```

```typescript
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database';
import { AuthRequest } from '../../middleware/auth';
import { createError, asyncHandler } from '../../middleware/errorHandler';
import { logger } from '../../utils/logger';

export class UserController {
  /**
   * Update user profile
   */
  updateProfile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, phoneNumber, address } = req.body;
    const authReq = req as AuthRequest;

    const user = await prisma.user.update({
      where: { id: authReq.user!.id },
      data: {
        firstName,
        lastName,
        phoneNumber,
        address,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        address: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    logger.info(`User profile updated: ${user.email}`);

    res.status(200).json({
      success: true,
      data: user,
    });
  });

  /**
   * Get user notifications
   */
  getNotifications = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;

    const notifications = await prisma.notification.findMany({
      where: { userId: authReq.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    res.status(200).json({
      success: true,
      data: notifications,
    });
  });

  /**
   * Mark notification as read
   */
  markNotificationAsRead = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const authReq = req as AuthRequest;

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId: authReq.user!.id,
      },
    });

    if (!notification) {
      throw createError('Notification not found', 404);
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    res.status(200).json({
      success: true,
      data: updatedNotification,
    });
  });

  /**
   * Mark all notifications as read
   */
  markAllNotificationsAsRead = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;

    await prisma.notification.updateMany({
      where: {
        userId: authReq.user!.id,
        isRead: false,
      },
      data: { isRead: true },
    });

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read',
    });
  });
}
```

Now let me create the Prisma schema and the remaining files:


```plaintext
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          String   @id @default(cuid())
  email       String   @unique
  firstName   String
  lastName    String
  password    String
  role        UserRole @default(EMPLOYEE)
  phoneNumber String?
  address     String?
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  employee         Employee?
  notifications    Notification[]
  reviewedRequests LeaveRequest[] @relation("LeaveRequestReviewer")
  performanceReviews PerformanceReview[] @relation("PerformanceReviewer")

  @@map("users")
}

model Employee {
  id           String   @id @default(cuid())
  employeeId   String   @unique
  firstName    String
  lastName     String
  email        String   @unique
  phoneNumber  String?
  address      String?
  department   String
  position     String
  salary       Float
  hireDate     DateTime
  managerId    String?
  skills       String[]
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  user                User                 @relation(fields: [id], references: [id], onDelete: Cascade)
  manager             Employee?            @relation("EmployeeManager", fields: [managerId], references: [id])
  directReports       Employee[]           @relation("EmployeeManager")
  leaveRequests       LeaveRequest[]
  performanceReviews  PerformanceReview[]
  certifications      Certification[]

  @@map("employees")
}

model LeaveRequest {
  id            String      @id @default(cuid())
  employeeId    String
  leaveType     LeaveType
  startDate     DateTime
  endDate       DateTime
  daysRequested Int
  reason        String
  status        LeaveStatus @default(PENDING)
  submittedAt   DateTime    @default(now())
  reviewedAt    DateTime?
  reviewedBy    String?
  comments      String?

  // Relations
  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  reviewer User?    @relation("LeaveRequestReviewer", fields: [reviewedBy], references: [id])

  @@map("leave_requests")
}

model PerformanceReview {
  id                    String        @id @default(cuid())
  employeeId            String
  reviewerId            String
  reviewPeriod          String
  overallRating         Int
  achievements          String[]
  areasForImprovement   String[]
  comments              String
  status                ReviewStatus  @default(DRAFT)
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  // Relations
  employee Employee            @relation(fields: [employeeId], references: [id], onDelete: Cascade)
  reviewer User                @relation("PerformanceReviewer", fields: [reviewerId], references: [id])
  goals    PerformanceGoal[]

  @@map("performance_reviews")
}

model PerformanceGoal {
  id          String      @id @default(cuid())
  reviewId    String
  title       String
  description String
  targetDate  DateTime
  status      GoalStatus  @default(NOT_STARTED)
  progress    Int         @default(0)
  comments    String?

  // Relations
  review PerformanceReview @relation(fields: [reviewId], references: [id], onDelete: Cascade)

  @@map("performance_goals")
}

model Certification {
  id                   String    @id @default(cuid())
  employeeId           String
  name                 String
  issuingOrganization  String
  issueDate            DateTime
  expiryDate           DateTime?
  credentialId         String?

  // Relations
  employee Employee @relation(fields: [employeeId], references: [id], onDelete: Cascade)

  @@map("certifications")
}

model Notification {
  id        String           @id @default(cuid())
  userId    String
  title     String
  message   String
  type      NotificationType @default(INFO)
  isRead    Boolean          @default(false)
  actionUrl String?
  createdAt DateTime         @default(now())

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("notifications")
}

// Enums
enum UserRole {
  ADMIN
  HR_MANAGER
  MANAGER
  EMPLOYEE
}

enum LeaveType {
  ANNUAL
  SICK
  PERSONAL
  MATERNITY
  PATERNITY
  BEREAVEMENT
  UNPAID
}

enum LeaveStatus {
  PENDING
  APPROVED
  REJECTED
  CANCELLED
}

enum ReviewStatus {
  DRAFT
  IN_PROGRESS
  COMPLETED
  APPROVED
}

enum GoalStatus {
  NOT_STARTED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

enum NotificationType {
  INFO
  SUCCESS
  WARNING
  ERROR
}
```

```dockerfile
# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create logs directory
RUN mkdir -p logs

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
```

Now let me create the database migration and seed files:


```sql
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS hr_management;

-- Create user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hr_user') THEN
        CREATE ROLE hr_user LOGIN PASSWORD 'hr_password';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE hr_management TO hr_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO hr_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hr_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO hr_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hr_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hr_user;
```

```typescript
import { PrismaClient, UserRole, LeaveType, LeaveStatus, ReviewStatus, GoalStatus, NotificationType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hrmanagement.com' },
    update: {},
    create: {
      email: 'admin@hrmanagement.com',
      firstName: 'Admin',
      lastName: 'User',
      password: adminPassword,
      role: UserRole.ADMIN,
      phoneNumber: '+1-555-0100',
      address: '123 Admin Street, Admin City, AC 12345',
    },
  });

  // Create HR Manager
  const hrManagerPassword = await bcrypt.hash('hr123', 12);
  const hrManager = await prisma.user.upsert({
    where: { email: 'hr@hrmanagement.com' },
    update: {},
    create: {
      email: 'hr@hrmanagement.com',
      firstName: 'HR',
      lastName: 'Manager',
      password: hrManagerPassword,
      role: UserRole.HR_MANAGER,
      phoneNumber: '+1-555-0101',
      address: '456 HR Avenue, HR City, HC 12345',
    },
  });

  // Create Manager
  const managerPassword = await bcrypt.hash('manager123', 12);
  const manager = await prisma.user.upsert({
    where: { email: 'manager@hrmanagement.com' },
    update: {},
    create: {
      email: 'manager@hrmanagement.com',
      firstName: 'John',
      lastName: 'Manager',
      password: managerPassword,
      role: UserRole.MANAGER,
      phoneNumber: '+1-555-0102',
      address: '789 Manager Road, Manager City, MC 12345',
    },
  });

  // Create employees
  const employeePassword = await bcrypt.hash('employee123', 12);
  
  const employee1 = await prisma.user.upsert({
    where: { email: 'john.doe@hrmanagement.com' },
    update: {},
    create: {
      email: 'john.doe@hrmanagement.com',
      firstName: 'John',
      lastName: 'Doe',
      password: employeePassword,
      role: UserRole.EMPLOYEE,
      phoneNumber: '+1-555-0103',
      address: '321 Employee Lane, Employee City, EC 12345',
    },
  });

  const employee2 = await prisma.user.upsert({
    where: { email: 'jane.smith@hrmanagement.com' },
    update: {},
    create: {
      email: 'jane.smith@hrmanagement.com',
      firstName: 'Jane',
      lastName: 'Smith',
      password: employeePassword,
      role: UserRole.EMPLOYEE,
      phoneNumber: '+1-555-0104',
      address: '654 Employee Street, Employee City, EC 12345',
    },
  });

  const employee3 = await prisma.user.upsert({
    where: { email: 'bob.johnson@hrmanagement.com' },
    update: {},
    create: {
      email: 'bob.johnson@hrmanagement.com',
      firstName: 'Bob',
      lastName: 'Johnson',
      password: employeePassword,
      role: UserRole.EMPLOYEE,
      phoneNumber: '+1-555-0105',
      address: '987 Employee Avenue, Employee City, EC 12345',
    },
  });

  // Create employee records
  const managerEmployee = await prisma.employee.upsert({
    where: { id: manager.id },
    update: {},
    create: {
      id: manager.id,
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Manager',
      email: 'manager@hrmanagement.com',
      phoneNumber: '+1-555-0102',
      address: '789 Manager Road, Manager City, MC 12345',
      department: 'Engineering',
      position: 'Engineering Manager',
      salary: 120000,
      hireDate: new Date('2020-01-15'),
      skills: ['Leadership', 'Project Management', 'JavaScript', 'React', 'Node.js'],
    },
  });

  const emp1 = await prisma.employee.upsert({
    where: { id: employee1.id },
    update: {},
    create: {
      id: employee1.id,
      employeeId: 'EMP002',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@hrmanagement.com',
      phoneNumber: '+1-555-0103',
      address: '321 Employee Lane, Employee City, EC 12345',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      salary: 95000,
      hireDate: new Date('2021-03-10'),
      managerId: managerEmployee.id,
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    },
  });

  const emp2 = await prisma.employee.upsert({
    where: { id: employee2.id },
    update: {},
    create: {
      id: employee2.id,
      employeeId: 'EMP003',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@hrmanagement.com',
      phoneNumber: '+1-555-0104',
      address: '654 Employee Street, Employee City, EC 12345',
      department: 'Marketing',
      position: 'Marketing Specialist',
      salary: 75000,
      hireDate: new Date('2022-06-20'),
      skills: ['Digital Marketing', 'Content Creation', 'Social Media', 'Analytics'],
    },
  });

  const emp3 = await prisma.employee.upsert({
    where: { id: employee3.id },
    update: {},
    create: {
      id: employee3.id,
      employeeId: 'EMP004',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@hrmanagement.com',
      phoneNumber: '+1-555-0105',
      address: '987 Employee Avenue, Employee City, EC 12345',
      department: 'Engineering',
      position: 'Software Engineer',
      salary: 80000,
      hireDate: new Date('2022-09-05'),
      managerId: managerEmployee.id,
      skills: ['Python', 'Django', 'React', 'Docker', 'AWS'],
    },
  });

  // Create leave requests
  await prisma.leaveRequest.createMany({
    data: [
      {
        employeeId: emp1.id,
        leaveType: LeaveType.ANNUAL,
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-20'),
        daysRequested: 5,
        reason: 'Family vacation',
        status: LeaveStatus.PENDING,
        submittedAt: new Date('2024-01-10'),
      },
      {
        employeeId: emp2.id,
        leaveType: LeaveType.SICK,
        startDate: new Date('2024-01-12'),
        endDate: new Date('2024-01-12'),
        daysRequested: 1,
        reason: 'Medical appointment',
        status: LeaveStatus.APPROVED,
        submittedAt: new Date('2024-01-11'),
        reviewedAt: new Date('2024-01-11'),
        reviewedBy: manager.id,
      },
      {
        employeeId: emp3.id,
        leaveType: LeaveType.PERSONAL,
        startDate: new Date('2024-01-25'),
        endDate: new Date('2024-01-26'),
        daysRequested: 2,
        reason: 'Personal matters',
        status: LeaveStatus.PENDING,
        submittedAt: new Date('2024-01-20'),
      },
    ],
  });

  // Create performance reviews
  const review1 = await prisma.performanceReview.create({
    data: {
      employeeId: emp1.id,
      reviewerId: manager.id,
      reviewPeriod: 'Q4 2023',
      overallRating: 4,
      achievements: [
        'Successfully delivered the new feature ahead of schedule',
        'Improved team productivity by 20%',
        'Mentored 2 junior developers',
      ],
      areasForImprovement: [
        'Better documentation practices',
        'More proactive communication',
      ],
      comments: 'Excellent performance this quarter. Keep up the great work!',
      status: ReviewStatus.COMPLETED,
    },
  });

  const review2 = await prisma.performanceReview.create({
    data: {
      employeeId: emp3.id,
      reviewerId: manager.id,
      reviewPeriod: 'Q4 2023',
      overallRating: 3,
      achievements: [
        'Completed 3 major bug fixes',
        'Improved code quality metrics',
      ],
      areasForImprovement: [
        'Time management',
        'Technical documentation',
      ],
      comments: 'Good progress, but needs to focus on time management.',
      status: ReviewStatus.IN_PROGRESS,
    },
  });

  // Create performance goals
  await prisma.performanceGoal.createMany({
    data: [
      {
        reviewId: review1.id,
        title: 'Complete project delivery',
        description: 'Deliver the new feature on time',
        targetDate: new Date('2023-12-31'),
        status: GoalStatus.COMPLETED,
        progress: 100,
      },
      {
        reviewId: review1.id,
        title: 'Improve team collaboration',
        description: 'Lead weekly team meetings',
        targetDate: new Date('2023-12-15'),
        status: GoalStatus.COMPLETED,
        progress: 100,
      },
      {
        reviewId: review2.id,
        title: 'Learn new technology',
        description: 'Complete React certification',
        targetDate: new Date('2024-01-31'),
        status: GoalStatus.IN_PROGRESS,
        progress: 60,
      },
    ],
  });

  // Create certifications
  await prisma.certification.createMany({
    data: [
      {
        employeeId: emp1.id,
        name: 'AWS Certified Developer',
        issuingOrganization: 'Amazon Web Services',
        issueDate: new Date('2023-06-15'),
        expiryDate: new Date('2026-06-15'),
        credentialId: 'AWS-DEV-123456',
      },
      {
        employeeId: emp2.id,
        name: 'Google Analytics Certified',
        issuingOrganization: 'Google',
        issueDate: new Date('2023-08-20'),
        credentialId: 'GA-CERT-789012',
      },
    ],
  });

  // Create notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: emp1.id,
        title: 'Leave Request Approved',
        message: 'Your leave request for January 15-20 has been approved.',
        type: NotificationType.SUCCESS,
        actionUrl: '/leave-requests',
      },
      {
        userId: emp2.id,
        title: 'Performance Review Due',
        message: 'Your Q4 2023 performance review is due for completion.',
        type: NotificationType.WARNING,
        actionUrl: '/performance-reviews',
      },
      {
        userId: manager.id,
        title: 'New Leave Request',
        message: 'John Doe has submitted a new leave request.',
        type: NotificationType.INFO,
        actionUrl: '/leave-requests',
      },
    ],
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📋 Created users:');
  console.log(`- Admin: admin@hrmanagement.com (password: admin123)`);
  console.log(`- HR Manager: hr@hrmanagement.com (password: hr123)`);
  console.log(`- Manager: manager@hrmanagement.com (password: manager123)`);
  console.log(`- Employee 1: john.doe@hrmanagement.com (password: employee123)`);
  console.log(`- Employee 2: jane.smith@hrmanagement.com (password: employee123)`);
  console.log(`- Employee 3: bob.johnson@hrmanagement.com (password: employee123)`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```sql
-- Sample data for HR Management Application
-- This file contains additional sample data that can be loaded after the initial seed

-- Insert additional departments
INSERT INTO departments (name, description, created_at, updated_at) VALUES
('Human Resources', 'Human Resources Department', NOW(), NOW()),
('Finance', 'Finance and Accounting Department', NOW(), NOW()),
('Operations', 'Operations and Logistics Department', NOW(), NOW()),
('Customer Success', 'Customer Success and Support Department', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert additional positions
INSERT INTO positions (title, department, description, created_at, updated_at) VALUES
('HR Specialist', 'Human Resources', 'Handles recruitment and employee relations', NOW(), NOW()),
('Financial Analyst', 'Finance', 'Analyzes financial data and prepares reports', NOW(), NOW()),
('Operations Manager', 'Operations', 'Manages day-to-day operations', NOW(), NOW()),
('Customer Success Manager', 'Customer Success', 'Ensures customer satisfaction and retention', NOW(), NOW()),
('DevOps Engineer', 'Engineering', 'Manages infrastructure and deployment', NOW(), NOW()),
('UI/UX Designer', 'Engineering', 'Designs user interfaces and experiences', NOW(), NOW())
ON CONFLICT (title, department) DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, created_at, updated_at) VALUES
('Leadership', 'Soft Skills', NOW(), NOW()),
('Communication', 'Soft Skills', NOW(), NOW()),
('Problem Solving', 'Soft Skills', NOW(), NOW()),
('Team Management', 'Soft Skills', NOW(), NOW()),
('Project Management', 'Soft Skills', NOW(), NOW()),
('Agile/Scrum', 'Methodology', NOW(), NOW()),
('DevOps', 'Technical', NOW(), NOW()),
('Cloud Computing', 'Technical', NOW(), NOW()),
('Machine Learning', 'Technical', NOW(), NOW()),
('Data Analysis', 'Technical', NOW(), NOW()),
('Sales', 'Business', NOW(), NOW()),
('Marketing', 'Business', NOW(), NOW()),
('Customer Service', 'Business', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert leave policies
INSERT INTO leave_policies (leave_type, max_days_per_year, carry_over_days, created_at, updated_at) VALUES
('annual', 20, 5, NOW(), NOW()),
('sick', 10, 0, NOW(), NOW()),
('personal', 5, 0, NOW(), NOW()),
('maternity', 90, 0, NOW(), NOW()),
('paternity', 14, 0, NOW(), NOW()),
('bereavement', 5, 0, NOW(), NOW()),
('unpaid', 30, 0, NOW(), NOW())
ON CONFLICT (leave_type) DO NOTHING;

-- Insert performance review templates
INSERT INTO performance_review_templates (name, description, questions, created_at, updated_at) VALUES
('Standard Review', 'Standard performance review template', 
 '[
   {"question": "What were your main achievements this quarter?", "type": "text"},
   {"question": "What challenges did you face?", "type": "text"},
   {"question": "What are your goals for next quarter?", "type": "text"},
   {"question": "How would you rate your overall performance?", "type": "rating", "scale": 5}
 ]', NOW(), NOW()),
('Manager Review', 'Performance review template for managers',
 '[
   {"question": "How well did you lead your team?", "type": "rating", "scale": 5},
   {"question": "What team achievements are you most proud of?", "type": "text"},
   {"question": "How did you develop your team members?", "type": "text"},
   {"question": "What leadership challenges did you overcome?", "type": "text"}
 ]', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
```

Now let me set up the e2e testing with Cypress:


```json
{
  "name": "hr-management-e2e",
  "version": "1.0.0",
  "description": "End-to-end tests for HR Management Application",
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:chrome": "cypress run --browser chrome",
    "cypress:run:firefox": "cypress run --browser firefox",
    "cypress:run:edge": "cypress run --browser edge",
    "test": "cypress run",
    "test:headed": "cypress run --headed",
    "test:chrome": "cypress run --browser chrome --headed"
  },
  "devDependencies": {
    "cypress": "^13.6.0",
    "@cypress/code-coverage": "^3.12.8",
    "cypress-real-events": "^1.10.0",
    "cypress-file-upload": "^5.0.8"
  },
  "dependencies": {
    "@testing-library/cypress": "^9.0.0"
  }
}
```

```typescript
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    env: {
      apiUrl: 'http://localhost:5000/api',
      adminEmail: 'admin@hrmanagement.com',
      adminPassword: 'admin123',
      hrEmail: 'hr@hrmanagement.com',
      hrPassword: 'hr123',
      managerEmail: 'manager@hrmanagement.com',
      managerPassword: 'manager123',
      employeeEmail: 'john.doe@hrmanagement.com',
      employeePassword: 'employee123',
    },
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
```

```typescript
// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log
Cypress.on('window:before:load', (win) => {
  // Disable service workers
  if (win.navigator && win.navigator.serviceWorker) {
    win.navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
});

// Global error handling
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // that are not related to the application under test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});
```

```typescript
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
```

```typescript
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
```

```typescript
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
```

```typescript
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
```

```typescript
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
```

```typescript
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
```

```typescript
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
```

Finally, let me create the GitHub Actions CI/CD workflow:


```github-actions-workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '18'
  POSTGRES_VERSION: '15'
  REDIS_VERSION: '7'

jobs:
  # Lint and format check
  lint:
    name: Lint and Format Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          cd client && npm ci
          cd ../server && npm ci
          cd ../e2e && npm ci

      - name: Lint client code
        run: cd client && npm run lint

      - name: Lint server code
        run: cd server && npm run lint

      - name: Type check client
        run: cd client && npm run type-check

      - name: Type check server
        run: cd server && npx tsc --noEmit

  # Unit and integration tests
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:${{ env.POSTGRES_VERSION }}
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: hr_management_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:${{ env.REDIS_VERSION }}
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          cd client && npm ci
          cd ../server && npm ci

      - name: Setup test database
        run: |
          cd server
          cp .env.example .env.test
          echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hr_management_test" >> .env.test
          echo "REDIS_URL=redis://localhost:6379" >> .env.test
          echo "JWT_SECRET=test-secret-key" >> .env.test
          npx prisma generate
          npx prisma migrate deploy

      - name: Run client tests
        run: cd client && npm test -- --coverage --watchAll=false

      - name: Run server tests
        run: cd server && npm test -- --coverage

      - name: Upload client coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./client/coverage/lcov.info
          flags: client
          name: client-coverage

      - name: Upload server coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./server/coverage/lcov.info
          flags: server
          name: server-coverage

  # Build applications
  build:
    name: Build Applications
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          cd client && npm ci
          cd ../server && npm ci

      - name: Build client
        run: cd client && npm run build

      - name: Build server
        run: cd server && npm run build

      - name: Upload client build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: client-build
          path: client/build/

      - name: Upload server build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: server-build
          path: server/dist/

  # End-to-end tests
  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: build
    services:
      postgres:
        image: postgres:${{ env.POSTGRES_VERSION }}
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: hr_management_e2e
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:${{ env.REDIS_VERSION }}
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          cd client && npm ci
          cd ../server && npm ci
          cd ../e2e && npm ci

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: client-build
          path: client/build/

      - name: Download server build artifacts
        uses: actions/download-artifact@v3
        with:
          name: server-build
          path: server/dist/

      - name: Setup e2e database
        run: |
          cd server
          cp .env.example .env.e2e
          echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/hr_management_e2e" >> .env.e2e
          echo "REDIS_URL=redis://localhost:6379" >> .env.e2e
          echo "JWT_SECRET=e2e-secret-key" >> .env.e2e
          npx prisma generate
          npx prisma migrate deploy
          npx prisma db seed

      - name: Start server
        run: |
          cd server
          npm start &
          sleep 10

      - name: Start client
        run: |
          cd client
          npx serve -s build -l 3000 &
          sleep 5

      - name: Run E2E tests
        run: |
          cd e2e
          npm run cypress:run

      - name: Upload E2E screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: e2e-screenshots
          path: e2e/cypress/screenshots/

      - name: Upload E2E videos
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: e2e-videos
          path: e2e/cypress/videos/

  # Security scan
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: |
          npm ci
          cd client && npm ci
          cd ../server && npm ci

      - name: Run security audit
        run: |
          npm audit --audit-level moderate
          cd client && npm audit --audit-level moderate
          cd ../server && npm audit --audit-level moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  # Deploy to staging
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build, e2e, security]
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: client-build
          path: client/build/

      - name: Download server build artifacts
        uses: actions/download-artifact@v3
        with:
          name: server-build
          path: server/dist/

      - name: Deploy to AWS
        run: |
          echo "Deploying to staging environment..."
          # Add your deployment commands here
          # Example: AWS CLI, Docker, etc.

  # Deploy to production
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build, e2e, security]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: client-build
          path: client/build/

      - name: Download server build artifacts
        uses: actions/download-artifact@v3
        with:
          name: server-build
          path: server/dist/

      - name: Deploy to AWS
        run: |
          echo "Deploying to production environment..."
          # Add your deployment commands here
          # Example: AWS CLI, Docker, etc.

  # Notify on completion
  notify:
    name: Notify
    runs-on: ubuntu-latest
    needs: [deploy-staging, deploy-production]
    if: always()
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#deployments'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
        if: always()
```

```github-actions-workflow
name: Docker Build and Push

on:
  push:
    branches: [ main, develop ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-push:
    name: Build and Push Docker Images
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=ref,event=pr
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Build and push client image
        uses: docker/build-push-action@v5
        with:
          context: ./client
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-client:${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build and push server image
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-server:${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Build and push database image
        uses: docker/build-push-action@v5
        with:
          context: ./database
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-database:${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: build-and-push
    if: github.event_name == 'push'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-client:${{ github.ref_name }}
          format: 'sarif'
          output: 'trivy-results-client.sarif'

      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-server:${{ github.ref_name }}
          format: 'sarif'
          output: 'trivy-results-server.sarif'

      - name: Upload Trivy scan results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results-client.sarif'

      - name: Upload Trivy scan results to GitHub Security tab
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results-server.sarif'
```

```github-actions-workflow
name: Release

on:
  push:
    tags:
      - 'v*'

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  create-release:
    name: Create Release
    runs-on: ubuntu-latest
    outputs:
      upload_url: ${{ steps.create_release.outputs.upload_url }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

  build-and-push:
    name: Build and Push Release Images
    runs-on: ubuntu-latest
    needs: create-release
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=raw,value=latest

      - name: Build and push client image
        uses: docker/build-push-action@v5
        with:
          context: ./client
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-client:${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: Build and push server image
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-server:${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

      - name: Build and push database image
        uses: docker/build-push-action@v5
        with:
          context: ./database
          push: true
          tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}-database:${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [create-release, build-and-push]
    environment: production

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Production
        run: |
          echo "Deploying version ${{ github.ref }} to production..."
          # Add your production deployment commands here
          # Example: AWS ECS, Kubernetes, etc.

  notify:
    name: Notify Release
    runs-on: ubuntu-latest
    needs: [create-release, deploy-production]
    if: always()

    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          channel: '#releases'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
          fields: repo,message,commit,author,action,eventName,ref,workflow
        if: always()
```

Perfect! I have successfully created the complete HR Management Application project based on the specifications in the `_cursor.md` file. Here's a summary of what has been created:

## 🎉 Project Complete!

### ✅ What's Been Created:

1. **Root Project Files**
   - `package.json` with all necessary scripts
   - `.gitignore` for version control
   - `env.example` with environment variables
   - `docker-compose.yml` for local development
   - Comprehensive `README.md` with setup instructions

2. **Frontend (React/TypeScript)**
   - Complete client directory structure
   - React 18+ with TypeScript
   - Bootstrap 5 and SCSS styling
   - Authentication context and API integration
   - All major pages: Dashboard, Employees, Leave Requests, Performance Reviews, Settings
   - Responsive design with modern UI components
   - Custom hooks and utilities

3. **Backend (Node.js/Express)**
   - Complete server directory structure
   - Express.js with TypeScript
   - JWT authentication with role-based access
   - RESTful API with Swagger documentation
   - Prisma ORM with PostgreSQL
   - Redis integration for caching
   - Comprehensive error handling and logging
   - All CRUD operations for employees, leave requests, and performance reviews

4. **Database**
   - Prisma schema with all necessary models
   - Database initialization scripts
   - Seed data with sample users and records
   - Migration support

5. **Testing**
   - Complete Cypress e2e test suite
   - Tests for authentication, dashboard, employees, leave requests, performance reviews, and settings
   - Custom commands and utilities
   - Responsive testing

6. **CI/CD Pipeline**
   - GitHub Actions workflows for CI/CD
   - Docker build and push automation
   - Security scanning with Trivy
   - Automated testing and deployment
   - Release management

### 🚀 Key Features:

- **Multi-role Authentication**: Admin, HR Manager, Manager, Employee roles
- **Employee Management**: Full CRUD operations with detailed profiles
- **Leave Management**: Request, approve/reject, and track leave requests
- **Performance Reviews**: Create and manage performance reviews with goals
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Bootstrap 5 with custom SCSS styling
- **API Documentation**: Swagger/OpenAPI documentation
- **Security**: JWT tokens, rate limiting, input validation
- **Testing**: Comprehensive e2e test coverage
- **Docker Support**: Full containerization for development and production

### 🛠️ Getting Started:

1. **Install dependencies**: `npm run install:all`
2. **Set up environment**: Copy `env.example` to `.env` and configure
3. **Start with Docker**: `npm run docker:up`
4. **Or start manually**: `npm run dev`

The application is now ready for development and can be easily deployed to production using the provided CI/CD pipeline and Docker configuration!

---

**User**

can you perform an audit  ensuring that the entire project has been explained in the README.md file

---

**Cursor**

I'll perform a comprehensive audit of the README.md file to ensure it covers all aspects of the HR Management Application project. Let me first read the current README.md file and then analyze what might be missing.


Now let me analyze the project structure and compare it with what's documented in the README to identify any gaps or missing information.


Now let me check the env.example file to see what environment variables are documented:


Based on my comprehensive audit of the project structure and the current README.md file, I've identified several areas that need to be enhanced or added to provide complete documentation. Let me update the README.md file to include all missing information:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT with MFA support

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress

### DevOps
- **Containerization:** Docker
- **Infrastructure:** AWS
- **Infrastructure as Code:** Terraform
- **CI/CD:** GitHub Actions

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Unit Tests
```bash
npm run test:client  # Frontend tests
npm run test:server  # Backend tests
```

### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

Key environment variables that need to be configured:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `REACT_APP_API_URL` - Backend API URL for frontend
- `SMTP_*` - Email configuration for notifications

See `env.example` for a complete list of configuration options.

## 📚 API Documentation

The API documentation is available at `http://localhost:5000/api/docs` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**

```

Now let me add comprehensive sections for features, API endpoints, testing details, and other missing information:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios
- **Routing:** React Router DOM
- **Icons:** Bootstrap Icons

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with role-based access control
- **Caching:** Redis
- **Validation:** Joi and Express Validator
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Security:** Helmet, CORS, Rate Limiting

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress with custom commands
- **Coverage:** Code coverage reporting
- **API Testing:** Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **Infrastructure:** AWS (planned)
- **Infrastructure as Code:** Terraform (planned)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy, Snyk
- **Code Quality:** ESLint, Prettier

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, HR Manager, Manager, Employee)
- Password reset functionality
- Session management
- Protected routes

### 👥 Employee Management
- Complete employee profiles with personal and professional information
- Employee directory with search and filtering
- Department and position management
- Manager-employee relationships
- Skills and certifications tracking
- Employee statistics and analytics

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Multiple leave types (Annual, Sick, Personal, Maternity, Paternity, Bereavement, Unpaid)
- Leave balance tracking
- Manager approval system
- Leave history and reporting
- Email notifications

### 📊 Performance Management
- Performance review creation and management
- Goal setting and tracking
- Rating system (1-5 stars)
- Review periods and cycles
- Manager and self-assessments
- Performance analytics

### 📱 User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time notifications
- Dashboard with key metrics
- User profile management
- Settings and preferences

### 🔧 System Features
- RESTful API with comprehensive documentation
- Database migrations and seeding
- Comprehensive logging
- Error handling and validation
- Rate limiting and security measures
- Docker containerization
- CI/CD pipeline with automated testing

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Unit Tests
```bash
npm run test:client  # Frontend tests
npm run test:server  # Backend tests
```

### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

Key environment variables that need to be configured:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `REACT_APP_API_URL` - Backend API URL for frontend
- `SMTP_*` - Email configuration for notifications

See `env.example` for a complete list of configuration options.

## 📚 API Documentation

The API documentation is available at `http://localhost:5000/api/docs` when the server is running.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**

```

Now let me add a comprehensive API documentation section and enhance the environment variables section:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios
- **Routing:** React Router DOM
- **Icons:** Bootstrap Icons

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with role-based access control
- **Caching:** Redis
- **Validation:** Joi and Express Validator
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Security:** Helmet, CORS, Rate Limiting

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress with custom commands
- **Coverage:** Code coverage reporting
- **API Testing:** Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **Infrastructure:** AWS (planned)
- **Infrastructure as Code:** Terraform (planned)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy, Snyk
- **Code Quality:** ESLint, Prettier

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, HR Manager, Manager, Employee)
- Password reset functionality
- Session management
- Protected routes

### 👥 Employee Management
- Complete employee profiles with personal and professional information
- Employee directory with search and filtering
- Department and position management
- Manager-employee relationships
- Skills and certifications tracking
- Employee statistics and analytics

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Multiple leave types (Annual, Sick, Personal, Maternity, Paternity, Bereavement, Unpaid)
- Leave balance tracking
- Manager approval system
- Leave history and reporting
- Email notifications

### 📊 Performance Management
- Performance review creation and management
- Goal setting and tracking
- Rating system (1-5 stars)
- Review periods and cycles
- Manager and self-assessments
- Performance analytics

### 📱 User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time notifications
- Dashboard with key metrics
- User profile management
- Settings and preferences

### 🔧 System Features
- RESTful API with comprehensive documentation
- Database migrations and seeding
- Comprehensive logging
- Error handling and validation
- Rate limiting and security measures
- Docker containerization
- CI/CD pipeline with automated testing

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Unit Tests
```bash
npm run test:client  # Frontend tests
npm run test:server  # Backend tests
```

### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Copy `env.example` to `.env` and configure the following:

#### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: hr_management)
- `DB_USER` - Database username (default: hr_user)
- `DB_PASSWORD` - Database password (default: hr_password)

#### JWT Configuration
- `JWT_SECRET` - Secret key for JWT tokens (required)
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)

#### Server Configuration
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `API_BASE_URL` - Base API URL
- `CORS_ORIGIN` - CORS allowed origins

#### Client Configuration
- `REACT_APP_API_URL` - Backend API URL for frontend
- `REACT_APP_ENV` - Frontend environment

#### Email Configuration (for notifications)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

#### AWS Configuration (for production)
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

#### MFA Configuration
- `MFA_ISSUER` - MFA issuer name
- `MFA_ALGORITHM` - MFA algorithm (default: sha1)
- `MFA_DIGITS` - MFA digits (default: 6)
- `MFA_PERIOD` - MFA period (default: 30)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

#### Logging
- `LOG_LEVEL` - Log level (default: info)
- `LOG_FILE` - Log file path

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Employee Endpoints
- `GET /employees` - Get all employees (with pagination and filters)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employees/stats` - Get employee statistics
- `GET /employees/search` - Search employees

### Leave Request Endpoints
- `GET /leave/requests` - Get all leave requests
- `GET /leave/requests/:id` - Get leave request by ID
- `POST /leave/requests` - Create new leave request
- `POST /leave/requests/:id/approve` - Approve leave request
- `POST /leave/requests/:id/reject` - Reject leave request
- `POST /leave/requests/:id/cancel` - Cancel leave request
- `GET /leave/balance/:employeeId` - Get leave balance

### Performance Review Endpoints
- `GET /performance/reviews` - Get all performance reviews
- `GET /performance/reviews/:id` - Get performance review by ID
- `POST /performance/reviews` - Create new performance review
- `PUT /performance/reviews/:id` - Update performance review
- `DELETE /performance/reviews/:id` - Delete performance review
- `PUT /performance/goals/:id` - Update performance goal

### User Endpoints
- `PUT /users/profile` - Update user profile
- `GET /users/notifications` - Get user notifications
- `PUT /users/notifications/:id/read` - Mark notification as read
- `PUT /users/notifications/read-all` - Mark all notifications as read

### Interactive API Documentation
The complete API documentation with interactive testing is available at:
```
http://localhost:5000/api/docs
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "errors": [ ... ] // Validation errors
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**

```

Now let me enhance the testing section and add more comprehensive information:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios
- **Routing:** React Router DOM
- **Icons:** Bootstrap Icons

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with role-based access control
- **Caching:** Redis
- **Validation:** Joi and Express Validator
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Security:** Helmet, CORS, Rate Limiting

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress with custom commands
- **Coverage:** Code coverage reporting
- **API Testing:** Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **Infrastructure:** AWS (planned)
- **Infrastructure as Code:** Terraform (planned)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy, Snyk
- **Code Quality:** ESLint, Prettier

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, HR Manager, Manager, Employee)
- Password reset functionality
- Session management
- Protected routes

### 👥 Employee Management
- Complete employee profiles with personal and professional information
- Employee directory with search and filtering
- Department and position management
- Manager-employee relationships
- Skills and certifications tracking
- Employee statistics and analytics

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Multiple leave types (Annual, Sick, Personal, Maternity, Paternity, Bereavement, Unpaid)
- Leave balance tracking
- Manager approval system
- Leave history and reporting
- Email notifications

### 📊 Performance Management
- Performance review creation and management
- Goal setting and tracking
- Rating system (1-5 stars)
- Review periods and cycles
- Manager and self-assessments
- Performance analytics

### 📱 User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time notifications
- Dashboard with key metrics
- User profile management
- Settings and preferences

### 🔧 System Features
- RESTful API with comprehensive documentation
- Database migrations and seeding
- Comprehensive logging
- Error handling and validation
- Rate limiting and security measures
- Docker containerization
- CI/CD pipeline with automated testing

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Test Structure
The project includes comprehensive testing at multiple levels:

#### Unit Tests
```bash
npm run test:client  # Frontend tests with Jest & React Testing Library
npm run test:server  # Backend tests with Jest & Supertest
```

#### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
npm run cypress:open # Open Cypress Test Runner
```

### Test Coverage
- **Frontend**: React components, hooks, and utilities
- **Backend**: API endpoints, controllers, middleware, and services
- **E2E**: Complete user workflows and integration testing

### E2E Test Categories
- **Authentication**: Login, logout, password reset
- **Dashboard**: Navigation, statistics display, responsive design
- **Employee Management**: CRUD operations, search, filtering
- **Leave Requests**: Request submission, approval workflow
- **Performance Reviews**: Review creation, goal tracking
- **Settings**: Profile updates, notification preferences

### Custom Cypress Commands
The project includes custom Cypress commands for:
- `cy.login(email, password)` - User authentication
- `cy.loginAsAdmin()` - Login as admin user
- `cy.loginAsHR()` - Login as HR manager
- `cy.loginAsManager()` - Login as manager
- `cy.loginAsEmployee()` - Login as employee
- `cy.logout()` - User logout
- `cy.waitForAPI(method, url)` - Wait for API responses
- `cy.createEmployee(data)` - Create employee via API
- `cy.createLeaveRequest(data)` - Create leave request via API

### Test Data
The project includes seeded test data with:
- Admin user: `admin@hrmanagement.com` (password: `admin123`)
- HR Manager: `hr@hrmanagement.com` (password: `hr123`)
- Manager: `manager@hrmanagement.com` (password: `manager123`)
- Employees: `john.doe@hrmanagement.com`, `jane.smith@hrmanagement.com`, `bob.johnson@hrmanagement.com` (password: `employee123`)

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run E2E tests in different browsers
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is containerized and can be deployed using Docker Compose:

```bash
docker-compose up --build
```

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Copy `env.example` to `.env` and configure the following:

#### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: hr_management)
- `DB_USER` - Database username (default: hr_user)
- `DB_PASSWORD` - Database password (default: hr_password)

#### JWT Configuration
- `JWT_SECRET` - Secret key for JWT tokens (required)
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)

#### Server Configuration
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `API_BASE_URL` - Base API URL
- `CORS_ORIGIN` - CORS allowed origins

#### Client Configuration
- `REACT_APP_API_URL` - Backend API URL for frontend
- `REACT_APP_ENV` - Frontend environment

#### Email Configuration (for notifications)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

#### AWS Configuration (for production)
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

#### MFA Configuration
- `MFA_ISSUER` - MFA issuer name
- `MFA_ALGORITHM` - MFA algorithm (default: sha1)
- `MFA_DIGITS` - MFA digits (default: 6)
- `MFA_PERIOD` - MFA period (default: 30)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

#### Logging
- `LOG_LEVEL` - Log level (default: info)
- `LOG_FILE` - Log file path

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Employee Endpoints
- `GET /employees` - Get all employees (with pagination and filters)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employees/stats` - Get employee statistics
- `GET /employees/search` - Search employees

### Leave Request Endpoints
- `GET /leave/requests` - Get all leave requests
- `GET /leave/requests/:id` - Get leave request by ID
- `POST /leave/requests` - Create new leave request
- `POST /leave/requests/:id/approve` - Approve leave request
- `POST /leave/requests/:id/reject` - Reject leave request
- `POST /leave/requests/:id/cancel` - Cancel leave request
- `GET /leave/balance/:employeeId` - Get leave balance

### Performance Review Endpoints
- `GET /performance/reviews` - Get all performance reviews
- `GET /performance/reviews/:id` - Get performance review by ID
- `POST /performance/reviews` - Create new performance review
- `PUT /performance/reviews/:id` - Update performance review
- `DELETE /performance/reviews/:id` - Delete performance review
- `PUT /performance/goals/:id` - Update performance goal

### User Endpoints
- `PUT /users/profile` - Update user profile
- `GET /users/notifications` - Get user notifications
- `PUT /users/notifications/:id/read` - Mark notification as read
- `PUT /users/notifications/read-all` - Mark all notifications as read

### Interactive API Documentation
The complete API documentation with interactive testing is available at:
```
http://localhost:5000/api/docs
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "errors": [ ... ] // Validation errors
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**

```

Now let me add sections for CI/CD pipeline details, deployment information, and troubleshooting:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios
- **Routing:** React Router DOM
- **Icons:** Bootstrap Icons

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with role-based access control
- **Caching:** Redis
- **Validation:** Joi and Express Validator
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Security:** Helmet, CORS, Rate Limiting

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress with custom commands
- **Coverage:** Code coverage reporting
- **API Testing:** Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **Infrastructure:** AWS (planned)
- **Infrastructure as Code:** Terraform (planned)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy, Snyk
- **Code Quality:** ESLint, Prettier

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, HR Manager, Manager, Employee)
- Password reset functionality
- Session management
- Protected routes

### 👥 Employee Management
- Complete employee profiles with personal and professional information
- Employee directory with search and filtering
- Department and position management
- Manager-employee relationships
- Skills and certifications tracking
- Employee statistics and analytics

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Multiple leave types (Annual, Sick, Personal, Maternity, Paternity, Bereavement, Unpaid)
- Leave balance tracking
- Manager approval system
- Leave history and reporting
- Email notifications

### 📊 Performance Management
- Performance review creation and management
- Goal setting and tracking
- Rating system (1-5 stars)
- Review periods and cycles
- Manager and self-assessments
- Performance analytics

### 📱 User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time notifications
- Dashboard with key metrics
- User profile management
- Settings and preferences

### 🔧 System Features
- RESTful API with comprehensive documentation
- Database migrations and seeding
- Comprehensive logging
- Error handling and validation
- Rate limiting and security measures
- Docker containerization
- CI/CD pipeline with automated testing

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Test Structure
The project includes comprehensive testing at multiple levels:

#### Unit Tests
```bash
npm run test:client  # Frontend tests with Jest & React Testing Library
npm run test:server  # Backend tests with Jest & Supertest
```

#### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
npm run cypress:open # Open Cypress Test Runner
```

### Test Coverage
- **Frontend**: React components, hooks, and utilities
- **Backend**: API endpoints, controllers, middleware, and services
- **E2E**: Complete user workflows and integration testing

### E2E Test Categories
- **Authentication**: Login, logout, password reset
- **Dashboard**: Navigation, statistics display, responsive design
- **Employee Management**: CRUD operations, search, filtering
- **Leave Requests**: Request submission, approval workflow
- **Performance Reviews**: Review creation, goal tracking
- **Settings**: Profile updates, notification preferences

### Custom Cypress Commands
The project includes custom Cypress commands for:
- `cy.login(email, password)` - User authentication
- `cy.loginAsAdmin()` - Login as admin user
- `cy.loginAsHR()` - Login as HR manager
- `cy.loginAsManager()` - Login as manager
- `cy.loginAsEmployee()` - Login as employee
- `cy.logout()` - User logout
- `cy.waitForAPI(method, url)` - Wait for API responses
- `cy.createEmployee(data)` - Create employee via API
- `cy.createLeaveRequest(data)` - Create leave request via API

### Test Data
The project includes seeded test data with:
- Admin user: `admin@hrmanagement.com` (password: `admin123`)
- HR Manager: `hr@hrmanagement.com` (password: `hr123`)
- Manager: `manager@hrmanagement.com` (password: `manager123`)
- Employees: `john.doe@hrmanagement.com`, `jane.smith@hrmanagement.com`, `bob.johnson@hrmanagement.com` (password: `employee123`)

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run E2E tests in different browsers
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is fully containerized with separate Dockerfiles for client and server:

### Local Development with Docker
```bash
# Start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

### Docker Services
- **PostgreSQL**: Database on port 5432
- **Redis**: Cache on port 6379
- **Server**: API server on port 5000
- **Client**: React app on port 3000

### Production Docker Images
The CI/CD pipeline automatically builds and pushes Docker images to GitHub Container Registry:
- `ghcr.io/your-org/hr-management-client:latest`
- `ghcr.io/your-org/hr-management-server:latest`
- `ghcr.io/your-org/hr-management-database:latest`

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Main CI Pipeline (`ci.yml`)
- **Lint & Format Check**: ESLint and Prettier validation
- **Unit Tests**: Jest tests for client and server
- **Build**: Production builds for both applications
- **E2E Tests**: Cypress tests with real database
- **Security Scan**: Snyk vulnerability scanning
- **Deploy Staging**: Automatic deployment to staging on `develop` branch
- **Deploy Production**: Automatic deployment to production on `main` branch

#### 2. Docker Pipeline (`docker.yml`)
- **Build Images**: Multi-architecture Docker images
- **Push to Registry**: GitHub Container Registry
- **Security Scan**: Trivy vulnerability scanning
- **Tag Management**: Automatic versioning

#### 3. Release Pipeline (`release.yml`)
- **Create Release**: GitHub releases with changelog
- **Build Release Images**: Production-ready Docker images
- **Deploy Production**: Automated production deployment
- **Notifications**: Slack notifications for releases

### Pipeline Features
- **Parallel Execution**: Tests run in parallel for faster feedback
- **Caching**: npm and Docker layer caching
- **Artifacts**: Build artifacts and test reports
- **Security**: Automated security scanning
- **Notifications**: Slack integration for build status

## 🔧 Development Workflow

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

### Code Quality
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Conventional Commits**: Standardized commit messages

### Pull Request Process
1. Create feature branch from `develop`
2. Implement changes with tests
3. Ensure all tests pass
4. Create pull request with description
5. Code review and approval
6. Merge to `develop`
7. Deploy to staging for testing
8. Merge to `main` for production release

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Copy `env.example` to `.env` and configure the following:

#### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: hr_management)
- `DB_USER` - Database username (default: hr_user)
- `DB_PASSWORD` - Database password (default: hr_password)

#### JWT Configuration
- `JWT_SECRET` - Secret key for JWT tokens (required)
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)

#### Server Configuration
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `API_BASE_URL` - Base API URL
- `CORS_ORIGIN` - CORS allowed origins

#### Client Configuration
- `REACT_APP_API_URL` - Backend API URL for frontend
- `REACT_APP_ENV` - Frontend environment

#### Email Configuration (for notifications)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

#### AWS Configuration (for production)
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

#### MFA Configuration
- `MFA_ISSUER` - MFA issuer name
- `MFA_ALGORITHM` - MFA algorithm (default: sha1)
- `MFA_DIGITS` - MFA digits (default: 6)
- `MFA_PERIOD` - MFA period (default: 30)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

#### Logging
- `LOG_LEVEL` - Log level (default: info)
- `LOG_FILE` - Log file path

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Employee Endpoints
- `GET /employees` - Get all employees (with pagination and filters)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employees/stats` - Get employee statistics
- `GET /employees/search` - Search employees

### Leave Request Endpoints
- `GET /leave/requests` - Get all leave requests
- `GET /leave/requests/:id` - Get leave request by ID
- `POST /leave/requests` - Create new leave request
- `POST /leave/requests/:id/approve` - Approve leave request
- `POST /leave/requests/:id/reject` - Reject leave request
- `POST /leave/requests/:id/cancel` - Cancel leave request
- `GET /leave/balance/:employeeId` - Get leave balance

### Performance Review Endpoints
- `GET /performance/reviews` - Get all performance reviews
- `GET /performance/reviews/:id` - Get performance review by ID
- `POST /performance/reviews` - Create new performance review
- `PUT /performance/reviews/:id` - Update performance review
- `DELETE /performance/reviews/:id` - Delete performance review
- `PUT /performance/goals/:id` - Update performance goal

### User Endpoints
- `PUT /users/profile` - Update user profile
- `GET /users/notifications` - Get user notifications
- `PUT /users/notifications/:id/read` - Mark notification as read
- `PUT /users/notifications/read-all` - Mark all notifications as read

### Interactive API Documentation
The complete API documentation with interactive testing is available at:
```
http://localhost:5000/api/docs
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "errors": [ ... ] // Validation errors
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**

```

Finally, let me add a troubleshooting section and enhance the support section:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios
- **Routing:** React Router DOM
- **Icons:** Bootstrap Icons

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with role-based access control
- **Caching:** Redis
- **Validation:** Joi and Express Validator
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Security:** Helmet, CORS, Rate Limiting

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress with custom commands
- **Coverage:** Code coverage reporting
- **API Testing:** Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **Infrastructure:** AWS (planned)
- **Infrastructure as Code:** Terraform (planned)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy, Snyk
- **Code Quality:** ESLint, Prettier

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, HR Manager, Manager, Employee)
- Password reset functionality
- Session management
- Protected routes

### 👥 Employee Management
- Complete employee profiles with personal and professional information
- Employee directory with search and filtering
- Department and position management
- Manager-employee relationships
- Skills and certifications tracking
- Employee statistics and analytics

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Multiple leave types (Annual, Sick, Personal, Maternity, Paternity, Bereavement, Unpaid)
- Leave balance tracking
- Manager approval system
- Leave history and reporting
- Email notifications

### 📊 Performance Management
- Performance review creation and management
- Goal setting and tracking
- Rating system (1-5 stars)
- Review periods and cycles
- Manager and self-assessments
- Performance analytics

### 📱 User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time notifications
- Dashboard with key metrics
- User profile management
- Settings and preferences

### 🔧 System Features
- RESTful API with comprehensive documentation
- Database migrations and seeding
- Comprehensive logging
- Error handling and validation
- Rate limiting and security measures
- Docker containerization
- CI/CD pipeline with automated testing

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Test Structure
The project includes comprehensive testing at multiple levels:

#### Unit Tests
```bash
npm run test:client  # Frontend tests with Jest & React Testing Library
npm run test:server  # Backend tests with Jest & Supertest
```

#### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
npm run cypress:open # Open Cypress Test Runner
```

### Test Coverage
- **Frontend**: React components, hooks, and utilities
- **Backend**: API endpoints, controllers, middleware, and services
- **E2E**: Complete user workflows and integration testing

### E2E Test Categories
- **Authentication**: Login, logout, password reset
- **Dashboard**: Navigation, statistics display, responsive design
- **Employee Management**: CRUD operations, search, filtering
- **Leave Requests**: Request submission, approval workflow
- **Performance Reviews**: Review creation, goal tracking
- **Settings**: Profile updates, notification preferences

### Custom Cypress Commands
The project includes custom Cypress commands for:
- `cy.login(email, password)` - User authentication
- `cy.loginAsAdmin()` - Login as admin user
- `cy.loginAsHR()` - Login as HR manager
- `cy.loginAsManager()` - Login as manager
- `cy.loginAsEmployee()` - Login as employee
- `cy.logout()` - User logout
- `cy.waitForAPI(method, url)` - Wait for API responses
- `cy.createEmployee(data)` - Create employee via API
- `cy.createLeaveRequest(data)` - Create leave request via API

### Test Data
The project includes seeded test data with:
- Admin user: `admin@hrmanagement.com` (password: `admin123`)
- HR Manager: `hr@hrmanagement.com` (password: `hr123`)
- Manager: `manager@hrmanagement.com` (password: `manager123`)
- Employees: `john.doe@hrmanagement.com`, `jane.smith@hrmanagement.com`, `bob.johnson@hrmanagement.com` (password: `employee123`)

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run E2E tests in different browsers
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is fully containerized with separate Dockerfiles for client and server:

### Local Development with Docker
```bash
# Start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

### Docker Services
- **PostgreSQL**: Database on port 5432
- **Redis**: Cache on port 6379
- **Server**: API server on port 5000
- **Client**: React app on port 3000

### Production Docker Images
The CI/CD pipeline automatically builds and pushes Docker images to GitHub Container Registry:
- `ghcr.io/your-org/hr-management-client:latest`
- `ghcr.io/your-org/hr-management-server:latest`
- `ghcr.io/your-org/hr-management-database:latest`

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Main CI Pipeline (`ci.yml`)
- **Lint & Format Check**: ESLint and Prettier validation
- **Unit Tests**: Jest tests for client and server
- **Build**: Production builds for both applications
- **E2E Tests**: Cypress tests with real database
- **Security Scan**: Snyk vulnerability scanning
- **Deploy Staging**: Automatic deployment to staging on `develop` branch
- **Deploy Production**: Automatic deployment to production on `main` branch

#### 2. Docker Pipeline (`docker.yml`)
- **Build Images**: Multi-architecture Docker images
- **Push to Registry**: GitHub Container Registry
- **Security Scan**: Trivy vulnerability scanning
- **Tag Management**: Automatic versioning

#### 3. Release Pipeline (`release.yml`)
- **Create Release**: GitHub releases with changelog
- **Build Release Images**: Production-ready Docker images
- **Deploy Production**: Automated production deployment
- **Notifications**: Slack notifications for releases

### Pipeline Features
- **Parallel Execution**: Tests run in parallel for faster feedback
- **Caching**: npm and Docker layer caching
- **Artifacts**: Build artifacts and test reports
- **Security**: Automated security scanning
- **Notifications**: Slack integration for build status

## 🔧 Development Workflow

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

### Code Quality
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Conventional Commits**: Standardized commit messages

### Pull Request Process
1. Create feature branch from `develop`
2. Implement changes with tests
3. Ensure all tests pass
4. Create pull request with description
5. Code review and approval
6. Merge to `develop`
7. Deploy to staging for testing
8. Merge to `main` for production release

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Copy `env.example` to `.env` and configure the following:

#### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: hr_management)
- `DB_USER` - Database username (default: hr_user)
- `DB_PASSWORD` - Database password (default: hr_password)

#### JWT Configuration
- `JWT_SECRET` - Secret key for JWT tokens (required)
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)

#### Server Configuration
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `API_BASE_URL` - Base API URL
- `CORS_ORIGIN` - CORS allowed origins

#### Client Configuration
- `REACT_APP_API_URL` - Backend API URL for frontend
- `REACT_APP_ENV` - Frontend environment

#### Email Configuration (for notifications)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

#### AWS Configuration (for production)
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

#### MFA Configuration
- `MFA_ISSUER` - MFA issuer name
- `MFA_ALGORITHM` - MFA algorithm (default: sha1)
- `MFA_DIGITS` - MFA digits (default: 6)
- `MFA_PERIOD` - MFA period (default: 30)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

#### Logging
- `LOG_LEVEL` - Log level (default: info)
- `LOG_FILE` - Log file path

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Employee Endpoints
- `GET /employees` - Get all employees (with pagination and filters)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employees/stats` - Get employee statistics
- `GET /employees/search` - Search employees

### Leave Request Endpoints
- `GET /leave/requests` - Get all leave requests
- `GET /leave/requests/:id` - Get leave request by ID
- `POST /leave/requests` - Create new leave request
- `POST /leave/requests/:id/approve` - Approve leave request
- `POST /leave/requests/:id/reject` - Reject leave request
- `POST /leave/requests/:id/cancel` - Cancel leave request
- `GET /leave/balance/:employeeId` - Get leave balance

### Performance Review Endpoints
- `GET /performance/reviews` - Get all performance reviews
- `GET /performance/reviews/:id` - Get performance review by ID
- `POST /performance/reviews` - Create new performance review
- `PUT /performance/reviews/:id` - Update performance review
- `DELETE /performance/reviews/:id` - Delete performance review
- `PUT /performance/goals/:id` - Update performance goal

### User Endpoints
- `PUT /users/profile` - Update user profile
- `GET /users/notifications` - Get user notifications
- `PUT /users/notifications/:id/read` - Mark notification as read
- `PUT /users/notifications/read-all` - Mark all notifications as read

### Interactive API Documentation
The complete API documentation with interactive testing is available at:
```
http://localhost:5000/api/docs
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "errors": [ ... ] // Validation errors
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database service
docker-compose restart postgres

# Check database logs
docker-compose logs postgres
```

#### Port Conflicts
If you encounter port conflicts, update the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change client port
  - "5001:5000"  # Change server port
```

#### Environment Variables
Ensure all required environment variables are set:
```bash
# Check if .env file exists
ls -la .env

# Verify environment variables
cat .env
```

#### Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For Docker builds
docker-compose down
docker-compose build --no-cache
```

#### Test Failures
```bash
# Run tests with verbose output
npm test -- --verbose

# Check test database connection
npm run db:migrate

# Reset test database
npm run db:seed
```

### Performance Issues
- **Slow API responses**: Check Redis connection and database indexes
- **Large bundle size**: Run `npm run build` and check bundle analyzer
- **Memory leaks**: Monitor Docker container memory usage

### Security Considerations
- Change default passwords in production
- Use strong JWT secrets
- Enable HTTPS in production
- Regularly update dependencies
- Monitor security advisories

### Getting Help

1. **Check Documentation**: Review this README and API documentation
2. **Search Issues**: Look through existing [GitHub Issues](https://github.com/your-repo/issues)
3. **Create Issue**: If you can't find a solution, create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Error logs and screenshots
4. **Contact Team**: Reach out to the development team for urgent issues

### Development Support
- **Code Review**: All changes require peer review
- **Testing**: Ensure tests pass before submitting PRs
- **Documentation**: Update documentation for new features
- **Standards**: Follow the established coding standards and conventions

## 🗺️ Roadmap

- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Mobile application
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications
- [ ] Document management system

---

**Happy Coding! 🎉**

```

Now let me add a final section about the database schema and data models:


```markdown
# HR Management Application

A modern, full-stack HR Management Application built with React, Node.js, TypeScript, and PostgreSQL. This application provides comprehensive HR functionality including employee management, leave tracking, performance reviews, and more.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Styling:** Bootstrap 5 and SCSS
- **State Management:** React Context
- **API Communication:** Axios
- **Routing:** React Router DOM
- **Icons:** Bootstrap Icons

### Backend
- **Runtime:** Node.js (LTS Version)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with role-based access control
- **Caching:** Redis
- **Validation:** Joi and Express Validator
- **Documentation:** Swagger/OpenAPI
- **Logging:** Winston
- **Security:** Helmet, CORS, Rate Limiting

### Testing
- **Unit/Integration:** Jest & React Testing Library
- **End to End:** Cypress with custom commands
- **Coverage:** Code coverage reporting
- **API Testing:** Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **Infrastructure:** AWS (planned)
- **Infrastructure as Code:** Terraform (planned)
- **CI/CD:** GitHub Actions
- **Security Scanning:** Trivy, Snyk
- **Code Quality:** ESLint, Prettier

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, HR Manager, Manager, Employee)
- Password reset functionality
- Session management
- Protected routes

### 👥 Employee Management
- Complete employee profiles with personal and professional information
- Employee directory with search and filtering
- Department and position management
- Manager-employee relationships
- Skills and certifications tracking
- Employee statistics and analytics

### 🏖️ Leave Management
- Leave request submission and approval workflow
- Multiple leave types (Annual, Sick, Personal, Maternity, Paternity, Bereavement, Unpaid)
- Leave balance tracking
- Manager approval system
- Leave history and reporting
- Email notifications

### 📊 Performance Management
- Performance review creation and management
- Goal setting and tracking
- Rating system (1-5 stars)
- Review periods and cycles
- Manager and self-assessments
- Performance analytics

### 📱 User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time notifications
- Dashboard with key metrics
- User profile management
- Settings and preferences

### 🔧 System Features
- RESTful API with comprehensive documentation
- Database migrations and seeding
- Comprehensive logging
- Error handling and validation
- Rate limiting and security measures
- Docker containerization
- CI/CD pipeline with automated testing

## 📁 Project Structure

```
.
├── client/                   # React frontend application
│   ├── public/
│   │   ├── index.html        # HTML template
│   │   └── manifest.json     # PWA manifest
│   ├── src/
│   │   ├── api/              # Functions for making API calls
│   │   │   ├── authApi.ts    # Authentication API functions
│   │   │   └── employeeApi.ts # Employee API functions
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   ├── Navbar.scss   # Navigation styles
│   │   │   └── ProtectedRoute.tsx # Route protection component
│   │   ├── context/          # Global state management
│   │   │   └── AuthContext.tsx # Authentication context
│   │   ├── pages/            # Top level page components
│   │   │   ├── DashboardPage.tsx & .scss
│   │   │   ├── EmployeeDetailPage.tsx & .scss
│   │   │   ├── EmployeesPage.tsx & .scss
│   │   │   ├── LeaveRequestsPage.tsx & .scss
│   │   │   ├── LoginPage.tsx & .scss
│   │   │   ├── PerformanceReviewsPage.tsx & .scss
│   │   │   └── SettingsPage.tsx & .scss
│   │   ├── styles/           # Global styles and Bootstrap overrides
│   │   │   ├── index.scss    # Main stylesheet
│   │   │   └── App.scss      # App-specific styles
│   │   ├── types/            # TypeScript type definitions
│   │   │   └── index.ts      # All type definitions
│   │   ├── App.tsx           # Main application component
│   │   └── index.tsx         # Application entry point
│   ├── Dockerfile            # Client Docker configuration
│   └── package.json          # Client dependencies
├── server/                   # Node.js backend application
│   ├── src/
│   │   ├── api/              # API routes and controllers
│   │   │   ├── controllers/  # Request controllers
│   │   │   │   ├── AuthController.ts
│   │   │   │   ├── EmployeeController.ts
│   │   │   │   ├── LeaveController.ts
│   │   │   │   ├── PerformanceController.ts
│   │   │   │   └── UserController.ts
│   │   │   └── routes/       # API route definitions
│   │   │       ├── authRoutes.ts
│   │   │       ├── employeeRoutes.ts
│   │   │       ├── leaveRoutes.ts
│   │   │       ├── performanceRoutes.ts
│   │   │       └── userRoutes.ts
│   │   ├── config/           # Configuration files
│   │   │   ├── database.ts   # Database connection
│   │   │   └── redis.ts      # Redis connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling
│   │   │   ├── notFound.ts   # 404 handler
│   │   │   └── validateRequest.ts # Request validation
│   │   ├── utils/            # Utility functions
│   │   │   └── logger.ts     # Logging utility
│   │   └── server.ts         # Server entry point
│   ├── prisma/               # Database schema and migrations
│   │   ├── schema.prisma     # Prisma schema definition
│   │   └── seed.ts           # Database seeding script
│   ├── Dockerfile            # Server Docker configuration
│   ├── package.json          # Server dependencies
│   └── tsconfig.json         # TypeScript configuration
├── database/                 # Database initialization files
│   ├── init/
│   │   └── 01-init.sql       # Database initialization script
│   └── seeds/
│       └── 01-sample-data.sql # Additional sample data
├── e2e/                      # End to end Cypress tests
│   ├── cypress/
│   │   ├── e2e/              # Test files
│   │   │   ├── auth/         # Authentication tests
│   │   │   ├── dashboard/    # Dashboard tests
│   │   │   ├── employees/    # Employee management tests
│   │   │   ├── leave-requests/ # Leave request tests
│   │   │   ├── performance/  # Performance review tests
│   │   │   └── settings/     # Settings tests
│   │   └── support/          # Test support files
│   │       ├── commands.ts   # Custom Cypress commands
│   │       └── e2e.ts        # Test configuration
│   ├── cypress.config.ts     # Cypress configuration
│   └── package.json          # E2E test dependencies
├── .github/workflows/        # CI/CD pipeline configurations
│   ├── ci.yml                # Main CI/CD pipeline
│   ├── docker.yml            # Docker build and push
│   └── release.yml           # Release automation
├── env.example               # Example environment variables
├── .gitignore                # Git ignore file
├── docker-compose.yml        # Docker configuration for local development
├── package.json              # Root project scripts and dependencies
└── README.md                 # Project documentation
```

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (LTS version 18+)
2. **Docker** and Docker Compose
3. **Git**

## 🚀 Getting Started

### Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd hr-management-application
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Fill in the required variables in the `.env` file (database credentials, JWT secret, etc.).

4. **Start the local development environment:**
   ```bash
   npm run docker:up
   ```
   This will start:
   - PostgreSQL database on port 5432
   - Redis cache on port 6379
   - Backend server on port 5000
   - Frontend client on port 3000

### Alternative Setup (without Docker)

1. **Start PostgreSQL and Redis locally**

2. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

### Root Level Commands
- `npm run dev` - Start both client and server in development mode
- `npm run build` - Build both client and server for production
- `npm test` - Run all tests (client, server, and e2e)
- `npm run lint` - Lint both client and server code
- `npm run install:all` - Install dependencies for all packages

### Docker Commands
- `npm run docker:up` - Start all services with Docker Compose
- `npm run docker:down` - Stop all Docker services

### Database Commands
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database with initial data

## 🧪 Testing

### Test Structure
The project includes comprehensive testing at multiple levels:

#### Unit Tests
```bash
npm run test:client  # Frontend tests with Jest & React Testing Library
npm run test:server  # Backend tests with Jest & Supertest
```

#### End-to-End Tests
```bash
npm run test:e2e     # Cypress tests
npm run cypress:open # Open Cypress Test Runner
```

### Test Coverage
- **Frontend**: React components, hooks, and utilities
- **Backend**: API endpoints, controllers, middleware, and services
- **E2E**: Complete user workflows and integration testing

### E2E Test Categories
- **Authentication**: Login, logout, password reset
- **Dashboard**: Navigation, statistics display, responsive design
- **Employee Management**: CRUD operations, search, filtering
- **Leave Requests**: Request submission, approval workflow
- **Performance Reviews**: Review creation, goal tracking
- **Settings**: Profile updates, notification preferences

### Custom Cypress Commands
The project includes custom Cypress commands for:
- `cy.login(email, password)` - User authentication
- `cy.loginAsAdmin()` - Login as admin user
- `cy.loginAsHR()` - Login as HR manager
- `cy.loginAsManager()` - Login as manager
- `cy.loginAsEmployee()` - Login as employee
- `cy.logout()` - User logout
- `cy.waitForAPI(method, url)` - Wait for API responses
- `cy.createEmployee(data)` - Create employee via API
- `cy.createLeaveRequest(data)` - Create leave request via API

### Test Data
The project includes seeded test data with:
- Admin user: `admin@hrmanagement.com` (password: `admin123`)
- HR Manager: `hr@hrmanagement.com` (password: `hr123`)
- Manager: `manager@hrmanagement.com` (password: `manager123`)
- Employees: `john.doe@hrmanagement.com`, `jane.smith@hrmanagement.com`, `bob.johnson@hrmanagement.com` (password: `employee123`)

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run E2E tests in different browsers
npm run cypress:run:chrome
npm run cypress:run:firefox
npm run cypress:run:edge
```

## 🏗️ Building for Production

```bash
npm run build
```

This will create optimized production builds for both the client and server.

## 🐳 Docker Deployment

The application is fully containerized with separate Dockerfiles for client and server:

### Local Development with Docker
```bash
# Start all services
docker-compose up --build

# Start in background
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

### Docker Services
- **PostgreSQL**: Database on port 5432
- **Redis**: Cache on port 6379
- **Server**: API server on port 5000
- **Client**: React app on port 3000

### Production Docker Images
The CI/CD pipeline automatically builds and pushes Docker images to GitHub Container Registry:
- `ghcr.io/your-org/hr-management-client:latest`
- `ghcr.io/your-org/hr-management-server:latest`
- `ghcr.io/your-org/hr-management-database:latest`

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Main CI Pipeline (`ci.yml`)
- **Lint & Format Check**: ESLint and Prettier validation
- **Unit Tests**: Jest tests for client and server
- **Build**: Production builds for both applications
- **E2E Tests**: Cypress tests with real database
- **Security Scan**: Snyk vulnerability scanning
- **Deploy Staging**: Automatic deployment to staging on `develop` branch
- **Deploy Production**: Automatic deployment to production on `main` branch

#### 2. Docker Pipeline (`docker.yml`)
- **Build Images**: Multi-architecture Docker images
- **Push to Registry**: GitHub Container Registry
- **Security Scan**: Trivy vulnerability scanning
- **Tag Management**: Automatic versioning

#### 3. Release Pipeline (`release.yml`)
- **Create Release**: GitHub releases with changelog
- **Build Release Images**: Production-ready Docker images
- **Deploy Production**: Automated production deployment
- **Notifications**: Slack notifications for releases

### Pipeline Features
- **Parallel Execution**: Tests run in parallel for faster feedback
- **Caching**: npm and Docker layer caching
- **Artifacts**: Build artifacts and test reports
- **Security**: Automated security scanning
- **Notifications**: Slack integration for build status

## 🔧 Development Workflow

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches

### Code Quality
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Conventional Commits**: Standardized commit messages

### Pull Request Process
1. Create feature branch from `develop`
2. Implement changes with tests
3. Ensure all tests pass
4. Create pull request with description
5. Code review and approval
6. Merge to `develop`
7. Deploy to staging for testing
8. Merge to `main` for production release

## 🔧 Configuration

### Environment Variables

The application uses environment variables for configuration. Copy `env.example` to `.env` and configure the following:

#### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string
- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: hr_management)
- `DB_USER` - Database username (default: hr_user)
- `DB_PASSWORD` - Database password (default: hr_password)

#### JWT Configuration
- `JWT_SECRET` - Secret key for JWT tokens (required)
- `JWT_EXPIRES_IN` - Token expiration time (default: 24h)
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `JWT_REFRESH_EXPIRES_IN` - Refresh token expiration (default: 7d)

#### Server Configuration
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `API_BASE_URL` - Base API URL
- `CORS_ORIGIN` - CORS allowed origins

#### Client Configuration
- `REACT_APP_API_URL` - Backend API URL for frontend
- `REACT_APP_ENV` - Frontend environment

#### Email Configuration (for notifications)
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password

#### AWS Configuration (for production)
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

#### MFA Configuration
- `MFA_ISSUER` - MFA issuer name
- `MFA_ALGORITHM` - MFA algorithm (default: sha1)
- `MFA_DIGITS` - MFA digits (default: 6)
- `MFA_PERIOD` - MFA period (default: 30)

#### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Rate limit window (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

#### Logging
- `LOG_LEVEL` - Log level (default: info)
- `LOG_FILE` - Log file path

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token

### Employee Endpoints
- `GET /employees` - Get all employees (with pagination and filters)
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /employees/stats` - Get employee statistics
- `GET /employees/search` - Search employees

### Leave Request Endpoints
- `GET /leave/requests` - Get all leave requests
- `GET /leave/requests/:id` - Get leave request by ID
- `POST /leave/requests` - Create new leave request
- `POST /leave/requests/:id/approve` - Approve leave request
- `POST /leave/requests/:id/reject` - Reject leave request
- `POST /leave/requests/:id/cancel` - Cancel leave request
- `GET /leave/balance/:employeeId` - Get leave balance

### Performance Review Endpoints
- `GET /performance/reviews` - Get all performance reviews
- `GET /performance/reviews/:id` - Get performance review by ID
- `POST /performance/reviews` - Create new performance review
- `PUT /performance/reviews/:id` - Update performance review
- `DELETE /performance/reviews/:id` - Delete performance review
- `PUT /performance/goals/:id` - Update performance goal

### User Endpoints
- `PUT /users/profile` - Update user profile
- `GET /users/notifications` - Get user notifications
- `PUT /users/notifications/:id/read` - Mark notification as read
- `PUT /users/notifications/read-all` - Mark all notifications as read

### Interactive API Documentation
The complete API documentation with interactive testing is available at:
```
http://localhost:5000/api/docs
```

### Authentication
Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Response Format
All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

### Error Format
Error responses follow this format:
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "errors": [ ... ] // Validation errors
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps

# Restart database service
docker-compose restart postgres

# Check database logs
docker-compose logs postgres
```

#### Port Conflicts
If you encounter port conflicts, update the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change client port
  - "5001:5000"  # Change server port
```

#### Environment Variables
Ensure all required environment variables are set:
```bash
# Check if .env file exists
ls -la .env

# Verify environment variables
cat .env
```

#### Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For Docker builds
docker-compose down
docker-compose build --no-cache
```

#### Test Failures
```bash
# Run tests with verbose output
npm test -- --verbose

# Check test database connection
npm run db:migrate

# Reset test database
npm run db:seed
```

### Performance Issues
- **Slow API responses**: Check Redis connection and database indexes
- **Large bundle size**: Run `npm run build` and check bundle analyzer
- **Memory leaks**: Monitor Docker container memory usage

### Security Considerations
- Change default passwords in production
- Use strong JWT secrets
- Enable HTTPS in production
- Regularly update dependencies
- Monitor security advisories

### Getting Help

1. **Check Documentation**: Review this README and API documentation
2. **Search Issues**: Look through existing [GitHub Issues](https://github.com/your-repo/issues)
3. **Create Issue**: If you can't find a solution, create a new issue with:
   - Detailed description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)
   - Error logs and screenshots
4. **Contact Team**: Reach out to the development team for urgent issues

### Development Support
- **Code Review**: All changes require peer review
- **Testing**: Ensure tests pass before submitting PRs
- **Documentation**: Update documentation for new features
- **Standards**: Follow the established coding standards and conventions

## 🗄️ Database Schema

### Core Models

#### Users
- **id**: Unique identifier
- **email**: User email (unique)
- **firstName/lastName**: User names
- **password**: Hashed password
- **role**: User role (admin, hr_manager, manager, employee)
- **isActive**: Account status
- **createdAt/updatedAt**: Timestamps

#### Employees
- **id**: Links to User
- **employeeId**: Business identifier
- **department/position**: Job details
- **salary**: Compensation
- **hireDate**: Employment start
- **managerId**: Reporting relationship
- **skills**: Array of skills
- **certifications**: Related certifications

#### Leave Requests
- **id**: Unique identifier
- **employeeId**: Requesting employee
- **leaveType**: Type of leave
- **startDate/endDate**: Leave period
- **daysRequested**: Duration
- **status**: Request status
- **reason**: Leave reason
- **reviewedBy**: Approver

#### Performance Reviews
- **id**: Unique identifier
- **employeeId**: Employee being reviewed
- **reviewerId**: Reviewing manager
- **reviewPeriod**: Review timeframe
- **overallRating**: 1-5 rating
- **goals**: Related performance goals
- **achievements**: Accomplishments
- **areasForImprovement**: Development areas

#### Notifications
- **id**: Unique identifier
- **userId**: Recipient
- **title/message**: Notification content
- **type**: Notification type
- **isRead**: Read status
- **actionUrl**: Related action

### Relationships
- Users ↔ Employees (1:1)
- Employees ↔ Leave Requests (1:many)
- Employees ↔ Performance Reviews (1:many)
- Users ↔ Notifications (1:many)
- Employees ↔ Certifications (1:many)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core HR functionality
- ✅ Employee management
- ✅ Leave management
- ✅ Performance reviews
- ✅ Authentication & authorization

### Phase 2 (Next)
- [ ] Employee onboarding workflow
- [ ] Advanced reporting and analytics
- [ ] Document management system
- [ ] Email notifications
- [ ] Mobile-responsive improvements

### Phase 3 (Future)
- [ ] Mobile application (React Native)
- [ ] Integration with external HR systems
- [ ] Advanced role-based permissions
- [ ] Real-time notifications (WebSocket)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] API rate limiting improvements
- [ ] Advanced security features (2FA)

### Phase 4 (Long-term)
- [ ] AI-powered insights
- [ ] Advanced workflow automation
- [ ] Integration with payroll systems
- [ ] Advanced reporting and BI
- [ ] Microservices architecture
- [ ] Kubernetes deployment

## 📊 Project Statistics

- **Total Files**: 50+ source files
- **Lines of Code**: 5,000+ lines
- **Test Coverage**: 80%+ target
- **API Endpoints**: 25+ RESTful endpoints
- **Database Tables**: 8 core tables
- **Docker Images**: 3 containerized services
- **CI/CD Pipelines**: 3 automated workflows

---

**Happy Coding! 🎉**

*Built with ❤️ using modern web technologies*

```

Perfect! I have completed a comprehensive audit and enhancement of the README.md file. Here's a summary of what I've added and improved:

## 📋 README.md Audit Summary

### ✅ **What Was Already Covered:**
- Basic project description
- Technology stack overview
- Simple project structure
- Basic setup instructions
- Available scripts
- Basic testing information
- Simple configuration section
- Basic API documentation reference

### 🆕 **What I Added/Enhanced:**

#### 1. **Enhanced Technology Stack**
- Added missing technologies (Prisma ORM, Redis, Winston, etc.)
- Detailed frontend and backend dependencies
- Comprehensive testing and DevOps tools

#### 2. **Comprehensive Key Features Section**
- Authentication & Authorization details
- Employee Management features
- Leave Management workflow
- Performance Management system
- User Experience features
- System Features overview

#### 3. **Detailed Project Structure**
- Complete file tree with descriptions
- All actual files and directories documented
- Clear organization and purpose of each component

#### 4. **Enhanced Configuration**
- Complete environment variables documentation
- Categorized by functionality (Database, JWT, Server, etc.)
- Default values and descriptions for each variable

#### 5. **Comprehensive API Documentation**
- All 25+ API endpoints documented
- Request/response formats
- Authentication requirements
- Interactive documentation links

#### 6. **Enhanced Testing Section**
- Test structure and coverage details
- E2E test categories
- Custom Cypress commands
- Test data information
- Multiple test execution options

#### 7. **Docker & Deployment**
- Detailed Docker setup instructions
- Production image information
- Service descriptions and ports

#### 8. **CI/CD Pipeline Documentation**
- All 3 GitHub Actions workflows explained
- Pipeline features and capabilities
- Branch strategy and development workflow

#### 9. **Database Schema**
- Complete data model documentation
- Table relationships
- Field descriptions

#### 10. **Troubleshooting & Support**
- Common issues and solutions
- Performance optimization tips
- Security considerations
- Development support guidelines

#### 11. **Enhanced Roadmap**
- Phased development approach
- Current, next, and future features
- Project statistics

### 🎯 **Coverage Verification:**

The README.md now comprehensively covers:

- ✅ **Project Overview** - Complete description and features
- ✅ **Technology Stack** - All technologies and tools used
- ✅ **Project Structure** - Every file and directory documented
- ✅ **Setup Instructions** - Multiple setup methods (Docker and manual)
- ✅ **Configuration** - All environment variables explained
- ✅ **API Documentation** - Complete endpoint reference
- ✅ **Testing** - Unit, integration, and E2E testing details
- ✅ **Deployment** - Docker and CI/CD pipeline information
- ✅ **Development Workflow** - Branch strategy and processes
- ✅ **Database Schema** - Complete data model documentation
- ✅ **Troubleshooting** - Common issues and solutions
- ✅ **Support** - Getting help and development guidelines
- ✅ **Roadmap** - Future development plans

The README.md file is now a **comprehensive, professional documentation** that covers every aspect of the HR Management Application project, making it easy for developers to understand, set up, contribute to, and maintain the application.

---

**User**

can you run the project so i can test

---

**Cursor**

I'll help you run the HR Management Application project so you can test it. Let me start by checking the current directory and then running the project using Docker Compose, which is the easiest way to get everything up and running.


Great! We're in the correct directory. Now let me check if Docker is available and then start the project:


Perfect! Docker is installed. Now let me check if Docker Compose is available:


Excellent! Both Docker and Docker Compose are available. Now let me create the environment file and start the project:


Now let me start the project using Docker Compose:


The Docker containers are starting up in the background. Let me check the status and logs to see how the startup is progressing:


Let me check the Docker Compose logs to see what's happening:


