"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const cartController_1 = require("../controllers/cartController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
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
 *     responses:
 *       200:
 *         description: Successfully retrieved cart items
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/cart:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart]
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
router.post('/', auth_1.default, cartController_1.addToCart);
router.get('/', auth_1.default, cartController_1.getCart);
router.put('/', auth_1.default, cartController_1.updateCartItem);
router.delete('/:id', auth_1.default, cartController_1.removeCartItem);
exports.default = router;
