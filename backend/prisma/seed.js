import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@sos.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    }
  });

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 12);
  const regularUser = await prisma.user.upsert({
    where: { username: 'user' },
    update: {},
    create: {
      username: 'user',
      email: 'user@sos.com',
      password: userPassword,
      role: 'user',
      isActive: true
    }
  });

  // Create stores
  const stores = await Promise.all([
    prisma.store.upsert({
      where: { storeName: 'Main Warehouse' },
      update: {},
      create: {
        storeName: 'Main Warehouse',
        description: 'Primary storage facility',
        status: 'Active'
      }
    }),
    prisma.store.upsert({
      where: { storeName: 'Branch A' },
      update: {},
      create: {
        storeName: 'Branch A',
        description: 'Secondary storage location',
        status: 'Active'
      }
    })
  ]);

  // Create items
  const items = await Promise.all([
    prisma.item.upsert({
      where: { itemId: 'BC45187' },
      update: {},
      create: {
        itemId: 'BC45187',
        description: 'BLEACH BOARD 45X187',
        brand: 'BLEECH',
        sheetsPerPacket: 100,
        width: 45.00,
        length: 187.00,
        grams: 250,
        isConstant: true,
        type: 'Board'
      }
    }),
    prisma.item.upsert({
      where: { itemId: 'BC45200' },
      update: {},
      create: {
        itemId: 'BC45200',
        description: 'BLEACH BOARD 45X200',
        brand: 'BLEECH',
        sheetsPerPacket: 100,
        width: 45.00,
        length: 200.00,
        grams: 280,
        isConstant: true,
        type: 'Board'
      }
    }),
    prisma.item.upsert({
      where: { itemId: 'WC45187' },
      update: {},
      create: {
        itemId: 'WC45187',
        description: 'WHITE CARD 45X187',
        brand: 'WHITE',
        sheetsPerPacket: 100,
        width: 45.00,
        length: 187.00,
        grams: 250,
        isConstant: true,
        type: 'Card'
      }
    })
  ]);

  // Create customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { code: '24-06-000492' },
      update: {},
      create: {
        code: '24-06-000492',
        title: 'A.D PRESS',
        businessName: 'ABASS PAPER MART',
        contactPerson: 'ABDUL MAJID',
        city: 'LHR',
        address: '123 Main Street, Lahore',
        phoneNumber: '+92-42-1234567',
        email: 'abdul@adpress.com',
        mobileNumber: '+92-300-1234567',
        creditDays: 30,
        creditLimit: 100000.00
      }
    }),
    prisma.customer.upsert({
      where: { code: '24-06-000493' },
      update: {},
      create: {
        code: '24-06-000493',
        title: 'BULLEH SHAH',
        businessName: 'BULLEH SHAH TRADERS',
        contactPerson: 'MUHAMMAD ALI',
        city: 'LHR',
        address: '456 Business Avenue, Lahore',
        phoneNumber: '+92-42-2345678',
        email: 'ali@bullehshah.com',
        mobileNumber: '+92-300-2345678',
        creditDays: 15,
        creditLimit: 50000.00
      }
    })
  ]);

  // Create suppliers
  const suppliers = await Promise.all([
    prisma.supplier.upsert({
      where: { code: '11-02-000058' },
      update: {},
      create: {
        code: '11-02-000058',
        title: 'AMIR TRADER',
        businessName: 'BULLEH SHAH',
        contactPerson: 'PACKAGES',
        city: 'LHR',
        address: '789 Supplier Street, Lahore',
        phoneNumber: '+92-42-3456789',
        mobileNumber: '+92-300-3456789',
        email: 'amir@trader.com'
      }
    }),
    prisma.supplier.upsert({
      where: { code: '11-02-000059' },
      update: {},
      create: {
        code: '11-02-000059',
        title: 'PAPER MART',
        businessName: 'PAPER MART SUPPLIERS',
        contactPerson: 'AHMED KHAN',
        city: 'LHR',
        address: '321 Supplier Road, Lahore',
        phoneNumber: '+92-42-4567890',
        mobileNumber: '+92-300-4567890',
        email: 'ahmed@papermart.com'
      }
    })
  ]);

  console.log('✅ Database seeded successfully!');
  console.log('👤 Admin user created:', adminUser.username);
  console.log('👤 Regular user created:', regularUser.username);
  console.log('🏪 Stores created:', stores.length);
  console.log('📦 Items created:', items.length);
  console.log('👥 Customers created:', customers.length);
  console.log('🏭 Suppliers created:', suppliers.length);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 