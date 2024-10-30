"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import categories from "../json/categories.json";
import difficulties from "../json/difficulties.json";
import types from "../json/types.json";
import amounts from "../json/amount.json";

export default function CustomMatch() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState("null");
  const [selectedCategory, setSelectedCategory] = useState("null");
  const [selectedDifficulty, setSelectedDifficulty] = useState("null");
  const [selectedType, setSelectedType] = useState("null");

  const startGame = () => {
    router.push("/gameMenu");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="main_modal-quickmatch-banner z-50 top-0 p-4 bg-black flex-row w-full">
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

      <main className="flex flex-col z-20 justify-evenly items-center w-full h-full">
        <div className="myscore_container z-20 text-[#61FF64] font-sixtyFour text-[16px]">
          <h2>Score: 0000000</h2>
        </div>

        <div className="customSettings_container rounded-3xl bg-[#2b0c39] bg-opacity-60 shadow-[3px_4px_0px_0px_rgba(255,57,212)]">
          <div className="ctrl_customMatch-title flex p-10 justify-center">
            <h1 className="font-tiltNeon text-[35px] text-shadow-neon-pink text-stroke-pink text-pink-100">
              Partie personnalisée
            </h1>
          </div>

          <nav className="flex flex-col items-center p-10 gap-10">
            {/* Menu nombre de questions */}
            <select
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
              className="font-montserrat font-bold text-white text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px]"
            >
              {amounts.map((amt, index) => (
                <option key={amt.value} 
                value={amt.value} >
                  {amt.label}
                </option>
              ))}
            </select>

            {/* Menu catégories */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="font-montserrat font-bold text-white text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px]"
            >
              {categories.map((cat, index) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>

            {/* Menu déroulant pour les difficultés */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="font-montserrat font-bold text-white text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px]"
            >
              {difficulties.map((diff, index) => (
                <option key={diff.value} value={diff.value} >
                  {diff.label}
                </option>
              ))}
            </select>

            {/* Menu déroulant pour les types */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="font-montserrat font-bold text-white text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] px-[20px] py-[15px]"
            >
              {types.map((type, index) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
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

        <footer>
          <button
            onClick={startGame}
            className="btn_homeLogo-customMatch cursor-pointer w-full"
          >
            <div className="ctrl_logo_h1 flex blur-[0.5px]">
              <h1 className="font-tiltNeon text-[40px] text-shadow-neon-pink text-stroke-pink text-pink-100">
                TRIVIA
              </h1>
              <h1 className="font-tiltNeon text-[40px] absolute text-pink-100">
                TRIVIA
              </h1>
            </div>
            <div className="flex m-[-12px] mr-[-20px] blur-[0.5px] justify-end">
              <h2 className="font-girlNextDoor font-thin text-[25px] text-shadow-neon-purple text-stroke-purple text-pink-100">
                NIGHTS
              </h2>
              <h2 className="font-girlNextDoor font-thin text-[25px] absolute text-pink-100">
                NIGHTS
              </h2>
            </div>
          </button>
          <div className="match_type-customMatch"></div>
        </footer>
      </main>
    </div>
  );
}
