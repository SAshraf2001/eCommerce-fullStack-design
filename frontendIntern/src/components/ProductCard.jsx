import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function ProductCard({ product, onViewDetails }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const result = await addToCart(product.id, 1);
    if (result.success) {
      alert('Product added to cart!');
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full bg-gray-100 aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mt-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews_count || 0})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
        </div>

        {product.stock === 0 && (
          <div className="mt-4 bg-red-100 text-red-700 p-2 rounded text-center font-semibold">
            Out of Stock
          </div>
        )}

        {product.stock > 0 && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors duration-200"
            >
              View Details
            </button>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
