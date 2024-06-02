import { Request, Response } from 'express';
import MenuItem, { IMenuItem } from '../models/menuItem';

export const addMenuItem = async (req: Request, res: Response) => {
    const { name, description, price, category, restaurant } = req.body;
    try {
        const newMenuItem: IMenuItem = new MenuItem({ name, description, price, category, restaurant });
        await newMenuItem.save();
        res.json(newMenuItem);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const updateMenuItem = async (req: Request, res: Response) => {
    const { menuId } = req.params;
    const { name, description, price, category } = req.body;
    try {
        const menuItem = await MenuItem.findById(menuId);
        if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });

        menuItem.name = name || menuItem.name;
        menuItem.description = description || menuItem.description;
        menuItem.price = price || menuItem.price;
        menuItem.category = category || menuItem.category;

        await menuItem.save();
        res.json(menuItem);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
    const { menuId } = req.params;
    try {
        const menuItem = await MenuItem.findById(menuId);
        if (!menuItem) return res.status(404).json({ msg: 'Menu item not found' });

        await menuItem.deleteOne();
        res.json({ msg: 'Menu item removed' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};
