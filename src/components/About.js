import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Lüminesans</h2>
            <p className="about-description">
              Lüminesans was born from a passion for making science beautiful and accessible. 
              We believe that the microscopic world holds incredible beauty that deserves to be 
              celebrated in our everyday lives.
            </p>
            <p className="about-description">
              Our team of designers and scientists work together to create products that bridge 
              the gap between scientific accuracy and artistic expression. Each piece is carefully 
              crafted to inspire curiosity and wonder about the natural world.
            </p>
            <div className="about-features">
              <div className="feature">
                <div className="feature-icon">🎨</div>
                <h4>Artistic Design</h4>
                <p>Every product combines scientific accuracy with beautiful aesthetics</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🔬</div>
                <h4>Scientific Accuracy</h4>
                <p>All designs are based on real scientific structures and processes</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🌱</div>
                <h4>Educational Value</h4>
                <p>Our products inspire learning and curiosity about science</p>
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