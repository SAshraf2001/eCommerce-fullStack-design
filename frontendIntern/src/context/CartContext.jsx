import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI, productsAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      setError('Please login to add items to cart');
      return { success: false };
    }

    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.addItem({ product_id: productId, quantity });
      setCart(response.data);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to add item to cart';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return { success: false };

    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.removeItem({ product_id: productId });
      setCart(response.data);
      return { success: true };
    } catch (err) {
      setError('Failed to remove item from cart');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (!isAuthenticated) return { success: false };

    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.updateItem({ product_id: productId, quantity });
      setCart(response.data);
      return { success: true };
    } catch (err) {
      setError('Failed to update cart item');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return { success: false };

    try {
      setLoading(true);
      setError(null);
      const response = await cartAPI.clear();
      setCart(response.data);
      return { success: true };
    } catch (err) {
      setError('Failed to clear cart');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const getCartCount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartCount,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
