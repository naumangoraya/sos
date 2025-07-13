import express from 'express';
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerStats
} from '../controllers/customerController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateCustomer, validateId, validateSearch } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all customers with search and pagination
router.get('/', validateSearch, getCustomers);

// Get customer statistics
router.get('/stats', getCustomerStats);

// Get customer by ID
router.get('/:id', validateId, getCustomerById);

// Create new customer
router.post('/', validateCustomer, createCustomer);

// Update customer
router.put('/:id', validateId, validateCustomer, updateCustomer);

// Delete customer
router.delete('/:id', validateId, deleteCustomer);

export default router; 