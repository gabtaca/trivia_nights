import { useEffect, useState } from "react";
import Image from "next/image";

const PieTimer = ({ duration, onTimeUp, onTimeChange }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let timerInterval;
    const startTime = Date.now();

    const updateTimer = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const newTimeLeft = duration - elapsed;

      if (newTimeLeft <= 0) {
        setTimeLeft(0);
        clearInterval(timerInterval);
        const score = calculateScore(0); // Score quand le temps est écoulé
        onTimeUp(score); // Transmettez le score calculé au composant parent
      } else {
        setTimeLeft(newTimeLeft);
        if (onTimeChange) {
          onTimeChange(newTimeLeft);
        }
      }
    };

    timerInterval = setInterval(updateTimer, 100);

    return () => clearInterval(timerInterval);
  }, [duration]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Calculer le score en fonction du temps restant
  const calculateScore = (timeLeft) => {
    const baseScore = 200000;
    const penaltyPerSecond = 10000;
    return Math.max(baseScore - Math.floor((duration - timeLeft) * penaltyPerSecond), 0);
  };

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="w-16 h-16 relative">
      <div
        className="absolute w-full h-full rounded-full"
        style={{
          background: `conic-gradient(
            #FF38D4 ${percentage * 3.6}deg,
            #2B0C39 0deg
          )`,
          transition: 'background 0.1s linear',
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="../../../hourglass.svg"
          alt="Sablier"
          width={30}
          height={30}
          style={{
            transform: `rotate(${(-360 * (duration - timeLeft)) / duration}deg) scale(${timeLeft / duration})`,
            transition: 'transform 0.1s linear',
          }}
        />
      </div>
    </div>
  );
};

export default PieTimer;
