import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI.getById(id)
      .then(res => setProduct(res.data))
      .finally(() => setLoading(false))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    addToCart({ product_id: product.id, quantity });
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow">
          <div>
            <img src={product.image} alt={product.name} className="w-full rounded-lg" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-yellow-400">
                {'★'.repeat(Math.round(product.rating || 4))}
              </div>
              <span className="text-gray-600">({product.reviews_count || 0} reviews)</span>
            </div>

            <div className="text-4xl font-bold text-blue-600 mb-6">${product.price}</div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className={product.stock > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <label className="block mb-3">Quantity:</label>
              <div className="flex gap-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 border rounded">−</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center border rounded" />
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 border rounded">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold"
            >
              {isAuthenticated ? 'Add to Cart' : 'Login to Purchase'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
