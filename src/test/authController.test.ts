import { Request, Response } from 'express';
import { register, login,logout } from '../controllers/authController';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';

jest.mock('../models/user');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Auth Controller', () => {
  describe('register', () => {
    it('should return 200 status code for successful registration', async () => {
      const req = {
        body: { name: 'Test User', email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.prototype.save as jest.Mock).mockResolvedValue({ _id: 'mockUserId' });
      (jwt.sign as jest.Mock).mockImplementation((payload, secret, options, callback) => {
        callback(null, 'mockToken');
      });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return 400 status code if user already exists', async () => {
      const req = {
        body: { name: 'Test User', email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue({});

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'User already exists' });
    });

    it('should return 500 status code for server error', async () => {
      const req = {
        body: { name: 'Test User', email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Server error');
    });
  });

  describe('login', () => {
    it('should return 200 status code for successful login', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue({ _id: 'mockUserId', password: 'hashedPassword' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockImplementation((payload, secret, options, callback) => {
        callback(null, 'mockToken');
      });

      await login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'mockToken' });
    });

    it('should return 400 status code for invalid credentials (user not found)', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Credentials' });
    });

    it('should return 400 status code for invalid credentials (password mismatch)', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockResolvedValue({ _id: 'mockUserId', password: 'hashedPassword' });
      // (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Invalid Credentials' });
    });

    it('should return 500 status code for server error', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      (User.findOne as jest.Mock).mockRejectedValue(new Error('Server error'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Server error');
    });
  });
  describe('logout', () => {
    it('should return 200 status code for successful logout', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'password' }
      } as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await logout (req, res);

      expect(res.json).toHaveBeenCalledWith({ msg: 'Logged out successfully' });
    });
  });
});
