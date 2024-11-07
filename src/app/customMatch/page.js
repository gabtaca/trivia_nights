"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadGameState } from "../utilities/fetch";
import categories from "../json/categories.json";
import difficulties from "../json/difficulties.json";
import types from "../json/types.json";
import amounts from "../json/amount.json";
import HighScoreModal from "../utilities/highScoreModal";
import RotatingScores from "../utilities/RotatingScores";
import {
  QuestionAmountDropdown,
  CategoryDropdown,
  DifficultyDropdown,
  TypeDropdown,
} from "../utilities/customDropdown";

export default function CustomMatch() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState("null");
  const [selectedCategory, setSelectedCategory] = useState("null");
  const [selectedDifficulty, setSelectedDifficulty] = useState("null");
  const [selectedType, setSelectedType] = useState("null");
  const [error, setError] = useState(false); // Gestion de l'erreur
  const [showHighScores, setShowHighScores] = useState(false);
  const [topScores, setTopScores] = useState([]);

  const goToMenu = () => {
    router.push("/gameMenu");
  };

  const startGame = () => {
    if (
      selectedAmount === "null" ||
      selectedCategory === "null" ||
      selectedDifficulty === "null" ||
      selectedType === "null"
    ) {
      setError(true);
    } else {
      const savedGameState = loadGameState("customMatch");
      if (
        savedGameState.savedQuestions &&
        savedGameState.savedQuestions.length > 0
      ) {
        const confirmNewGame = window.confirm(
          "Vous avez une partie en cours. Démarrer une nouvelle partie effacera votre progression actuelle. Voulez-vous continuer ?"
        );
        if (!confirmNewGame) {
          return; // Annuler le démarrage de la nouvelle partie
        }
      }
      setError(false);
      const queryParams = `?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`;
      router.push(`/customMatch/customGamePage${queryParams}`);
    }
  };

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("customMatch")) || [];
    setTopScores(savedScores.slice(0, 5)); // Charger le top 5 des scores
  }, []);

  useEffect(() => {
    if (
      selectedAmount !== "null" &&
      selectedCategory !== "null" &&
      selectedDifficulty !== "null" &&
      selectedType !== "null"
    ) {
      setError(false); // Supprime l'erreur si toutes les options sont sélectionnées
    }
  }, [selectedAmount, selectedCategory, selectedDifficulty, selectedType]);

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh] overflow-hidden">
      <div className="main_modal-quickmatch-banner absolute z-50 top-0 p-4 bg-black flex items-center space-x-5 w-full">
        <div>
          <button
            id="btn_highScores-gameMenu"
            className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0 text-[#FEFFB2] w-[190px] px-[20px] py-[7px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]"
            onClick={() => setShowHighScores(!showHighScores)} // Alterne l'état d'ouverture
          >
            <p className="text-[#FEFFB2] pl-3 text-[16px] tracking-wider">
              SCORES
            </p>
            <p
              className={`text-lg text-[#FEFFB2] items-baseline ${
                showHighScores ? "-rotate-90" : "rotate-90"
              } transition-transform duration-200`} // Ajoute une transition fluide
            >
              &gt;
            </p>
          </button>

          {showHighScores && (
            <HighScoreModal onClose={() => setShowHighScores(false)} />
          )}
        </div>
        <RotatingScores topScores={topScores} />
      </div>

      <div className="bg_gradient-top z-0 absolute w-full h-[20%] bg-gradient-to-b from-slate-900 to-transparent max-h-[100vh]"></div>
      <div className="bg_gradient-bot z-0 absolute bottom-0 w-full h-[20%] bg-gradient-to-t from-slate-900 to-transparent"></div>
      <div className="h_boost-div w-full h-[5%]"></div>

      <main className="flex flex-col z-20 justify-evenly items-center h-full w-full">
        <div
          className={`customSettings_container rounded-3xl bg-[#2b0c39] bg-opacity-60 shadow-[3px_4px_0px_0px_rgba(255,57,212)] ${
            error ? "animate-shake" : ""
          }`}
          style={{ animation: error ? "shake 0.3s ease" : "" }}
        >
          <div className="ctrl_customMatch-title flex p-10 justify-center">
            <h1 className="font-tiltNeon text-[35px] relative text-shadow-neon-pink text-stroke-pink text-pink-100">
              Partie personnalisée
            </h1>
            <h1 className="font-tiltNeon text-[35px] absolute text-pink-100">
              Partie personnalisée
            </h1>
          </div>
          {error && (
            <p className="text-red-500 text-lg mb-2 text-center">
              Veuillez sélectionner toutes les options
            </p>
          )}
          <nav className="flex flex-col justify-center relative text-center items-center p-10 gap-10">
            <QuestionAmountDropdown
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
              amounts={amounts}
              className={`${
                selectedAmount === "null" && error ? "border-red-500" : ""
              }`}
            />

            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={categories}
              className={`${
                selectedCategory === "null" && error ? "border-red-500" : ""
              }`}
            />

            <DifficultyDropdown
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
              difficulties={difficulties}
              className={`${
                selectedDifficulty === "null" && error ? "border-red-500" : ""
              }`}
            />

            <TypeDropdown
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              types={types}
              className={`${
                selectedType === "null" && error ? "border-red-500" : ""
              }`}
            />
          </nav>
        </div>

        <nav>
          <button
            onClick={startGame}
            disabled={error} // Désactiver le bouton uniquement si une erreur est présente
            className={`font-montserrat z-100 font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] w-[250px] px-[20px] py-[15px] ${
              error
                ? "opacity-50 cursor-not-allowed border-red-500"
                : "border-[#430086]"
            } bg-[#FF38D3]`}
          >
            LANCER LA PARTIE
          </button>
        </nav>

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
