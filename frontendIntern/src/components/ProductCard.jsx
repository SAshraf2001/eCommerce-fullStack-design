import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const fallbackImages = {
  1: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', // Headphones
  2: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80', // Laptop stand
  3: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80', // Keyboard
  4: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80', // USB cable
  5: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', // T-Shirt
  6: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80', // Jeans
  7: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', // Running shoes
  8: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80', // Yoga mat
  9: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80', // Desk lamp
  10: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80', // Coffee maker
  11: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', // Python book
  12: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', // Web dev book
};

export default function ProductCard({ product }) {
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
          src={product.image || fallbackImages[product.id] || `https://picsum.photos/seed/${product.id}/400/400`}
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
