import React from "react";
import "./Footer.css"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>WealthWise</h2>
        </div>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-social">
          <a href="#" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="#" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="#" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WealthWise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
