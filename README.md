# ShopHub - Full-Stack E-commerce Platform

ShopHub is a modern, responsive full-stack e-commerce application built with a powerful Django REST Framework backend and a dynamic React/Vite frontend. It features secure user authentication, product management, a shopping cart, and a seamless shopping experience.

## 🚀 Features

- **User Authentication:** Secure JWT-based login, registration, and user profiles.
- **Product Catalog:** Browse featured products and detailed product pages with high-quality images.
- **Shopping Cart:** Add, remove, and adjust item quantities in a persistent shopping cart.
- **Responsive UI:** Beautiful, modern interface built with Tailwind CSS that works flawlessly on desktop and mobile.
- **RESTful API:** Robust Django backend serving clean, structured JSON data.

## 🛠️ Technology Stack

### Backend
- **Framework:** Django 4.2 & Django REST Framework
- **Database:** SQLite (Default for development)
- **Authentication:** PyJWT (Custom JSON Web Token implementation)
- **CORS Management:** django-cors-headers

### Frontend
- **Framework:** React 18 & Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios

## 📂 Project Structure

```text
internProject/
├── backend/                  # Django Backend Application
│   ├── api/                  # Core API logic, views, serializers, models
│   ├── config/               # Django settings and URL configurations
│   ├── media/                # Uploaded and generated product images
│   ├── manage.py             # Django execution script
│   └── requirements.txt      # Python dependencies
├── frontendIntern/           # React Frontend Application
│   ├── src/                  # React components, pages, contexts, and services
│   ├── public/               # Static assets
│   ├── package.json          # Node.js dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.js        # Vite bundler configuration
├── start.bat                 # Windows execution script for quick start
└── README.md                 # This file
```

## ⚙️ Setup & Installation

### Prerequisites
- [Python 3.10+](https://www.python.org/)
- [Node.js 18+](https://nodejs.org/)

### 1. Backend Setup
Navigate to the `backend` directory and set up the Python environment:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
```

**Populate the Database with Sample Data:**
```bash
python manage.py populate_db
```
*(This will generate 12 dummy products and create a test account: `testuser` / `testpass123`)*

### 2. Frontend Setup
Navigate to the `frontendIntern` directory and install the Node packages:
```bash
cd ../frontendIntern
npm install
```

## 🏃‍♂️ Running the Application (Local Development)

The easiest way to run the application on Windows is to use the included batch script from the root directory:

```bash
# From the internProject root directory:
start.bat
```
This script will automatically open two terminal windows: one running the Django API on `localhost:8000` and the other running the React frontend on `localhost:5173`.

Alternatively, you can run them manually:
- **Backend:** `cd backend` -> `venv\Scripts\activate` -> `python manage.py runserver`
- **Frontend:** `cd frontendIntern` -> `npm run dev`

## 🔒 Default Test Accounts
- **Admin User:** `admin` / `admin123`
- **Standard User:** `testuser` / `testpass123`

## 📝 API Endpoints

- `POST /api/auth/login/`: Retrieve a JWT token
- `POST /api/auth/register/`: Register a new user
- `GET /api/products/`: List all products
- `GET /api/products/featured/`: List featured products
- `GET /api/cart/my_cart/`: Retrieve the active user's cart
