import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, orderBy, query } from "firebase/firestore";
import "../css/Admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="admin-loading">Loading Orders...</div>;

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Customer Orders</h1>
        <p>Manage and track your store's sales</p>
      </div>

      <div className="content-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><code className="order-id-tag">#{order.id.slice(0, 8)}</code></td>
                <td>
                  <strong>{order.customer?.fullName}</strong><br />
                  <small>{order.customer?.email}</small>
                </td>
                <td>{order.items?.length} items</td>
                <td>${Number(order.totalAmount).toFixed(2)}</td>
                <td>
                  <span className={`status-badge ${order.status?.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;