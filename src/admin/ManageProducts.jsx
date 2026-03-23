import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useApp } from "../contexts/AppContext";
import { Edit3, Trash2, X, Save } from "lucide-react";
import "../css/Admin.css";

const ManageProducts = () => {
  const { allProducts, showToast } = useApp();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Permanently delete "${name}" from inventory?`)) {
      try {
        await deleteDoc(doc(db, "products", id));
        showToast("Product removed successfully", "success");
      } catch (err) {
        showToast("Delete failed: " + err.message, "error");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, {
        name: editingProduct.name,
        price: parseFloat(editingProduct.price),
        category: editingProduct.category,
      });
      showToast("Inventory updated!", "success");
      setEditingProduct(null);
    } catch (err) {
      showToast("Update failed", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="manage-products-container">
      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} className="admin-product-thumb" alt={product.name} />
                </td>
                <td>
                  <span className="product-table-name">{product.name}</span>
                </td>
                <td>
                  <span className="category-tag">{product.category}</span>
                </td>
                <td>
                  <span className="product-table-price">${Number(product.price).toFixed(2)}</span>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="icon-btn edit" onClick={() => setEditingProduct(product)}>
                      <Edit3 size={18} />
                    </button>
                    <button className="icon-btn delete" onClick={() => handleDelete(product.id, product.name)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingProduct && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="modal-header">
              <h3>Edit Product</h3>
              <button className="close-modal" onClick={() => setEditingProduct(null)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="admin-form">
              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name} 
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} 
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={editingProduct.price} 
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} 
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    value={editingProduct.category} 
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  >
                    <option value="clothes">Clothes</option>
                    <option value="shoes">Shoes</option>
                    <option value="bags">Bags</option>
                    <option value="electronics">Electronics</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="secondary-btn" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;