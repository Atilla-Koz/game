import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'

function Home() {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            <FontAwesomeIcon icon={faGamepad} className="title-icon" /> 
            İrem Bezci'nin Doğum Günü Oyunları
            <FontAwesomeIcon icon={faGamepad} className="title-icon" />
          </h1>
          <p className="hero-description">
            Eğlenceli oyunlarla dolu bir doğum günü kutlaması için hazırlanan özel oyun koleksiyonu!
          </p>
          <Link to="/game" className="hero-button">
            Hemen Oyna!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home 