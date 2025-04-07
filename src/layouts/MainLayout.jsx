import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faInfoCircle, faEnvelope, faDice, faBars, faTimes, faGamepad } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer'

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="main-layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <span className="logo-text">İBDO</span>
            <span className="logo-full">İrem Bezci'nin Doğum Günü Oyunları</span>
          </Link>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faHome} /> Ana Sayfa
          </Link>
          <Link to="/games" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faGamepad} /> Tüm Oyunlar
          </Link>
          <Link to="/game" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faDice} /> Alkol Çarkı
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faInfoCircle} /> Hakkında
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faEnvelope} /> İletişim
          </Link>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout 