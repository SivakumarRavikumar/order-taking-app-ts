import { Router } from 'express';
import auth from '../middlewares/auth';
import { addToCart, getCart, updateCartItem, removeCartItem } from '../controllers/cartController';

const router = Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menuItemId
 *               - quantity
 *             properties:
 *               menuItemId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get the cart items
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - quantity
 *             properties:
 *               id:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Remove a cart item
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart item ID
 *     responses:
 *       200:
 *         description: Cart item removed successfully
 *       404:
 *         description: Cart item not found
 *       500:
 *         description: Server error
 */

router.post('/', auth, addToCart);
router.get('/', auth, getCart);
router.patch('/:id', auth, updateCartItem);
router.delete('/:id', auth, removeCartItem);

export default router;
