import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    inStock: true,
    onSale: false,
    originalPrice: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        createdAt: new Date()
      });
      alert("Product added successfully!");
      setFormData({ name: "", price: "", category: "", image: "", description: "", inStock: true, onSale: false, originalPrice: "" });
    } catch (err) {
      alert("Error adding product: " + err.message);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Price ($)</label>
          <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} required>
            <option value="">Select Category</option>
            <option value="clothes">Clothes</option>
            <option value="shoes">Shoes</option>
            <option value="bags">Bags</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label>Image URL</label>
        <input type="text" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="4"></textarea>
      </div>
      <button type="submit" className="admin-btn-primary">Upload Product</button>
    </form>
  );
};

export default AddProduct;