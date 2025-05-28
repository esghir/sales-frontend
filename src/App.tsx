import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Package, LogOut, Plus } from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';
import { AuthModal } from './components/AuthModal';
import { Cart } from './components/Cart';
import { Orders } from './components/Orders';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { api } from './services/api';
import type { Product } from './types';

// Mock data for demonstration
const mockProducts: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, image: 'https://via.placeholder.com/300x200?text=Headphones', description: 'High-quality wireless headphones with noise cancellation.' },
  { id: 2, name: 'Smart Watch', price: 299.99, image: 'https://via.placeholder.com/300x200?text=Smart+Watch', description: 'Feature-rich smartwatch with health tracking.' },
  { id: 3, name: 'Laptop Stand', price: 49.99, image: 'https://via.placeholder.com/300x200?text=Laptop+Stand', description: 'Ergonomic laptop stand for better posture.' },
  { id: 4, name: 'Bluetooth Speaker', price: 79.99, image: 'https://via.placeholder.com/300x200?text=Speaker', description: 'Portable Bluetooth speaker with excellent sound quality.' }
];

const ECommerceApp: React.FC = () => {
  const { user, token, cart, login, logout, updateCart } = useAppContext();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' as 'login' | 'register' });
  const [cartModal, setCartModal] = useState(false);
  const [ordersModal, setOrdersModal] = useState(false);
  const [productModal, setProductModal] = useState<{ isOpen: boolean; product: Product | null }>({ isOpen: false, product: null });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === 'admin' || user.username === 'admin');
      updateCart();
    }
  }, [user, updateCart]);

  const addToCart = async (productId: number, quantity: number) => {
    if (!user) {
      setAuthModal({ isOpen: true, mode: 'login' });
      return;
    }

    try {
      await api.addToCart(user.id, productId, quantity, token!);
      updateCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const saveProduct = async (productData: Product) => {
    try {
      if (productData.id) {
        const updatedProduct = await api.updateProduct(productData.id, productData, token!);
        setProducts(products.map(p => p.id === productData.id ? updatedProduct : p));
      } else {
        const newProduct = await api.createProduct(productData, token!);
        setProducts([...products, { ...newProduct, id: Date.now() }]);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
    setProductModal({ isOpen: false, product: null });
  };

  const deleteProduct = async (productId: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await api.deleteProduct(productId, token!);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">ElectroStore</h1>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Welcome, {user.username}!</span>
                  {isAdmin && (
                    <button
                      onClick={() => setProductModal({ isOpen: true, product: null })}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <Plus size={16} className="mr-1" /> Add Product
                    </button>
                  )}
                  <button
                    onClick={() => setOrdersModal(true)}
                    className="relative p-2 text-gray-700 hover:text-gray-900"
                  >
                    <Package size={24} />
                  </button>
                  <button
                    onClick={() => setCartModal(true)}
                    className="relative p-2 text-gray-700 hover:text-gray-900"
                  >
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-gray-900 p-2"
                  >
                    <LogOut size={24} />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <User size={16} className="mr-2" /> Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our latest collection of premium electronics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              isAdmin={isAdmin}
              onEdit={(product) => setProductModal({ isOpen: true, product })}
              onDelete={deleteProduct}
            />
          ))}
        </div>
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        mode={authModal.mode}
        onModeChange={(mode) => setAuthModal({ isOpen: true, mode })}
      />

      <Cart
        isOpen={cartModal}
        onClose={() => setCartModal(false)}
      />

      <Orders
        isOpen={ordersModal}
        onClose={() => setOrdersModal(false)}
      />

      <ProductModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, product: null })}
        product={productModal.product}
        onSave={saveProduct}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <ECommerceApp />
    </AppProvider>
  );
};

export default App;
