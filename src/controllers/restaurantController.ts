import { Request, Response } from 'express';
import Restaurant, { IRestaurant } from '../models/restaurant';

export const addRestaurant = async (req: Request, res: Response) => {
    const { name, phoneNumber, email } = req.body;
    try {
        const newRestaurant: IRestaurant = new Restaurant({ name, phoneNumber, email });
        await newRestaurant.save();
        res.json(newRestaurant);
    } catch (err) {
        console.log((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const updateRestaurant = async (req: Request, res: Response) => {
    const { restaurantId } = req.params;
    const { name, phoneNumber, email } = req.body;
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });

        restaurant.name = name || restaurant.name;
        restaurant.phoneNumber = phoneNumber || restaurant.phoneNumber;
        restaurant.email = email || restaurant.email;

        await restaurant.save();
        res.json(restaurant);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
    const { restaurantId } = req.params;
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ msg: 'Restaurant not found' });

        await restaurant.deleteOne();
        res.json({ msg: 'Restaurant removed' });
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};

export const getRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        console.error((err as Error).message);
        res.status(500).send('Server error');
    }
};
