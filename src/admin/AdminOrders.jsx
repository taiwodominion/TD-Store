import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, updateDoc, doc, orderBy, query } from "firebase/firestore";
import { useApp } from "../contexts/AppContext";
import { Eye, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import "../css/Admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useApp();

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      showToast("Failed to load orders", "error");
      setLoading(false);
    });

    return () => unsubscribe();
  }, [showToast]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      showToast(`Order status updated to ${newStatus}`, "success");
    } catch (error) {
      showToast("Failed to update status", "error");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock size={14} />;
      case 'Shipped': return <Truck size={14} />;
      case 'Delivered': return <CheckCircle size={14} />;
      case 'Cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  if (loading) return (
    <div className="admin-loader-container">
      <div className="simple-loader"></div>
      <p>Fetching Orders...</p>
    </div>
  );

  return (
    <div className="orders-section">
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order Details</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="order-info">
                      <span className="order-id">#{order.id.slice(-6).toUpperCase()}</span>
                      <span className="order-date">
                        {order.createdAt?.toDate ? 
                          order.createdAt.toDate().toLocaleDateString() : 
                          'Recent'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <p className="customer-name">{order.customer?.fullName || "Guest User"}</p>
                      <p className="customer-email">{order.customer?.email}</p>
                    </div>
                  </td>
                  <td>
                    <div className="amount-cell">
                      <span className="total-amt">${Number(order.totalAmount || 0).toFixed(2)}</span>
                      <span className="item-count">{order.items?.length} items</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill ${order.status?.toLowerCase()}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-cell">
                      <select 
                        value={order.status} 
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="status-dropdown"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-table">No orders found yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;