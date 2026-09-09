# 💾 Database & Data Storage Guide

## Where Is My Database?

**Short Answer:** There is no traditional database in this project. This is a static, client-side application.

## Data Storage Overview

This ecommerce website uses two types of data storage:

### 1. Product Database (`js/products.js`)

**Location:** `/ecommerce-website/js/products.js`

This file contains all product information in a JavaScript array. It acts as your product database.

#### Product Structure

```javascript
{
    id: 1,                    // Unique product identifier
    name: "Product Name",     // Product name
    category: "electronics",  // Category: electronics, clothing, books, home
    price: 79.99,            // Price in USD
    description: "...",      // Product description
    icon: "fa-headphones",   // Font Awesome icon class
    rating: 4.5              // Rating (0-5)
}
```

#### How to Add a New Product

1. Open `js/products.js`
2. Add a new object to the `products` array:

```javascript
const products = [
    // ... existing products ...
    {
        id: 17,  // Use the next available ID
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 49.99,
        description: "Portable wireless speaker with 10-hour battery life.",
        icon: "fa-volume-up",
        rating: 4.6
    }
];
```

3. Save the file and refresh your browser

#### How to Edit a Product

Simply find the product in the array and modify its properties:

```javascript
{
    id: 1,
    name: "Premium Wireless Headphones",  // Changed name
    price: 89.99,                         // Changed price
    // ... other properties
}
```

#### How to Delete a Product

Remove the entire product object from the array:

```javascript
// Before: 16 products
const products = [
    { id: 1, name: "Product 1", ... },
    { id: 2, name: "Product 2", ... },  // Remove this
    { id: 3, name: "Product 3", ... }
];

// After: 15 products
const products = [
    { id: 1, name: "Product 1", ... },
    { id: 3, name: "Product 3", ... }
];
```

#### Available Icons

This project uses Font Awesome icons. Browse available icons at:
- https://fontawesome.com/icons

Example icon classes:
- `fa-laptop`
- `fa-mobile`
- `fa-shirt`
- `fa-book`
- `fa-coffee`
- `fa-headphones`

### 2. Shopping Cart Storage (Browser LocalStorage)

**Location:** Browser's `localStorage` with key `shophub-cart`

The shopping cart is automatically saved to the browser's localStorage, allowing it to persist between page refreshes.

#### How Cart Storage Works

```javascript
// Cart is saved automatically when:
// - User adds item to cart
// - User updates quantity
// - User removes item from cart

// Storage key: 'shophub-cart'
// Storage format: JSON array
```

#### View Cart Data in Browser

**Chrome/Edge/Brave:**
1. Press `F12` to open DevTools
2. Click the "Application" tab
3. Expand "Local Storage" in the left sidebar
4. Click on your domain (e.g., `http://localhost:8000`)
5. Look for the key `shophub-cart`

**Firefox:**
1. Press `F12` to open DevTools
2. Click the "Storage" tab
3. Expand "Local Storage" in the left sidebar
4. Click on your domain
5. Look for the key `shophub-cart`

#### Clear Cart Data

**Via Browser:**
1. Open DevTools (F12)
2. Find `shophub-cart` in Local Storage
3. Right-click → Delete

**Via Console:**
```javascript
// Open DevTools console (F12) and run:
localStorage.removeItem('shophub-cart');
location.reload();
```

**Via Website:**
- Add items to cart, then proceed to checkout
- Cart is automatically cleared after checkout

#### Cart Data Format

```javascript
[
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        description: "...",
        icon: "fa-headphones",
        rating: 4.5,
        quantity: 2  // Quantity added by cart system
    }
]
```

## Why No Real Database?

This project is designed as a **static website** for several reasons:

✅ **Easy to Deploy**
- No server setup required
- Works on any static hosting (GitHub Pages, Netlify, Vercel)
- No database configuration needed

✅ **Easy to Learn**
- Perfect for frontend beginners
- No backend knowledge required
- Focus on HTML, CSS, and JavaScript

✅ **Fast Performance**
- No database queries
- No server round trips
- Instant page loads

✅ **No Costs**
- Free hosting on GitHub Pages
- No database hosting fees
- No server costs

## Upgrading to a Real Database

If you want to convert this to use a real database, here's what you'll need:

### Option 1: Node.js + MongoDB

**1. Create a Backend Server**

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shophub');

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    description: String,
    icon: String,
    rating: Number
});

const Product = mongoose.model('Product', ProductSchema);

const app = express();

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.listen(3000);
```

**2. Update Frontend**

```javascript
// Instead of using products array, fetch from API
async function loadProducts(filter = 'all') {
    const response = await fetch('/api/products');
    const products = await response.json();
    // ... rest of the code
}
```

### Option 2: Python + Flask + SQLite

**1. Create Backend**

```python
# app.py
from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/api/products')
def get_products():
    conn = sqlite3.connect('products.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM products')
    products = cursor.fetchall()
    return jsonify(products)

if __name__ == '__main__':
    app.run(port=5000)
```

**2. Update Frontend** (same as Option 1)

### Option 3: Firebase (Easiest for Beginners)

**1. Install Firebase**

```html
<!-- Add to index.html before closing </body> tag -->
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore-compat.js"></script>
```

**2. Update JavaScript**

```javascript
// Initialize Firebase
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id"
    // ... other config
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fetch products
async function loadProducts() {
    const querySnapshot = await db.collection("products").get();
    const products = querySnapshot.docs.map(doc => doc.data());
    // ... rest of the code
}
```

## Data Migration Guide

If you decide to migrate to a real database, here's how to import your current product data:

### Export Current Products

```javascript
// Run in browser console on the website:
console.log(JSON.stringify(products, null, 2));
// Copy the output
```

### Import to MongoDB

```javascript
// import.js
const products = [ /* paste products array */ ];

// Using MongoDB shell
db.products.insertMany(products);
```

### Import to MySQL

```sql
-- Create table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    category VARCHAR(50),
    price DECIMAL(10,2),
    description TEXT,
    icon VARCHAR(100),
    rating DECIMAL(2,1)
);

-- Insert data
INSERT INTO products VALUES
(1, 'Wireless Headphones', 'electronics', 79.99, '...', 'fa-headphones', 4.5),
(2, 'Smart Watch', 'electronics', 199.99, '...', 'fa-watch', 4.8);
-- ... etc
```

## FAQ

**Q: Can I use this on GitHub Pages?**  
A: Yes! It's a static site, perfect for GitHub Pages.

**Q: How do I backup my product data?**  
A: Copy the `js/products.js` file to a safe location.

**Q: Can multiple users see the same products?**  
A: Yes, products are the same for everyone. But shopping carts are individual (stored locally).

**Q: Is the cart data secure?**  
A: No, localStorage is not secure. For real checkout, you'd need a backend with proper security.

**Q: Can I add images to products?**  
A: Currently using Font Awesome icons. To use real images, add an `image` property to each product and update the HTML/CSS.

**Q: How many products can I add?**  
A: As many as you want! But too many might slow down the page. Consider pagination if you have 100+ products.

## Need Help?

- Check the main [README.md](README.md) for general information
- See [QUICKSTART.md](QUICKSTART.md) for running the website
- For issues, visit: https://github.com/aman-pathak1/aman-pathak1/issues
