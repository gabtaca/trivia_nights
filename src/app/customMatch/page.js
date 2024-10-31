"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import categories from "../json/categories.json";
import difficulties from "../json/difficulties.json";
import types from "../json/types.json";
import amounts from "../json/amount.json";
import { QuestionAmountDropdown, CategoryDropdown, DifficultyDropdown, TypeDropdown } from "../utilities/customDropdown";

export default function CustomMatch() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState("null");
  const [selectedCategory, setSelectedCategory] = useState("null");
  const [selectedDifficulty, setSelectedDifficulty] = useState("null");
  const [selectedType, setSelectedType] = useState("null");

  // function de retour vers le menu
  const goToMenu = () => {
    router.push("/gameMenu");
  };

  const startGame = () => {
    const queryParams = `?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`;
    router.push(`/customMatch/customGamePage${queryParams}`);
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh] overflow-hidden">
      <div className="main_modal-quickmatch-banner absolute top z-50 top-0 p-4 bg-black flex-row w-full">
        <button
          id="btn_scores"
          className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0 text-[#FEFFB2] w-[150px] px-[10px] py-[6px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[2px_2px_0px_0px_#FEFFB2]"
        >
          <span className="text-[#FEFFB2] text-[9px] tracking-wider">
            HIGH SCORES
          </span>
          <span className="text-[#FEFFB2] items-baseline rotate-90">&gt;</span>
        </button>
      </div>

      <div className="bg_gradient-top z-0 absolute w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent max-h-[100vh]"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <div className="h_boost-div w-full h-[5%]"></div>
      
      <main className="flex flex-col z-20 justify-evenly items-center h-full w-full">
        <div className="customSettings_container rounded-3xl bg-[#2b0c39] bg-opacity-60 shadow-[3px_4px_0px_0px_rgba(255,57,212)]">
          <div className="ctrl_customMatch-title flex p-10 justify-center">
            <h1 className="font-tiltNeon text-[35px] relative text-shadow-neon-pink text-stroke-pink text-pink-100">
              Partie personnalisée
            </h1>
            <h1 className="font-tiltNeon text-[35px] absolute text-pink-100">
              Partie personnalisée
            </h1>
          </div>

          <nav className="flex flex-col justify-center relative text-center items-center p-10 gap-10">
            {/* Menu nombre de questions */}
            <QuestionAmountDropdown selectedAmount={selectedAmount} setSelectedAmount={setSelectedAmount} amounts={amounts} />

            {/* Menu catégories */}
            <CategoryDropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />

            {/* Menu déroulant pour les difficultés */}
            <DifficultyDropdown selectedDifficulty={selectedDifficulty} setSelectedDifficulty={setSelectedDifficulty} difficulties={difficulties} />

            {/* Menu déroulant pour les types */}
            <TypeDropdown selectedType={selectedType} setSelectedType={setSelectedType} types={types} />
          </nav>
        </div>

        <nav>
          <button
            onClick={startGame}
            className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#430086] bg-[#FF38D3] w-[250px] px-[20px] py-[15px]"
          >
            LANCER LA PARTIE
          </button>
        </nav>

        {/* Updated button to use goToMenu function */}
        <button
          onClick={goToMenu}
          className="btn_homeLogo-customMatch flex flex-col cursor-pointer w-full"
        >
          <div className="flex flex-col cursor-pointer pl-10">
            <div className="ctrl_logo_h1 flex blur-[0.5px]">
              <h1 className="font-tiltNeon text-[40px] text-shadow-neon-pink text-stroke-pink text-pink-100">
                TRIVIA
              </h1>
              <h1 className="font-tiltNeon text-[40px] absolute text-pink-100">
                TRIVIA
              </h1>
            </div>
            <div className="ctrl_logo_h2 flex w-full justify-end mt-[-10px] ml-[20px] blur-[0.5px]">
              <h2 className="font-girlNextDoor font-thin text-[25px] text-shadow-neon-purple text-stroke-purple text-pink-100">
                NIGHTS
              </h2>
              <h2 className="font-girlNextDoor font-thin text-[25px] absolute text-pink-100">
                NIGHTS
              </h2>
            </div>
          </div>
        </button>
      </main>
    </div>
  );
}
