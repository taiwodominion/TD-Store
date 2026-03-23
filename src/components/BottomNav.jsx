import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import '../css/BottomNav.css';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, favorites } = useApp();

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  }, [cartItems]);

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <Search size={22} />, label: 'Explore', path: '/products' },
    { 
      icon: <ShoppingBag size={22} />, 
      label: 'Cart', 
      path: '/cart', 
      count: totalCartCount 
    },
    { 
      icon: <Heart size={22} />, 
      label: 'Saved', 
      path: '/profile', 
      count: favorites.length 
    },
    { icon: <User size={22} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`bottom-nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <div className="nav-icon-container">
            {item.icon}
            {item.count > 0 && <span className="nav-count-dot">{item.count}</span>}
          </div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;