import React, { useEffect, useState } from 'react';

const Crosshair = ({visible}) => {
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="crosshair"
      className={`fixed pointer-events-none ${visible ? 'block' : 'hidden'}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="relative w-1 h-8 bg-red-500">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-red-500"></div>
      </div>
    </div>
  );
};

export default Crosshair;
