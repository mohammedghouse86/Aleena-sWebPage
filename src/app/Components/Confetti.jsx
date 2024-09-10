'use client';

import React, { useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiButton = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setIsOpaque(true); // Make the screen slightly opaque
    setShowConfetti(true); // Trigger the confetti

    setTimeout(() => {
      setShowConfetti(false); // Stop the confetti after a while
      setIsOpaque(false); // Remove opacity
    }, 5000); // Confetti duration: 5 seconds
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <button onClick={handleClick} style={{ zIndex: 2, position: 'relative' }}>
        Celebrate!
      </button>

      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ zIndex: 3, position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', overlay:true }}
        />
      )}

      {isOpaque && (
        <div
          style={{
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slightly opaque background
          }}
        />
      )}
    </div>
  );
};

export default ConfettiButton;
