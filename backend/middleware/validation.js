import { body, param, query, validationResult } from 'express-validator';

// Middleware to handle validation errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Validation rules for authentication
export const validateLogin = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

export const validateRegister = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Username must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be either admin or user'),
  handleValidationErrors
];

// Validation rules for customers
export const validateCustomer = [
  body('code')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Code is required and must be 20 characters or less'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title must be 100 characters or less'),
  body('businessName')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Business name must be 150 characters or less'),
  body('contactPerson')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Contact person must be 100 characters or less'),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City must be 100 characters or less'),
  body('phoneNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be 20 characters or less'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('mobileNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Mobile number must be 20 characters or less'),
  body('creditDays')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Credit days must be a non-negative integer'),
  body('creditLimit')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Credit limit must be a non-negative number'),
  handleValidationErrors
];

// Validation rules for suppliers
export const validateSupplier = [
  body('code')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Code is required and must be 20 characters or less'),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Title must be 100 characters or less'),
  body('businessName')
    .optional()
    .trim()
    .isLength({ max: 150 })
    .withMessage('Business name must be 150 characters or less'),
  body('contactPerson')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Contact person must be 100 characters or less'),
  body('city')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('City must be 100 characters or less'),
  body('phoneNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must be 20 characters or less'),
  body('mobileNumber')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Mobile number must be 20 characters or less'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  handleValidationErrors
];

// Validation rules for items
export const validateItem = [
  body('itemId')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Item ID is required and must be 50 characters or less'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),
  body('brand')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Brand must be 100 characters or less'),
  body('sheetsPerPacket')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Sheets per packet must be a positive integer'),
  body('width')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Width must be a non-negative number'),
  body('length')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Length must be a non-negative number'),
  body('grams')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Grams must be a non-negative integer'),
  body('isConstant')
    .optional()
    .isBoolean()
    .withMessage('Is constant must be a boolean'),
  body('type')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Type must be 50 characters or less'),
  handleValidationErrors
];

// Validation rules for stores
export const validateStore = [
  body('storeName')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Store name is required and must be 100 characters or less'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must be 500 characters or less'),
  body('status')
    .optional()
    .isIn(['Active', 'Inactive'])
    .withMessage('Status must be either Active or Inactive'),
  handleValidationErrors
];

// Validation rules for purchase invoices
export const validatePurchaseInvoice = [
  body('invoiceNumber')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Invoice number is required and must be 50 characters or less'),
  body('invoiceDate')
    .isISO8601()
    .withMessage('Invoice date must be a valid date'),
  body('supplierId')
    .isInt({ min: 1 })
    .withMessage('Supplier ID must be a positive integer'),
  body('storeId')
    .isInt({ min: 1 })
    .withMessage('Store ID must be a positive integer'),
  body('referenceNumber')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Reference number must be 100 characters or less'),
  body('totalAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a non-negative number'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'POSTED', 'CANCELLED'])
    .withMessage('Status must be DRAFT, POSTED, or CANCELLED'),
  handleValidationErrors
];

// Validation rules for sale invoices
export const validateSaleInvoice = [
  body('invoiceNumber')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Invoice number is required and must be 50 characters or less'),
  body('invoiceDate')
    .isISO8601()
    .withMessage('Invoice date must be a valid date'),
  body('customerId')
    .isInt({ min: 1 })
    .withMessage('Customer ID must be a positive integer'),
  body('storeId')
    .isInt({ min: 1 })
    .withMessage('Store ID must be a positive integer'),
  body('paymentType')
    .optional()
    .isIn(['Cash', 'Credit'])
    .withMessage('Payment type must be either Cash or Credit'),
  body('totalAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a non-negative number'),
  body('status')
    .optional()
    .isIn(['DRAFT', 'POSTED', 'CANCELLED'])
    .withMessage('Status must be DRAFT, POSTED, or CANCELLED'),
  handleValidationErrors
];

// Validation for ID parameters
export const validateId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer'),
  handleValidationErrors
];

// Validation for search queries
export const validateSearch = [
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search term must be 100 characters or less'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
]; 