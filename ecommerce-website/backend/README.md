# ShopHub Backend API

Production-ready REST API for ShopHub E-commerce platform built with Node.js, Express, and SQLite.

## Features

- ✅ User authentication with JWT
- ✅ Product management (CRUD operations)
- ✅ Shopping cart functionality
- ✅ Order management system
- ✅ Input validation and sanitization
- ✅ SQL injection prevention
- ✅ Rate limiting
- ✅ CORS enabled
- ✅ Security headers with Helmet
- ✅ Database seeding

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Security:** Helmet, CORS, Rate Limiting

## Installation

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env` and update values if needed
   - Default configuration works out of the box

4. Initialize database:
```bash
npm run init-db
```

5. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (requires auth)

### Products
- `GET /products` - Get all products (supports filtering & sorting)
- `GET /products/:id` - Get product by ID
- `GET /products/category/:category` - Get products by category
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Cart (requires authentication)
- `GET /cart` - Get user's cart
- `POST /cart` - Add item to cart
- `PUT /cart/:cartId` - Update cart item quantity
- `DELETE /cart/:cartId` - Remove item from cart
- `DELETE /cart` - Clear entire cart

### Orders (requires authentication)
- `POST /orders` - Create order from cart
- `GET /orders` - Get user's orders
- `GET /orders/:orderId` - Get order details
- `PATCH /orders/:orderId/status` - Update order status

## Request Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

### Add to Cart (requires token)
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "productId": 1,
    "quantity": 2
  }'
```

### Create Order (requires token)
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Security Features

1. **Password Hashing:** All passwords are hashed using bcryptjs
2. **JWT Authentication:** Secure token-based authentication
3. **Input Validation:** All inputs are validated and sanitized
4. **SQL Injection Prevention:** Parameterized queries throughout
5. **Rate Limiting:** Prevents abuse with request limits
6. **CORS:** Configured for specific origins
7. **Helmet:** Security headers protection
8. **Error Handling:** Comprehensive error handling

## Database Schema

### Users
- id, email, password, name, timestamps

### Products
- id, name, description, price, category, image, rating, stock, timestamps

### Cart
- id, user_id, product_id, quantity, timestamps

### Orders
- id, user_id, total, status, timestamps

### Order Items
- id, order_id, product_id, quantity, price, timestamps

## Environment Variables

```env
PORT=3000
NODE_ENV=development
DB_PATH=./database.sqlite
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=10
CORS_ORIGIN=http://localhost:8000
```

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Update `JWT_SECRET` with a strong secret key
3. Configure `CORS_ORIGIN` for your frontend domain
4. Use a process manager like PM2:
```bash
pm2 start server.js --name shophub-api
```

## License

MIT License - see LICENSE file for details

## Author

Aman Pathak
