# Django E-Commerce Backend API

A comprehensive REST API backend for an e-commerce platform built with Django and Django REST Framework.

## Features

✅ **Complete API Endpoints**
- Full CRUD operations for products, categories, and reviews
- Advanced search and filtering capabilities
- Featured products display

✅ **Shopping Cart Management**
- Add/remove products from cart
- Update quantities
- Persistent cart storage

✅ **User Authentication & Authorization**
- JWT-based authentication
- User registration and login
- Protected routes for authenticated users
- Admin-only endpoints

✅ **Order Management**
- Create orders from cart
- Track order status
- Order history

✅ **Product Management**
- Product catalog with images
- Stock management
- Product ratings and reviews
- Category organization

✅ **Admin Panel**
- Django admin interface
- Easy product management
- User and order management

## Project Structure

```
backend/
├── config/                 # Django project settings
│   ├── __init__.py
│   ├── settings.py        # Project settings
│   ├── urls.py            # Root URL configuration
│   └── wsgi.py            # WSGI application
├── api/                    # Main API app
│   ├── models.py          # Database models
│   ├── serializers.py     # DRF serializers
│   ├── views.py           # API views and viewsets
│   ├── urls.py            # API URL routing
│   ├── admin.py           # Admin configuration
│   ├── apps.py            # App configuration
│   └── management/
│       └── commands/
│           └── populate_db.py  # Database seeding script
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
└── README.md             # This file
```

## Setup Instructions

### 1. Prerequisites
- Python 3.8+
- pip (Python package manager)
- Virtual environment (recommended)

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Apply migrations
python manage.py makemigrations
python manage.py migrate

# Populate database with sample data
python manage.py populate_db

# Create superuser (if not using populate_db)
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### 3. Running the Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

Admin panel: `http://localhost:8000/admin/`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login and get JWT token |
| POST | `/api/auth/logout/` | Logout user |
| GET | `/api/auth/profile/` | Get user profile |
| PUT | `/api/auth/profile/update/` | Update user profile |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/` | List all products (paginated) |
| GET | `/api/products/{id}/` | Get product details |
| POST | `/api/products/` | Create product (admin only) |
| PUT | `/api/products/{id}/` | Update product (admin only) |
| DELETE | `/api/products/{id}/` | Delete product (admin only) |
| GET | `/api/products/featured/` | Get featured products |
| GET | `/api/products/search/` | Search products |
| GET | `/api/products/{id}/reviews/` | Get product reviews |
| POST | `/api/products/{id}/add_review/` | Add review to product |

**Query Parameters:**
- `page`: Page number (default: 1)
- `page_size`: Items per page (default: 12, max: 100)
- `search`: Search by name/description
- `category`: Filter by category ID
- `is_featured`: Filter by featured status (true/false)
- `ordering`: Order by field (created_at, price, rating)

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories/` | List all categories |
| GET | `/api/categories/{id}/` | Get category details |
| POST | `/api/categories/` | Create category (admin only) |
| PUT | `/api/categories/{id}/` | Update category (admin only) |
| DELETE | `/api/categories/{id}/` | Delete category (admin only) |

### Shopping Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/my_cart/` | Get user's cart |
| POST | `/api/cart/add_item/` | Add item to cart |
| POST | `/api/cart/remove_item/` | Remove item from cart |
| POST | `/api/cart/update_item/` | Update item quantity |
| DELETE | `/api/cart/clear/` | Clear entire cart |

**Add Item Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Remove Item Request Body:**
```json
{
  "product_id": 1
}
```

**Update Item Request Body:**
```json
{
  "product_id": 1,
  "quantity": 3
}
```

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/` | List user's orders |
| GET | `/api/orders/{id}/` | Get order details |
| POST | `/api/orders/create_from_cart/` | Create order from cart |
| POST | `/api/orders/{id}/update_status/` | Update order status (admin only) |

**Update Status Request Body:**
```json
{
  "status": "shipped"
}
```

Valid statuses: `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

### Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews/` | List all reviews |
| GET | `/api/reviews/{id}/` | Get review details |
| POST | `/api/reviews/` | Create review |
| PUT | `/api/reviews/{id}/` | Update review |
| DELETE | `/api/reviews/{id}/` | Delete review |

**Create/Update Review Request Body:**
```json
{
  "product": 1,
  "rating": 5,
  "comment": "Great product!"
}
```

## Authentication

The API uses two authentication methods:

### JWT Token Authentication
1. Register or login to get a token
2. Include token in request header:
```
Authorization: Bearer <your_token_here>
```

### Session Authentication
- Login creates a session
- Session cookies are automatically handled

## Sample Data

The `populate_db` management command creates:
- 5 product categories
- 12 sample products
- 2 test users:
  - Admin: `username: admin, password: admin123`
  - Test User: `username: testuser, password: testpass123`

## Database Models

### Product
- id, name, price, image, description, category, stock
- is_featured, rating, reviews_count
- created_at, updated_at

### Category
- id, name, description
- created_at, updated_at

### Cart
- id, user, items
- created_at, updated_at

### CartItem
- id, cart, product, quantity
- added_at

### Review
- id, product, user, rating, comment
- created_at

### Order
- id, user, status, items, total_price
- created_at, updated_at

### OrderItem
- id, order, product, quantity, price

## Environment Variables

Create a `.env` file based on `.env.example`:

```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173

JWT_SECRET=your-jwt-secret-key
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

## CORS Configuration

By default, CORS is enabled for:
- `http://localhost:5173` (Vite frontend)
- `http://localhost:3000` (Alternative frontend)

Update `CORS_ALLOWED_ORIGINS` in `.env` for production.

## Running with Gunicorn (Production)

```bash
pip install gunicorn
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## Common Issues & Solutions

### Issue: "ModuleNotFoundError: No module named 'django'"
**Solution:** Ensure virtual environment is activated and requirements are installed:
```bash
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### Issue: "No such table" errors
**Solution:** Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

### Issue: CORS errors in frontend
**Solution:** Update `CORS_ALLOWED_ORIGINS` in `.env` and restart server

### Issue: Admin page not found
**Solution:** Collect static files:
```bash
python manage.py collectstatic --noinput
```

## Testing Endpoints with cURL

### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"newuser","email":"user@example.com","password":"testpass123","password2":"testpass123"}'
```

### Login User
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

### Get Products
```bash
curl http://localhost:8000/api/products/
```

### Search Products
```bash
curl "http://localhost:8000/api/products/search/?q=headphones&category=Electronics"
```

### Add to Cart (Authenticated)
```bash
curl -X POST http://localhost:8000/api/cart/add_item/ \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"product_id":1,"quantity":2}'
```

## Deployment

### Deploy to Heroku
```bash
heroku create your-app-name
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py populate_db
```

### Deploy to Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy with build command:
```
pip install -r requirements.txt && python manage.py migrate && python manage.py populate_db
```

### Deploy to DigitalOcean
See separate deployment guide for DigitalOcean App Platform

## Performance Optimization

- Pagination enabled (12 items per page by default)
- Database indexes on frequently queried fields
- Filter and search capabilities to reduce data load
- Image optimization recommended

## Security Considerations

- ✅ CORS properly configured
- ✅ JWT token-based authentication
- ✅ Admin-only access for sensitive endpoints
- ✅ SQL injection protection (using ORM)
- ⚠️ TODO: Add rate limiting for production
- ⚠️ TODO: Enable HTTPS in production
- ⚠️ TODO: Use environment-specific SECRET_KEY

## Contributing

1. Create a new branch for features
2. Follow PEP 8 style guide
3. Test all endpoints before submitting PR
4. Update documentation as needed

## License

MIT License

## Support

For issues or questions, please refer to the Django REST Framework documentation or contact the development team.
