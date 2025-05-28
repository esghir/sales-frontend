import React, { useState } from 'react';
import { Minus, Plus, Edit, Trash2 } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isAdmin,
  onEdit,
  onDelete
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-green-600">${product.price}</span>
        </div>
        
        {!isAdmin ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Qty:</span>
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 py-1">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <button
              onClick={() => onAddToCart(product.id, quantity)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 flex items-center justify-center"
            >
              <Edit size={16} className="mr-1" /> Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center"
            >
              <Trash2 size={16} className="mr-1" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 