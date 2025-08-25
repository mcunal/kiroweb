import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Page Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Products from "./components/Products";
import ProductsPage from "./components/ProductsPage";
import Hakkimizda from "./components/Hakkimizda";
import Iletisim from "./components/iletisim";
import OpportunitiesSlider from "./components/OpportunitiesSlider"; // YENİ: Fırsatlar slider'ı
import AdminPage from "./pages/Admin";

// A simple component for the home page content
const HomePage = ({ products, opportunities }) => (
  <>
    <OpportunitiesSlider opportunities={opportunities} />
    <Hero products={products} />
    <Products products={products} />
    {/* You can add other sections like About, Contact here if you want them on the home page */}
  </>
);

const API_URL = "http://localhost:5001/api"; // Backend sunucu adresimiz

function App() {
  const [products, setProducts] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verileri backend'den çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch(`${API_URL}/products`);
        const productsData = await productsRes.json();
        setProducts(productsData);

        const opportunitiesRes = await fetch(`${API_URL}/opportunities`);
        const opportunitiesData = await opportunitiesRes.json();
        setOpportunities(opportunitiesData);

      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addProduct = async (product) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    const newProduct = await response.json();
    setProducts((prev) => [...prev, newProduct]);
  };

  const removeProduct = async (id) => {
    const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateProduct = async (productId, updatedProduct) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...data } : p)));
  };

  const addOpportunity = async (opportunityData) => {
    const response = await fetch(`${API_URL}/opportunities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opportunityData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    const newOpportunity = await response.json();
    setOpportunities((prev) => [...prev, newOpportunity]);
  };

  const removeOpportunity = async (id) => {
    const response = await fetch(`${API_URL}/opportunities/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    setOpportunities((prev) => prev.filter((op) => op.id !== id));
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            loading
              ? <div className="loading-screen">Yükleniyor...</div>
              : <HomePage products={products} opportunities={opportunities} />
          } />
          <Route path="/products" element={<ProductsPage products={products} />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/iletisim" element={<Iletisim />} />
          {/* Admin sayfası artık herkese açık */}
          <Route
            path="/admin"
            element={
              <AdminPage
                products={products}
                addProduct={addProduct}
                removeProduct={removeProduct}
                updateProduct={updateProduct}
                opportunities={opportunities}
                addOpportunity={addOpportunity}
                removeOpportunity={removeOpportunity}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;