"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Redirection
import { fetchQuestions, getSessionToken } from "../utilities/fetch"; // Page fetch
import { saveScore, getScores } from "../utilities/scores"; // Page scores
import RotatingScores from "../utilities/RotatingScores"; // Page pour scores rotatifs
import ScoreModal from "../utilities/ScoreModal"; // Modal du score final
import { testHighScore, clearScores } from "../utilities/testHighscore"; // Import testHighScore et clearScores

export default function QuickMatch() {
  const router = useRouter(); // Hook de Next.js pour la redirection
  const [questions, setQuestions] = useState([]); // Stock les questions récupérées
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question en cours
  const [sessionToken, setSessionToken] = useState(null); // Token de session
  const [score, setScore] = useState(0); // Score actuel
  const [topScores, setTopScores] = useState([]); // Liste des meilleurs scores
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false); // Visibilité de la modal du score
  const [hasBeatenHighScore, setHasBeatenHighScore] = useState(false); // Indique si le meilleur score a été battu
  const [matchType] = useState("quickMatch"); // Identifie le mode de jeu actuel

  // Fonction pour charger les questions
  async function loadQuestions() {
    if (!sessionToken) {
      const token = await getSessionToken(); // Récupère un token de session
      setSessionToken(token);
    }
    try {
      const questionData = await fetchQuestions(15, "any", "medium", "any", "default", sessionToken);
      setQuestions(questionData); // Charge les questions dans l'état
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  useEffect(() => {
    loadQuestions();

    // Récupération et tri des meilleurs scores pour l'affichage rotatif
    const scores = getScores("quickMatch")
      .sort((a, b) => b.score - a.score) // Trie les scores du plus grand au plus petit
      .slice(0, 5); // Prend les 5 meilleurs scores
    setTopScores(scores);
  }, [sessionToken]);

  const currentQuestion = questions[currentQuestionIndex];

  const answers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5)
    : []; // Mélange les réponses si currentQuestion est défini

  const handleAnswer = (isCorrect) => {
    let updatedScore = score;
    if (isCorrect) {
      updatedScore = score + 1;
      setScore(updatedScore); // Incrémente le score si la réponse est correcte
    }

    // Vérifie si le score actuel dépasse le meilleur score
    const allScores = getScores("quickMatch");
    const highestScore = allScores.length > 0 ? Math.max(...allScores.map(s => s.score)) : 0;
    const currentScoreValue = updatedScore * 10000;
    if (currentScoreValue > highestScore && !hasBeatenHighScore) {
      setHasBeatenHighScore(true);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Passe à la question suivante
    } else {
      setIsScoreModalOpen(true); // Ouvre la modal de fin de partie
    }
  };

  const handleReplay = (name) => {
    saveScore(name, score * 10000, "quickMatch"); // Enregistre le score
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false); // Réinitialise le flag
    loadQuestions();
    setIsScoreModalOpen(false); // Ferme la modal
  };

  const handleReturnToMenu = (name) => {
    saveScore(name, score * 10000, "quickMatch"); // Enregistre le score
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false); // Réinitialise le flag
    setIsScoreModalOpen(false);
    router.push("/gameMenu"); // Redirige vers le menu principal
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="main_modal-quickmatch-banner absolute z-50 top-0 p-4 bg-black flex items-center space-x-5 w-full">
        {/* Bouton pour afficher les meilleurs scores */}
        <button
          id="btn_scores"
          className="flex flex-row justify-center items-center bg-black font-sixtyFour text-[#FEFFB2] w-[150px] px-[10px] py-[6px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[2px_2px_0px_0px_#FEFFB2]"
        >
          <span className="text-[#FEFFB2] flex text-[6px] tracking-wider">HIGH SCORES</span>
          <span className="text-[#FEFFB2] rotate-90 ml-2">&gt;</span>
        </button>
        <RotatingScores topScores={topScores} />
      </div>

      {/* Affichage principal de la partie, caché lorsque la modal est ouverte */}
      <main className={`flex flex-col justify-center items-center w-full h-full ${isScoreModalOpen ? "hidden" : ""}`}>
        <div className="main_modal-quickmatch top-0 z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%]">
          {/* Affiche le score actuel */}
          {hasBeatenHighScore && (
              <div className="text-yellow-400 font-bold text-lg animate-bounce">
                Nouveau Meilleur Score!
              </div>
            )}
          <div className="myscore_container text-[#61FF64] font-sixtyFour text-[16px]">
            <h2>Score: {score * 10000}</h2>

          </div>

          {/* Affiche la question en cours */}
          <div className="question_container bg-[#2B0C39] border-r-[#FF38D4] w-full h-[100px] flex items-center justify-center px-5 text-center">
            <h3 className="text-white font-bold">{currentQuestion?.question}</h3>
          </div>

          {/* Affiche les réponses aléatoirement */}
          <nav className="answer_container flex flex-col items-center gap-5">
            {answers.map((answer, index) => (
              <button
                key={index}
                id="btn_reponse"
                className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center"
                onClick={() => handleAnswer(answer === currentQuestion?.correct_answer)}
              >
                {answer}
              </button>
            ))}
          </nav>
          <div className="logo ">
            <div className="ctrl_logo_h1 flex blur-[1px]">
              <h1 className="font-tiltNeon text-[80px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
              <h1 className="font-tiltNeon text-[80px] absolute text-pink-100">TRIVIA</h1>
            </div>
            <div className="ctrl_logo_h2 flex blur-[1px] m-[-35px] pr-2 justify-end">
              <h2 className="font-girlNextDoor font-thin text-[50px] text-shadow-neon-purple text-stroke-purple text-pink-100">NIGHTS</h2>
              <h2 className="font-girlNextDoor font-thin text-[50px] absolute text-pink-100">NIGHTS</h2>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer flex justify-center items-center p-4 space-x-4">
        <button
          onClick={() => testHighScore(handleGameOver)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Tester le Meilleur Score
        </button>
        <button
          onClick={clearScores}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Effacer les Scores
        </button>
      </footer>

      {/* Modal de score avec options pour rejouer ou retourner au menu */}
      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={handleReturnToMenu}
        onSave={handleReplay}
        score={score * 10000}
        isBestScore={hasBeatenHighScore} // Utilise le flag
        matchType={matchType}
      />
    </div>
  );
}