import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="logo-text">IBDO</span>
        </Link>
      </div>
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </button>
      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/">Ana Sayfa</Link>
        <Link to="/game">Alkol Çarkı</Link>
        <Link to="/truth-or-dare">Doğruluk mu Cesaret mi?</Link>
      </div>
    </nav>
  );
};

export default Navbar; 