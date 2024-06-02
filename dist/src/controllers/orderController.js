"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderStatus = exports.getOrderHistory = exports.placeOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const cart_1 = __importDefault(require("../models/cart"));
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield cart_1.default.find({ user: req.user.id }).populate('menuItem');
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
        yield order.save();
        yield cart_1.default.deleteMany({ user: req.user.id });
        res.json(order);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.placeOrder = placeOrder;
const getOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find({ user: req.user.id }).populate('items.menuItem');
        res.json(orders);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.getOrderHistory = getOrderHistory;
const getOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const order = yield order_1.default.findById(id);
        if (!order)
            return res.status(404).json({ msg: 'Order not found' });
        res.json({ status: order.status });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.getOrderStatus = getOrderStatus;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    try {
        const order = yield order_1.default.findById(id);
        if (!order)
            return res.status(404).json({ msg: 'Order not found' });
        order.status = status;
        yield order.save();
        res.json(order);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.updateOrderStatus = updateOrderStatus;
