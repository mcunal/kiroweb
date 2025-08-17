import React from 'react';
import './Products.css';

const Products = () => {
  const productCategories = [
    {
      title: "Decorative Items",
      description: "Beautiful pieces inspired by cellular structures and molecular forms",
      icon: "🧬",
      items: ["DNA Helix Sculptures", "Cell Structure Art", "Molecular Models"]
    },
    {
      title: "Educational Toys",
      description: "Fun and educational toys that make science accessible and engaging",
      icon: "🔬",
      items: ["Molecule Building Sets", "Cell Division Games", "Lab Equipment Toys"]
    },
    {
      title: "Stationery",
      description: "Notebooks, pen holders, and accessories with scientific themes",
      icon: "📝",
      items: ["DNA Pattern Notebooks", "Beaker Pen Holders", "Periodic Table Planners"]
    },
    {
      title: "Accessories",
      description: "Stylish accessories that celebrate the beauty of science",
      icon: "💎",
      items: ["Molecular Jewelry", "Lab-inspired Bags", "Scientific Keychains"]
    }
  ];

  return (
    <section id="products" className="section molecular-bg">
      <div className="container">
        <h2 className="section-title">Our Product Categories</h2>
        <div className="products-grid">
          {productCategories.map((category, index) => (
            <div key={index} className="product-card">
              <div className="product-icon">{category.icon}</div>
              <h3 className="product-title">{category.title}</h3>
              <p className="product-description">{category.description}</p>
              <ul className="product-items">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              <button className="btn btn-outline">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;