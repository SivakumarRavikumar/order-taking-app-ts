import { Router } from 'express';
import auth from '../middlewares/auth';
import { placeOrder, getOrderHistory, getOrderStatus, updateOrderStatus } from '../controllers/orderController';

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Cart is empty
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/orders/history:
 *   get:
 *     summary: Get order history for a user
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved order history
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   get:
 *     summary: Get the status of an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Successfully retrieved order status
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */

router.post('/', auth, placeOrder);
router.get('/history', auth, getOrderHistory);
router.get('/:id/status', auth, getOrderStatus);
router.patch('/:id/status', auth, updateOrderStatus);

export default router;
