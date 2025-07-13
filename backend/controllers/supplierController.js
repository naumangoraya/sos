import prisma from '../config/database.js';

// Get all suppliers with pagination and search
export const getSuppliers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', filter = 'all' } = req.query;
    const skip = (page - 1) * limit;

    let where = {};
    
    if (search) {
      switch (filter) {
        case 'code':
          where.code = { contains: search, mode: 'insensitive' };
          break;
        case 'description':
          where.title = { contains: search, mode: 'insensitive' };
          break;
        case 'business':
          where.businessName = { contains: search, mode: 'insensitive' };
          break;
        case 'city':
          where.city = { contains: search, mode: 'insensitive' };
          break;
        default:
          where.OR = [
            { code: { contains: search, mode: 'insensitive' } },
            { title: { contains: search, mode: 'insensitive' } },
            { businessName: { contains: search, mode: 'insensitive' } },
            { city: { contains: search, mode: 'insensitive' } },
            { contactPerson: { contains: search, mode: 'insensitive' } }
          ];
      }
    }

    const [suppliers, total] = await Promise.all([
      prisma.supplier.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { code: 'asc' }
      }),
      prisma.supplier.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        suppliers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) }
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error('Get supplier by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new supplier
export const createSupplier = async (req, res) => {
  try {
    const {
      code,
      title,
      businessName,
      contactPerson,
      city,
      address,
      phoneNumber,
      mobileNumber,
      email
    } = req.body;

    // Check if supplier code already exists
    const existingSupplier = await prisma.supplier.findUnique({
      where: { code }
    });

    if (existingSupplier) {
      return res.status(400).json({
        success: false,
        message: 'Supplier code already exists'
      });
    }

    const supplier = await prisma.supplier.create({
      data: {
        code,
        title,
        businessName,
        contactPerson,
        city,
        address,
        phoneNumber,
        mobileNumber,
        email
      }
    });

    res.status(201).json({
      success: true,
      message: 'Supplier created successfully',
      data: supplier
    });
  } catch (error) {
    console.error('Create supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      title,
      businessName,
      contactPerson,
      city,
      address,
      phoneNumber,
      mobileNumber,
      email
    } = req.body;

    // Check if supplier exists
    const existingSupplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingSupplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Check if new code conflicts with existing supplier
    if (code && code !== existingSupplier.code) {
      const codeExists = await prisma.supplier.findUnique({
        where: { code }
      });

      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: 'Supplier code already exists'
        });
      }
    }

    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (title !== undefined) updateData.title = title;
    if (businessName !== undefined) updateData.businessName = businessName;
    if (contactPerson !== undefined) updateData.contactPerson = contactPerson;
    if (city !== undefined) updateData.city = city;
    if (address !== undefined) updateData.address = address;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
    if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
    if (email !== undefined) updateData.email = email;

    const supplier = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Supplier updated successfully',
      data: supplier
    });
  } catch (error) {
    console.error('Update supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if supplier exists
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) },
      include: {
        purchaseInvoices: {
          take: 1
        }
      }
    });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    // Check if supplier has associated invoices
    if (supplier.purchaseInvoices.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete supplier with associated invoices'
      });
    }

    await prisma.supplier.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Supplier deleted successfully'
    });
  } catch (error) {
    console.error('Delete supplier error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get supplier statistics
export const getSupplierStats = async (req, res) => {
  try {
    const [totalSuppliers, activeSuppliers] = await Promise.all([
      prisma.supplier.count(),
      prisma.supplier.count({
        where: {
          purchaseInvoices: {
            some: {
              createdAt: {
                gte: new Date(new Date().getFullYear(), 0, 1) // This year
              }
            }
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalSuppliers,
        activeSuppliers
      }
    });
  } catch (error) {
    console.error('Get supplier stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 