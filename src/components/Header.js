import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link bileşeni eklendi
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <span className="logo-text">LÜMINESANS</span>
            <span className="logo-tagline">BİZİMLE PARLA</span>
          </div>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {/* a etiketleri Link bileşenlerine dönüştürüldü */}
            <Link to="/" className="nav-link">Ana Sayfa</Link>
            <Link to="/products" className="nav-link">Ürünler</Link>
            <Link to="/hakkimizda" className="nav-link">Hakkımızda</Link>
            <Link to="/iletisim" className="nav-link">İletişim</Link>
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