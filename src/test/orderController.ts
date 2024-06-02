import { Request, Response } from 'express';
import Order, { IOrder } from '../models/order';
import CartItem from '../models/cart';
import { placeOrder, getOrderHistory, getOrderStatus, updateOrderStatus } from '../controllers/orderController';

jest.mock('../models/order');
jest.mock('../models/cart');

describe('Order Controller', () => {
    let consoleSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        jest.clearAllMocks();
        consoleSpy.mockRestore();

    });

    describe('placeOrder', () => {
        it('should place an order successfully', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            } as unknown as Response;

            const mockCartItems = [
                { menuItem: { _id: 'item1', price: 10 }, quantity: 2 },
                { menuItem: { _id: 'item2', price: 15 }, quantity: 3 }
            ];
            const mockOrderItems = [
                { menuItem: 'item1', quantity: 2 },
                { menuItem: 'item2', quantity: 3 }
            ];
            const total = 10 * 2 + 15 * 3;

            // Mock CartItem.find().populate() to return the desired cart items
            (CartItem.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockCartItems)
            });

            const mockOrder = {
                _id: 'mockOrderId',
                save: jest.fn().mockResolvedValue({ _id: 'mockOrderId' })
            };

            (Order as unknown as jest.Mock).mockImplementation(() => mockOrder);
            // Call the function
            await placeOrder(req, res);

            // **Fix: Expect only _id property on the response object**
            expect(res.json).toHaveBeenCalledWith(mockOrder);
        });


        it('should return 400 if the cart is empty', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (CartItem.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue([])
            });
            await placeOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Cart is empty' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            // (CartItem.find as jest.Mock).mockRejectedValue(new Error(errorMessage));
            (CartItem.find as jest.Mock).mockImplementation(() => {
                throw new Error(errorMessage);
            });
            await placeOrder(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });

    describe('getOrderHistory', () => {
        it('should return the user\'s order history', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;

            const res = {
                json: jest.fn(),
            } as unknown as Response;

            const mockOrders = [{ _id: 'order1' }, { _id: 'order2' }];

            (Order.find as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockOrders)
            });
            await getOrderHistory(req, res);

            expect(Order.find).toHaveBeenCalledWith({ user: 'mockUserId' });
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        });

        it('should return 500 if there is a server error', async () => {
            const req = { user: { id: 'mockUserId' } } as unknown as Request;
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (Order.find as jest.Mock).mockImplementation(() => {
                throw new Error(errorMessage);
            });
            await getOrderHistory(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });

    });

    describe('getOrderStatus', () => {
        it('should return the status of the requested order', async () => {
            const req = { params: { id: 'mockOrderId' } } as unknown as Request;

            const res = {
                json: jest.fn(),
                status: jest.fn()
            } as unknown as Response;

            const mockOrder = { _id: 'mockOrderId', status: 'pending' };
            (Order.findById as jest.Mock).mockResolvedValue(mockOrder);

            await getOrderStatus(req, res);

            expect(Order.findById).toHaveBeenCalledWith('mockOrderId');
            expect(res.json).toHaveBeenCalledWith({ status: 'pending' });
        });

        it('should return 404 if the order is not found', async () => {
            const req = { params: { id: 'mockOrderId' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (Order.findById as jest.Mock).mockResolvedValue(null);

            await getOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Order not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = { params: { id: 'mockOrderId' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (Order.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await getOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });
    describe('updateOrderStatus', () => {
        it('should update the status of the requested order', async () => {
            const req = { params: { id: 'mockOrderId' }, body: { status: 'completed' } } as unknown as Request;

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            } as unknown as Response;

            const mockOrder = {
                _id: 'mockOrderId',
                status: 'pending',
                save: jest.fn().mockResolvedValue({ _id: 'mockOrderId', status: 'pending' }),
            };

            (Order.findById as jest.Mock).mockResolvedValue(mockOrder);
            await updateOrderStatus(req, res);

            expect(Order.findById).toHaveBeenCalledWith('mockOrderId');
            expect(mockOrder.save).toHaveBeenCalled(); // Ensure save() is called on the mockOrder
            expect(res.json).toHaveBeenCalledWith(mockOrder);
        });

        it('should return 404 if the order is not found', async () => {
            const req = { params: { id: 'mockOrderId' }, body: { status: 'completed' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (Order.findById as jest.Mock).mockResolvedValue(null);

            await updateOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Order not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = { params: { id: 'mockOrderId' }, body: { status: 'completed' } } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            (Order.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await updateOrderStatus(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });
});
