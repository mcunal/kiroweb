import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero molecular-bg">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Where Science Meets
              <span className="gradient-text"> Creativity</span>
            </h1>
            <p className="hero-description">
              Discover unique decorative items, toys, and stationery inspired by the 
              fascinating world of biology, genetics, medicine, and pharmacy. 
              Each piece tells a story of scientific wonder.
            </p>
            <div className="hero-buttons">
              <a href="#products" className="btn btn-primary">Explore Products</a>
              <a href="#about" className="btn btn-outline">Learn More</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dna-helix">
              <div className="helix-strand"></div>
              <div className="helix-strand"></div>
            </div>
            <div className="floating-molecules">
              <div className="molecule"></div>
              <div className="molecule"></div>
              <div className="molecule"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;