# Quick Start Guide - E-Commerce Project

## ✅ Backend Setup COMPLETE

Your backend is now running at **http://localhost:8000**

### Verification
- API Endpoint: http://localhost:8000/api/products/
- Admin Panel: http://localhost:8000/admin
  - Username: `admin`
  - Password: `admin123`

### Database
✅ Migrations applied
✅ 12 sample products created
✅ 5 categories created
✅ Admin and test users created

---

## 🚀 Start Frontend (New Terminal)

```bash
cd /home/sharjeel/Desktop/internship_projects/frontendIntern

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run at **http://localhost:5173**

---

## 🔑 Test Users

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `testuser`
- Password: `testpass123`

---

## 📋 What's Working

✅ Backend Django API (40+ endpoints)
✅ Database with sample data
✅ Authentication system (JWT)
✅ Shopping cart functionality
✅ Product search and filtering
✅ Admin panel
✅ CORS configured

---

## 📊 Sample Data Loaded

**Categories:**
- Electronics
- Clothing
- Home & Garden
- Books
- Sports

**Products:**
- 12 sample products across categories
- Each with price, image, description, stock
- Some featured products

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000/api |
| Admin Panel | http://localhost:8000/admin |
| Products API | http://localhost:8000/api/products/ |

---

## ⚙️ Backend Activation Command

If you restart your terminal, always activate the environment first:

```bash
cd /home/sharjeel/Desktop/internship_projects/backend
source ../myEnv/bin/activate
python manage.py runserver
```

---

## 🐛 Troubleshooting

**Backend won't start?**
- Make sure you're in `/backend` directory
- Activate virtual environment: `source ../myEnv/bin/activate`
- Check if port 8000 is available

**Frontend not loading?**
- Ensure backend is running
- Run `npm install` first
- Check `.env.local` has: `VITE_API_URL=http://localhost:8000/api`

**Products not showing?**
- Database was populated automatically ✓
- Check if migrations ran successfully

---

## 📝 Environment Files

**Backend `.env`:**
- Located at `/backend/.env`
- Already configured with SQLite

**Frontend `.env.local`:**
- Located at `/frontendIntern/.env.local`
- Already configured with API URL

---

## ✨ Next Steps

1. Open http://localhost:5173 in browser
2. Browse products on Home/Products pages
3. Register a new account or login with testuser/testpass123
4. Add products to cart
5. Proceed to checkout
6. Access admin panel at http://localhost:8000/admin

---

**Project is fully set up and ready to use! 🎉**
