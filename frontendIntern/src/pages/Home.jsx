import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
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
    }
  ]);

  const handleViewDetails = (productId) => {
    console.log('View details for product:', productId);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to ShopHub
              </h1>
              <p className="text-lg md:text-xl mb-6 text-blue-100">
                Discover amazing products with unbeatable prices and fast shipping.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <a
                  href="/products"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
                >
                  Shop Now
                </a>
                <a
                  href="#"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/images/products/shopping-hero.jpg"
                alt="Shopping"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg">
              Check out our best-selling items this month
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => handleViewDetails(product.id)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% safe & secure</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Dedicated customer care</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-blue-100">Get exclusive deals and updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
