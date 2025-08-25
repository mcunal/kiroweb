import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Login from "./components/Login"; // YENİ: Login bileşenini import et
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

// YENİ: Access token'ı localStorage'dan okuyan yardımcı fonksiyon
function getAccessToken() {
  return localStorage.getItem('accessToken');
}

// YENİ: API istekleri için kimlik doğrulama başlığını oluşturan yardımcı fonksiyon
const getAuthHeaders = () => ({
  'Authorization': `Bearer ${getAccessToken()}`,
  'Content-Type': 'application/json'
});

function App() {
  const [products, setProducts] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  // YENİ: Kullanıcının giriş yapıp yapmadığını tutan state
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

  // YENİ: Sayfa yüklendiğinde token'ı kontrol et
  useEffect(() => { setIsLoggedIn(!!getAccessToken()); }, []);

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
      headers: getAuthHeaders(), // Token ile istek gönder
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
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders() // Token ile istek gönder
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateProduct = async (productId, updatedProduct) => {
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(), // Token ile istek gönder
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
      headers: getAuthHeaders(), // Token ile istek gönder
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
    const response = await fetch(`${API_URL}/opportunities/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders() // Token ile istek gönder
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Hatası: ${response.status} - ${errorText}`);
    }
    setOpportunities((prev) => prev.filter((op) => op.id !== id));
  };

  // YENİ: Giriş yapma fonksiyonu (Login bileşeni tarafından çağrılacak)
  const handleLogin = (token) => {
    localStorage.setItem('accessToken', token);
    setIsLoggedIn(true);
  };

  // YENİ: Çıkış yapma fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    // İsteğe bağlı olarak kullanıcıyı ana sayfaya yönlendirebilirsin: navigate('/');
  };

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Ana Sayfa */}
          <Route path="/" element={
            loading
              ? <div className="loading-screen">Yükleniyor...</div>
              : <HomePage products={products} opportunities={opportunities} />
          } />
          {/* Ürünler Sayfası */}
          <Route path="/products" element={<ProductsPage products={products} />} />
          {/* Hakkımızda Sayfası */}
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          {/* İletişim Sayfası */}
          <Route path="/iletisim" element={<Iletisim />} />

          {/* YENİ: Giriş Sayfası */}
          <Route path="/login" element={isLoggedIn ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />} />

          {/* YENİ: Admin sayfası korumalı */}
          <Route
            path="/admin"
            element={
              true ? (
                <AdminPage
                  products={products}
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                  updateProduct={updateProduct}
                  opportunities={opportunities}
                  addOpportunity={addOpportunity}
                  removeOpportunity={removeOpportunity}
                  onLogout={handleLogout} // onLogout prop'unu ekledik
                />
              ) : (
                <Navigate to="/login" replace /> // Giriş yapılmamışsa login sayfasına yönlendir
              )
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;