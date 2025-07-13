# SOS Invoice Management System - Backend

A robust Node.js/Express backend for the SOS Invoice Management System with PostgreSQL database, Prisma ORM, and JWT authentication.

## Features

- 🔐 **JWT Authentication** with bcrypt password encryption
- 🗄️ **PostgreSQL Database** with Prisma ORM
- 🛡️ **Security Middleware** (Helmet, CORS, Rate Limiting)
- ✅ **Input Validation** with express-validator
- 📊 **Role-based Access Control** (Admin/User)
- 🔍 **Search & Pagination** for all entities
- 📝 **Comprehensive Logging**
- 🚀 **Production Ready** with error handling

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository and navigate to backend directory:**
   ```bash
   cd sos/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
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
   ```

4. **Set up PostgreSQL database:**
   ```bash
   # Create database
   createdb sos_invoice_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE sos_invoice_db;
   ```

5. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

6. **Push database schema:**
   ```bash
   npm run db:push
   ```

7. **Seed the database:**
   ```bash
   npm run db:seed
   ```

## Database Setup

### Manual Setup (Alternative)

If you prefer to set up the database manually, you can run the SQL commands from the schema file:

```sql
-- Create database
CREATE DATABASE sos_invoice_db;

-- Connect to database
\c sos_invoice_db;

-- Run the schema commands from prisma/schema.prisma
```

### Using Prisma Studio

To view and manage your database through a GUI:

```bash
npm run db:studio
```

This will open Prisma Studio at `http://localhost:5555`

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/users` - Get all users (Admin only)
- `PUT /api/auth/users/:id/status` - Update user status (Admin only)

### Customers
- `GET /api/customers` - Get all customers with search/pagination
- `GET /api/customers/stats` - Get customer statistics
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create new customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Suppliers
- `GET /api/suppliers` - Get all suppliers with search/pagination
- `GET /api/suppliers/stats` - Get supplier statistics
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create new supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Items
- `GET /api/items` - Get all items with search/pagination
- `GET /api/items/stats` - Get item statistics
- `GET /api/items/types` - Get all item types
- `GET /api/items/types/:type` - Get items by type
- `GET /api/items/:id` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

### Stores
- `GET /api/stores` - Get all stores with search/pagination
- `GET /api/stores/stats` - Get store statistics
- `GET /api/stores/:id` - Get store by ID
- `POST /api/stores` - Create new store
- `PUT /api/stores/:id` - Update store
- `DELETE /api/stores/:id` - Delete store

## Authentication

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

### Using JWT Token
```bash
curl -X GET http://localhost:5000/api/customers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Default Users

After seeding the database, you'll have these default users:

- **Admin User:**
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin`

- **Regular User:**
  - Username: `user`
  - Password: `user123`
  - Role: `user`

## Database Schema

The system includes the following main entities:

- **Users** - Authentication and user management
- **Customers** - Customer information and credit management
- **Suppliers** - Supplier information
- **Items** - Product catalog with specifications
- **Stores** - Warehouse/store locations
- **Purchase Invoices** - Purchase transactions with line items
- **Sale Invoices** - Sales transactions with line items

## Security Features

- **Password Encryption** using bcrypt with configurable salt rounds
- **JWT Tokens** for stateless authentication
- **Rate Limiting** to prevent abuse
- **CORS Protection** with configurable origins
- **Input Validation** for all endpoints
- **SQL Injection Protection** through Prisma ORM
- **XSS Protection** through Helmet middleware

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Development

### Database Migrations
```bash
# Create a new migration
npm run db:migrate

# Reset database (development only)
npx prisma migrate reset
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration | `24h` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |
| `BCRYPT_SALT_ROUNDS` | Password hashing rounds | `12` |

## Production Deployment

1. **Set environment variables for production**
2. **Use a production PostgreSQL database**
3. **Set a strong JWT_SECRET**
4. **Configure CORS_ORIGIN for your domain**
5. **Use a process manager like PM2**

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start server.js --name "sos-backend"

# Monitor the application
pm2 monit
```

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Check DATABASE_URL in .env
   - Ensure PostgreSQL is running
   - Verify database exists

2. **JWT Token Issues:**
   - Check JWT_SECRET is set
   - Verify token expiration

3. **CORS Errors:**
   - Update CORS_ORIGIN in .env
   - Check frontend URL

### Logs

Check application logs for detailed error information:
```bash
# Development
npm run dev

# Production
pm2 logs sos-backend
```

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Write tests for new features
5. Update documentation

## License

MIT License - see LICENSE file for details 