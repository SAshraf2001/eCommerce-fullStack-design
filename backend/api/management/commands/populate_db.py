from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Category, Product, Cart


class Command(BaseCommand):
    help = 'Populate database with sample product data'

    def handle(self, *args, **options):
        # Create sample categories
        categories_data = [
            {'name': 'Electronics', 'description': 'Electronic devices and gadgets'},
            {'name': 'Clothing', 'description': 'Apparel and fashion items'},
            {'name': 'Home & Garden', 'description': 'Home furnishings and garden supplies'},
            {'name': 'Books', 'description': 'Physical and digital books'},
            {'name': 'Sports', 'description': 'Sports equipment and gear'},
        ]

        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Created category: {category.name}'))

        # Create sample products
        products_data = [
            {
                'name': 'Wireless Headphones',
                'price': 79.99,
                'description': 'High-quality wireless headphones with noise cancellation',
                'category': 'Electronics',
                'stock': 50,
                'is_featured': True,
                'rating': 4.5
            },
            {
                'name': 'Laptop Stand',
                'price': 49.99,
                'description': 'Adjustable aluminum laptop stand for better ergonomics',
                'category': 'Electronics',
                'stock': 35,
                'is_featured': True,
                'rating': 4.0
            },
            {
                'name': 'Mechanical Keyboard',
                'price': 129.99,
                'description': 'Premium mechanical keyboard with RGB lighting',
                'category': 'Electronics',
                'stock': 25,
                'is_featured': False,
                'rating': 4.7
            },
            {
                'name': 'USB-C Cable',
                'price': 12.99,
                'description': 'Durable USB-C charging and data transfer cable',
                'category': 'Electronics',
                'stock': 100,
                'is_featured': False,
                'rating': 4.2
            },
            {
                'name': 'Cotton T-Shirt',
                'price': 24.99,
                'description': 'Comfortable 100% organic cotton t-shirt',
                'category': 'Clothing',
                'stock': 80,
                'is_featured': True,
                'rating': 4.3
            },
            {
                'name': 'Jeans',
                'price': 59.99,
                'description': 'Classic blue denim jeans with a perfect fit',
                'category': 'Clothing',
                'stock': 45,
                'is_featured': False,
                'rating': 4.1
            },
            {
                'name': 'Running Shoes',
                'price': 99.99,
                'description': 'Professional running shoes with superior cushioning',
                'category': 'Sports',
                'stock': 30,
                'is_featured': True,
                'rating': 4.6
            },
            {
                'name': 'Yoga Mat',
                'price': 34.99,
                'description': 'Non-slip yoga mat for exercise and meditation',
                'category': 'Sports',
                'stock': 55,
                'is_featured': False,
                'rating': 4.4
            },
            {
                'name': 'Desk Lamp',
                'price': 39.99,
                'description': 'LED desk lamp with adjustable brightness',
                'category': 'Home & Garden',
                'stock': 40,
                'is_featured': True,
                'rating': 4.2
            },
            {
                'name': 'Coffee Maker',
                'price': 79.99,
                'description': 'Programmable coffee maker with thermal carafe',
                'category': 'Home & Garden',
                'stock': 20,
                'is_featured': False,
                'rating': 4.5
            },
            {
                'name': 'Python Programming Book',
                'price': 44.99,
                'description': 'Comprehensive guide to Python programming for beginners',
                'category': 'Books',
                'stock': 15,
                'is_featured': True,
                'rating': 4.8
            },
            {
                'name': 'Web Development Book',
                'price': 54.99,
                'description': 'Learn modern web development with HTML, CSS, and JavaScript',
                'category': 'Books',
                'stock': 12,
                'is_featured': False,
                'rating': 4.6
            },
        ]

        for prod_data in products_data:
            category = categories[prod_data.pop('category')]
            product, created = Product.objects.get_or_create(
                name=prod_data['name'],
                defaults={**prod_data, 'category': category}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✓ Created product: {product.name}'))

        # Create sample admin user
        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_superuser(
                username='admin',
                email='admin@ecommerce.com',
                password='admin123'
            )
            Cart.objects.create(user=admin_user)
            self.stdout.write(self.style.SUCCESS('✓ Created admin user (username: admin, password: admin123)'))

        # Create sample test user
        if not User.objects.filter(username='testuser').exists():
            test_user = User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpass123'
            )
            Cart.objects.create(user=test_user)
            self.stdout.write(self.style.SUCCESS('✓ Created test user (username: testuser, password: testpass123)'))

        self.stdout.write(self.style.SUCCESS('\n✓ Database populated successfully!'))
