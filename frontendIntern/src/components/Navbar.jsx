import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">ShopHub</Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Products
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden sm:inline-flex text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-11-8h16m-9 4a1 1 0 11-2 0 1 1 0 012 0zm9 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center space-x-4 ml-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Hi, {user?.username}</span>
                  <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-red-600 font-medium transition">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm text-gray-700 hover:text-blue-600 font-medium transition">
                    Login
                  </Link>
                  <Link to="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden text-gray-700 hover:text-blue-600 ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 py-2">
              Home
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-blue-600 py-2">
              Products
            </Link>
            {isAuthenticated ? (
              <>
                <span className="block text-gray-700 py-2 font-medium">Hi, {user?.username}</span>
                <button onClick={handleLogout} className="block text-red-600 hover:text-red-800 py-2 w-full text-left">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-700 hover:text-blue-600 py-2">
                  Login
                </Link>
                <Link to="/register" className="block text-gray-700 hover:text-blue-600 py-2">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
