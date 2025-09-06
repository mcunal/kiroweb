import React, { useState, useEffect } from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

const Hero = ({ sliderData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Sadece slider verisi varsa ve en az bir öğe varsa slayt gösterisini başlat
    if (sliderData && sliderData.length > 0) {
      const interval = setInterval(() => {
        // Sırayla bir sonraki indekse geç
        setCurrentIndex((prevIndex) =>
          prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // 5 saniyede bir resim değiştir

      return () => clearInterval(interval); // Component unmount olduğunda interval'ı temizle
    }
  }, [sliderData]);

  const currentSlide = sliderData && sliderData.length > 0 ? sliderData[currentIndex] : null;

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
            {currentSlide && (
              <a href={currentSlide.url} target="_blank" rel="noopener noreferrer">
                <img
                  key={currentIndex} // index değiştiğinde animasyonun yeniden tetiklenmesi için key kullanıyoruz
                  src={currentSlide.image}
                  alt="Öne Çıkan Ürün"
                  className="hero-product-image"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;