"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
exports.default = (req, res, next) => {
    // const token = req.header('x-auth-token');
    const token = req.header('Authorization')?.substring(`Bearer `.length);
    console.log('token  ', token);
    if (!token)
        return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
