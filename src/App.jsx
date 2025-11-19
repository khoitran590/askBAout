import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: null, y: null })
  const [showPopup, setShowPopup] = useState(false)
  const noButtonRef = useRef(null)
  const navigate = useNavigate()

  const handleYesClick = () => {
    // Navigate to date details page
    navigate('/date-details')
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
      <div className="container">
        <h1>Will you accept?</h1>
        <img 
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGk0ejQ3eWtidmVlZ3V1bzB2Zndtc2cwZGs4NXdneThvd2luZmlxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8QbwUh40Hl96yMgvOx/giphy.gif" 
          alt="Accept invitation" 
          className="gif-image"
        />
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

