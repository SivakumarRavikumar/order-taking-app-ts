import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

export const register = async (req: Request, res: Response) => {
    const { name, email, password ,role} = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password,role});
        await user.save();

        const payload = { user: { id: user._id ,role:user.role} };
        jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
        return res.status(200).json({ token });
        });
    } catch (err) {
        console.error((err as Error).message);
        return res.status(500).send('Server error');
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id ,role:user.role}};
        jwt.sign(payload, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ token });
        });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const logout = (req: Request, res: Response) => {
    // Since JWT is stateless, we can't invalidate it on the server side.
    // The client should remove the token to "log out".
    res.json({ msg: 'Logged out successfully' });
};