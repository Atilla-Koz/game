import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Logo
        </Link>
      </div>
      <div className="navbar-menu">
        <Link to="/">Ana Sayfa</Link>
        <Link to="/hakkimizda">Hakkımızda</Link>
        <Link to="/iletisim">İletişim</Link>
      </div>
    </nav>
  )
}

export default Navbar 