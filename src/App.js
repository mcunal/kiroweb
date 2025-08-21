import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Bileşenleri import ediyoruz
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Products from "./components/Products"; // Bu, ana sayfadaki slider için kullanılacak
import ProductsPage from "./components/ProductsPage"; // Yeni oluşturduğunuz tüm ürünler sayfası
import Admin from "./pages/Admin";

function App() {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("products");
      return savedProducts ? JSON.parse(savedProducts) : [];
    } catch (error) {
      console.error("Failed to parse products from localStorage", error);
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

      <nav className="main-nav">
        <div className="nav-container">
          <Link to="/" className="nav-link">
            Ana Sayfa
          </Link>
          <span className="nav-separator">|</span>
          <Link to="/products" className="nav-link">
            Ürünler
          </Link>
          <span className="nav-separator">|</span>
          <Link to="/admin" className="nav-link">
            Admin Panel
          </Link>
        </div>
      </nav>

      <Routes>
        {/* Ana Sayfa Route'u */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              {/* Ana sayfadaki Products bölümü artık filtreleme ve kategori seçimini içermiyor */}
              {/* Sadece bir ürün slaytı veya öne çıkan ürünler gösterilebilir */}
              {/* Bu bileşene tüm ürünleri gönderiyoruz, filtreleme artık ProductsPage'de */}
              <Products products={products} />
              <About />
              <Contact />
            </>
          }
        />

        {/* Yeni Ürünler Sayfası Route'u */}
        <Route
          path="/products"
          element={<ProductsPage products={products} />}
        />

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