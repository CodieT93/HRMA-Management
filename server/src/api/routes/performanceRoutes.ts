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
