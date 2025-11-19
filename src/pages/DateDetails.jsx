import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import '../App.css'

function DateDetails() {
  const dateInfo = {
    time: 'Anytime the lady is available',
    date: 'Saturday, November 29, 2025',
    dressCode: 'Anything that can capture your beauty to the fullest'
  }

  useEffect(() => {
    // Create confetti effect when page loads
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

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <div className="container date-details-container">
        <h1 className="date-details-title">Yayyyy</h1>
        <img 
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb29wOTFqaTY5enhrYmU2eDc4d2wxdWFnemNqZm9vYTRmMmc4aHdqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TdfyKrN7HGTIY/giphy.gif" 
          alt="Celebration" 
          className="gif-image date-gif"
        />
        <div className="date-info-page">
          <p className="date-info-item-large">Time: {dateInfo.time}</p>
          <p className="date-info-item-large">Date: {dateInfo.date}</p>
          <p className="date-info-item-large">Dress code: {dateInfo.dressCode}</p>
        </div>
      </div>
    </div>
  )
}

export default DateDetails

