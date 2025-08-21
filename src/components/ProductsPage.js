import React, { useState } from "react";
// Artık statik bir JSON dosyasından değil, prop'lardan veri alacak
// import productsData from "../../data/products.json"; 
import "./ProductsPage.css";

// ProductsPage bileşeni, App.js'den gelen 'products' prop'unu alıyor
const ProductsPage = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = ["all", ...new Set(products.map((p) => p.category))];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="products-page">
            <div className="container">
                <h2 className="page-title">Tüm Ürünlerimiz</h2>
                <div className="controls">
                    <input
                        type="text"
                        placeholder="Ürün Ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                    <div className="category-filter">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`category-btn ${selectedCategory === category ? "active" : ""
                                    }`}
                            >
                                {category === "all" ? "Tümü" : category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="products-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-img"
                                />
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-price">{product.price} ₺</p>
                                <p className="product-category">{product.category}</p>
                                {product.sophierUrl && (
                                    <a
                                        href={product.sophierUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                    >
                                        Satın Al
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-products">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductsPage;