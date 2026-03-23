import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, PlusCircle, LayoutDashboard, DollarSign, ListOrdered } from 'lucide-react';
import AddAdminProduct from './AddAdminProduct';
import ManageProducts from './ManageProducts';
import AdminOrders from './AdminOrders';
import { db } from "../firebase";
import { collection, onSnapshot } from 'firebase/firestore';
import { useApp } from "../contexts/AppContext";
import '../css/Admin.css';

const AdminDashboard = () => {
  const { allProducts, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('manage');
  const [orderStats, setOrderStats] = useState({ totalRevenue: 0, count: 0 });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      let revenue = 0;
      snapshot.forEach((doc) => {
        revenue += Number(doc.data().totalAmount || 0);
      });
      setOrderStats({
        totalRevenue: revenue,
        count: snapshot.size
      });
    });
    return () => unsubscribe();
  }, []);

  const activeItemCount = allProducts ? allProducts.length : 0;

  const sidebarItems = [
    { id: 'manage', label: 'Manage Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Customer Orders', icon: <ListOrdered size={20} /> },
    { id: 'add', label: 'Add New Product', icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <LayoutDashboard size={24} />
          <span>Admin Panel</span>
        </div>
        
        <nav className="sidebar-nav">
          {sidebarItems.map((item) => (
            <button 
              key={item.id}
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`} 
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-content">
        <header className="content-header">
          <div className="header-title">
            <p>Overview</p>
            <h1>
              {activeTab === 'manage' && 'Inventory Management'}
              {activeTab === 'orders' && 'Order Fulfillment'}
              {activeTab === 'add' && 'Create Product'}
            </h1>
          </div>
        </header>

        <section className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-icon items"><Package size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">Active Items</span>
              <h2 className="stat-value">{activeItemCount}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon revenue"><DollarSign size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">Total Revenue</span>
              <h2 className="stat-value">${orderStats.totalRevenue.toLocaleString()}</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-icon orders"><ShoppingCart size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">Total Orders</span>
              <h2 className="stat-value">{orderStats.count}</h2>
            </div>
          </div>
        </section>

        <div className="admin-view-container">
          {activeTab === 'add' && <AddAdminProduct showToast={showToast} />}
          {activeTab === 'manage' && <ManageProducts products={allProducts || []} showToast={showToast} />}
          {activeTab === 'orders' && <AdminOrders />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;