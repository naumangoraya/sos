import express from 'express';
import {
  getStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getStoreStats
} from '../controllers/storeController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateStore, validateId, validateSearch } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all stores with search and pagination
router.get('/', validateSearch, getStores);

// Get store statistics
router.get('/stats', getStoreStats);

// Get store by ID
router.get('/:id', validateId, getStoreById);

// Create new store
router.post('/', validateStore, createStore);

// Update store
router.put('/:id', validateId, validateStore, updateStore);

// Delete store
router.delete('/:id', validateId, deleteStore);

export default router; 