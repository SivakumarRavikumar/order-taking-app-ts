"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const menuController_1 = require("../controllers/menuController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/menu:
 *   post:
 *     summary: Add a new menu item
 *     tags: [Menu]
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
 * /api/menu:
 *   put:
 *     summary: Update an existing menu item
 *     tags: [Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *               - price
 *               - category
 *             properties:
 *               id:
 *                 type: string
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
router.post('/', auth_1.default, menuController_1.addMenuItem);
router.put('/', auth_1.default, menuController_1.updateMenuItem);
router.delete('/:id', auth_1.default, menuController_1.deleteMenuItem);
router.get('/', menuController_1.getMenuItems);
exports.default = router;
