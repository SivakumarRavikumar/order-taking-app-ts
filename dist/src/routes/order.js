"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const orderController_1 = require("../controllers/orderController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Order]
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
 * /api/orders/status:
 *   put:
 *     summary: Update the status of an order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - status
 *             properties:
 *               id:
 *                 type: string
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
router.post('/', auth_1.default, orderController_1.placeOrder);
router.get('/history', auth_1.default, orderController_1.getOrderHistory);
router.get('/:id/status', auth_1.default, orderController_1.getOrderStatus);
router.put('/status', auth_1.default, orderController_1.updateOrderStatus);
exports.default = router;
