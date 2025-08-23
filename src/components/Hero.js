import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Sadece ürünler varsa ve en az bir ürün varsa slayt gösterisini başlat
    if (products && products.length > 0) {
      const interval = setInterval(() => {
        // Rastgele bir sonraki indeksi seç
        setCurrentIndex(Math.floor(Math.random() * products.length));
      }, 2000); // 2 saniyede bir resim değiştir

      return () => clearInterval(interval); // Component unmount olduğunda interval'ı temizle
    }
  }, [products]);

  const currentImage = products && products.length > 0 ? products[currentIndex]?.image : '';

  return (
    <section id="home" className="hero molecular-bg">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Bilimin Yaratıcılıkla
              <span className="gradient-text"> Buluştuğu Yer</span>
            </h1>
            <p className="hero-description">
              Biyoloji, genetik, tıp ve eczacılığın büyüleyici dünyasından ilham
              alan benzersiz dekoratif ürünleri, oyuncakları ve kırtasiye
              malzemelerini keşfedin. Her parça, bilimsel bir harikanın
              hikayesini anlatıyor.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">Ürünleri Keşfet</Link>
              <Link to="/hakkimizda" className="btn btn-outline">Daha Fazla Bilgi</Link>
            </div>
          </div>
          <div className="hero-visual">
            {currentImage && (
              <img
                key={currentIndex} // index değiştiğinde animasyonun yeniden tetiklenmesi için key kullanıyoruz
                src={currentImage}
                alt="Öne Çıkan Ürün"
                className="hero-product-image"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;