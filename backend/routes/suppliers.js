import express from 'express';
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierStats
} from '../controllers/supplierController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateSupplier, validateId, validateSearch } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all suppliers with search and pagination
router.get('/', validateSearch, getSuppliers);

// Get supplier statistics
router.get('/stats', getSupplierStats);

// Get supplier by ID
router.get('/:id', validateId, getSupplierById);

// Create new supplier
router.post('/', validateSupplier, createSupplier);

// Update supplier
router.put('/:id', validateId, validateSupplier, updateSupplier);

// Delete supplier
router.delete('/:id', validateId, deleteSupplier);

export default router; 