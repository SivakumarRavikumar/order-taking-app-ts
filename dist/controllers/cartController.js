"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartItem = exports.updateCartItem = exports.getCart = exports.addToCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const menuItem_1 = __importDefault(require("../models/menuItem"));
const addToCart = async (req, res) => {
    const { menuItemId, quantity } = req.body;
    try {
        const menuItem = await menuItem_1.default.findById(menuItemId);
        if (!menuItem)
            return res.status(404).json({ msg: 'Menu item not found' });
        let cartItem = await cart_1.default.findOne({ menuItem: menuItemId, user: req.user.id });
        if (cartItem) {
            cartItem.quantity += quantity;
        }
        else {
            cartItem = new cart_1.default({ menuItem: menuItemId, quantity, user: req.user.id });
        }
        await cartItem.save();
        res.json(cartItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.addToCart = addToCart;
const getCart = async (req, res) => {
    try {
        const cartItems = await cart_1.default.find({ user: req.user.id }).populate('menuItem');
        res.json(cartItems);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getCart = getCart;
const updateCartItem = async (req, res) => {
    const { id, quantity } = req.body;
    try {
        const cartItem = await cart_1.default.findById(id);
        if (!cartItem)
            return res.status(404).json({ msg: 'Cart item not found' });
        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.updateCartItem = updateCartItem;
const removeCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const cartItem = await cart_1.default.findById(id);
        if (!cartItem)
            return res.status(404).json({ msg: 'Cart item not found' });
        await cartItem.deleteOne();
        res.json({ msg: 'Cart item removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.removeCartItem = removeCartItem;
