import { Request, Response } from 'express';
import Order, { IOrder } from '../models/order';
import CartItem from '../models/cart';
import {IMenuItem} from '../models/menuItem';

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const cartItems = await CartItem.find({ user: req.user!.id }).populate<{ menuItem: IMenuItem }>('menuItem');
        if (cartItems.length === 0) return res.status(400).json({ msg: 'Cart is empty' });

        const orderItems = cartItems.map(item => ({
            menuItem: item.menuItem._id,
            quantity: item.quantity
        }));

        // Calculate total price
        const total = cartItems.reduce((sum, item) => {
            const menuItemPrice = item.menuItem.price;
            return sum + menuItemPrice * item.quantity;
        }, 0);

        const order: IOrder = new Order({ user: req.user!.id, items: orderItems, total });
        await order.save();

        await CartItem.deleteMany({ user: req.user!.id });

        res.json(order);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const getOrderHistory = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.user!.id }).populate('items.menuItem');
        res.json(orders);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const getOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        res.json({ status: order.status });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};
export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ msg: 'Order not found' });

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};