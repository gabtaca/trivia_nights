import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveScore } from "../utilities/scores";
import { clearGameState } from "../utilities/fetch";
import { launchFireworks } from "../utilities/fireworks";

export default function ScoreModal({
  isOpen,
  onClose,
  score,
  isBestScore,
  matchType,
  setQuestions,
  setScore,
  setCurrentQuestionIndex,
  setHasBeatenHighScore,
  setIsScoreModalOpen,
  loadQuickMatchQuestions,
}) {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && isBestScore) {
      setTimeout(() => launchFireworks(), 100);
    }
  }, [isOpen, isBestScore]);

  if (!isOpen) return null;

  const handleReplay = () => {
    if (!playerName) {
      setError(true);
      setDisableButtons(true);
      return;
    }

    const finalScore = score;
    saveScore(playerName, finalScore, matchType);
    clearGameState(matchType);

    // Réinitialiser les états locaux
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false);
    setIsScoreModalOpen(false);

    if (matchType === "quickMatch") {
      // Démarrer une nouvelle partie de Quick Game
      if (loadQuickMatchQuestions) {
        loadQuickMatchQuestions();
      }
    } else {
      // Rediriger vers la page de sélection des options pour Custom Match
      router.push("/customMatch");
    }
  };

  const handleReturnToMenu = () => {
    if (!playerName) {
      setError(true);
      setDisableButtons(true);
      return;
    }

    const finalScore = score;
    saveScore(playerName, finalScore, matchType);
    clearGameState(matchType);

    // Réinitialiser les états locaux
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false);
    setIsScoreModalOpen(false);

    router.push("/gameMenu");
  };

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
    setError(false);
    setDisableButtons(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {isBestScore && (
        <canvas
          id="fireworkCanvas"
          width="800"
          height="400"
          className="firework-canvas"
        ></canvas>
      )}

      <div
        className={`bg-[#2B0C39] bg-opacity-55 flex-col gap-5 flex items-center justify-center px-5 z-30 p-5 rounded-lg w-[300px] text-center relative ${
          error ? "animate-shake" : ""
        }`}
        style={{ animation: error ? "shake 0.3s ease" : "" }}
      >
        {isBestScore && (
          <div className="top-[-150px] bg-transparent font-tiltNeon text-yellow-300 p-3 rounded-lg font-bold animate-bounce">
            <p className="text-3xl">FÉLICITATION!</p>
            <p className="text-xl">VOUS AVEZ LE MEILLEUR SCORE!!</p>
          </div>
        )}
        <h2 className="text-xl text-[#FF38D4] font-semibold mb-4">
          Partie terminée! Votre score: {score}
        </h2>

        <input
          type="text"
          placeholder="Entrez votre nom"
          value={playerName}
          onChange={handleInputChange}
          className="border rounded p-2 w-full mb-2"
        />
        {error && (
          <p className="text-red-500 text-sm mb-2">Veuillez entrer votre nom</p>
        )}

        <div className="flex space-x-4">
          <button
            onClick={handleReplay}
            disabled={disableButtons}
            className={`font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[100px] px-[20px] py-[12px] items-center ${
              disableButtons ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            REJOUER
          </button>
          <button
            onClick={handleReturnToMenu}
            disabled={disableButtons}
            className={`font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[100px] px-[20px] py-[12px] items-center ${
              disableButtons ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            RETOUR AU MENU
          </button>
        </div>
      </div>
    </div>
  );
}
