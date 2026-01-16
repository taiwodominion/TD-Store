import React from "react";
import { db } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const ManageProducts = ({ products }) => {
  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteDoc(doc(db, "products", id));
        alert("Product deleted!");
      } catch (err) {
        alert("Error deleting: " + err.message);
      }
    }
  };

  return (
    <div className="manage-products-table">
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
              <td><img src={product.image} alt="" className="admin-thumb" /></td>
              <td>{product.name}</td>
              <td className="capitalize">{product.category}</td>
              <td>${Number(product.price).toFixed(2)}</td>
              <td>
                <button 
                  className="btn-delete" 
                  onClick={() => handleDelete(product.id, product.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;