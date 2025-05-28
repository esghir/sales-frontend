import React from 'react';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import type { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  cartItemCount: number;
  onLoginClick: () => void;
  onLogout: () => void;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  cartItemCount,
  onLoginClick,
  onLogout,
  onCartClick
}) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">E-Commerce Store</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {user.username}
                </span>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <LogOut size={24} />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 