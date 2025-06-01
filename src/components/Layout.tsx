import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      {/* Top bar */}
      <div className="top-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="top-bar-left">
                <div className="text">
                  <h2>Welcome to Our Store</h2>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="top-bar-right">
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="header-logo">
                <Link to="/">
                  <h1>E-Shopper</h1>
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="header-search">
                <form>
                  <input type="text" placeholder="Search" />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>
            <div className="col-md-3">
              <div className="header-cart">
                <Link to="/cart">
                  <i className="fa fa-shopping-cart"></i>
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Shop</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>About Us</h3>
              <p>Your trusted online shopping destination.</p>
            </div>
            <div className="col-md-4">
              <h3>Customer Service</h3>
              <ul>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/shipping">Shipping Information</Link></li>
                <li><Link to="/returns">Returns Policy</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Newsletter</h3>
              <form>
                <input type="email" placeholder="Enter your email" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 