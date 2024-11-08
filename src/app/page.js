"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function StartScreen() {
  const router = useRouter();
  const [showQuickMatchButton, setShowQuickMatchButton] = useState(false);
  const [showCustomMatchButton, setShowCustomMatchButton] = useState(false);

  useEffect(() => {
    // Initialiser les listes de high scores pour quickMatch et customMatch
    const initializeHighScores = (matchType) => {
      const scores = JSON.parse(localStorage.getItem(`${matchType}`));
      if (!scores) {
        localStorage.setItem(
          `${matchType}`,
          JSON.stringify(Array(5).fill({ name: "xxxxxxx", score: 0, date: "0000-00-00" }))
        );
      }
    };

    initializeHighScores("quickMatch");
    initializeHighScores("customMatch");

    // Vérifier si une partie sauvegardée existe pour quickMatch ou customMatch
    const quickMatchSaved = localStorage.getItem("quickMatch_savedQuestions");
    const customMatchSaved = localStorage.getItem("customMatch_savedQuestions");

    if (quickMatchSaved && JSON.parse(quickMatchSaved).length > 0) {
      setShowQuickMatchButton(true);
    }
    if (customMatchSaved && JSON.parse(customMatchSaved).length > 0) {
      setShowCustomMatchButton(true);
    }
  }, []);

  const startGame = () => router.push("/gameMenu");

  const continueQuickMatch = () => {
    router.push("/quickMatch");
  };

  const continueCustomMatch = () => {
    router.push("/customMatch/customGamePage");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="flex flex-col justify-between z-0 h absolute h-full w-full">
        <div className="bg_gradient-top  w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
        <div className="bg_gradient-bot  w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      </div>

      <main className="flex flex-col justify-center items-center w-full h-full">
        <div className="main_modal-homeMenu md:outline-scintillant z-40 flex flex-col items-center bg-[#2B0B38] bg-opacity-[79%] w-[90%] h-[80%] rounded-[50px] justify-evenly">
        <div className="logo">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[109px] text-shadow-neon-pink text-stroke-pink text-pink-100">
                TRIVIA
              </h1>
              <h1 className="font-tiltNeon text-[109px] absolute text-pink-100">
                TRIVIA
              </h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[67px] text-shadow-neon-purple text-stroke-purple text-pink-100">
                NIGHTS
              </h2>
              <h2 className="font-girlNextDoor font-thin text-[67px] absolute text-pink-100">
                NIGHTS
              </h2>
            </div>
          </div>

          <div className="welcome_text flex flex-col font-montserrat font-bold text-white text-[12px] gap-6 p-6 text-center w-[300px] sm:w-270px">
            <p>
              Trivia nights vous offre un défi contre la montre où vous avez à
              répondre à des questions rapidement et correctement pour accumuler
              des points.
            </p>
            <p>
              En partie rapide ou personnalisée, mettez à l’épreuve vos méninges
              et battez les scores des génies avant vous!
            </p>
          </div>
          <button
            onClick={startGame}
            className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center"
          >
            COMMENCER
          </button>

          {showQuickMatchButton && (
            <button
              onClick={continueQuickMatch}
              className="font-montserrat font-bold text-[#430086] text-[12px] text-center border-[3.2px] rounded-[17px] border-[#00c72b] bg-[#fff94f] w-[200px]w-[200px] px-[20px] py-[12px] items-center mt-4"
            >
              CONTINUER PARTIE RAPIDE
            </button>
          )}

          {showCustomMatchButton && (
            <button
              onClick={continueCustomMatch}
              className="font-montserrat font-bold text-[#430086] text-[12px] text-center border-[3.2px] rounded-[17px] border-[#00c72b] bg-[#fff94f] w-[200px]w-[200px] px-[20px] py-[12px] items-center mt-4"
            >
              CONTINUER PARTIE PERSONNALISÉE
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
