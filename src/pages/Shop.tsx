import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import type { Product } from '../types';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div className="shop-page">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="sidebar">
              <h3>Categories</h3>
              <ul className="category-list">
                <li>
                  <Link to="/shop" className={!category ? 'active' : ''}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=electronics" className={category === 'electronics' ? 'active' : ''}>
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=fashion" className={category === 'fashion' ? 'active' : ''}>
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=home" className={category === 'home' ? 'active' : ''}>
                    Home & Living
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-md-9">
            <div className="products-header">
              <h2>{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}</h2>
            </div>

            {loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <div className="row">
                {filteredProducts.map((product, idx) => {
                  // Use eshopper images if product.image is missing or a placeholder
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
                  const isPlaceholder = !product.image || product.image.includes('placeholder');
                  const imgSrc = isPlaceholder ? fallbackImages[idx % fallbackImages.length] : product.image;
                  return (
                    <div key={product.id} className="col-md-4">
                      <div className="product-card">
                        <div className="product-image">
                          <img src={imgSrc} alt={product.name} />
                          <div className="product-overlay">
                            <Link to={`/product/${product.id}`} className="btn btn-primary">
                              View Details
                            </Link>
                          </div>
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p className="price">${product.price}</p>
                          <p className="description">{product.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop; 