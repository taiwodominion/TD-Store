import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AddProduct() {
  const [name, setName] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const productsRef = collection(db, "products");

      await addDoc(productsRef, 
        {
        name: name,
        price: 2500,
        createdAt: new Date()
      }
    );

      alert("Product added to Firestore!");
      setName('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Product Name" 
      />
      <button type="submit">Add  This Product</button>
    </form>
  );
}

export default AddProduct;