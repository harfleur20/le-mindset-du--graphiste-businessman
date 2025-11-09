import React, { useState, useEffect } from "react";

const Countdown = ({ onVisibilityChange }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const countdownDate = new Date("2025-12-31T23:59:59"); // ⭐ MODIFIEZ LA DATE
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        if (!isActive) {
          setIsActive(true);
          onVisibilityChange(true); // ⭐ NOTIFIE LE CHANGEMENT
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (isActive) {
          setIsActive(false);
          onVisibilityChange(false); // ⭐ NOTIFIE LE CHANGEMENT
        }
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onVisibilityChange]);

  const formatTime = (time) => time.toString().padStart(2, "0");

  if (!isActive) {
    return null;
  }

  return (
    <div className="promo-banner">
      <div className="container">
        <div className="promo-content">
          <span className="promo-tag">OFFRE SPÉCIALE</span>
          <span className="promo-text">
            -20% avec le code : RELANCE10 sur la version Ebook du livre
          </span>
          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">
                {formatTime(timeLeft.days)}
              </span>
              <span className="countdown-label">J</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">
                {formatTime(timeLeft.hours)}
              </span>
              <span className="countdown-label">H</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">
                {formatTime(timeLeft.minutes)}
              </span>
              <span className="countdown-label">M</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">
                {formatTime(timeLeft.seconds)}
              </span>
              <span className="countdown-label">S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;