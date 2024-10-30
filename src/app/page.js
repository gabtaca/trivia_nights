/*StartScreen*/

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StartScreen() {
  const router = useRouter();

  useEffect(() => {
    // Initialize base score for quickMatch if it doesn't exist
    const quickMatchScores = JSON.parse(localStorage.getItem("quickMatch"));
    if (!quickMatchScores) {
      localStorage.setItem("quickMatch", JSON.stringify([{ name: "", score: '0000000', date: new Date().toLocaleDateString() }]));
    }

    // Initialize base score for customMatch if it doesn't exist
    const customMatchScores = JSON.parse(localStorage.getItem("customMatch"));
    if (!customMatchScores) {
      localStorage.setItem("customMatch", JSON.stringify([{ name: "", score: '0000000', date: new Date().toLocaleDateString() }]));
    }
  }, []);

  const startGame = () => {
    router.push("/gameMenu");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="bg_gradient-top z-0 absolute top-0 w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <main className="flex flex-col justify-center items-center w-full h-full">
        <div className="main_modal-homeMenu z-40 flex flex-col items-center bg-[#2B0B38] bg-opacity-[79%] w-[90%] h-[80%] rounded-[50px] justify-evenly">
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
            START
          </button>
        </div>
      </main>
    </div>
  );
}
