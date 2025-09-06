import React from 'react'
export const API_URL = "http://localhost:5001/api"; // Backend sunucu adresimiz
export const addProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    return await response.json();
    //setProducts((prev) => [...prev, newProduct]);
  };

  export const removeProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    //setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  export const updateProduct = async (productId, updatedProduct) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    return await response.json();
    //setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...data } : p)));
  };

  export const addOpportunity = async (opportunityData) => {
    const response = await fetch(`${API_URL}/opportunities`, {
      method: 'POST',
      body: JSON.stringify(opportunityData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    return await response.json();
    //setOpportunities((prev) => [...prev, newOpportunity]);
  };

  export const removeOpportunity = async (id) => {
    const response = await fetch(`${API_URL}/opportunities/${id}`, {
      method: 'DELETE'
      
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    //setOpportunities((prev) => prev.filter((op) => op.id !== id));
  };
