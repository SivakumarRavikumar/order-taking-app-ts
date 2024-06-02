import { Request, Response } from 'express';
import Restaurant from '../models/restaurant';
import { addRestaurant, updateRestaurant, deleteRestaurant, getRestaurants } from '../controllers/restaurantController';

jest.mock('../models/restaurant');

describe('Restaurant Controller', () => {
    let consoleSpy: jest.SpyInstance;

    describe('addRestaurant', () => {
        it('should add a new restaurant and return it', async () => {
            const req = {
                body: { name: 'Test Restaurant', phoneNumber: '1234567890', email: 'test@restaurant.com' }
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            } as unknown as Response;

            const mockRestaurantInstance = {
                _id: 'mockId',
                name: 'Test Restaurant',
                phoneNumber: '1234567890',
                email: 'test@restaurant.com',
                save: jest.fn().mockResolvedValue({ _id: 'mockId' }),
            };

            // Mock the Restaurant constructor to return the mock instance
            (Restaurant as unknown as jest.Mock).mockImplementation(() => mockRestaurantInstance);

            await addRestaurant(req, res);

            expect(mockRestaurantInstance.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockRestaurantInstance);
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                body: { name: 'Test Restaurant', phoneNumber: '1234567890', email: 'test@restaurant.com' }
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            (Restaurant.prototype.save as jest.Mock).mockRejectedValue(new Error('Server error'));

            await addRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });

    describe('updateRestaurant', () => {
      
        it('should update an existing restaurant and return it', async () => {
            const req = {
                params: { restaurantId: 'mockId' },
                body: { name: 'Updated Restaurant', phoneNumber: '0987654321', email: 'updated@restaurant.com' }
            } as unknown as Request;
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            } as unknown as Response;
    
            const updatedRestaurantData = {
                name: 'Updated Restaurant',
                phoneNumber: '0987654321',
                email: 'updated@restaurant.com'
            };
    
            const mockRestaurant = {
                save: jest.fn().mockResolvedValue(updatedRestaurantData),
                ...updatedRestaurantData
            };
    
            (Restaurant.findById as jest.Mock).mockResolvedValue(mockRestaurant);
    
            await updateRestaurant(req, res);
    
            expect(mockRestaurant.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(updatedRestaurantData));
        });
        it('should return 404 if the restaurant is not found', async () => {
            const req = {
                params: { restaurantId: 'mockId' },
                body: { name: 'Updated Restaurant', phoneNumber: '0987654321', email: 'updated@restaurant.com' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (Restaurant.findById as jest.Mock).mockResolvedValue(null);

            await updateRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Restaurant not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                params: { restaurantId: 'mockId' },
                body: { name: 'Updated Restaurant', phoneNumber: '0987654321', email: 'updated@restaurant.com' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            (Restaurant.findById as jest.Mock).mockRejectedValue(new Error('Server error'));

            await updateRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });

    describe('deleteRestaurant', () => {
        it('should delete an existing restaurant and return a success message', async () => {
            const req = {
                params: { restaurantId: 'mockId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockRestaurant = {
                deleteOne: jest.fn().mockResolvedValue({})
            };

            (Restaurant.findById as jest.Mock).mockResolvedValue(mockRestaurant);

            await deleteRestaurant(req, res);

            expect(mockRestaurant.deleteOne).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ msg: 'Restaurant removed' });
        });

        it('should return 404 if the restaurant is not found', async () => {
            const req = {
                params: { restaurantId: 'mockId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (Restaurant.findById as jest.Mock).mockResolvedValue(null);

            await deleteRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Restaurant not found' });
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                params: { restaurantId: 'mockId' }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            (Restaurant.findById as jest.Mock).mockRejectedValue(new Error('Server error'));

            await deleteRestaurant(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });

    describe('getRestaurants', () => {
        it('should return a list of restaurants', async () => {
            const req = {} as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockRestaurants = [{ name: 'Restaurant 1' }, { name: 'Restaurant 2' }];

            (Restaurant.find as jest.Mock).mockResolvedValue(mockRestaurants);

            await getRestaurants(req, res);

            expect(res.json).toHaveBeenCalledWith(mockRestaurants);
        });

        it('should return 500 if there is a server error', async () => {
            const req = {} as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            (Restaurant.find as jest.Mock).mockRejectedValue(new Error('Server error'));

            await getRestaurants(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });
});
