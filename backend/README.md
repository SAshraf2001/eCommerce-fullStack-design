content = """# Django E-Commerce Backend API

A REST API backend for an e-commerce platform built with Django and Django REST Framework (DRF). It includes user authentication, product management, shopping cart functionality, and order processing.

## 🚀 Quick Start

### 1. Prerequisites
* Python 3.8+
* pip

### 2. Installation & Setup

Open your terminal and run the following commands to get the server running locally:

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Populate database with sample data (Categories, Products, Test Users)
python manage.py populate_db

# Start the development server
python manage.py runserver
