# Frontend Integration Guide

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontendIntern
npm install
```

This will install Axios which is required for API communication.

### 2. Configure Environment

Create `.env.local` file in the frontend root (if not already created):

```
VITE_API_URL=http://localhost:8000/api
```

### 3. Start Frontend Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Frontend Structure

### Services (`src/services/api.js`)
Centralized API client using Axios with:
- Automatic token injection for authenticated requests
- Error handling with automatic logout on 401
- All API endpoints organized by resource

### Context Providers
- **AuthContext** (`src/context/AuthContext.jsx`): Handles user authentication
- **CartContext** (`src/context/CartContext.jsx`): Manages shopping cart state

### Pages
- **Home** (`src/pages/Home.jsx`): Displays featured products
- **Products** (`src/pages/Products.jsx`): Browse with search and filters
- **ProductDetail** (`src/pages/ProductDetail.jsx`): Single product view
- **Cart** (`src/pages/Cart.jsx`): Shopping cart management

## Features Implemented

### Authentication
- User registration and login
- JWT token-based session management
- Automatic logout on token expiration
- Protected routes based on authentication status

### Product Catalog
- Browse all products with pagination
- Search products by name
- Filter by category
- Sort by price, rating, or date
- View product details and reviews

### Shopping Cart
- Add/remove products
- Update quantities
- Real-time cart updates
- Checkout and order creation
- Free shipping for orders over $50

### User Experience
- Responsive design
- Loading states
- Error handling and messages
- Toast notifications (add to cart confirmation)

## Testing the Integration

### 1. Test User Registration
1. Go to http://localhost:5173
2. Navigate to Home/Products page
3. Try adding a product to cart (will prompt to login)
4. Register a new account

### 2. Test Product Browsing
1. On Products page, use search bar
2. Filter by category
3. Sort by different options
4. Click on products to view details

### 3. Test Shopping Cart
1. Add multiple products to cart
2. Update quantities
3. Remove products
4. Click Checkout to create an order

## API Integration Points

### Home Page
```javascript
// Fetches featured products
productsAPI.getFeatured()
```

### Products Page
```javascript
// Fetches products with filters
productsAPI.getAll({
  page, search, category, ordering
})

// Fetches available categories
categoriesAPI.getAll()
```

### Product Detail Page
```javascript
// Fetches single product
productsAPI.getById(id)

// Fetches product reviews
productsAPI.getReviews(id)
```

### Cart Operations
```javascript
cartAPI.addItem({product_id, quantity})
cartAPI.removeItem({product_id})
cartAPI.updateItem({product_id, quantity})
cartAPI.clear()
cartAPI.getCart()
```

### Checkout
```javascript
ordersAPI.createFromCart()
```

## Troubleshooting

### Products not loading
1. Check that backend is running on port 8000
2. Verify `VITE_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Run `python manage.py populate_db` in backend

### Cart not updating
1. Ensure you're logged in
2. Check that AuthContext is properly wrapped around app
3. Check browser console for errors

### Login not working
1. Verify user exists (use admin/admin123 or testuser/testpass123)
2. Check backend is running
3. Look for error messages in response

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` directory.

## Performance Optimization

The frontend includes:
- Lazy loading of components (react-router)
- Optimized images
- Pagination to limit data transfer
- Memoized context providers
- Efficient state management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Additional Features to Add

- [ ] User profile management
- [ ] Wishlist functionality
- [ ] Product reviews submission
- [ ] Advanced search filters
- [ ] Payment gateway integration
- [ ] Order history and tracking
- [ ] Admin dashboard
- [ ] Inventory management
