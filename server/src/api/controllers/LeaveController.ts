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
    if (authReq.user?.role === 'EMPLOYEE') {
      const employee = await prisma.employee.findFirst({
        where: { user: { id: authReq.user.id } },
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
    if (authReq.user?.role === 'EMPLOYEE') {
      const employee = await prisma.employee.findFirst({
        where: { user: { id: authReq.user.id } },
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
      where: { user: { id: authReq.user!.id } },
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
        status: { in: ['PENDING', 'APPROVED'] },
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
        status: 'PENDING',
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

    if (leaveRequest.status !== 'PENDING') {
      throw createError('Leave request is not pending', 400);
    }

    // Update leave request
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'APPROVED',
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

    if (leaveRequest.status !== 'PENDING') {
      throw createError('Leave request is not pending', 400);
    }

    // Update leave request
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'REJECTED',
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
    if (authReq.user?.role === 'EMPLOYEE') {
      const employee = await prisma.employee.findFirst({
        where: { user: { id: authReq.user.id } },
      });
      if (!employee || leaveRequest.employeeId !== employee.id) {
        throw createError('Access denied', 403);
      }
    }

    if (leaveRequest.status !== 'PENDING') {
      throw createError('Only pending leave requests can be cancelled', 400);
    }

    // Update leave request
    const updatedRequest = await prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED',
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
        status: 'APPROVED',
        startDate: { gte: yearStart },
        endDate: { lte: yearEnd },
      },
    });

    // Calculate leave balance (assuming 20 days annual leave per year)
    const annualLeaveDays = 20;
    const usedAnnualLeave = leaveRequests
      .filter(req => req.leaveType === 'ANNUAL')
      .reduce((total, req) => total + req.daysRequested, 0);

    const usedSickLeave = leaveRequests
      .filter(req => req.leaveType === 'SICK')
      .reduce((total, req) => total + req.daysRequested, 0);

    const usedPersonalLeave = leaveRequests
      .filter(req => req.leaveType === 'PERSONAL')
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
