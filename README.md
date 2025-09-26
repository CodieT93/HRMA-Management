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
