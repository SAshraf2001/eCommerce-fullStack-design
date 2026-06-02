import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { productsAPI, categoriesAPI } from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('-created_at');

  useEffect(() => {
    categoriesAPI.getAll().then(res => setCategories(res.data.results || res.data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      setLoading(true);
      const params = { search: searchQuery, ordering: sortBy };
      if (selectedCategory) params.category = selectedCategory;
      
      try {
        const res = await productsAPI.getAll(params);
        if (!ignore) setProducts(res.data.results || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProducts();
    return () => { ignore = true; };
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Search</h3>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <h3 className="font-semibold mt-6 mb-4">Categories</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" checked={selectedCategory === ''} onChange={() => setSelectedCategory('')} className="mr-2" />
                All
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center">
                  <input type="radio" checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className="mr-2" />
                  {cat.name}
                </label>
              ))}
            </div>

            <h3 className="font-semibold mt-6 mb-4">Sort</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
              <option value="-created_at">Newest</option>
              <option value="price">Price Low</option>
              <option value="-price">Price High</option>
              <option value="-rating">Top Rated</option>
            </select>
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
