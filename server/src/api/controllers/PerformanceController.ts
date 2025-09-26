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
    if (authReq.user?.role === 'EMPLOYEE') {
      const employee = await prisma.employee.findFirst({
        where: { user: { id: authReq.user.id } },
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
    if (authReq.user?.role === 'EMPLOYEE') {
      const employee = await prisma.employee.findFirst({
        where: { user: { id: authReq.user.id } },
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
          status: 'DRAFT',
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
