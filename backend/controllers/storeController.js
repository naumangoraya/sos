import prisma from '../config/database.js';

// Get all stores
export const getStores = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    let where = {};
    
    if (search) {
      where.OR = [
        { storeName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [stores, total] = await Promise.all([
      prisma.store.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { storeName: 'asc' }
      }),
      prisma.store.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        stores,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get store by ID
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: { id: parseInt(id) }
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.json({
      success: true,
      data: store
    });
  } catch (error) {
    console.error('Get store by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new store
export const createStore = async (req, res) => {
  try {
    const { storeName, description, status = 'Active' } = req.body;

    // Check if store name already exists
    const existingStore = await prisma.store.findUnique({
      where: { storeName }
    });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: 'Store name already exists'
      });
    }

    const store = await prisma.store.create({
      data: {
        storeName,
        description,
        status
      }
    });

    res.status(201).json({
      success: true,
      message: 'Store created successfully',
      data: store
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update store
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { storeName, description, status } = req.body;

    // Check if store exists
    const existingStore = await prisma.store.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingStore) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Check if new store name conflicts with existing store
    if (storeName && storeName !== existingStore.storeName) {
      const nameExists = await prisma.store.findUnique({
        where: { storeName }
      });

      if (nameExists) {
        return res.status(400).json({
          success: false,
          message: 'Store name already exists'
        });
      }
    }

    const updateData = {};
    if (storeName !== undefined) updateData.storeName = storeName;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const store = await prisma.store.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Store updated successfully',
      data: store
    });
  } catch (error) {
    console.error('Update store error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete store
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if store exists
    const store = await prisma.store.findUnique({
      where: { id: parseInt(id) },
      include: {
        purchaseInvoices: {
          take: 1
        },
        saleInvoices: {
          take: 1
        }
      }
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Check if store has associated invoices
    if (store.purchaseInvoices.length > 0 || store.saleInvoices.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete store with associated invoices'
      });
    }

    await prisma.store.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Store deleted successfully'
    });
  } catch (error) {
    console.error('Delete store error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get store statistics
export const getStoreStats = async (req, res) => {
  try {
    const [totalStores, activeStores] = await Promise.all([
      prisma.store.count(),
      prisma.store.count({
        where: { status: 'Active' }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalStores,
        activeStores
      }
    });
  } catch (error) {
    console.error('Get store stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 