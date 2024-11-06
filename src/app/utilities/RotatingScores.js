"use client";
import { useEffect, useState } from "react";

export default function RotatingScores({ topScores }) {
  const [displayedScoreIndex, setDisplayedScoreIndex] = useState(0);
  const [currentBreakpoint, setCurrentBreakpoint] = useState(1);

  useEffect(() => {
    // Mettre à jour le breakpoint selon l'écran
    const updateBreakpoint = () => {
      setCurrentBreakpoint(
        window.innerWidth >= 1280 ? 5 : 
        window.innerWidth >= 768 ? 3 : 
        window.innerWidth >= 640 ? 2 : 
        1
      );
    };
    
    window.addEventListener("resize", updateBreakpoint);
    updateBreakpoint(); // Vérifier le breakpoint initiale
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  useEffect(() => {
    if (topScores.length > 0) {
      const scoreInterval = setInterval(() => {
        setDisplayedScoreIndex((prevIndex) => (prevIndex + 1) % topScores.length);
      }, 1000);

      return () => clearInterval(scoreInterval);
    }
  }, [topScores.length]);

  // Calculer les scores à afficher selon le breakpoint
  const displayedScores = Array.from({ length: currentBreakpoint }, (_, i) => {
    const index = (displayedScoreIndex + i) % topScores.length;
    return topScores[index];
  });

  return (
    <div className="grid grid-flow-col w-full justify-evenly grid-rows-1 gap-4 text-[8px] font-sixtyFour text-[#FEFFB2]">
      {displayedScores.map((score, index) => (
        score ? (
          <div key={index} className="flex flex-row items-center pb-2 space-x-2">
            <div className="text-lg">{displayedScoreIndex + index + 1}:</div>
            <div>
              <div className="flex items-center">
                <span>{score.name || "xxxxxxx"}</span>
              </div>
              <div className="flex items-center">
                <span className="label text-[#61FF64]">Score:</span>
                <span className="text-[#61FF64] ml-1">
                  {String(score.score || 0).padStart(7, "0")}
                </span>
              </div>
              <div className="flex items-center">
                <span className="label text-[#FEFFB2]">Date:</span>
                <span className="ml-1">{score.date || "0000-00-00"}</span>
              </div>
            </div>
          </div>
        ) : null
      ))}
    </div>
  );
}
