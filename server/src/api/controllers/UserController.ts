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
