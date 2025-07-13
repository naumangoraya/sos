# SOS Invoice Management System

A comprehensive invoice management system built with React frontend and Node.js/Express backend, featuring PostgreSQL database with Prisma ORM, JWT authentication, and role-based access control.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI** with Tailwind CSS
- **Responsive Design** for all devices
- **Real-time Search** and filtering
- **Form Validation** and error handling
- **JWT Authentication** with automatic token management
- **Role-based Access Control** (Admin/User)

### Backend (Node.js + Express)
- **RESTful API** with comprehensive endpoints
- **JWT Authentication** with bcrypt password encryption
- **PostgreSQL Database** with Prisma ORM
- **Input Validation** with express-validator
- **Security Middleware** (Helmet, CORS, Rate Limiting)
- **Error Handling** and logging
- **Database Seeding** with sample data

### Database Schema
- **Users** - Authentication and user management
- **Customers** - Customer information and credit management
- **Suppliers** - Supplier information
- **Items** - Product catalog with specifications
- **Stores** - Warehouse/store locations
- **Purchase Invoices** - Purchase transactions with line items
- **Sale Invoices** - Sales transactions with line items

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd sos

# Run the setup script (optional)
node setup.js

# OR manually install dependencies
npm install
cd backend
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE sos_invoice_db;
\q

# OR using createdb command
createdb sos_invoice_db

# Navigate to backend and setup database
cd backend

# Create .env file from template
cp env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 3. Start the Application

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend (in new terminal)
cd sos  # Navigate to project root
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Prisma Studio**: http://localhost:5555

## 👤 Default Login Credentials

- **Admin User:**
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin`

- **Regular User:**
  - Username: `user`
  - Password: `user123`
  - Role: `user`

## 📁 Project Structure

```
sos/
├── backend/                 # Backend application
│   ├── config/             # Database configuration
│   ├── controllers/        # API controllers
│   ├── middleware/         # Authentication & validation
│   ├── prisma/            # Database schema & migrations
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── src/                   # Frontend application
│   ├── components/        # React components
│   ├── services/          # API services
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── setup.js              # Setup automation script
├── setup.md              # Detailed setup guide
└── README.md             # This file
```

## 🔧 Configuration

### Environment Variables

**Important**: You must create the `.env` file before running the application.

Create `backend/.env` file:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/sos_invoice_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="24h"

# Server Configuration
PORT=5000
NODE_ENV="development"

# CORS Configuration
CORS_ORIGIN="http://localhost:5173"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Password Salt Rounds
BCRYPT_SALT_ROUNDS=12
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | Get all customers (with search/pagination) |
| GET | `/api/customers/:id` | Get customer by ID |
| POST | `/api/customers` | Create new customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| GET | `/api/customers/stats` | Get customer statistics |

### Supplier Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/suppliers` | Get all suppliers (with search/pagination) |
| GET | `/api/suppliers/:id` | Get supplier by ID |
| POST | `/api/suppliers` | Create new supplier |
| PUT | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Delete supplier |
| GET | `/api/suppliers/stats` | Get supplier statistics |

### Item Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items (with search/pagination) |
| GET | `/api/items/:id` | Get item by ID |
| POST | `/api/items` | Create new item |
| PUT | `/api/items/:id` | Update item |
| DELETE | `/api/items/:id` | Delete item |
| GET | `/api/items/stats` | Get item statistics |
| GET | `/api/items/types` | Get all item types |

### Store Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stores` | Get all stores (with search/pagination) |
| GET | `/api/stores/:id` | Get store by ID |
| POST | `/api/stores` | Create new store |
| PUT | `/api/stores/:id` | Update store |
| DELETE | `/api/stores/:id` | Delete store |
| GET | `/api/stores/stats` | Get store statistics |

### Invoice Endpoints (Coming Soon)

> **Note**: Purchase and Sale Invoice endpoints are planned for future implementation.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/purchase-invoices` | Get all purchase invoices |
| POST | `/api/purchase-invoices` | Create purchase invoice |
| GET | `/api/sale-invoices` | Get all sale invoices |
| POST | `/api/sale-invoices` | Create sale invoice |

## 🛡️ Security Features

- **Password Encryption** using bcrypt with configurable salt rounds
- **JWT Tokens** for stateless authentication
- **Rate Limiting** to prevent abuse
- **CORS Protection** with configurable origins
- **Input Validation** for all endpoints
- **SQL Injection Protection** through Prisma ORM
- **XSS Protection** through Helmet middleware
- **Role-based Access Control**

## 🚀 Development

### Backend Commands

```bash
cd backend

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

### Frontend Commands

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check if PostgreSQL is running
   - Verify DATABASE_URL in .env
   - Ensure database exists
   - Check if .env file exists in backend directory

2. **CORS Errors**
   - Check CORS_ORIGIN in backend .env
   - Ensure frontend URL matches
   - Verify backend is running on correct port

3. **JWT Token Issues**
   - Check JWT_SECRET is set
   - Verify token expiration
   - Clear browser localStorage if needed

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes
   - Check if another application is using the port

5. **Prisma Errors**
   - Run `npm run db:generate` after schema changes
   - Ensure database exists and is accessible
   - Check DATABASE_URL format

6. **Frontend Not Loading**
   - Ensure backend is running first
   - Check if all dependencies are installed
   - Verify API base URL in `src/services/api.js`

### Database Reset (Development Only)

```bash
cd backend
npx prisma migrate reset
npm run db:seed
```

## 🚀 Production Deployment

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

## 🔒 Security Considerations

1. **Change Default Passwords** in production
2. **Use Strong JWT Secret** in production
3. **Enable HTTPS** in production
4. **Set Proper CORS Origins** for production
5. **Use Environment Variables** for sensitive data
6. **Regular Database Backups**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure PostgreSQL is running and accessible
4. Check network connectivity between frontend and backend
5. Review the troubleshooting section above
6. Ensure `.env` file exists in backend directory
7. Verify database exists and is accessible
8. Check if all dependencies are installed correctly

### Quick Verification Checklist

- [ ] PostgreSQL is installed and running
- [ ] Database `sos_invoice_db` exists
- [ ] `.env` file exists in `backend/` directory
- [ ] All dependencies are installed (`npm install` in both root and backend)
- [ ] Prisma client is generated (`npm run db:generate`)
- [ ] Database schema is pushed (`npm run db:push`)
- [ ] Database is seeded (`npm run db:seed`)
- [ ] Backend server is running (`npm run dev` in backend)
- [ ] Frontend server is running (`npm run dev` in root)

## 📞 Contact

For support or questions, please open an issue in the repository.

---

**Built with ❤️ using React, Node.js, Express, PostgreSQL, and Prisma**
