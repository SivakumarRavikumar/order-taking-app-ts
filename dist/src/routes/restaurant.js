"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const restaurantController_1 = require("../controllers/restaurantController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Add a new restaurant
 *     tags: [Restaurant]
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
 * /api/restaurants:
 *   put:
 *     summary: Update an existing restaurant
 *     tags: [Restaurant]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - phone
 *               - email
 *             properties:
 *               id:
 *                 type: string
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
router.post('/', auth_1.default, restaurantController_1.addRestaurant);
router.put('/', auth_1.default, restaurantController_1.updateRestaurant);
router.delete('/:id', auth_1.default, restaurantController_1.deleteRestaurant);
router.get('/', restaurantController_1.getRestaurants);
exports.default = router;
