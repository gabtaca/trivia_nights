"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchQuestionsCMatch } from "../../utilities/fetch"; // N'utilisez pas getSessionToken ici
import { saveScore, getScores } from "../../utilities/scores";
import RotatingScores from "../../utilities/RotatingScores";
import ScoreModal from "../../utilities/ScoreModal";
import { testHighScore, clearScores } from "../../utilities/testHighscore";

export default function CustomGamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedAmount = searchParams.get("amount");
  const selectedCategory = searchParams.get("category");
  const selectedDifficulty = searchParams.get("difficulty");
  const selectedType = searchParams.get("type");

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topScores, setTopScores] = useState([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [hasBeatenHighScore, setHasBeatenHighScore] = useState(false);
  const [matchType] = useState("customMatch");

  async function loadQuestions() {
    try {
      const questionData = await fetchQuestionsCMatch(
        selectedAmount,
        selectedCategory,
        selectedDifficulty,
        selectedType
      );
      setQuestions(questionData);
    } catch (error) {
      console.error("Erreur de chargement des questions:", error);
    }
  }

  useEffect(() => {
    loadQuestions();
    const scores = getScores("customMatch")
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setTopScores(scores);
  }, [selectedAmount, selectedCategory, selectedDifficulty, selectedType]);

  const currentQuestion = questions[currentQuestionIndex];

  const answers = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5)
    : [];

  const handleAnswer = (isCorrect) => {
    let updatedScore = score;
    if (isCorrect) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }

    const allScores = getScores("customMatch");
    const highestScore = allScores.length > 0 ? Math.max(...allScores.map((s) => s.score)) : 0;
    const currentScoreValue = updatedScore * 10000;
    if (currentScoreValue > highestScore && !hasBeatenHighScore) {
      setHasBeatenHighScore(true);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsScoreModalOpen(true);
    }
  };

  const handleReplay = (name) => {
    saveScore(name, score * 10000, "customMatch");
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false);
    loadQuestions();
    setIsScoreModalOpen(false);
  };

  const handleReturnToMenu = (name) => {
    saveScore(name, score * 10000, "customMatch");
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false);
    setIsScoreModalOpen(false);
    router.push("/gameMenu");
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="main_modal-custommatch-banner absolute z-50 top-0 p-4 bg-black flex items-center space-x-5 w-full">
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

      <main className={`flex flex-col justify-center items-center w-full h-full ${isScoreModalOpen ? "hidden" : ""}`}>
        <div className="main_modal-custommatch top-0 z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%]">
          {hasBeatenHighScore && (
            <div className="text-yellow-400 font-bold text-lg animate-bounce">
              Nouveau Meilleur Score!
            </div>
          )}
          <div className="myscore_container text-[#61FF64] font-sixtyFour text-[16px]">
            <h2>Score: {score * 10000}</h2>
          </div>

          <div className="question_container bg-[#2B0C39] border-r-[#FF38D4] w-full h-[100px] flex items-center justify-center px-5 text-center">
            <h3 className="text-white font-bold">{currentQuestion?.question}</h3>
          </div>
          

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
        </div>
      </main>

      <footer className="footer flex justify-center items-center p-4 space-x-4">
        <button
          onClick={() => testHighScore(handleReplay)}
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
        onClose={handleReturnToMenu}
        onSave={handleReplay}
        score={score * 10000}
        isBestScore={hasBeatenHighScore}
        matchType={matchType}
      />
    </div>
  );
}
