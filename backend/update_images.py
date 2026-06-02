import os
import django
import shutil
import glob

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from api.models import Product

# Mapping of product names to image artifact names
image_map = {
    'Wireless Headphones': 'wireless_headphones_*.png',
    'Laptop Stand': 'laptop_stand_*.png',
    'Mechanical Keyboard': 'mechanical_keyboard_*.png',
    'USB-C Cable': 'usbc_cable_*.png',
    'Cotton T-Shirt': 'cotton_tshirt_*.png',
    'Jeans': 'jeans_*.png',
    'Running Shoes': 'running_shoes_*.png',
    'Yoga Mat': 'yoga_mat_*.png',
    'Desk Lamp': 'desk_lamp_*.png',
    'Coffee Maker': 'coffee_maker_*.png',
    'Python Programming Book': 'python_book_*.png',
    'Web Development Book': 'web_dev_book_*.png',
}

artifact_dir = r"C:\Users\Lenovo\.gemini\antigravity\brain\c07c64b2-055a-415b-b42a-db90b4b2ed3c"
media_products_dir = os.path.join("media", "products")

if not os.path.exists(media_products_dir):
    os.makedirs(media_products_dir)

products = Product.objects.all()

for product in products:
    pattern = image_map.get(product.name)
    if pattern:
        search_path = os.path.join(artifact_dir, pattern)
        matches = glob.glob(search_path)
        if matches:
            src_file = matches[0]
            filename = os.path.basename(src_file)
            dst_file = os.path.join(media_products_dir, filename)
            
            # Copy file
            shutil.copy(src_file, dst_file)
            
            # Update product
            # Django ImageField expects relative path from MEDIA_ROOT
            product.image = f"products/{filename}"
            product.save()
            print(f"Updated {product.name} with {filename}")
        else:
            print(f"Image not found for {product.name}")

print("Done updating images.")
