"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchQuestionsQMatch, getSessionToken, finalizeGame, loadGameState } from "../utilities/fetch";
import { getScores } from "../utilities/scores";
import RotatingScores from "../utilities/RotatingScores";
import ScoreModal from "../utilities/ScoreModal";
import { testHighScore, clearScores } from "../utilities/testHighscore";
import PieTimer from "../utilities/pieTimer";

export default function QuickMatch() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topScores, setTopScores] = useState([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [hasBeatenHighScore, setHasBeatenHighScore] = useState(false);
  const [matchType] = useState("quickMatch");

  async function loadQuickMatchQuestions() {
    try {
      const token = await getSessionToken();
      const { questions: loadedQuestions, currentQuestionIndex } = await fetchQuestionsQMatch(15, "medium", token);

      setQuestions(loadedQuestions);
      setCurrentQuestionIndex(currentQuestionIndex || 0);
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  }

  useEffect(() => {
    const savedGameState = loadGameState();
    if (savedGameState.savedQuestions && savedGameState.savedQuestions.length > 0) {
      // Charge les questions sauvegardées et l'index
      setQuestions(savedGameState.savedQuestions);
      setCurrentQuestionIndex(savedGameState.currentQuestionIndex);
    } else {
      // Charge de nouvelles questions si aucun état n'est sauvegardé
      loadQuickMatchQuestions();
    }

    // Récupération et tri des meilleurs scores pour l'affichage rotatif
    const scores = getScores("quickMatch")
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setTopScores(scores);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const answers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(
        () => Math.random() - 0.5
      )
    : [];

  const handleAnswer = (isCorrect) => {
    let updatedScore = score;
    if (isCorrect) updatedScore += 1;
    setScore(updatedScore);

    // Sauvegarde l’état du jeu après chaque question
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex + 1);

    const allScores = getScores("quickMatch");
    const highestScore = allScores.length > 0 ? Math.max(...allScores.map((s) => s.score)) : 0;
    const currentScoreValue = updatedScore * 10000;
    if (currentScoreValue > highestScore && !hasBeatenHighScore) setHasBeatenHighScore(true);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsScoreModalOpen(true);
    }
  };

  const handleEndGame = (name) => {
    const finalScore = score * 10000;
    finalizeGame(name, finalScore, "quickMatch"); // Enregistre le score final et nettoie le localStorage
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false);
    setIsScoreModalOpen(false);
    router.push("/gameMenu");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="main_modal-quickmatch-banner absolute z-50 top-0 p-4 bg-black flex items-center space-x-5 w-full">
        <button
          id="btn_scores"
          className="flex flex-row justify-center items-center bg-black font-sixtyFour text-[#FEFFB2] w-[150px] px-[10px] py-[6px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[2px_2px_0px_0px_#FEFFB2]"
        >
          <span className="text-[#FEFFB2] flex text-[6px] tracking-wider">
            HIGH SCORES
          </span>
          <span className="text-[#FEFFB2] rotate-90 ml-2">&gt;</span>
        </button>
        <RotatingScores topScores={topScores} />
      </div>

      <main
        className={`flex flex-col justify-center items-center w-full h-full ${
          isScoreModalOpen ? "hidden" : ""
        }`}
      >
        <div className="main_modal-quickmatch top-0 z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%] relative">
          {hasBeatenHighScore && (
            <div className="text-yellow-400 font-bold text-lg animate-bounce">
              Nouveau Meilleur Score!
            </div>
          )}
          <div className="myscore_container text-[#61FF64] font-sixtyFour text-[30px]">
            <h2>Score: {score * 10000}</h2>
          </div>
          <div className="question_container bg-[#2B0C39] bg-opacity-65 border-r-[#FF38D4] shadow-[3px_4px_0px_0px_rgba(255,57,212)] w-full h-full flex flex-col  gap-5  items-center text-center p-14 justify-between rounded-xl">
            <div className="question_header opacity-100 flex flex-row font-tiltNeon text-[30px] w-full justify-between m-0">
              <h2 className="font-bold text-shadow-neon-pink text-stroke-pink absolute">{currentQuestion?.type === 'multiple' ? 'Choix Multiple' : currentQuestion?.type === 'boolean' ? 'Vrai ou Faux' : currentQuestion?.type === 'multiple' ? 'Choix Multiple' : currentQuestion?.type === 'boolean' ? 'Vrai ou Faux' : currentQuestion?.type}</h2>
              <h2 className="text-white font-bold relative questionType_title">{currentQuestion?.type === 'multiple' ? 'Choix Multiple' : currentQuestion?.type === 'boolean' ? 'Vrai ou Faux' : currentQuestion?.type === 'multiple' ? 'Choix Multiple' : currentQuestion?.type === 'boolean' ? 'Vrai ou Faux' : currentQuestion?.type}</h2>
              <div className="timer_container">
                <PieTimer duration={20} /> {/* Timer de 20 secondes */}
              </div>
            </div>
            <h3 className="text-white font-montserrat font-semibold text-[16px]">{currentQuestion?.question}</h3>
          </div>
          
          <nav className="answer_container flex flex-col items-center gap-5">
            {answers.map((answer, index) => (
              <button
                key={index}
                id="btn_reponse"
                className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[200px] px-[20px] py-[12px] items-center"
                onClick={() =>
                  handleAnswer(answer === currentQuestion?.correct_answer)
                }
              >
                {answer}
              </button>
            ))}
          </nav>
        </div>
      </main>
      <footer className="footer flex justify-center items-center p-4 space-x-4">
        <button
          onClick={() => testHighScore(handleEndGame)}
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

      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        onSave={handleEndGame}
        score={score * 10000}
        isBestScore={hasBeatenHighScore}
        matchType={matchType}
      />
    </div>
  );
}
