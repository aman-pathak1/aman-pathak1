# ShopHub - E-commerce Website

A modern, Flipkart-style e-commerce website built with **React**, **Framer Motion**, and **Vite**.

## ✨ Features

- 🎨 **Flipkart-Inspired Design**: Blue-themed UI matching Flipkart's distinctive look
- ⚛️ **Built with React**: Modern React 19 with hooks and functional components
- 🎭 **Smooth Animations**: Powered by Framer Motion for fluid transitions
- 🎠 **Auto-Rotating Banner**: Eye-catching carousel showcasing deals
- 🛍️ **Product Catalog**: Browse electronics, clothing, books, and home products
- 🔍 **Search Functionality**: Real-time product search
- 🏷️ **Category Filtering**: Filter products by category with smooth animations
- 🛒 **Shopping Cart**: Slide-in cart with quantity management
- 💾 **Persistent Cart**: Cart data saved in localStorage
- 📱 **Fully Responsive**: Works seamlessly on all devices
- ⭐ **Product Ratings**: Display ratings for each product
- 💰 **Discount Badges**: Show savings on products

## 🚀 Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **CSS3** - Styling with custom properties

## 📦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aman-pathak1/aman-pathak1.git
   cd aman-pathak1/ecommerce-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design Features

### Flipkart-Style Elements

- **Blue Header**: Flipkart's signature blue (#2874f0)
- **Yellow "Plus" Badge**: Mimics Flipkart Plus branding
- **Orange "Add to Cart" Buttons**: Distinctive orange CTA buttons
- **Discount Badges**: Red badges showing percentage off
- **Rating Pills**: Green rating badges with stars
- **Product Cards**: Clean white cards with hover effects
- **Slide-in Cart**: Smooth right-side cart drawer

### Animations

- Banner carousel with fade and slide transitions
- Product cards fade in with stagger effect
- Hover animations on cards (lift effect)
- Cart icon badge animation on item add
- Smooth cart sidebar slide-in/out
- Category card hover effects

## 📁 Project Structure

```
ecommerce-website/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation bar
│   │   ├── Header.css
│   │   ├── Banner.jsx          # Auto-rotating banner
│   │   ├── Banner.css
│   │   ├── Categories.jsx      # Category grid
│   │   ├── Categories.css
│   │   ├── Products.jsx        # Product listing
│   │   ├── Products.css
│   │   ├── ProductCard.jsx     # Individual product card
│   │   ├── ProductCard.css
│   │   ├── Cart.jsx            # Shopping cart sidebar
│   │   └── Cart.css
│   ├── data/
│   │   └── products.js         # Product data
│   ├── App.jsx                 # Main app component
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🛍️ Product Categories

- **Electronics**: Headphones, smart watches, laptops, mice
- **Clothing**: T-shirts, jeans, shoes, jackets
- **Books**: Programming and design books
- **Home & Living**: Coffee makers, lamps, pillows, clocks

## 🎯 Key Components

### Header
- Sticky navigation
- Search bar with real-time filtering
- Shopping cart button with item count badge

### Banner
- Auto-rotating carousel (4-second intervals)
- Three promotional slides
- Manual slide selection with indicators

### Categories
- Interactive category cards
- Smooth hover animations
- Filter products on click

### Product Cards
- Discount badges
- Product icons/emojis
- Rating display
- Original and discounted prices
- Animated "Add to Cart" button

### Shopping Cart
- Slide-in from right side
- Quantity increment/decrement controls
- Remove item functionality
- Live total calculation
- Persistent across sessions

## 🎨 Color Palette

```css
--flipkart-blue: #2874f0
--flipkart-orange: #ff9f00
--discount-red: #ff6161
--rating-green: #388e3c
--text-dark: #212121
--text-light: #878787
--background: #f1f3f6
```

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Backend API integration
- [ ] Payment gateway
- [ ] Product reviews system
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Advanced filters (price range, ratings)
- [ ] Product image gallery
- [ ] Size/color variants

## 👨‍💻 Developer

**Aman Pathak**
- Email: [0aamanpathak@gmail.com](mailto:0aamanpathak@gmail.com)
- LinkedIn: [linkedin.com/in/aman-pathak-393553322](https://www.linkedin.com/in/aman-pathak-393553322/)
- Twitter: [@AmanPathak90](https://x.com/AmanPathak90)
- Instagram: [@aaman_ppathak](https://www.instagram.com/aaman_ppathak/)

---

⭐ If you found this project helpful, please give it a star!
