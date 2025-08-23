import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">LÜMINESANS</span>
              <span className="logo-tagline">BİZİMLE PARLA</span>
            </div>
            <p className="footer-description">
              Bilimin yaratıcılıkla buluştuğu yer. Biyoloji ve tıp dünyasının
              büyüleyici dünyasından ilham alan benzersiz ürünleri keşfedin.
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Ürünler</h4>
              <ul>
                <li><Link to="/products">Dekoratif Ürünler</Link></li>
                <li><Link to="/products">Eğitici Oyuncaklar</Link></li>
                <li><Link to="/products">Kırtasiye</Link></li>
                <li><Link to="/products">Aksesuarlar</Link></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Şirket</h4>
              <ul>
                <li><Link to="/hakkimizda">Hakkımızda</Link></li>
                <li><Link to="/iletisim">İletişim</Link></li>
                <li><Link to="/privacy">Gizlilik Politikası</Link></li>
                <li><Link to="/terms">Hizmet Şartları</Link></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Bizi Takip Edin</h4>
              <ul>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>

              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Lüminesans. Tüm hakları saklıdır.</p>
          <div className="footer-molecules">
            <div className="molecule-small"></div>
            <div className="molecule-small"></div>
            <div className="molecule-small"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;