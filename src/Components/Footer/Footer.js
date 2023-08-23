import React from 'react';
import './Footer.style.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h6 className="section-title">Urban Hunters</h6>
          <hr className="section-divider" />
          <p>
          <b> Urban Hunters </b><br/>Gives You All the latest products related to phone, watches etc. If you any Idea to add
           or want some changes feel free to contact me above info.
          </p>
        </div>
        <div className="footer-section">
          <h6 className="section-title">Products</h6>
          <hr className="section-divider" />
          <p>
            <Link to={'./product/64e38d17c3f5cfaed9a93a76'} className="footer-link">Rolex Pearl</Link>
          </p>
          <p>
            <Link to={'./product/64da7a4d65fabd145385d0a4'}  className="footer-link">Iphone 8</Link>
          </p>
          <p>
            <Link to={'./product/64db57e4ebea908759b0d4cf'}  className="footer-link">Apple Macbook </Link>
          </p>
          <p>
            <Link to={'./product/64de2a73923edc5863cfbebd'}  className="footer-link">HP ENVY X360</Link>
          </p>
        </div>
        <div className="footer-section">
          <h6 className="section-title">Useful links</h6>
          <hr className="section-divider" />
          <p>
            <Link to={'./'}  className="footer-link">Home</Link>
          </p>
          <p>
            <Link to={'./category/iphone'}  className="footer-link">Phones</Link>
          </p>
          <p>
            <Link to={'./category/watch'}  className="footer-link">Watches</Link>
          </p>
          <p>
            <Link  to={'./category/laptop'} className="footer-link">Laptops</Link>
          </p>
        </div>
        <div className="footer-section">
          <h6 className="section-title">Contact</h6>
          <hr className="section-divider" />
          <p>
            <i className="fas fa-home"></i> Delhi, NY 10012, India
          </p>
          <p>
            <i className="fas fa-envelope"></i> urbanhunters@example.com
          </p>
          <p>
            <i className="fas fa-phone"></i> + 91 83789 79969
          </p>
          <p>
            <i className="fas fa-print"></i> + 91 83789 79969
          </p>
        </div>
      </div>
      <div className="footer-text">
        &copy; 2023 Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;