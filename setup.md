# SOS Invoice Management System - Complete Setup Guide

This guide will help you set up both the frontend and backend of the SOS Invoice Management System.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Quick Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd sos/backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file with your database credentials
# DATABASE_URL="postgresql://username:password@localhost:5432/sos_invoice_db"

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed the database with initial data
npm run db:seed

# Start the backend server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd sos

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

## Detailed Setup Instructions

### Database Setup

1. **Install PostgreSQL** (if not already installed)
   - Windows: Download from https://www.postgresql.org/download/windows/
   - macOS: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql postgresql-contrib`

2. **Create Database**
   ```bash
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE sos_invoice_db;
   
   # Exit psql
   \q
   ```

3. **Configure Environment Variables**
   Edit `sos/backend/.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sos_invoice_db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="24h"
   PORT=5000
   NODE_ENV="development"
   CORS_ORIGIN="http://localhost:5173"
   ```

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd sos/backend
   npm install
   ```

2. **Database Migration**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with initial data
   npm run db:seed
   ```

3. **Start Backend Server**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd sos
   npm install
   ```

2. **Start Frontend Server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Default Login Credentials

After seeding the database, you can login with:

- **Admin User:**
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin`

- **Regular User:**
  - Username: `user`
  - Password: `user123`
  - Role: `user`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile

### Customers
- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Stores
- `GET /api/stores` - Get all stores
- `POST /api/stores` - Create store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

## Development Commands

### Backend
```bash
cd sos/backend

# Development mode
npm run dev

# Production mode
npm start

# Database commands
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:migrate     # Create migration
npm run db:studio      # Open Prisma Studio
npm run db:seed        # Seed database
```

### Frontend
```bash
cd sos

# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Ensure database exists

2. **CORS Errors**
   - Check CORS_ORIGIN in backend .env
   - Ensure frontend URL matches

3. **JWT Token Issues**
   - Check JWT_SECRET is set
   - Verify token expiration

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes

### Database Reset (Development Only)

```bash
cd sos/backend

# Reset database
npx prisma migrate reset

# Re-seed data
npm run db:seed
```

## Production Deployment

### Backend Deployment

1. **Set Production Environment Variables**
   ```env
   NODE_ENV=production
   DATABASE_URL="your-production-database-url"
   JWT_SECRET="your-production-secret"
   CORS_ORIGIN="your-frontend-domain"
   ```

2. **Use Process Manager (PM2)**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "sos-backend"
   pm2 save
   pm2 startup
   ```

### Frontend Deployment

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Static Host**
   - Netlify, Vercel, or any static hosting service
   - Update API base URL in `src/services/api.js`

## Security Considerations

1. **Change Default Passwords** in production
2. **Use Strong JWT Secret** in production
3. **Enable HTTPS** in production
4. **Set Proper CORS Origins** for production
5. **Use Environment Variables** for sensitive data
6. **Regular Database Backups**

## Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure PostgreSQL is running and accessible
4. Check network connectivity between frontend and backend

## License

MIT License - see LICENSE file for details 