import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products] = useState([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      image: '/images/products/headphones.jpg',
      price: 129.99,
      originalPrice: 179.99,
      description: 'High-quality sound with noise cancellation',
      rating: 5,
      reviews: 234,
      badge: 'Sale'
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      image: '/images/products/smartwatch.jpg',
      price: 249.99,
      description: 'Advanced fitness tracking and notifications',
      rating: 4,
      reviews: 189,
    },
    {
      id: 3,
      name: 'Ultra HD Camera',
      image: '/images/products/camera.jpg',
      price: 599.99,
      originalPrice: 749.99,
      description: 'Professional grade 4K recording',
      rating: 5,
      reviews: 342,
      badge: '20%'
    },
    {
      id: 4,
      name: 'Portable Speaker',
      image: '/images/products/speaker.jpg',
      price: 79.99,
      description: 'Waterproof with amazing battery life',
      rating: 4,
      reviews: 567,
    },
    {
      id: 5,
      name: 'Laptop Stand',
      image: '/images/products/laptop-stand.jpg',
      price: 49.99,
      description: 'Ergonomic aluminum stand',
      rating: 5,
      reviews: 123,
      badge: 'New'
    },
    {
      id: 6,
      name: 'USB-C Hub',
      image: '/images/products/usb-hub.jpg',
      price: 39.99,
      originalPrice: 49.99,
      description: 'Multi-port connectivity hub',
      rating: 4,
      reviews: 98,
    },
    {
      id: 7,
      name: 'Mechanical Keyboard',
      image: '/images/products/keyboard.jpg',
      price: 149.99,
      description: 'RGB backlit mechanical keys',
      rating: 5,
      reviews: 456,
    },
    {
      id: 8,
      name: 'Mouse Pad XL',
      image: '/images/products/mousepad.jpg',
      price: 29.99,
      description: 'Large gaming mouse pad',
      rating: 4,
      reviews: 234,
    }
  ]);

  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');

  const handleViewDetails = (productId) => {
    console.log('View details for product:', productId);
  };

  const categories = ['all', 'electronics', 'accessories', 'audio', 'computing'];

  return (
    <main className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>
          <p className="text-gray-600">
            Discover our wide selection of quality products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={filterCategory === cat}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 text-gray-700 capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  className="w-full"
                />
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>$1000</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-3 flex items-center text-gray-700">
                        {[...Array(rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                        <span className="ml-2 text-sm">& up</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{products.length}</span> products
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => handleViewDetails(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
