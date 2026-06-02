# E-Commerce Project - Complete Setup Guide

## Project Overview

A full-stack e-commerce application with:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Django + Django REST Framework + SQLite/PostgreSQL
- **Features**: Product catalog, shopping cart, user authentication, order management

## Quick Start

### Option 1: Run Both Services Locally

#### Terminal 1: Start Django Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Populate sample data
python manage.py populate_db

# Start server
python manage.py runserver
# Backend runs at http://localhost:8000
```

**Admin Panel:**
- URL: http://localhost:8000/admin/
- Username: admin
- Password: admin123

#### Terminal 2: Start React Frontend

```bash
cd frontendIntern

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend runs at http://localhost:5173
```

## Folder Structure

```
internship_projects/
├── backend/                    # Django backend
│   ├── config/                # Django configuration
│   ├── api/                   # Main API app
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # API serializers
│   │   ├── views.py           # API views/endpoints
│   │   ├── urls.py            # API routing
│   │   └── management/        # Management commands
│   ├── manage.py
│   ├── requirements.txt
│   └── README.md
│
└── frontendIntern/            # React frontend
    ├── src/
    │   ├── pages/            # Page components
    │   ├── components/       # Reusable components
    │   ├── context/          # Auth & Cart contexts
    │   ├── services/         # API client
    │   └── App.jsx
    ├── package.json
    └── .env.local
```

## Backend API Documentation

### Authentication Endpoints

```
POST /api/auth/register/      - Register new user
POST /api/auth/login/         - Login and get token
POST /api/auth/logout/        - Logout
GET  /api/auth/profile/       - Get user profile
PUT  /api/auth/profile/update/ - Update profile
```

**Login Example:**
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

**Response:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {"id": 2, "username": "testuser", "email": "test@example.com"}
}
```

### Products Endpoints

```
GET    /api/products/           - List products (paginated)
GET    /api/products/{id}/      - Get product details
POST   /api/products/           - Create product (admin)
PUT    /api/products/{id}/      - Update product (admin)
DELETE /api/products/{id}/      - Delete product (admin)
GET    /api/products/featured/  - Get featured products
GET    /api/products/search/    - Search products
```

**Query Parameters:**
- `page`: Page number
- `search`: Search term
- `category`: Category ID
- `ordering`: Sort field (price, rating, created_at)

**Example:**
```bash
curl "http://localhost:8000/api/products/?search=headphones&ordering=-price"
```

### Cart Endpoints

```
GET    /api/cart/my_cart/       - Get current cart
POST   /api/cart/add_item/      - Add product to cart
POST   /api/cart/remove_item/   - Remove product from cart
POST   /api/cart/update_item/   - Update quantity
DELETE /api/cart/clear/         - Clear entire cart
```

**Add to Cart:**
```bash
curl -X POST http://localhost:8000/api/cart/add_item/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "quantity": 2}'
```

### Orders Endpoints

```
GET    /api/orders/              - List user's orders
GET    /api/orders/{id}/         - Get order details
POST   /api/orders/create_from_cart/ - Create order from cart
POST   /api/orders/{id}/update_status/ - Update status (admin)
```

## Database Models

### Product
- `id`, `name`, `price`, `image`, `description`
- `category` (ForeignKey to Category)
- `stock`, `is_featured`, `rating`, `reviews_count`
- `created_at`, `updated_at`

### Category
- `id`, `name`, `description`
- `created_at`, `updated_at`

### Cart & CartItem
- `Cart`: user, items, created_at, updated_at
- `CartItem`: cart, product, quantity, added_at

### Order & OrderItem
- `Order`: user, status, items, total_price, created_at, updated_at
- `OrderItem`: order, product, quantity, price

### Review
- `id`, `product`, `user`, `rating`, `comment`
- `created_at`

## Frontend Features

### Pages
- **Home**: Featured products showcase
- **Products**: Browse all products with search and filtering
- **Product Detail**: View product details and reviews
- **Cart**: Manage shopping cart items

### Context Providers
- **AuthContext**: User authentication and authorization
- **CartContext**: Shopping cart management

### Key Features
- Dynamic product loading from backend
- Real-time cart updates
- Search and category filtering
- Pagination support
- Responsive design with Tailwind CSS

## Environment Configuration

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
JWT_SECRET=your-jwt-secret
JWT_EXPIRATION_HOURS=24
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api
```

## Sample Users

After running `populate_db`:

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Test User:**
- Username: `testuser`
- Password: `testpass123`

## Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect your GitHub repo
5. Set Build Command: `pip install -r requirements.txt && python manage.py migrate`
6. Set Start Command: `gunicorn config.wsgi:application`
7. Add environment variables

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Import project
4. Set Build Command: `npm run build`
5. Set Output Directory: `dist`
6. Add Environment Variable: `VITE_API_URL=<your-backend-url>`
7. Deploy

## Testing

### Test Product Listing
```bash
curl http://localhost:8000/api/products/
```

### Test Authentication
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","email":"user@test.com","password":"pass123","password2":"pass123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","password":"pass123"}'
```

### Test Cart Operations
```bash
# Get cart
curl -H "Authorization: Bearer <token>" \
  http://localhost:8000/api/cart/my_cart/

# Add to cart
curl -X POST http://localhost:8000/api/cart/add_item/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"product_id": 1, "quantity": 1}'
```

## Common Issues & Solutions

### Issue: CORS Errors
**Solution:** Update `CORS_ALLOWED_ORIGINS` in backend `.env`

### Issue: "No products showing"
**Solution:** Run `python manage.py populate_db` to seed database

### Issue: 401 Unauthorized errors
**Solution:** Ensure token is included in request headers with correct format

### Issue: Port already in use
**Solution:** 
```bash
# Backend (change port)
python manage.py runserver 8001

# Frontend (change port)
npm run dev -- --port 5174
```

## Next Steps

1. ✅ Add authentication pages (login/register)
2. ✅ Create admin dashboard for product management
3. ✅ Implement wishlist feature
4. ✅ Add product reviews and ratings
5. ✅ Set up payment processing (Stripe)
6. ✅ Add email notifications
7. ✅ Implement order tracking
8. ✅ Deploy to production

## Support

For issues or questions:
1. Check the backend README.md
2. Review API documentation
3. Check console and network tabs in browser
4. Review Django logs in terminal

## Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
