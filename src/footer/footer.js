import React from 'react';
import './footer.css';
import { FaTwitter, FaFacebook, FaInstagram, FaPinterest, FaLinkedin, FaWhatsapp } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer>
      <div className="leftFooter">
        <ul>
          <li>Aviso Legal</li>
          <li>Politica de privacidad</li>
          <li>Politica de las cookies</li>
        </ul>
      </div>
      <div className="center">
        <ul className="social-icons">
        <li><FaTwitter size={40} /></li>
        <li><FaFacebook size={40} /></li>
        <li><FaInstagram size={40} /></li>
        <li><FaPinterest size={40} /></li>
        <li><FaLinkedin size={40} /></li>
        <li><FaWhatsapp size={40} /></li>
        </ul>
      </div>
      <div className="right">
        <ul>
          <li>Blog</li>
          <li>Contacto</li>
          <li>FAQs</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;