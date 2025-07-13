import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemStats,
  getItemsByType,
  getItemTypes
} from '../controllers/itemController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateItem, validateId, validateSearch } from '../middleware/validation.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all items with search and pagination
router.get('/', validateSearch, getItems);

// Get item statistics
router.get('/stats', getItemStats);

// Get all item types
router.get('/types', getItemTypes);

// Get items by type
router.get('/types/:type', getItemsByType);

// Get item by ID
router.get('/:id', getItemById);

// Create new item
router.post('/', validateItem, createItem);

// Update item
router.put('/:id', validateItem, updateItem);

// Delete item
router.delete('/:id', deleteItem);

export default router; 