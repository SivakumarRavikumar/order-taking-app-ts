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
exports.getRestaurants = exports.deleteRestaurant = exports.updateRestaurant = exports.addRestaurant = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const addRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email } = req.body;
    try {
        const newRestaurant = new restaurant_1.default({ name, phone, email });
        yield newRestaurant.save();
        res.json(newRestaurant);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.addRestaurant = addRestaurant;
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, phone, email } = req.body;
    try {
        const restaurant = yield restaurant_1.default.findById(id);
        if (!restaurant)
            return res.status(404).json({ msg: 'Restaurant not found' });
        restaurant.name = name || restaurant.name;
        restaurant.phoneNumber = phone || restaurant.phoneNumber;
        restaurant.email = email || restaurant.email;
        yield restaurant.save();
        res.json(restaurant);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const restaurant = yield restaurant_1.default.findById(id);
        if (!restaurant)
            return res.status(404).json({ msg: 'Restaurant not found' });
        yield restaurant.deleteOne();
        res.json({ msg: 'Restaurant removed' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.deleteRestaurant = deleteRestaurant;
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_1.default.find();
        res.json(restaurants);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
exports.getRestaurants = getRestaurants;
