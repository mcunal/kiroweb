import React, { useRef, useState, useEffect } from "react";
// CSS Modül dosyasını bu şekilde import edin
import styles from "./Products.module.css";

const Products = ({ products }) => {
  const sliderRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  // Sadece isOpportunity özelliği true olan ürünleri filtrele
  //const opportunityProducts = products.filter(product => product.isOpportunity);
  const opportunityProducts = products;

  useEffect(() => {
    const checkScrollability = () => {
      const slider = sliderRef.current;
      if (slider) {
        // scrollWidth, içeriğin toplam genişliğidir
        // clientWidth, slider'ın görünür genişliğidir
        setShowArrows(slider.scrollWidth > slider.clientWidth);
      }
    };

    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    return () => window.removeEventListener('resize', checkScrollability);
  }, [opportunityProducts]);

  if (!opportunityProducts || opportunityProducts.length === 0) {
    return (
      <section id="products" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles['section-title']}>Ürünler</h2>
          <p>Öne çıkan ürün bulunmamaktadır.</p>
        </div>
      </section>
    );
  }

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      // Kart genişliği (300px) + boşluk (20px) = 320px
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Ürünler</h2>
        <div className={styles['slider-container']}>
          {showArrows && (
            <button className={`${styles['slider-arrow']} ${styles['arrow-left']}`} onClick={() => scroll('left')} aria-label="Önceki Ürünler">
              &#8249;
            </button>
          )}
          <div className={styles['products-slider']} ref={sliderRef}>
            {opportunityProducts.map((product) => (
              <div key={product.id} className={styles['product-slide']}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles['product-img']}
                />
                <h3 className={`${styles['product-title']} gradient-text`}>{product.name}</h3>
                <p className={styles['product-price']}>{product.price} ₺</p>
                <p className={styles['product-category']}>{product.category}</p>
                {product.sophierUrl && (
                  <button
                    className={`${styles.btn} ${styles['btn-primary']}`}
                    onClick={() => window.open(product.sophierUrl, "_blank")}
                  >
                    İncele
                  </button>
                )}
              </div>
            ))}
          </div>
          {showArrows && (
            <button className={`${styles['slider-arrow']} ${styles['arrow-right']}`} onClick={() => scroll('right')} aria-label="Sonraki Ürünler">
              &#8250;
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;