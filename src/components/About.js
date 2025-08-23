import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Lüminesans Hakkında</h2>
            <p className="about-description">
              Lüminesans, bilimi güzel ve erişilebilir kılma tutkusundan doğdu.
              Mikroskobik dünyanın, günlük hayatımızda kutlanmayı hak eden
              inanılmaz bir güzellik barındırdığına inanıyoruz.
            </p>
            <p className="about-description">
              Tasarımcı ve bilim insanlarımızdan oluşan ekibimiz, bilimsel doğruluk
              ile sanatsal ifade arasındaki boşluğu dolduran ürünler yaratmak için
              birlikte çalışıyor. Her bir parça, doğal dünyaya karşı merak ve
              hayranlık uyandırmak için özenle hazırlanmıştır.
            </p>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🎨</div>
                <h4>Sanatsal Tasarım</h4>
                <p>Her ürün, bilimsel doğruluğu güzel estetikle birleştirir</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🔬</div>
                <h4>Bilimsel Doğruluk</h4>
                <p>Tüm tasarımlar gerçek bilimsel yapılara ve süreçlere dayanmaktadır</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌱</div>
                <h4>Eğitsel Değer</h4>
                <p>Ürünlerimiz bilime karşı öğrenme ve merakı teşvik eder</p>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="science-elements">
              <div className="element dna"></div>
              <div className="element cell"></div>
              <div className="element molecule"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;