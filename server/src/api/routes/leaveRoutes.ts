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
