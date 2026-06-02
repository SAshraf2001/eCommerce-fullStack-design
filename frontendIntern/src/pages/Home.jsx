import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productsAPI.getFeatured();
        setProducts(response.data.results || response.data);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopHub</h1>
          <p className="text-lg md:text-xl mb-6 text-blue-100">
            Discover amazing products with unbeatable prices
          </p>
          <a href="/products" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Shop Now
          </a>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Featured Products</h2>

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
