// PieTimer.js
import { useEffect, useState } from "react";

const PieTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 0.1 : 0));
    }, 100);
    
    return () => clearInterval(timer);
  }, []);
  
  const rotation = (timeLeft / duration) * 360;
  
  return (
    <div className="w-16 h-16">
      <div className="relative w-full h-full">
        <div
          className="absolute w-full h-full rounded-full bg-green-500"
          style={{
            clipPath: rotation > 180 ? 'polygon(50% 50%, 0 0, 0 100%, 50% 100%, 50% 50%)' : 'polygon(50% 50%, 50% 0, 0 0, 0 100%, 100% 100%, 100% 0, 50% 0)',
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
          }}
        />
        <div className="absolute w-full h-full rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default PieTimer;
