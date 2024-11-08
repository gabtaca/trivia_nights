"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchQuestionsCMatch,
  loadGameState,
  saveGameState,
} from "../utilities/fetch";
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
import { getScores } from "../utilities/scores";

export default function CustomMatch() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState("null");
  const [selectedCategory, setSelectedCategory] = useState("null");
  const [selectedDifficulty, setSelectedDifficulty] = useState("null");
  const [selectedType, setSelectedType] = useState("null");
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [topScores, setTopScores] = useState([]);
  const [showHighScores, setShowHighScores] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const goToMenu = () => {
    router.push("/gameMenu");
  };

  useEffect(() => {
    const scores = getScores("customMatch")
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setTopScores(scores);
  }, []);

  // Fonction de validation des sélections
  const validateSelections = () => {
    return (
      selectedAmount !== "null" &&
      selectedCategory !== "null" &&
      selectedDifficulty !== "null" &&
      selectedType !== "null"
    );
  };

  useEffect(() => {
    if (validateSelections()) {
      setButtonDisabled(false); // Réactiver le bouton si toutes les sélections sont valides
    }
  }, [selectedAmount, selectedCategory, selectedDifficulty, selectedType]);

  const startGame = async () => {
    if (!validateSelections()) {
      setError(true); // Active immédiatement l'animation de secousse
      setButtonDisabled(true); // Désactiver le bouton

      // Change l'animationKey après l'erreur pour forcer le re-render
      setAnimationKey((prevKey) => prevKey + 1);

      // Arrête l'animation après un délai pour que `error` soit remis à false
      setTimeout(() => setError(false), 600);
      return;
    }

    // Démarre le jeu si toutes les sélections sont valides
    try {
      const result = await fetchQuestionsCMatch(
        selectedAmount,
        selectedCategory,
        selectedDifficulty,
        selectedType
      );
      if (result.questions.length === 0) {
        alert("Aucune question disponible pour les paramètres sélectionnés.");
        return;
      }

      const queryParams = `?amount=${selectedAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${selectedType}`;
      router.replace(`../customMatch/customGamePage${queryParams}`);
    } catch (error) {
      console.error("Erreur lors du démarrage de la partie :", error);
    }
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh] overflow-hidden">
      <div className="main_modal-custommatch-banner absolute z-50 top-0 p-4 bg-black flex items-center space-x-5 w-full">
        <div>
          <button
            id="btn_highScores-gameMenu"
            className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0 text-[#FEFFB2] w-[190px] px-[20px] py-[7px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]"
            onClick={() => setShowHighScores(!showHighScores)}
          >
            <p className="text-[#FEFFB2] pl-3 text-[16px] tracking-wider">
              SCORES
            </p>
            <p
              className={`text-lg text-[#FEFFB2] items-baseline ${
                showHighScores ? "-rotate-90" : "rotate-90"
              } transition-transform duration-200`}
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
          key={animationKey} // Utilisation de la clé pour rejouer l’animation
          className={`customSettings_container rounded-3xl bg-[#2b0c39] bg-opacity-60 shadow-[3px_4px_0px_0px_rgba(255,57,212)] ${
            error ? "animate-shake" : ""
          }`}
        >
          <div className="ctrl_customMatch-title flex p-10 justify-center">
            <h1 className="font-tiltNeon text-[35px] relative text-shadow-neon-pink text-stroke-pink text-pink-100">
              Partie personnalisée
            </h1>
            <h1 className="font-tiltNeon text-[35px] absolute text-pink-100">
              Partie personnalisée
            </h1>
          </div>
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

        <nav className="z-30">
          <button
            onClick={startGame}
            disabled={buttonDisabled} // Désactiver le bouton uniquement si une erreur est détectée après clic
            className={`font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] w-[250px] px-[20px] py-[15px] ${
              buttonDisabled
                ? "opacity-50 cursor-not-allowed border-gray-500"
                : "border-[#430086]"
            } bg-[#FF38D3]`}
          >
            LANCER LA PARTIE
          </button>
        </nav>

        <button
          onClick={goToMenu}
          className="btn_homeLogo-customMatch group z-30 flex flex-row items-center gap-12 cursor-pointer w-full"
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
          <span className="info_backToMenu hidden group-hover:flex font-tiltNeon text-shadow-scintillant text-lg text-white">
            Retour au Menu Principal
          </span>
        </button>
      </main>
    </div>
  );
}
