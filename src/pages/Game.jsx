import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faSyncAlt, faCocktail, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons'

function Game() {
  const [drinks, setDrinks] = useState(() => {
    const savedDrinks = localStorage.getItem('drinks')
    return savedDrinks ? JSON.parse(savedDrinks) : []
  })
  const [drinkSettings, setDrinkSettings] = useState(() => {
    const savedSettings = localStorage.getItem('drinkSettings')
    return savedSettings ? JSON.parse(savedSettings) : {
      singleUseMode: false,
      drinks: {}
    }
  })
  const [newDrink, setNewDrink] = useState('')
  const [newDrinkUses, setNewDrinkUses] = useState(1)
  const [spinning, setSpinning] = useState(false)
  const [selectedDrink, setSelectedDrink] = useState(null)
  const wheelRef = useRef(null)
  const wheelItemsRef = useRef(null)
  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    localStorage.setItem('drinks', JSON.stringify(drinks))
  }, [drinks])

  useEffect(() => {
    localStorage.setItem('drinkSettings', JSON.stringify(drinkSettings))
  }, [drinkSettings])

  useEffect(() => {
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--current-rotation', `${currentRotation}deg`)
    }
    if (wheelItemsRef.current) {
      wheelItemsRef.current.style.setProperty('--rotation-degree', `${currentRotation}deg`)
    }
  }, [currentRotation])

  const handleAddDrink = (e) => {
    e.preventDefault()
    if (newDrink.trim()) {
      setDrinks([...drinks, newDrink.trim()])
      setDrinkSettings(prev => ({
        ...prev,
        drinks: {
          ...prev.drinks,
          [newDrink.trim()]: {
            remainingUses: parseInt(newDrinkUses),
            maxUses: parseInt(newDrinkUses)
          }
        }
      }))
      setNewDrink('')
      setNewDrinkUses(1)
    }
  }

  const handleRemoveDrink = (index) => {
    const drinkToRemove = drinks[index]
    const newDrinks = drinks.filter((_, i) => i !== index)
    setDrinks(newDrinks)
    setDrinkSettings(prev => {
      const newSettings = { ...prev }
      delete newSettings.drinks[drinkToRemove]
      return newSettings
    })
  }

  const toggleSingleUseMode = () => {
    setDrinkSettings(prev => ({
      ...prev,
      singleUseMode: !prev.singleUseMode
    }))
  }

  const updateDrinkUses = (drink, uses) => {
    setDrinkSettings(prev => ({
      ...prev,
      drinks: {
        ...prev.drinks,
        [drink]: {
          remainingUses: uses,
          maxUses: uses
        }
      }
    }))
  }

  const resetAllDrinkUses = () => {
    setDrinkSettings(prev => ({
      ...prev,
      drinks: Object.fromEntries(
        Object.entries(prev.drinks).map(([drink, settings]) => [
          drink,
          { ...settings, remainingUses: settings.maxUses }
        ])
      )
    }))
  }

  const spinWheel = () => {
    if (drinks.length < 2) {
      alert('Lütfen en az 2 içecek ekleyin!')
      return
    }

    const availableDrinks = drinks.filter(drink => 
      drinkSettings.drinks[drink]?.remainingUses > 0
    )

    if (availableDrinks.length === 0) {
      alert('Kullanılabilir içecek kalmadı! Sıfırlamak için "Kullanımları Sıfırla" butonunu kullanın.')
      return
    }
    
    setSpinning(true)
    setSelectedDrink(null)
    
    const selectedIndex = Math.floor(Math.random() * availableDrinks.length)
    const selectedDrinkName = availableDrinks[selectedIndex]
    const wheelIndex = drinks.indexOf(selectedDrinkName)
    
    const sliceAngle = 360 / drinks.length
    const targetAngle = -(wheelIndex * sliceAngle)
    const spinCount = 5 + Math.floor(Math.random() * 5)
    const totalRotation = (spinCount * 360) + targetAngle
    
    if (wheelRef.current) {
      wheelRef.current.style.setProperty('--rotation-degree', `${totalRotation}deg`)
    }
    if (wheelItemsRef.current) {
      wheelItemsRef.current.style.setProperty('--rotation-degree', `${totalRotation}deg`)
    }
    
    setCurrentRotation(totalRotation)
    
    setTimeout(() => {
      setSelectedDrink(selectedDrinkName)
      setDrinkSettings(prev => ({
        ...prev,
        drinks: {
          ...prev.drinks,
          [selectedDrinkName]: {
            ...prev.drinks[selectedDrinkName],
            remainingUses: prev.drinks[selectedDrinkName].remainingUses - 1
          }
        }
      }))
      setSpinning(false)
    }, 4000)
  }

  return (
    <div className="game">
      <h1>
        <FontAwesomeIcon icon={faCocktail} className="title-icon" /> 
        Alkol Çarkı 
        <FontAwesomeIcon icon={faCocktail} className="title-icon" />
      </h1>
      
      <div className="settings-panel">
        <button 
          onClick={toggleSingleUseMode}
          className={`toggle-button ${drinkSettings.singleUseMode ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={drinkSettings.singleUseMode ? faToggleOn : faToggleOff} />
          {' '}Tek Kullanım Modu: {drinkSettings.singleUseMode ? 'Açık' : 'Kapalı'}
        </button>
        <button onClick={resetAllDrinkUses} className="reset-button">
          Kullanımları Sıfırla
        </button>
      </div>
      
      <div className="wheel-container">
        <div 
          ref={wheelRef}
          className={`wheel ${spinning ? 'spinning' : ''}`}
          style={{
            '--current-rotation': `${currentRotation}deg`
          }}
        >
          <div 
            ref={wheelItemsRef}
            className="wheel-items"
          >
            {drinks.map((drink, index) => {
              const settings = drinkSettings.drinks[drink]
              const isAvailable = settings?.remainingUses > 0
              return (
                <div
                  key={index}
                  className={`wheel-item ${!isAvailable ? 'used' : ''}`}
                  style={{
                    transform: `rotate(${(360 / drinks.length) * index}deg) translateY(-50%)`,
                  }}
                >
                  {drink}
                  <small className="uses-count">
                    ({settings?.remainingUses || 0}/{settings?.maxUses || 0})
                  </small>
                </div>
              )
            })}
          </div>
        </div>
        {selectedDrink && !spinning && (
          <div className="selected-drink">
            <FontAwesomeIcon icon={faCocktail} /> 
            {selectedDrink}
          </div>
        )}
      </div>

      <div className="controls">
        <form onSubmit={handleAddDrink} className="drink-form">
          <input
            type="text"
            value={newDrink}
            onChange={(e) => setNewDrink(e.target.value)}
            placeholder="İçecek adı girin..."
            className="drink-input"
          />
          <input
            type="number"
            value={newDrinkUses}
            onChange={(e) => setNewDrinkUses(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            className="uses-input"
            title="Kullanım Sayısı"
          />
          <button type="submit" className="add-button">
            <FontAwesomeIcon icon={faPlus} /> Ekle
          </button>
        </form>

        <button 
          onClick={spinWheel} 
          className="spin-button"
          disabled={drinks.length < 2 || spinning}
        >
          <FontAwesomeIcon icon={faSyncAlt} spin={spinning} /> 
          {spinning ? 'Çevriliyor...' : 'Çevir!'}
        </button>

        <div className="drinks-list">
          <h3>
            <FontAwesomeIcon icon={faCocktail} /> İçecek Listesi
          </h3>
          {drinks.map((drink, index) => {
            const settings = drinkSettings.drinks[drink]
            return (
              <div key={index} className="drink-item">
                <span>
                  {drink}
                  <small className="uses-count">
                    ({settings?.remainingUses || 0}/{settings?.maxUses || 0})
                  </small>
                </span>
                <div className="drink-controls">
                  <input
                    type="number"
                    value={settings?.maxUses || 1}
                    onChange={(e) => updateDrinkUses(drink, Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="uses-input"
                    title="Kullanım Sayısı"
                  />
                  <button
                    onClick={() => handleRemoveDrink(index)}
                    className="remove-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            )
          })}
          {drinks.length === 0 && (
            <div className="empty-list">
              Henüz içecek eklenmedi...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Game 