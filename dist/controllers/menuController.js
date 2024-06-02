"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenuItems = exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = void 0;
const menuItem_1 = __importDefault(require("../models/menuItem"));
const addMenuItem = async (req, res) => {
    const { name, description, price, category, restaurant } = req.body;
    try {
        const newMenuItem = new menuItem_1.default({ name, description, price, category, restaurant });
        await newMenuItem.save();
        res.json(newMenuItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.addMenuItem = addMenuItem;
const updateMenuItem = async (req, res) => {
    const { id, name, description, price, category } = req.body;
    try {
        const menuItem = await menuItem_1.default.findById(id);
        if (!menuItem)
            return res.status(404).json({ msg: 'Menu item not found' });
        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.category = category || menuItem.category;
        await menuItem.save();
        res.json(menuItem);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        const menuItem = await menuItem_1.default.findById(id);
        if (!menuItem)
            return res.status(404).json({ msg: 'Menu item not found' });
        await menuItem.deleteOne();
        res.json({ msg: 'Menu item removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.deleteMenuItem = deleteMenuItem;
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await menuItem_1.default.find();
        res.json(menuItems);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getMenuItems = getMenuItems;
