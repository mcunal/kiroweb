import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mobil menüde bir linke tıklandığında menüyü kapatmak için fonksiyon
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <span className="logo-text">LÜMINESANS</span>
            <span className="logo-tagline">BİZİMLE PARLA</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <div className="nav-main-links">
              <Link to="/" className="nav-link" onClick={closeMenu}>Ana Sayfa</Link>
              <Link to="/products" className="nav-link" onClick={closeMenu}>Ürünler</Link>
              <Link to="/hakkimizda" className="nav-link" onClick={closeMenu}>Hakkımızda</Link>
              <Link to="/iletisim" className="nav-link" onClick={closeMenu}>İletişim</Link>
            </div>
            <div className="nav-action-links">
              <a href="https://www.instagram.com/luminesans_" target="_blank" rel="noopener noreferrer" className="instagram-link" onClick={closeMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span>Lüminesans</span>
              </a>
            </div>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;