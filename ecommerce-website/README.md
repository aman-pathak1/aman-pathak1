# ShopHub - Production-Ready E-commerce Website

A modern, full-stack e-commerce platform with real product images, backend API, database, user authentication, and professional animations.

![ShopHub](https://img.shields.io/badge/Status-Production%20Ready-success)
![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🌟 Features

### Frontend
- 🖼️ **Real Product Images**: High-quality images from Unsplash API
- 🎨 **Modern Animations**: GSAP animations, hover effects, and smooth transitions
- 🛍️ **Product Catalog**: Browse Electronics, Clothing, Books, and Home & Living
- 🔍 **Search & Filter**: Advanced search and category filtering
- 🛒 **Shopping Cart**: Full cart management with quantity controls
- 📱 **Fully Responsive**: Perfect on desktop, tablet, and mobile devices
- ⭐ **Product Ratings**: Visual star ratings for each product
- 🔐 **User Authentication**: Login/Signup with JWT tokens

### Backend
- 🗄️ **Database**: SQLite database with proper relational schema
- 🔒 **Security**: Password hashing, SQL injection prevention, rate limiting
- 📦 **REST API**: Complete CRUD API for products, cart, orders
- ✅ **Input Validation**: Comprehensive validation with express-validator
- 🛡️ **Security Headers**: Helmet, CORS configuration
- 📝 **Detailed Logging**: Request logging and error handling

## 🛠️ Technologies

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- GSAP for animations
- Font Awesome Icons
- Unsplash API for images

### Backend
- Node.js & Express.js
- SQLite3 database
- JWT authentication
- bcryptjs for passwords
- express-validator
- Helmet & CORS

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ and npm
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aman-pathak1/aman-pathak1.git
   cd aman-pathak1/ecommerce-website
   ```

2. **Use the startup script:**
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

3. **Start frontend** (new terminal):
   ```bash
   python3 -m http.server 8000
   # Or: npx http-server -p 8000
   ```

4. **Open browser:**
   Visit `http://localhost:8000`

### Manual Setup

#### Backend
```bash
cd backend
npm install
npm run init-db
npm start
```

Backend runs on `http://localhost:3000`

#### Frontend
```bash
# From ecommerce-website directory
python3 -m http.server 8000
```

Frontend runs on `http://localhost:8000`

## 📁 Project Structure

```
ecommerce-website/
├── index.html              # Main page
├── start.sh               # Quick startup script
├── css/
│   └── style.css          # Animations & styles
├── js/
│   ├── api.js            # API service layer
│   ├── products.js       # Product data
│   └── app.js            # Main logic
└── backend/
    ├── server.js         # Express server
    ├── package.json
    ├── .env             # Configuration
    └── src/
        ├── config/
        │   └── database.js
        ├── controllers/
        │   ├── authController.js
        │   ├── productController.js
        │   ├── cartController.js
        │   └── orderController.js
        ├── middleware/
        │   ├── auth.js
        │   └── validation.js
        └── routes/
            ├── authRoutes.js
            ├── productRoutes.js
            ├── cartRoutes.js
            └── orderRoutes.js
```

## 🔐 Security Features

- ✅ **Password Hashing**: bcryptjs with salt rounds
- ✅ **JWT Authentication**: Secure token-based auth
- ✅ **SQL Injection Prevention**: Parameterized queries only
- ✅ **Input Validation**: All inputs validated & sanitized
- ✅ **Rate Limiting**: 100 requests per 15 minutes
- ✅ **CORS**: Configured for specific origins
- ✅ **Helmet**: Security headers enabled
- ✅ **Error Handling**: Never expose sensitive data

## 🎨 Animations & UI

### Animations
- Page load fade-in effects
- Product card zoom on hover
- Shimmer effects
- GSAP scroll animations
- Smooth state transitions
- Pulse effects on cart updates

### Responsive Design
- Mobile-first approach
- Tablet & desktop breakpoints
- Touch-friendly controls
- Lazy loading images

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (auth required)

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `GET /api/products/category/:category` - Filter by category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart (Authentication Required)
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:cartId` - Update quantity
- `DELETE /api/cart/:cartId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders (Authentication Required)
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user orders
- `GET /api/orders/:orderId` - Get order details
- `PATCH /api/orders/:orderId/status` - Update status

## 🧪 Testing

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123","name":"John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'
```

### Get Products
```bash
curl http://localhost:3000/api/products
```

## 🎯 Production Deployment

1. Set environment variables:
   - `NODE_ENV=production`
   - `JWT_SECRET=<strong-secret>`
   - `CORS_ORIGIN=<your-domain>`

2. Use process manager:
   ```bash
   pm2 start backend/server.js --name shophub-api
   ```

3. Use nginx for frontend static files

4. Enable HTTPS with Let's Encrypt

## 📄 License

MIT License - see LICENSE file

## 👤 Author

**Aman Pathak**
- LinkedIn: [Aman Pathak](https://www.linkedin.com/in/aman-pathak-393553322/)
- Twitter: [@AmanPathak90](https://x.com/AmanPathak90)
- Instagram: [@aaman_ppathak](https://www.instagram.com/aaman_ppathak/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
