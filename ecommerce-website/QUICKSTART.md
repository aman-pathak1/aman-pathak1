# 🚀 Quick Start Guide - Running ShopHub Locally

This guide will help you run the ShopHub e-commerce website on your localhost in just a few steps!

## ⚡ Fastest Method (No Installation Required)

### Option 1: Direct Browser Opening
**This works immediately - no setup needed!**

1. Navigate to the `ecommerce-website` folder
2. Double-click the `index.html` file
3. Your default browser will open the website automatically!

✅ **That's it!** The website will run directly in your browser.

---

## 🌐 Better Method (Using a Local Server)

For the best experience with all features working properly, use a local development server:

### Option 2: Using Python (Recommended)

**If you have Python installed:**

#### Python 3 (Most Common)
```bash
# Navigate to the ecommerce-website folder
cd ecommerce-website

# Start the server
python3 -m http.server 8000

# Or on Windows, you might use:
python -m http.server 8000
```

#### Python 2 (Older Systems)
```bash
cd ecommerce-website
python -m SimpleHTTPServer 8000
```

**Then open your browser and go to:**
```
http://localhost:8000
```

✅ **Success!** You should see the ShopHub homepage.

---

### Option 3: Using Node.js (If you have npm/npx)

```bash
# Navigate to the ecommerce-website folder
cd ecommerce-website

# Use npx (no installation needed)
npx http-server -p 8000

# OR install globally first
npm install -g http-server
http-server -p 8000
```

**Then open:** `http://localhost:8000`

---

### Option 4: Using PHP (If you have PHP installed)

```bash
cd ecommerce-website
php -S localhost:8000
```

**Then open:** `http://localhost:8000`

---

### Option 5: Using VS Code Live Server Extension

If you use Visual Studio Code:

1. Install the "Live Server" extension by Ritwick Dey
2. Right-click on `index.html`
3. Select "Open with Live Server"

The website will automatically open in your browser!

---

## 📋 Step-by-Step Instructions for Beginners

### For Windows Users:

1. **Download the files:**
   - Clone or download this repository
   - Extract to a folder like `C:\ShopHub`

2. **Open with Python:**
   ```cmd
   cd C:\ShopHub\ecommerce-website
   python -m http.server 8000
   ```

3. **Open your browser:**
   - Type `http://localhost:8000` in the address bar
   - Press Enter

### For Mac Users:

1. **Open Terminal**
2. **Navigate to the folder:**
   ```bash
   cd ~/Downloads/aman-pathak1/ecommerce-website
   ```

3. **Start the server:**
   ```bash
   python3 -m http.server 8000
   ```

4. **Open Safari/Chrome:**
   - Go to `http://localhost:8000`

### For Linux Users:

1. **Open Terminal**
2. **Navigate and run:**
   ```bash
   cd ~/aman-pathak1/ecommerce-website
   python3 -m http.server 8000
   ```

3. **Open your browser:**
   - Navigate to `http://localhost:8000`

---

## 🔧 Troubleshooting

### Port Already in Use?

If you get an error that port 8000 is already in use, try a different port:

```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```

Or any other port number like 3000, 5000, 8888, etc.

### Python Not Found?

**Check if Python is installed:**
```bash
python3 --version
# or
python --version
```

**Don't have Python?**
- **Windows:** Download from [python.org](https://www.python.org/downloads/)
- **Mac:** Python 3 is usually pre-installed. Try `python3` command
- **Linux:** Run `sudo apt install python3` (Ubuntu/Debian) or `sudo yum install python3` (CentOS/RHEL)

### Page Not Loading?

1. **Check the terminal** - Make sure the server is still running (you should see log messages)
2. **Check the URL** - Make sure you're using `http://localhost:8000` (not `https://`)
3. **Try a different browser** - Sometimes browser cache can cause issues
4. **Check firewall** - Your firewall might be blocking localhost connections

### Icons Not Showing?

The website uses Font Awesome from a CDN. Make sure you have an internet connection for icons to load.

---

## 🎯 What You Should See

When the website loads successfully at `http://localhost:8000`, you should see:

![ShopHub running on localhost](https://github.com/user-attachments/assets/f6a34d49-bcc6-4c28-9d11-6aca2e4a56e1)

- ✅ ShopHub logo and navigation bar at the top
- ✅ A purple gradient hero section with "Welcome to ShopHub"
- ✅ Category cards (Electronics, Clothing, Books, Home & Living)
- ✅ Product grid with 16 products
- ✅ Shopping cart icon (showing "0" initially)
- ✅ Footer with social media links

---

## 🛒 Testing the Website

Try these features to confirm everything works:

1. **Add to Cart:** Click any product's cart button
2. **View Cart:** Click the cart icon in the header
3. **Search:** Type in the search bar (e.g., "laptop")
4. **Filter:** Click category buttons or category cards
5. **Product Details:** Click on any product card

---

## 💾 Where Is My Database?

**Important:** This website doesn't use a traditional database!

### Data Storage Explained:

1. **Product Data** → Stored in `js/products.js`
   - All products (name, price, description) are in a JavaScript array
   - To add/edit products, edit this file directly
   - Changes require refreshing the page

2. **Shopping Cart** → Stored in Browser's LocalStorage
   - Your cart is saved automatically in your browser
   - Persists between page refreshes
   - Cleared when you clear browser cache

### How to View Your Data:

**Products:**
```bash
# Open this file to see all products
cat js/products.js
# or open it in any text editor
```

**Shopping Cart (in Browser):**
1. Press F12 to open DevTools
2. Go to "Application" tab
3. Look under "Local Storage" → your domain
4. Find the key `shophub-cart`

### Need a Real Database?

This is a static frontend-only demo. For a real database:
- You'll need a backend server (Node.js, Python, etc.)
- Connect to MySQL, MongoDB, PostgreSQL, etc.
- Create APIs to fetch/save data
- See the main [README.md](README.md) "Database / Data Storage" section

---

## 💡 Pro Tips

- **Auto-refresh:** Use VS Code's Live Server for automatic page refresh when you edit files
- **Different browsers:** Test in Chrome, Firefox, Safari, and Edge to see responsive design
- **Mobile view:** Press F12 in Chrome, click the device toggle icon to test mobile layout
- **Network tab:** Open Developer Tools (F12) → Network tab to see all resources loading

---

## 📞 Need Help?

If you're still having trouble:

1. Check the main [README.md](README.md) for more details
2. Make sure all files are in the correct structure:
   ```
   ecommerce-website/
   ├── index.html
   ├── css/style.css
   ├── js/app.js
   └── js/products.js
   ```
3. Try the simplest method first (double-click index.html)

---

## ✨ Quick Command Reference

```bash
# Navigate to project
cd ecommerce-website

# Run with Python 3
python3 -m http.server 8000

# Run with Python 2
python -m SimpleHTTPServer 8000

# Run with Node.js
npx http-server -p 8000

# Run with PHP
php -S localhost:8000

# Then open: http://localhost:8000
```

---

**Happy Shopping! 🛍️**
