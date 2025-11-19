import { useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: null, y: null })
  const [showPopup, setShowPopup] = useState(true)
  const [showDatePopup, setShowDatePopup] = useState(false)
  const [dateInfo, setDateInfo] = useState({
    time: '',
    date: '',
    dressCode: 'Anything that can capture your beauty to the fullest'
  })
  const noButtonRef = useRef(null)

  const handleYesClick = () => {
    // Create confetti effect
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      // Launch from both sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)

    // Show date popup
    setShowDatePopup(true)
  }

  const moveNoButton = () => {
    if (!noButtonRef.current) return

    const button = noButtonRef.current
    const rect = button.getBoundingClientRect()
    
    // Calculate random position within viewport
    const maxX = window.innerWidth - rect.width - 50
    const maxY = window.innerHeight - rect.height - 50
    
    const randomX = Math.random() * (maxX - 50) + 25
    const randomY = Math.random() * (maxY - 50) + 25
    
    setNoButtonPosition({ x: randomX, y: randomY })
  }

  const handleNoHover = () => {
    moveNoButton()
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    moveNoButton()
  }

  const noButtonStyle = noButtonPosition.x !== null && noButtonPosition.y !== null
    ? {
        position: 'fixed',
        left: `${noButtonPosition.x}px`,
        top: `${noButtonPosition.y}px`,
      }
    : {}

  const closePopup = () => {
    setShowPopup(false)
  }

  const closeDatePopup = () => {
    setShowDatePopup(false)
  }

  return (
    <div className="app">
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <p className="popup-message">
              Hello Ms. Pretty, since your beauty and aura has captured my heart I would like to invite you to a date to find out if I can capture yours
            </p>
          </div>
        </div>
      )}
      {showDatePopup && (
        <div className="popup-overlay" onClick={closeDatePopup}>
          <div className="popup-content date-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closeDatePopup}>×</button>
            <div className="date-info">
              <p className="date-info-item">Time: {dateInfo.time}</p>
              <p className="date-info-item">Date: {dateInfo.date}</p>
              <p className="date-info-item">Dress code: {dateInfo.dressCode}</p>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <h1>Will you accept?</h1>
        <div className="buttons">
          <button 
            className="yes-btn" 
            onClick={handleYesClick}
          >
            Yes
          </button>
          <button 
            ref={noButtonRef}
            className="no-btn" 
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
            style={noButtonStyle}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default App

