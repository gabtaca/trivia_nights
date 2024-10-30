"use client";

import { useEffect, useState } from "react";

export default function RotatingScores({ topScores }) {
  const [displayedScoreIndex, setDisplayedScoreIndex] = useState(0);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setDisplayedScoreIndex((prevIndex) => (prevIndex + 1) % topScores.length);
    }, 5000);

    return () => clearInterval(scoreInterval); 
  }, [topScores.length]);

  const currentScore = topScores[displayedScoreIndex] || {
    name: "xxxxxxx",
    score: "0000000",
    date: "00-00-0000",
  };

  return (
    <div
      id="quickMatch_highScore-top5"
      className="highScoreContainer text-[8px] flex flex-col font-sixtyFour text-[#FEFFB2] space-y-1"
    >
      <div className="flex items-center">
        <span className="label text-[#FEFFB2]">Nom:</span>
        <span className="ml-1">{currentScore.name}</span>
      </div>
      <div className="flex items-center">
        <span className="label text-[#61FF64]">Score:</span>
        <span className="text-[#61FF64] ml-1">{currentScore.score}</span>
      </div>
      <div className="flex items-center">
        <span className="label text-[#FEFFB2]">Date:</span>
        <span className="ml-1">{currentScore.date}</span>
      </div>
    </div>
  );
}
