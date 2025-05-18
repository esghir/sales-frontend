import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        {/* Product details will be rendered here */}
        <h2>Product Details</h2>
        <p>Product ID: {id}</p>
      </div>
    </div>
  );
};

export default ProductDetail; 