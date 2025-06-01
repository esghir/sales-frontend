import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fallbackImages = [
    '/img/product-1.jpg',
    '/img/product-2.jpg',
    '/img/product-3.jpg',
    '/img/product-4.jpg',
    '/img/product-5.jpg',
    '/img/product-6.jpg',
    '/img/product-7.jpg',
    '/img/product-8.jpg',
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await api.getProduct(parseInt(id));
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const userId = parseInt(localStorage.getItem('userId') || '0');
      await api.addToCart(userId, product.id, quantity, token);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  const isPlaceholder = !product.image || product.image.includes('placeholder');
  const imgSrc = isPlaceholder ? fallbackImages[(product.id - 1) % fallbackImages.length] : product.image;

  return (
    <div className="product-detail">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="product-image">
              <img src={imgSrc} alt={product.name} className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="price">${product.price}</div>
              <div className="description">
                <p>{product.description}</p>
              </div>
              <div className="quantity">
                <label>Quantity:</label>
                <div className="quantity-selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="btn btn-outline-secondary"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="btn btn-outline-secondary"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg add-to-cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="row mt-5">
          <div className="col-md-12">
            <ul className="nav nav-tabs" id="productTabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="description-tab"
                  data-bs-toggle="tab"
                  href="#description"
                  role="tab"
                >
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="specifications-tab"
                  data-bs-toggle="tab"
                  href="#specifications"
                  role="tab"
                >
                  Specifications
                </a>
              </li>
            </ul>
            <div className="tab-content" id="productTabsContent">
              <div
                className="tab-pane fade show active"
                id="description"
                role="tabpanel"
              >
                <p>{product.description}</p>
              </div>
              <div
                className="tab-pane fade"
                id="specifications"
                role="tabpanel"
              >
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Category</th>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>${product.price}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 