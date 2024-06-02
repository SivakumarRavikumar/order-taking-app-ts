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
exports.removeCartItem = exports.updateCartItem = exports.getCart = exports.addToCart = void 0;
const cart_1 = __importDefault(require("../models/cart"));
const menuItem_1 = __importDefault(require("../models/menuItem"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuItemId, quantity } = req.body;
    try {
        const menuItem = yield menuItem_1.default.findById(menuItemId);
        if (!menuItem)
            return res.status(404).json({ msg: 'Menu item not found' });
        let cartItem = yield cart_1.default.findOne({ menuItem: menuItemId, user: req.user.id });
        if (cartItem) {
            cartItem.quantity += quantity;
        }
        else {
            cartItem = new cart_1.default({ menuItem: menuItemId, quantity, user: req.user.id });
        }
        yield cartItem.save();
        res.json(cartItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.addToCart = addToCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield cart_1.default.find({ user: req.user.id }).populate('menuItem');
        res.json(cartItems);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.getCart = getCart;
const updateCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, quantity } = req.body;
    try {
        const cartItem = yield cart_1.default.findById(id);
        if (!cartItem)
            return res.status(404).json({ msg: 'Cart item not found' });
        cartItem.quantity = quantity;
        yield cartItem.save();
        res.json(cartItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.updateCartItem = updateCartItem;
const removeCartItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cartItem = yield cart_1.default.findById(id);
        if (!cartItem)
            return res.status(404).json({ msg: 'Cart item not found' });
        yield cartItem.deleteOne();
        res.json({ msg: 'Cart item removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.removeCartItem = removeCartItem;
