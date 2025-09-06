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

import { addProduct, removeProduct, updateProduct, addOpportunity, removeOpportunity } from "./services/productService";

// A simple component for the home page content
const HomePage = ({ products, opportunities, sliderData }) => (
  <>
    <OpportunitiesSlider opportunities={opportunities} />
    <Hero sliderData={sliderData} />
    <Products products={products} />
    {/* You can add other sections like About, Contact here if you want them on the home page */}
  </>
);

const API_URL = "http://localhost:5001/api"; // Backend sunucu adresimiz

function App() {
  const [products, setProducts] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true);
  // YENİ: Kullanıcının giriş yapıp yapmadığını tutan state
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 

  // Verileri backend'den çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        // server.js yerine doğrudan public/db.json dosyasını çekiyoruz
        const response = await fetch('https://luminesans.com/data/db.json');
        console.log("a");
        const data = await response.json();

        setProducts(data.products || []);
        setOpportunities(data.opportunities || []);
        setSliderData(data.slider || []);

      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          {/* Ana Sayfa */}
          <Route path="/" element={
            loading
              ? <div className="loading-screen">Yükleniyor...</div>
              : <HomePage products={products} opportunities={opportunities} sliderData={sliderData} />
          } />
          {/* Ürünler Sayfası */}
          <Route path="/products" element={<ProductsPage products={products} />} />
          {/* Hakkımızda Sayfası */}
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          {/* İletişim Sayfası */}
          <Route path="/iletisim" element={<Iletisim />} />

          {/* YENİ: Giriş Sayfası */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* YENİ: Admin sayfası korumalı */}
          <Route
            path="/admin"
            element={
              isLoggedIn ? (
                <AdminPage
                  products={products}
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                  updateProduct={updateProduct}
                  opportunities={opportunities}
                  addOpportunity={addOpportunity}
                  removeOpportunity={removeOpportunity}
                   // onLogout prop'unu ekledik
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