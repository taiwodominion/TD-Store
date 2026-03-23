import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useApp } from "../contexts/AppContext";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import '../css/Admin.css';

const AddAdminProduct = () => {
  const { showToast } = useApp();
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
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

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
        createdAt: new Date(),
        rating: 5,
        reviews: 0
      });

      showToast(`${formData.name} added successfully!`, "success");

      setFormData({ name: "", price: "", category: "", description: "", inStock: true, onSale: false, originalPrice: "" });
      setImageFile(null);
      setPreviewUrl(null);
    } catch (err) {
      showToast("Error: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-wrapper">
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-main-inputs">
            <div className="form-group">
              <label>Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Minimalist Summer Tee"
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required 
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  placeholder="0.00"
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                  required
                >
                  <option value="">Select Category</option>
                  <option value="clothes">Clothes</option>
                  <option value="shoes">Shoes</option>
                  <option value="bags">Bags</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                placeholder="Tell the story of this product..."
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                rows="5"
              ></textarea>
            </div>
          </div>

          <div className="form-image-upload">
            <label>Product Display Image</label>
            <div className={`image-dropzone ${previewUrl ? 'has-image' : ''}`}>
              {previewUrl ? (
                <div className="image-preview-container">
                  <img src={previewUrl} alt="Preview" />
                  <button type="button" className="remove-img" onClick={() => {setImageFile(null); setPreviewUrl(null);}}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="upload-placeholder">
                  <UploadCloud size={32} />
                  <span>Click to upload image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                </label>
              )}
            </div>
          </div>
        </div>

        <button type="submit" className="admin-submit-btn" disabled={loading}>
          {loading ? (
            <span className="loader-text">Processing...</span>
          ) : (
            <>
              <PlusCircle size={18} />
              <span>Publish Product</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAdminProduct;