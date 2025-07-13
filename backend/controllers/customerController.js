import prisma from '../config/database.js';

// Get all customers with pagination and search
export const getCustomers = async (req, res) => {
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

    const [customers, total] = await Promise.all([
      prisma.customer.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { code: 'asc' }
      }),
      prisma.customer.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        customers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error('Get customer by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new customer
export const createCustomer = async (req, res) => {
  try {
    const {
      code,
      title,
      businessName,
      contactPerson,
      city,
      address,
      phoneNumber,
      email,
      mobileNumber,
      creditDays = 0,
      creditLimit = 0
    } = req.body;

    // Check if customer code already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { code }
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: 'Customer code already exists'
      });
    }

    const customer = await prisma.customer.create({
      data: {
        code,
        title,
        businessName,
        contactPerson,
        city,
        address,
        phoneNumber,
        email,
        mobileNumber,
        creditDays: parseInt(creditDays),
        creditLimit: parseFloat(creditLimit)
      }
    });

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
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
      email,
      mobileNumber,
      creditDays,
      creditLimit
    } = req.body;

    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check if new code conflicts with existing customer
    if (code && code !== existingCustomer.code) {
      const codeExists = await prisma.customer.findUnique({
        where: { code }
      });

      if (codeExists) {
        return res.status(400).json({
          success: false,
          message: 'Customer code already exists'
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
    if (email !== undefined) updateData.email = email;
    if (mobileNumber !== undefined) updateData.mobileNumber = mobileNumber;
    if (creditDays !== undefined) updateData.creditDays = parseInt(creditDays);
    if (creditLimit !== undefined) updateData.creditLimit = parseFloat(creditLimit);

    const customer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Customer updated successfully',
      data: customer
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(id) },
      include: {
        saleInvoices: {
          take: 1
        }
      }
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // Check if customer has associated invoices
    if (customer.saleInvoices.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete customer with associated invoices'
      });
    }

    await prisma.customer.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get customer statistics
export const getCustomerStats = async (req, res) => {
  try {
    const [totalCustomers, activeCustomers, totalCreditLimit] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({
        where: {
          saleInvoices: {
            some: {
              createdAt: {
                gte: new Date(new Date().getFullYear(), 0, 1) // This year
              }
            }
          }
        }
      }),
      prisma.customer.aggregate({
        _sum: {
          creditLimit: true
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalCustomers,
        activeCustomers,
        totalCreditLimit: totalCreditLimit._sum.creditLimit || 0
      }
    });
  } catch (error) {
    console.error('Get customer stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 