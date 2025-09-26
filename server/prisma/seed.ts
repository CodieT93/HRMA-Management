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
