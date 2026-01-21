import React, { useState } from "react";
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const ManageProducts = ({ products, showToast }) => {
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteDoc(doc(db, "products", id));
        showToast("Product deleted successfully");
      } catch (err) {
        showToast(err.message, "error");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "products", editingProduct.id);
      await updateDoc(productRef, {
        name: editingProduct.name,
        price: parseFloat(editingProduct.price),
        category: editingProduct.category,
      });
      showToast("Inventory updated!");
      setEditingProduct(null);
    } catch (err) {
      showToast("Update failed", "error");
    }
  };

  return (
    <div className="manage-wrapper">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image} className="admin-thumb" alt="" /></td>
              <td style={{ fontWeight: '600' }}>{product.name}</td>
              <td className="capitalize">{product.category}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>
                <button className="btn-edit" onClick={() => setEditingProduct(product)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(product.id, product.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <div className="modal-overlay">
          <div className="edit-modal-card">
            <h2 style={{ marginBottom: '20px' }}>Edit Product Details</h2>
            <form onSubmit={handleUpdate} className="admin-form">
              <div className="form-group">
                <label>Product Name</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={editingProduct.category} onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}>
                    <option value="clothes">Clothes</option>
                    <option value="shoes">Shoes</option>
                    <option value="bags">Bags</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">Update Item</button>
                <button type="button" className="btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;