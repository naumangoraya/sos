import prisma from '../config/database.js';

// Get all items with pagination and search
export const getItems = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', filter = 'all' } = req.query;
    const skip = (page - 1) * limit;

    let where = {};
    
    if (search) {
      switch (filter) {
        case 'itemId':
          where.itemId = { contains: search, mode: 'insensitive' };
          break;
        case 'description':
          where.description = { contains: search, mode: 'insensitive' };
          break;
        case 'brand':
          where.brand = { contains: search, mode: 'insensitive' };
          break;
        case 'type':
          where.type = { contains: search, mode: 'insensitive' };
          break;
        default:
          where.OR = [
            { itemId: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
            { brand: { contains: search, mode: 'insensitive' } },
            { type: { contains: search, mode: 'insensitive' } }
          ];
      }
    }

    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { itemId: 'asc' }
      }),
      prisma.item.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get item by ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { itemId: id }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Get item by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new item
export const createItem = async (req, res) => {
  try {
    const {
      itemId,
      description,
      brand,
      sheetsPerPacket,
      width,
      length,
      grams,
      isConstant = false,
      type
    } = req.body;

    // Check if item ID already exists
    const existingItem = await prisma.item.findUnique({
      where: { itemId }
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Item ID already exists'
      });
    }

    const item = await prisma.item.create({
      data: {
        itemId,
        description,
        brand,
        sheetsPerPacket: sheetsPerPacket ? parseInt(sheetsPerPacket) : null,
        width: width ? parseFloat(width) : null,
        length: length ? parseFloat(length) : null,
        grams: grams ? parseInt(grams) : null,
        isConstant: Boolean(isConstant),
        type
      }
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      itemId: newItemId,
      description,
      brand,
      sheetsPerPacket,
      width,
      length,
      grams,
      isConstant,
      type
    } = req.body;

    // Check if item exists
    const existingItem = await prisma.item.findUnique({
      where: { itemId: id }
    });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if new item ID conflicts with existing item
    if (newItemId && newItemId !== id) {
      const itemIdExists = await prisma.item.findUnique({
        where: { itemId: newItemId }
      });

      if (itemIdExists) {
        return res.status(400).json({
          success: false,
          message: 'Item ID already exists'
        });
      }
    }

    const updateData = {};
    if (newItemId !== undefined) updateData.itemId = newItemId;
    if (description !== undefined) updateData.description = description;
    if (brand !== undefined) updateData.brand = brand;
    if (sheetsPerPacket !== undefined) updateData.sheetsPerPacket = sheetsPerPacket ? parseInt(sheetsPerPacket) : null;
    if (width !== undefined) updateData.width = width ? parseFloat(width) : null;
    if (length !== undefined) updateData.length = length ? parseFloat(length) : null;
    if (grams !== undefined) updateData.grams = grams ? parseInt(grams) : null;
    if (isConstant !== undefined) updateData.isConstant = Boolean(isConstant);
    if (type !== undefined) updateData.type = type;

    const item = await prisma.item.update({
      where: { itemId: id },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if item exists
    const item = await prisma.item.findUnique({
      where: { itemId: id },
      include: {
        purchaseInvoiceLineItems: {
          take: 1
        },
        saleInvoiceLineItems: {
          take: 1
        }
      }
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if item has associated line items
    if (item.purchaseInvoiceLineItems.length > 0 || item.saleInvoiceLineItems.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete item with associated invoice line items'
      });
    }

    await prisma.item.delete({
      where: { itemId: id }
    });

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get item statistics
export const getItemStats = async (req, res) => {
  try {
    const [totalItems, itemsWithStock, totalTypes] = await Promise.all([
      prisma.item.count(),
      prisma.item.count({
        where: {
          OR: [
            { purchaseInvoiceLineItems: { some: {} } },
            { saleInvoiceLineItems: { some: {} } }
          ]
        }
      }),
      prisma.item.groupBy({
        by: ['type'],
        _count: {
          type: true
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalItems,
        itemsWithStock,
        totalTypes: totalTypes.length,
        typeBreakdown: totalTypes.map(t => ({
          type: t.type,
          count: t._count.type
        }))
      }
    });
  } catch (error) {
    console.error('Get item stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get items by type
export const getItemsByType = async (req, res) => {
  try {
    const { type } = req.params;

    const items = await prisma.item.findMany({
      where: { type },
      orderBy: { itemId: 'asc' }
    });

    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Get items by type error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all item types
export const getItemTypes = async (req, res) => {
  try {
    const types = await prisma.item.groupBy({
      by: ['type'],
      where: {
        type: {
          not: null
        }
      },
      _count: {
        type: true
      },
      orderBy: {
        type: 'asc'
      }
    });

    res.json({
      success: true,
      data: types.map(t => ({
        type: t.type,
        count: t._count.type
      }))
    });
  } catch (error) {
    console.error('Get item types error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 