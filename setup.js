#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 SOS Invoice Management System Setup');
console.log('=====================================\n');

// Check if Node.js is installed
try {
  const nodeVersion = process.version;
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v16 or higher.');
  process.exit(1);
}

// Check if PostgreSQL is running
console.log('\n📊 Checking PostgreSQL connection...');
try {
  execSync('psql --version', { stdio: 'pipe' });
  console.log('✅ PostgreSQL is installed');
} catch (error) {
  console.error('❌ PostgreSQL is not installed or not in PATH.');
  console.log('Please install PostgreSQL and ensure it\'s running.');
  console.log('Windows: https://www.postgresql.org/download/windows/');
  console.log('macOS: brew install postgresql');
  console.log('Linux: sudo apt-get install postgresql postgresql-contrib');
  process.exit(1);
}

// Setup backend
console.log('\n🔧 Setting up backend...');
try {
  const backendPath = path.join(__dirname, 'backend');
  
  // Check if backend directory exists
  if (!fs.existsSync(backendPath)) {
    console.error('❌ Backend directory not found. Please ensure you have the complete project structure.');
    process.exit(1);
  }

  // Install backend dependencies
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { cwd: backendPath, stdio: 'inherit' });

  // Check if .env file exists
  const envPath = path.join(backendPath, '.env');
  const envExamplePath = path.join(backendPath, 'env.example');
  
  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      console.log('📝 Creating .env file from template...');
      fs.copyFileSync(envExamplePath, envPath);
      console.log('⚠️  Please edit backend/.env with your database credentials before continuing.');
      console.log('   DATABASE_URL="postgresql://username:password@localhost:5432/sos_invoice_db"');
    } else {
      console.error('❌ env.example file not found in backend directory.');
      process.exit(1);
    }
  }

  console.log('✅ Backend setup completed');
} catch (error) {
  console.error('❌ Backend setup failed:', error.message);
  process.exit(1);
}

// Setup frontend
console.log('\n🎨 Setting up frontend...');
try {
  // Install frontend dependencies
  console.log('📦 Installing frontend dependencies...');
  execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
  console.log('✅ Frontend setup completed');
} catch (error) {
  console.error('❌ Frontend setup failed:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Edit backend/.env with your database credentials');
console.log('2. Create the database: CREATE DATABASE sos_invoice_db;');
console.log('3. Run database setup:');
console.log('   cd backend');
console.log('   npm run db:generate');
console.log('   npm run db:push');
console.log('   npm run db:seed');
console.log('4. Start the backend: npm run dev');
console.log('5. Start the frontend: npm run dev');
console.log('\n🔗 URLs:');
console.log('   Frontend: http://localhost:5173');
console.log('   Backend:  http://localhost:5000');
console.log('\n👤 Default login:');
console.log('   Admin: admin / admin123');
console.log('   User:  user / user123'); 