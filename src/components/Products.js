import React from "react";
// CSS Modül dosyasını bu şekilde import edin
import styles from "./Products.module.css";

const Products = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <section id="products" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Ürünler</h2>
          <p>Henüz ürün eklenmedi.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Ürünler</h2>
        <div className={styles['products-slider']}>
          {products.map((product) => (
            <div key={product.id} className={styles['product-slide']}>
              <img
                src={product.image}
                alt={product.name}
                className={styles['product-img']}
              />
              <h3 className={styles['product-title']}>{product.name}</h3>
              <p className={styles['product-price']}>{product.price} ₺</p>
              <p className={styles['product-category']}>{product.category}</p>
              {product.sophierUrl && (
                <button
                  className={`${styles.btn} ${styles['btn-primary']}`}
                  onClick={() => window.open(product.sophierUrl, "_blank")}
                >
                  Satın Al
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;