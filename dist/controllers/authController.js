"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log(`Attempting to place order with id: ${email}`);
        let user = await user_1.default.findOne({ email });
        console.log(`user : ${user}`);
        if (user)
            return res.status(400).json({ msg: 'User already exists' });
        user = new user_1.default({ name, email, password });
        await user.save();
        const payload = { user: { id: user._id } };
        jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err)
                throw err;
            return res.status(200).json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ msg: 'Invalid Credentials' });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: 'Invalid Credentials' });
        const payload = { user: { id: user.id } };
        jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err)
                throw err;
            res.status(201).json({ token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
exports.login = login;
