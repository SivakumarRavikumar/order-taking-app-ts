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
exports.getMenuItems = exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = void 0;
const menuItem_1 = __importDefault(require("../models/menuItem"));
const addMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, restaurant } = req.body;
    try {
        const newMenuItem = new menuItem_1.default({ name, description, price, category, restaurant });
        yield newMenuItem.save();
        res.json(newMenuItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.addMenuItem = addMenuItem;
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description, price, category } = req.body;
    try {
        const menuItem = yield menuItem_1.default.findById(id);
        if (!menuItem)
            return res.status(404).json({ msg: 'Menu item not found' });
        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.category = category || menuItem.category;
        yield menuItem.save();
        res.json(menuItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menuItem = yield menuItem_1.default.findById(id);
        if (!menuItem)
            return res.status(404).json({ msg: 'Menu item not found' });
        yield menuItem.deleteOne();
        res.json({ msg: 'Menu item removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.deleteMenuItem = deleteMenuItem;
const getMenuItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield menuItem_1.default.find();
        res.json(menuItems);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.getMenuItems = getMenuItems;
