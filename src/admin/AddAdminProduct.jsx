import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import '../css/Admin.css'

const AddAdminProduct = ({ showToast }) => {
  console.log("Is showToast a function?", typeof showToast);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    inStock: true,
    onSale: false,
    originalPrice: ""
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageFile) {
      showToast("Please select an image!", "error");
      return;
    }
    
    setLoading(true);
    try {
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: imageData,
      });

      const result = await response.json();
      
      if (!result.success) throw new Error("Image upload failed");

      const downloadURL = result.data.url;

      await addDoc(collection(db, "products"), {
        ...formData,
        image: downloadURL, 
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        createdAt: new Date()
      });

      showToast(`${formData.name} added to store!`, "success");

      // Reset form
      setFormData({ name: "", price: "", category: "", description: "", inStock: true, onSale: false, originalPrice: "" });
      setImageFile(null);
      e.target.reset(); 
    } catch (err) {
      showToast("Error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
       {/* ... rest of your form JSX remains exactly the same ... */}
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
        <label>Product Image</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImageFile(e.target.files[0])} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="4"></textarea>
      </div>

      <button type="submit" className="admin-btn-primary" disabled={loading}>
        {loading ? "Uploading to Cloud..." : "Upload Product"}
      </button>
    </form>
  );
};

export default AddAdminProduct;