import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Bileşenleri import ediyoruz
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Products from "./components/Products";
import ProductsPage from "./components/ProductsPage";
import Hakkimizda from "./components/Hakkimizda";
import Iletisim from "./components/iletisim";
import Admin from "./pages/Admin";

function App() {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("products");
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error("Ürünler localStorage'dan okunurken bir hata oluştu", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? updatedProduct : p))
    );
  };

  // Kategori filtreleme state'ini ProductsPage'e taşıdık.
  // Burada artık ana sayfa için özel bir filtreleme mantığına ihtiyacımız yok,
  // çünkü ana sayfada sadece en son eklenen veya öne çıkan ürünler gösterilebilir.
  // Bu örnekte, Products bileşeni tüm ürünleri gösterecek, ancak isterseniz
  // bunu en son eklenen 5 ürün olarak da değiştirebilirsiniz.

  return (
    <Router>
      <Header />

      <Routes>
        {/* Ana Sayfa Route'u */}
        <Route
          path="/"
          element={
            <>
              <Hero products={products} />
              {/* Ana sayfadaki Products bölümü artık filtreleme ve kategori seçimini içermiyor */}
              <Products products={products} />
            </>
          }
        />

        {/* Yeni Ürünler Sayfası Route'u */}
        <Route
          path="/products"
          element={<ProductsPage products={products} />}
        />

        {/* Yeni Hakkımızda Sayfası Route'u */}
        <Route path="/hakkimizda" element={<Hakkimizda />} />

        {/* Yeni İletişim Sayfası Route'u */}
        <Route path="/iletisim" element={<Iletisim />} />

        {/* Admin Sayfası Route'u */}
        <Route
          path="/admin"
          element={
            <Admin
              products={products}
              addProduct={addProduct}
              removeProduct={removeProduct}
              updateProduct={updateProduct}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;