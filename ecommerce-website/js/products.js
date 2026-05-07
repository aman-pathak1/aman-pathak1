// Product Data - Updated with real Unsplash images
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 79.99,
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        rating: 4.5
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 199.99,
        description: "Fitness tracking smart watch with heart rate monitor and GPS.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        rating: 4.8
    },
    {
        id: 3,
        name: "Laptop Stand",
        category: "electronics",
        price: 39.99,
        description: "Ergonomic laptop stand with adjustable height and angle.",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
        rating: 4.3
    },
    {
        id: 4,
        name: "Wireless Mouse",
        category: "electronics",
        price: 29.99,
        description: "Ergonomic wireless mouse with precision tracking.",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&q=80",
        rating: 4.6
    },
    {
        id: 5,
        name: "Casual T-Shirt",
        category: "clothing",
        price: 24.99,
        description: "100% cotton comfortable t-shirt available in multiple colors.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
        rating: 4.4
    },
    {
        id: 6,
        name: "Denim Jeans",
        category: "clothing",
        price: 59.99,
        description: "Classic fit denim jeans with premium quality fabric.",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80",
        rating: 4.7
    },
    {
        id: 7,
        name: "Running Shoes",
        category: "clothing",
        price: 89.99,
        description: "Lightweight running shoes with excellent cushioning and support.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
        rating: 4.9
    },
    {
        id: 8,
        name: "Winter Jacket",
        category: "clothing",
        price: 129.99,
        description: "Warm and stylish winter jacket with water-resistant coating.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
        rating: 4.6
    },
    {
        id: 9,
        name: "JavaScript Guide",
        category: "books",
        price: 34.99,
        description: "Comprehensive guide to modern JavaScript programming.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
        rating: 4.7
    },
    {
        id: 10,
        name: "Python for Beginners",
        category: "books",
        price: 29.99,
        description: "Learn Python programming from scratch with practical examples.",
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&q=80",
        rating: 4.8
    },
    {
        id: 11,
        name: "Web Design Masterclass",
        category: "books",
        price: 44.99,
        description: "Master web design with HTML, CSS, and modern frameworks.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
        rating: 4.5
    },
    {
        id: 12,
        name: "Machine Learning Basics",
        category: "books",
        price: 54.99,
        description: "Introduction to machine learning algorithms and applications.",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80",
        rating: 4.9
    },
    {
        id: 13,
        name: "Coffee Maker",
        category: "home",
        price: 79.99,
        description: "Programmable coffee maker with thermal carafe and auto-brew feature.",
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80",
        rating: 4.4
    },
    {
        id: 14,
        name: "Table Lamp",
        category: "home",
        price: 45.99,
        description: "Modern LED table lamp with adjustable brightness and color temperature.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80",
        rating: 4.6
    },
    {
        id: 15,
        name: "Throw Pillow Set",
        category: "home",
        price: 34.99,
        description: "Set of 4 decorative throw pillows with removable covers.",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&q=80",
        rating: 4.3
    },
    {
        id: 16,
        name: "Wall Clock",
        category: "home",
        price: 28.99,
        description: "Silent wall clock with modern design and large numbers.",
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&q=80",
        rating: 4.5
    }
];
