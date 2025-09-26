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
