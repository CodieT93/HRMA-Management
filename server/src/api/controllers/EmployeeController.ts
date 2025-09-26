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
          role: 'EMPLOYEE',
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
