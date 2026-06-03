import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';

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

export default function Cart() {
  const { cart, loading, removeFromCart, updateCartItem, clearCart, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  if (!isAuthenticated) {
    return (
      <main className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
            <p className="text-gray-600 mb-6">Please log in to view your cart</p>
            <Link to="/login" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center">Loading cart...</p>
        </div>
      </main>
    );
  }

  const cartItems = cart?.items || [];
  const subtotal = parseFloat(cart?.total_price || 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity > 0) {
      await updateCartItem(productId, newQuantity);
    }
  };

  const handleCheckout = async () => {
    try {
      await ordersAPI.createFromCart();
      alert('Order created successfully!');
      navigate('/');
    } catch (error) {
      alert('Error creating order: ' + (error.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-11-8h16m-9 4a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="hidden sm:grid sm:grid-cols-5 gap-4 p-6 border-b font-semibold text-gray-900">
                  <div className="sm:col-span-2">Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div className="text-right">Total</div>
                </div>

                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-start">
                        <div className="sm:col-span-2 flex gap-4">
                          <img
                            src={item.product.image || fallbackImages[item.product.id] || `https://picsum.photos/seed/${item.product.id}/400/400`}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => handleRemoveItem(item.product.id)}
                              className="text-sm text-red-600 hover:text-red-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-gray-900 font-semibold">
                          ${item.product.price}
                        </div>

                        <div>
                          <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                              className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                            />
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="text-right text-gray-900 font-semibold">
                          ${item.total_price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t">
                  <button
                    onClick={async () => {
                      if (confirm('Clear entire cart?')) {
                        await clearCart();
                      }
                    }}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-sm text-green-600">✓ Qualifies for free shipping</p>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition mb-3"
                >
                  Checkout
                </button>

                <Link
                  to="/products"
                  className="block text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
