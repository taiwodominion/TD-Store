// import React, { useState } from 'react';
// import AddAdminProduct from './AddAdminProduct';
// import ManageProducts from './ManageProducts';
// import '../css/Admin.css';

// const AdminDashboard = ({ products, showToast }) => {
//   const [activeTab, setActiveTab] = useState('manage');

//   return (
//     <div className="admin-page">
//       <aside className="admin-sidebar">
//         <div className="admin-logo">DASHBOARD</div>
//         <button className={`nav-item ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>
//           📦 Manage Products
//         </button>
//         <button className={`nav-item ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
//           ➕ Add New Product
//         </button>
//       </aside>

//       <main className="admin-main">
//         <header className="admin-header">
//           <h1>{activeTab === 'manage' ? 'Inventory Management' : 'Create Product'}</h1>
//         </header>

//         <section className="stats-container">
//           <div className="stat-card">
//             <p>Active Items</p>
//             <h2>{products.length}</h2>
//           </div>
//           <div className="stat-card">
//             <p>Out of Stock</p>
//             <h2>{products.filter(p => !p.inStock).length}</h2>
//           </div>
//         </section>

//         <div className="content-card">
//           {activeTab === 'add' ? 
//             <AddAdminProduct showToast={showToast} /> : 
//             <ManageProducts products={products} showToast={showToast} />
//           }
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import AddAdminProduct from './AddAdminProduct';
import ManageProducts from './ManageProducts';
import AdminOrders from './AdminOrders';
import { db } from "../firebase";
import { collection, onSnapshot } from 'firebase/firestore';
import '../css/Admin.css';

const AdminDashboard = ({ products, showToast }) => {
  const [activeTab, setActiveTab] = useState('manage');
  const [orderStats, setOrderStats] = useState({ totalRevenue: 0, count: 0 });

  // Real-time stats listener
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

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-logo">DASHBOARD</div>
        
        <button className={`nav-item ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>
          📦 Manage Products
        </button>
        
        <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
          🛍️ Customer Orders
        </button>

        <button className={`nav-item ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
          ➕ Add New Product
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>
            {activeTab === 'manage' && 'Inventory Management'}
            {activeTab === 'orders' && 'Order Fulfillment'}
            {activeTab === 'add' && 'Create Product'}
          </h1>
        </header>

        <section className="stats-container">
          <div className="stat-card">
            <p>Active Items</p>
            <h2>{products.length}</h2>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #50cd89' }}>
            <p>Total Revenue</p>
            <h2>${orderStats.totalRevenue.toFixed(2)}</h2>
          </div>
          <div className="stat-card" style={{ borderLeft: '4px solid #3699ff' }}>
            <p>Total Orders</p>
            <h2>{orderStats.count}</h2>
          </div>
        </section>

        <div className="content-card">
          {activeTab === 'add' && <AddAdminProduct showToast={showToast} />}
          {activeTab === 'manage' && <ManageProducts products={products} showToast={showToast} />}
          {activeTab === 'orders' && <AdminOrders />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;