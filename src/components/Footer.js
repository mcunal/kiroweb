import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">LÜMINESANS</span>
              <span className="logo-tagline">GLOW WITH US</span>
            </div>
            <p className="footer-description">
              Where science meets creativity. Discover unique products inspired 
              by the fascinating world of biology and medicine.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Products</h4>
              <ul>
                <li><a href="#products">Decorative Items</a></li>
                <li><a href="#products">Educational Toys</a></li>
                <li><a href="#products">Stationery</a></li>
                <li><a href="#products">Accessories</a></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Follow Us</h4>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Pinterest</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Lüminesans. All rights reserved.</p>
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