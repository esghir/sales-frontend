import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../services/api';
import type { Product } from '../types';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await products.getAll();
        setFeaturedProducts(data.slice(0, 8)); // Show first 8 products as featured
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Slider Section */}
      <section className="slider">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div id="main-slider" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/img/carousel-1.jpg" className="d-block w-100" alt="Slider 1" />
                    <div className="carousel-caption">
                      <h2>Welcome to E-Shopper</h2>
                      <p>Your one-stop shop for all your needs</p>
                      <Link to="/shop" className="btn btn-primary">Shop Now</Link>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="/img/carousel-2.jpg" className="d-block w-100" alt="Slider 2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fa fa-truck"></i>
                <h3>Free Shipping</h3>
                <p>On all orders over $100</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fa fa-refresh"></i>
                <h3>Easy Returns</h3>
                <p>30 days return policy</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box">
                <i className="fa fa-lock"></i>
                <h3>Secure Payment</h3>
                <p>100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="title text-center">Featured Products</h2>
            </div>
          </div>
          <div className="row">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-md-3">
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-overlay">
                      <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="title text-center">Shop by Category</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="category-card">
                <img src="/img/cat-1.jpg" alt="Category 1" />
                <div className="category-info">
                  <h3>Electronics</h3>
                  <Link to="/shop?category=electronics" className="btn btn-primary">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="category-card">
                <img src="/img/cat-2.jpg" alt="Category 2" />
                <div className="category-info">
                  <h3>Fashion</h3>
                  <Link to="/shop?category=fashion" className="btn btn-primary">Shop Now</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="category-card">
                <img src="/img/cat-3.jpg" alt="Category 3" />
                <div className="category-info">
                  <h3>Home & Living</h3>
                  <Link to="/shop?category=home" className="btn btn-primary">Shop Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 