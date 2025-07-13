import express from 'express';
import {
  login,
  register,
  getProfile,
  updateProfile,
  getAllUsers,
  updateUserStatus
} from '../controllers/authController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { validateLogin, validateRegister } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.post('/login', validateLogin, login);
router.post('/register', validateRegister, register);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);

// Admin only routes
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.put('/users/:id/status', authenticateToken, requireAdmin, updateUserStatus);

export default router; 