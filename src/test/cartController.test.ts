import { Request, Response } from 'express';
import CartItem from '../models/cart';
import MenuItem from '../models/menuItem';
import { addToCart, getCart, updateCartItem, removeCartItem } from '../controllers/cartController';

jest.mock('../models/cart');
jest.mock('../models/menuItem');

describe('Cart Controller', () => {
    let consoleSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    describe('addToCart', () => {
        it('should add a menu item to the cart and return it', async () => {
            const req = {
                body: { menuItemId: 'mockMenuItemId', quantity: 2 },
                user: { id: 'mockUserId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockMenuItem = { _id: 'mockMenuItemId' };
            (MenuItem.findById as jest.Mock).mockResolvedValue(mockMenuItem);

            const mockCartItemInstance = {
                _id: 'mockCartItemId',
                menuItem: 'mockMenuItemId',
                quantity: 2,
                user: 'mockUserId',
                save: jest.fn().mockResolvedValue({ _id: 'mockCartItemId' }),
            };

            (CartItem.findOne as jest.Mock).mockResolvedValue(null);
            (CartItem as unknown as jest.Mock).mockImplementation(() => mockCartItemInstance);

            await addToCart(req, res);

            expect(CartItem.findOne).toHaveBeenCalledWith({ menuItem: 'mockMenuItemId', user: 'mockUserId' });
            expect(mockCartItemInstance.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockCartItemInstance);
        });

        it('should update quantity if the menu item already exists in the cart', async () => {
            const req = {
                body: { menuItemId: 'mockMenuItemId', quantity: 2 },
                user: { id: 'mockUserId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockMenuItem = { _id: 'mockMenuItemId' };
            (MenuItem.findById as jest.Mock).mockResolvedValue(mockMenuItem);

            const existingCartItem = {
                _id: 'mockCartItemId',
                menuItem: 'mockMenuItemId',
                quantity: 1,
                user: 'mockUserId',
                save: jest.fn().mockResolvedValue({ _id: 'mockCartItemId' }),
            };

            (CartItem.findOne as jest.Mock).mockResolvedValue(existingCartItem);

            await addToCart(req, res);

            expect(existingCartItem.save).toHaveBeenCalled();
            expect(existingCartItem.quantity).toEqual(3);
            expect(res.json).toHaveBeenCalledWith(existingCartItem);
        });

        it('should return 404 if the menu item is not found', async () => {
            const req = {
                body: { menuItemId: 'mockMenuItemId', quantity: 2 },
                user: { id: 'mockUserId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (MenuItem.findById as jest.Mock).mockResolvedValue(null);

            await addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Menu item not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                body: { menuItemId: 'mockMenuItemId', quantity: 2 },
                user: { id: 'mockUserId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (MenuItem.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await addToCart(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });

    describe('getCart', () => {
        it('should return the user\'s cart items', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockCartItems = [{ _id: 'item1' }, { _id: 'item2' }];
            (CartItem.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockCartItems)
            });

            await getCart(req, res);

            expect(CartItem.find).toHaveBeenCalledWith({ user: 'mockUserId' });
            expect(res.json).toHaveBeenCalledWith(mockCartItems);
        });

        it('should return 500 if there is a server error', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (CartItem.find as jest.Mock).mockImplementation(() => {
                throw new Error(errorMessage);
            });

            await getCart(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });

    describe('updateCartItem', () => {
        it('should update the quantity of an existing cart item and return it', async () => {
            const req = {
                params: { id: 'mockCartItemId' },
                body: { quantity: 5 }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockCartItem = {
                _id: 'mockCartItemId',
                quantity: 3,
                save: jest.fn().mockResolvedValue({ _id: 'mockCartItemId', quantity: 5 }),
            };

            (CartItem.findById as jest.Mock).mockResolvedValue(mockCartItem);

            await updateCartItem(req, res);

            expect(mockCartItem.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockCartItem);
        });

        it('should return 404 if the cart item is not found', async () => {
            const req = {
                params: { id: 'mockCartItemId' },
                body: { quantity: 5 }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (CartItem.findById as jest.Mock).mockResolvedValue(null);

            await updateCartItem(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Cart item not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                params: { id: 'mockCartItemId' },
                body: { quantity: 5 }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (CartItem.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await updateCartItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });

    describe('removeCartItem', () => {
        it('should remove an existing cart item and return a success message', async () => {
            const req = {
                params: { id: 'mockCartItemId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockCartItem = {
                _id: 'mockCartItemId',
                deleteOne: jest.fn().mockResolvedValue({})
            };

            (CartItem.findById as jest.Mock).mockResolvedValue(mockCartItem);

            await removeCartItem(req, res);

            expect(mockCartItem.deleteOne).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ msg: 'Cart item removed' });
        });

        it('should return 404 if the cart item is not found', async () => {
            const req = {
                params: { id: 'mockCartItemId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (CartItem.findById as jest.Mock).mockResolvedValue(null);

            await removeCartItem(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Cart item not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                params: { id: 'mockCartItemId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (CartItem.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await removeCartItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });
});

