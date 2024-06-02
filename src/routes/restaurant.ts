import { Router } from 'express';
import auth from '../middlewares/auth';
import checkRole from '../middlewares/role';
import { addRestaurant, updateRestaurant, deleteRestaurant, getRestaurants } from '../controllers/restaurantController';

const router = Router();

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Add a new restaurant
 *     tags: [Restaurant]
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
 *               - phone
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant added successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restaurants/{id}:
 *   patch:
 *     summary: Update an existing restaurant
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurant]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of restaurants
 *       500:
 *         description: Server error
 */

router.post('/', auth, checkRole(['admin']), addRestaurant);
router.patch('/:id', auth, checkRole(['admin']), updateRestaurant);
router.delete('/:id', auth, checkRole(['admin']), deleteRestaurant);
router.get('/', getRestaurants);

export default router;
