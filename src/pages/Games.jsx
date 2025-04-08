import React from 'react';
import { Link } from 'react-router-dom';
import alcoholWheelIcon from '../assets/images/alcohol-wheel.svg';
import truthOrDareIcon from '../assets/images/truth-or-dare.svg';
import comingSoonIcon from '../assets/images/coming-soon.svg';
import '../assets/styles/games.css';

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'Alkol Çarkı',
      description: 'Arkadaşlarınla eğlenceli bir akşam için alkol çarkını çevir!',
      image: alcoholWheelIcon,
      link: '/alkol-carki',
      isAvailable: true
    },
    {
      id: 2,
      title: 'Doğruluk mu Cesaret mi',
      description: 'Arkadaşlarınla eğlenceli bir oyun için doğruluk mu cesaret mi oyna!',
      image: truthOrDareIcon,
      link: '/dogruluk-mu-cesaret-mi',
      isAvailable: true
    },
    {
      id: 3,
      title: 'Yakında',
      description: 'Yeni oyunlar yakında burada olacak!',
      image: comingSoonIcon,
      link: '#',
      isAvailable: false
    }
  ];

  return (
    <div className="games-container">
      <h1 className="games-title">Oyunlarımız</h1>
      <p className="games-description">
        Arkadaşlarınla eğlenceli vakit geçirmek için harika oyunlar!
      </p>
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className={`game-card ${!game.isAvailable ? 'disabled' : ''}`}>
            <div className="game-image-container">
              <img src={game.image} alt={game.title} className="game-image" />
            </div>
            <div className="game-content">
              <h2 className="game-card-title">{game.title}</h2>
              <p className="game-card-description">{game.description}</p>
              <Link
                to={game.link}
                className={`game-button ${!game.isAvailable ? 'disabled' : ''}`}
              >
                {game.isAvailable ? 'Oyna' : 'Yakında'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games; 