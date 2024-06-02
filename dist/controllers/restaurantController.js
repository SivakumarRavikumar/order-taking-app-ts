"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurants = exports.deleteRestaurant = exports.updateRestaurant = exports.addRestaurant = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const addRestaurant = async (req, res) => {
    const { name, phone, email } = req.body;
    try {
        const newRestaurant = new restaurant_1.default({ name, phone, email });
        await newRestaurant.save();
        res.json(newRestaurant);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.addRestaurant = addRestaurant;
const updateRestaurant = async (req, res) => {
    const { id, name, phone, email } = req.body;
    try {
        const restaurant = await restaurant_1.default.findById(id);
        if (!restaurant)
            return res.status(404).json({ msg: 'Restaurant not found' });
        restaurant.name = name || restaurant.name;
        restaurant.phoneNumber = phone || restaurant.phoneNumber;
        restaurant.email = email || restaurant.email;
        await restaurant.save();
        res.json(restaurant);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await restaurant_1.default.findById(id);
        if (!restaurant)
            return res.status(404).json({ msg: 'Restaurant not found' });
        await restaurant.deleteOne();
        res.json({ msg: 'Restaurant removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.deleteRestaurant = deleteRestaurant;
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await restaurant_1.default.find();
        res.json(restaurants);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.getRestaurants = getRestaurants;
