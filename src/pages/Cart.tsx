import React from 'react';

const Cart: React.FC = () => {
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {/* Cart items will be rendered here */}
      </div>
      <div className="cart-summary">
        {/* Cart summary and checkout button will be here */}
      </div>
    </div>
  );
};

export default Cart; 