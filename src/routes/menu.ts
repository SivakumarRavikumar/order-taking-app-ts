import { Router } from 'express';
import auth from '../middlewares/auth';
import checkRole from '../middlewares/role';
import { addMenuItem, updateMenuItem, deleteMenuItem, getMenuItems } from '../controllers/menuController';

const router = Router();

/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add a new menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - restaurant
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               restaurant:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu item added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   patch:
 *     summary: Update an existing menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/menu/{id}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The menu item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of menu items
 *       500:
 *         description: Server error
 */

router.post('/', auth, checkRole(['admin']), addMenuItem);
router.patch('/:id', auth, checkRole(['admin']), updateMenuItem);
router.delete('/:id', auth, checkRole(['admin']), deleteMenuItem);
router.get('/', getMenuItems);

export default router;
