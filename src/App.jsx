import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function App() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: null, y: null })
  const [showPopup, setShowPopup] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const noButtonRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Detect if device is mobile/touch device
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth <= 768
      setIsMobile(isTouchDevice || isSmallScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleYesClick = () => {
    // Navigate to date details page
    navigate('/date-details')
  }

  const moveNoButton = () => {
    if (!noButtonRef.current) return

    const button = noButtonRef.current
    const rect = button.getBoundingClientRect()
    
    // Calculate random position within viewport with better margins for mobile
    const margin = isMobile ? 20 : 50
    const maxX = window.innerWidth - rect.width - margin
    const maxY = window.innerHeight - rect.height - margin
    
    const randomX = Math.random() * (maxX - margin) + (margin / 2)
    const randomY = Math.random() * (maxY - margin) + (margin / 2)
    
    setNoButtonPosition({ x: randomX, y: randomY })
  }

  const handleNoHover = () => {
    // Only move on hover for desktop devices
    if (!isMobile) {
      moveNoButton()
    }
  }

  const handleNoClick = (e) => {
    e.preventDefault()
    moveNoButton()
  }

  const handleNoTouchStart = (e) => {
    // On mobile, move immediately when touched
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
      <div className="container">
        <h1>Will the beautiful lady let me take her out on a date again?</h1>
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
            onTouchStart={handleNoTouchStart}
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

