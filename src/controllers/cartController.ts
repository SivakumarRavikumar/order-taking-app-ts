import { Request, Response } from 'express';
import CartItem from '../models/cart';
import MenuItem from '../models/menuItem';

export const addToCart = async (req: Request, res: Response) => {
    const { menuItemId, quantity } = req.body;
    try {
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });

        let cartItem = await CartItem.findOne({ menuItem: menuItemId, user: req.user!.id });
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cartItem = new CartItem({ menuItem: menuItemId, quantity, user: req.user!.id });
        }
        await cartItem.save();
        res.json(cartItem);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const getCart = async (req: Request, res: Response) => {
    try {
        const cartItems = await CartItem.find({ user: req.user!.id }).populate('menuItem');
        res.json(cartItems);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const updateCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {  quantity } = req.body;
    try {
        const cartItem = await CartItem.findById(id);
        if (!cartItem) return res.status(404).json({ msg: 'Cart item not found' });

        cartItem.quantity = quantity;
        await cartItem.save();
        res.json(cartItem);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const removeCartItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cartItem = await CartItem.findById(id);
        if (!cartItem) return res.status(404).json({ msg: 'Cart item not found' });

        await cartItem.deleteOne();
        res.json({ msg: 'Cart item removed' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};
