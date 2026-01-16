import React, { useState } from 'react';
import AddProduct from './AddProduct';
import ManageProducts from './ManageProducts';
import '../css/Admin.css';

const AdminDashboard = ({ products }) => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="admin-page" style={{ marginTop: '80px' }}>
      <div className="container">
        <header className="admin-header">
          <h1>Store Management</h1>
          <div className="admin-tabs">
            <button 
              className={activeTab === 'add' ? 'active' : ''} 
              onClick={() => setActiveTab('add')}
            >
              Add New Product
            </button>
            <button 
              className={activeTab === 'manage' ? 'active' : ''} 
              onClick={() => setActiveTab('manage')}
            >
              Manage Products ({products.length})
            </button>
          </div>
        </header>

        <main className="admin-content">
          {activeTab === 'add' ? <AddProduct /> : <ManageProducts products={products} />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;