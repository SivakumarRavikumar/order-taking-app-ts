import { Request, Response } from 'express';
import MenuItem from '../models/menuItem';
import { addMenuItem, updateMenuItem, deleteMenuItem, getMenuItems } from '../controllers/menuController';

jest.mock('../models/menuItem');

describe('MenuItem Controller', () => {
    let consoleSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    describe('addMenuItem', () => {
        it('should add a new menu item and return it', async () => {
            const req = {
                body: {
                    name: 'Test Item',
                    description: 'Test Description',
                    price: 10,
                    category: 'Test Category',
                    restaurant: 'Test Restaurant'
                }
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockMenuItemInstance = {
                _id: 'mockId',
                name: 'Test Item',
                description: 'Test Description',
                price: 10,
                category: 'Test Category',
                restaurant: 'Test Restaurant',
                save: jest.fn().mockResolvedValue({ _id: 'mockId' }),
            };

            (MenuItem as unknown as jest.Mock).mockImplementation(() => mockMenuItemInstance);

            await addMenuItem(req, res);

            expect(mockMenuItemInstance.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockMenuItemInstance);
        });

        it('should return 500 if there is a server error', async () => {
            const req = {
                body: {
                    name: 'Test Item',
                    description: 'Test Description',
                    price: 10,
                    category: 'Test Category',
                    restaurant: 'Test Restaurant'
                }
            } as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;

            const errorMessage = 'Server error';
            const mockMenuItemInstance = {
                save: jest.fn().mockRejectedValue(new Error(errorMessage))
            };

            (MenuItem as unknown as jest.Mock).mockImplementation(() => mockMenuItemInstance);

            await addMenuItem(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
    });

    describe('updateMenuItem', () => {
        it('should update an existing menu item and return it', async () => {
            const req = {
                params: { menuId: 'mockId' },
                body: {
                    name: 'Updated Item',
                    description: 'Updated Description',
                    price: 15,
                    category: 'Updated Category'
                }
            } as unknown as Request;

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn(),
            } as unknown as Response;

            const updatedMenuItemData = {
                name: 'Updated Item',
                description: 'Updated Description',
                price: 15,
                category: 'Updated Category'
            };

            const mockMenuItem = {
                save: jest.fn().mockResolvedValue(updatedMenuItemData),
                ...updatedMenuItemData
            };

            (MenuItem.findById as jest.Mock).mockResolvedValue(mockMenuItem);

            await updateMenuItem(req, res);

            expect(mockMenuItem.save).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining(updatedMenuItemData));
        });
        it('should return 404 if the menu item is not found', async () => {
            const req = {
                params: { menuId: 'mockId' },
                body: {
                    name: 'Updated Item',
                    description: 'Updated Description',
                    price: 15,
                    category: 'Updated Category'
                }
            } as unknown as Request;
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
                send: jest.fn()
            } as unknown as Response;
    
            (MenuItem.findById as jest.Mock).mockResolvedValue(null);
    
            await updateMenuItem(req, res);
    
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ msg: 'Menu item not found' });
        });
    
        it('should return 500 if there is a server error', async () => {
            const req = {
                params: { menuId: 'mockId' },
                body: {
                    name: 'Updated Item',
                    description: 'Updated Description',
                    price: 15,
                    category: 'Updated Category'
                }
            } as unknown as Request;
    
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as unknown as Response;
    
            const errorMessage = 'Server error';
            (MenuItem.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
            await updateMenuItem(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
            expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
        });
         });

         describe('deleteMenuItem', () => {
            it('should delete an existing menu item and return a success message', async () => {
                const req = {
                    params: { menuId: 'mockId' }
                } as unknown as Request;
        
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    send: jest.fn(),
                } as unknown as Response;
        
                const mockMenuItem = {
                    deleteOne: jest.fn().mockResolvedValue({})
                };
        
                (MenuItem.findById as jest.Mock).mockResolvedValue(mockMenuItem);
        
                await deleteMenuItem(req, res);
        
                expect(mockMenuItem.deleteOne).toHaveBeenCalled();
                expect(res.json).toHaveBeenCalledWith({ msg: 'Menu item removed' });
            });
        
            it('should return 404 if the menu item is not found', async () => {
                const req = {
                    params: { menuId: 'mockId' }
                } as unknown as Request;
        
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    send: jest.fn(),
                } as unknown as Response;
        
                (MenuItem.findById as jest.Mock).mockResolvedValue(null);
        
                await deleteMenuItem(req, res);
        
                expect(res.status).toHaveBeenCalledWith(404);
                expect(res.json).toHaveBeenCalledWith({ msg: 'Menu item not found' });
            });
        
            it('should return 500 if there is a server error', async () => {
                const req = {
                    params: { menuId: 'mockId' }
                } as unknown as Request;
        
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn(),
                } as unknown as Response;
        
                const errorMessage = 'Server error';
                (MenuItem.findById as jest.Mock).mockRejectedValue(new Error(errorMessage));
        
                await deleteMenuItem(req, res);
        
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith('Server error');
                expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
            });
        });
        
        describe('getMenuItems', () => {
            it('should return a list of menu items', async () => {
                const req = {} as Request;
        
                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn(),
                    send: jest.fn(),
                } as unknown as Response;
        
                const mockMenuItems = [{ name: 'Item 1' }, { name: 'Item 2' }];
        
                (MenuItem.find as jest.Mock).mockResolvedValue(mockMenuItems);
        
                await getMenuItems(req, res);
        
                expect(res.json).toHaveBeenCalledWith(mockMenuItems);
            });
        
            it('should return 500 if there is a server error', async () => {
                const req = {} as Request;
        
                const res = {
                    status: jest.fn().mockReturnThis(),
                    send: jest.fn(),
                    json: jest.fn(),
                } as unknown as Response;
        
                const errorMessage = 'Server error';
                (MenuItem.find as jest.Mock).mockRejectedValue(new Error(errorMessage));
        
                await getMenuItems(req, res);
        
                expect(res.status).toHaveBeenCalledWith(500);
                expect(res.send).toHaveBeenCalledWith('Server error');
                expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
            });
        });
});
