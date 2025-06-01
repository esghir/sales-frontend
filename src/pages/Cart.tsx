import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { CartItem } from '../types';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userId = parseInt(localStorage.getItem('userId') || '0');
        
        if (!token || !userId) {
          navigate('/login');
          return;
        }

        const data = await api.getCart(userId, token);
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
      const token = localStorage.getItem('token');
      const userId = parseInt(localStorage.getItem('userId') || '0');
      
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      await api.updateCartItem(userId, productId, newQuantity, token);
      setCartItems(items =>
        items.map(item =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeItem = async (productId: number) => {
    try {
      const token = localStorage.getItem('token');
      const userId = parseInt(localStorage.getItem('userId') || '0');
      
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      await api.removeFromCart(userId, productId, token);
      setCartItems(items => items.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = parseInt(localStorage.getItem('userId') || '0');
      
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      await api.clearCart(userId, token);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h2 className="title text-center">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <p>Your cart is empty</p>
            <button
              onClick={() => navigate('/shop')}
              className="btn btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="product-info">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="product-image"
                          />
                          <span className="product-name">
                            {item.product.name}
                          </span>
                        </div>
                      </td>
                      <td>${item.product.price}</td>
                      <td>
                        <div className="quantity-selector">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                            className="btn btn-outline-secondary"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="btn btn-outline-secondary"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <div className="row">
                <div className="col-md-6">
                  <button
                    onClick={clearCart}
                    className="btn btn-outline-danger"
                  >
                    Clear Cart
                  </button>
                </div>
                <div className="col-md-6 text-end">
                  <div className="total">
                    <h3>Total: ${total.toFixed(2)}</h3>
                  </div>
                  <button
                    onClick={() => navigate('/checkout')}
                    className="btn btn-primary btn-lg"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 