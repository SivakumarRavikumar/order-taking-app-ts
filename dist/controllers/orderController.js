"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderStatus = exports.getOrderHistory = exports.placeOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const cart_1 = __importDefault(require("../models/cart"));
const placeOrder = async (req, res) => {
    try {
        const cartItems = await cart_1.default.find({ user: req.user.id }).populate('menuItem');
        if (cartItems.length === 0)
            return res.status(400).json({ msg: 'Cart is empty' });
        const orderItems = cartItems.map(item => ({
            menuItem: item.menuItem._id,
            quantity: item.quantity
        }));
        // Calculate total price
        const total = cartItems.reduce((sum, item) => {
            const menuItemPrice = item.menuItem.price;
            return sum + menuItemPrice * item.quantity;
        }, 0);
        const order = new order_1.default({ user: req.user.id, items: orderItems, total });
        await order.save();
        await cart_1.default.deleteMany({ user: req.user.id });
        res.json(order);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.placeOrder = placeOrder;
const getOrderHistory = async (req, res) => {
    try {
        const orders = await order_1.default.find({ user: req.user.id }).populate('items.menuItem');
        res.json(orders);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getOrderHistory = getOrderHistory;
const getOrderStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await order_1.default.findById(id);
        if (!order)
            return res.status(404).json({ msg: 'Order not found' });
        res.json({ status: order.status });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getOrderStatus = getOrderStatus;
const updateOrderStatus = async (req, res) => {
    const { id, status } = req.body;
    try {
        const order = await order_1.default.findById(id);
        if (!order)
            return res.status(404).json({ msg: 'Order not found' });
        order.status = status;
        await order.save();
        res.json(order);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.updateOrderStatus = updateOrderStatus;
