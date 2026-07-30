const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Database path
const dbPath = path.resolve(__dirname, '../../', process.env.DB_PATH || 'database.sqlite');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Initialize database tables
const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Users table
            db.run(`
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    name TEXT NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Products table
            db.run(`
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    price REAL NOT NULL,
                    category TEXT NOT NULL,
                    image TEXT,
                    rating REAL DEFAULT 0,
                    stock INTEGER DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Cart table
            db.run(`
                CREATE TABLE IF NOT EXISTS cart (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
                    UNIQUE(user_id, product_id)
                )
            `);

            // Orders table
            db.run(`
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    total REAL NOT NULL,
                    status TEXT DEFAULT 'pending',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
            `);

            // Order items table
            db.run(`
                CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL,
                    price REAL NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products(id)
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating tables:', err.message);
                    reject(err);
                } else {
                    console.log('Database tables created successfully');
                    resolve();
                }
            });
        });
    });
};

// Seed initial products
const seedProducts = () => {
    return new Promise((resolve, reject) => {
        const products = [
            {
                name: "Wireless Headphones",
                category: "electronics",
                price: 79.99,
                description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
                rating: 4.5,
                stock: 50
            },
            {
                name: "Smart Watch",
                category: "electronics",
                price: 199.99,
                description: "Fitness tracking smart watch with heart rate monitor and GPS.",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
                rating: 4.8,
                stock: 30
            },
            {
                name: "Laptop Stand",
                category: "electronics",
                price: 39.99,
                description: "Ergonomic laptop stand with adjustable height and angle.",
                image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
                rating: 4.3,
                stock: 100
            },
            {
                name: "Wireless Mouse",
                category: "electronics",
                price: 29.99,
                description: "Ergonomic wireless mouse with precision tracking.",
                image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
                rating: 4.6,
                stock: 75
            },
            {
                name: "Casual T-Shirt",
                category: "clothing",
                price: 24.99,
                description: "100% cotton comfortable t-shirt available in multiple colors.",
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
                rating: 4.4,
                stock: 200
            },
            {
                name: "Denim Jeans",
                category: "clothing",
                price: 59.99,
                description: "Classic fit denim jeans with premium quality fabric.",
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
                rating: 4.7,
                stock: 150
            },
            {
                name: "Running Shoes",
                category: "clothing",
                price: 89.99,
                description: "Lightweight running shoes with excellent cushioning and support.",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
                rating: 4.9,
                stock: 80
            },
            {
                name: "Winter Jacket",
                category: "clothing",
                price: 129.99,
                description: "Warm and stylish winter jacket with water-resistant coating.",
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
                rating: 4.6,
                stock: 60
            },
            {
                name: "JavaScript Guide",
                category: "books",
                price: 34.99,
                description: "Comprehensive guide to modern JavaScript programming.",
                image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
                rating: 4.7,
                stock: 120
            },
            {
                name: "Python for Beginners",
                category: "books",
                price: 29.99,
                description: "Learn Python programming from scratch with practical examples.",
                image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&q=80",
                rating: 4.8,
                stock: 110
            },
            {
                name: "Web Design Masterclass",
                category: "books",
                price: 44.99,
                description: "Master web design with HTML, CSS, and modern frameworks.",
                image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
                rating: 4.5,
                stock: 90
            },
            {
                name: "Machine Learning Basics",
                category: "books",
                price: 54.99,
                description: "Introduction to machine learning algorithms and applications.",
                image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
                rating: 4.9,
                stock: 70
            },
            {
                name: "Coffee Maker",
                category: "home",
                price: 79.99,
                description: "Programmable coffee maker with thermal carafe and auto-brew feature.",
                image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80",
                rating: 4.4,
                stock: 45
            },
            {
                name: "Table Lamp",
                category: "home",
                price: 45.99,
                description: "Modern LED table lamp with adjustable brightness and color temperature.",
                image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
                rating: 4.6,
                stock: 85
            },
            {
                name: "Throw Pillow Set",
                category: "home",
                price: 34.99,
                description: "Set of 4 decorative throw pillows with removable covers.",
                image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&q=80",
                rating: 4.3,
                stock: 95
            },
            {
                name: "Wall Clock",
                category: "home",
                price: 28.99,
                description: "Silent wall clock with modern design and large numbers.",
                image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80",
                rating: 4.5,
                stock: 105
            }
        ];

        // Check if products already exist
        db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            if (row.count > 0) {
                console.log('Products already exist in database');
                resolve();
                return;
            }

            // Insert products
            const stmt = db.prepare(`
                INSERT INTO products (name, category, price, description, image, rating, stock)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

            products.forEach(product => {
                stmt.run([
                    product.name,
                    product.category,
                    product.price,
                    product.description,
                    product.image,
                    product.rating,
                    product.stock
                ]);
            });

            stmt.finalize((err) => {
                if (err) {
                    console.error('Error seeding products:', err.message);
                    reject(err);
                } else {
                    console.log('Products seeded successfully');
                    resolve();
                }
            });
        });
    });
};

// Initialize database if run directly
if (require.main === module) {
    initializeDatabase()
        .then(() => seedProducts())
        .then(() => {
            console.log('Database initialization complete');
            db.close();
        })
        .catch((err) => {
            console.error('Database initialization failed:', err);
            process.exit(1);
        });
}

module.exports = { db, initializeDatabase, seedProducts };
