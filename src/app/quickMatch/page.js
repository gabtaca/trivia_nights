"use client";

// Importation des hooks et fonctions nécessaires
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { fetchQuestionsQMatch, saveGameState, loadGameState } from "../utilities/fetch";
import { saveScore, getScores } from "../utilities/scores";
import RotatingScores from "../utilities/RotatingScores";
import ScoreModal from "../utilities/ScoreModal";
import PieTimer from "../utilities/pieTimer";
import HighScoreModal from "../utilities/highScoreModal";

// Décodage des entités HTML
function decodeHtmlEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export default function QuickMatchPage() {
  const [showHighScores, setShowHighScores] = useState(false);
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topScores, setTopScores] = useState([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [hasBeatenHighScore, setHasBeatenHighScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const matchType = "quickMatch";
  const duration = 20;

  const goToMenu = () => {
    router.push("/gameMenu");
  };

  // Charger les questions et les scores lors du premier rendu
  useEffect(() => {
    const savedGameState = loadGameState(matchType);
    if (savedGameState?.savedQuestions?.length > 0) {
      setQuestions(savedGameState.savedQuestions);
      setCurrentQuestionIndex(savedGameState.currentQuestionIndex || 0);
      setScore(savedGameState.currentScore || 0);
      setTimeLeft(duration);
    } else {
      loadNewQuestions();
    }

    const scores = getScores(matchType).sort((a, b) => b.score - a.score).slice(0, 5);
    setTopScores(scores);
  }, []);

  async function loadNewQuestions() {
    try {
      const questionData = await fetchQuestionsQMatch(15, "any");
      setQuestions(questionData.questions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setTimeLeft(duration);
    } catch (error) {
      console.error("Erreur de chargement des questions:", error);
    }
  }

  useEffect(() => {
    if (questions.length > 0) {
      saveGameState(questions, currentQuestionIndex, score, matchType);
    }
  }, [questions, currentQuestionIndex, score]);

  // Surveiller les changements de score pour vérifier le meilleur score
  useEffect(() => {
    const currentHighScore = Math.max(...topScores.map((s) => s.score), 0);
    if (score > currentHighScore) {
      setHasBeatenHighScore(true);
    }
  }, [score, topScores]);

  const currentQuestion = questions[currentQuestionIndex];

  const answers = useMemo(() => {
    if (currentQuestion) {
      return [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
        .map(decodeHtmlEntities)
        .sort(() => Math.random() - 0.5);
    }
    return [];
  }, [currentQuestion]);

  const handleTimeUp = () => {
    handleAnswer(false);
  };

  const calculateScore = (timeLeft) => {
    const baseScore = 200000;
    const penaltyPerSecond = 10000;
    return Math.max(baseScore - Math.floor((duration - timeLeft) * penaltyPerSecond), 0);
  };

  const handleAnswer = (isCorrect) => {
    const timeScore = calculateScore(timeLeft);
    let updatedScore = score;
    if (isCorrect) updatedScore += timeScore;
    setScore(updatedScore);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(duration);
    } else {
      setIsScoreModalOpen(true);
    }
  };

  const handleTimeChange = (newTimeLeft) => {
    setTimeLeft(newTimeLeft);
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <div className="main_modal-quickmatch-banner absolute z-50 top-0 p-4 bg-black flex items-center space-x-5 w-full">
        <div>
          <button
            id="btn_highScores-gameMenu"
            className="flex flex-row justify-between items-center text-center bg-black font-sixtyFour font-scan-0 text-[#FEFFB2] w-[190px] px-[20px] py-[7px] rounded-lg border-[#FEFFB2] border-[1.5px] shadow-[5px_5px_0px_0px_#FEFFB2]"
            onClick={() => setShowHighScores(!showHighScores)}
          >
            <p className="text-[#FEFFB2] pl-3 text-[16px] tracking-wider">SCORES</p>
            <p className={`text-lg text-[#FEFFB2] items-baseline ${showHighScores ? "-rotate-90" : "rotate-90"} transition-transform duration-200`}>
              &gt;
            </p>
          </button>

          {showHighScores && <HighScoreModal onClose={() => setShowHighScores(false)} />}
        </div>
        <RotatingScores topScores={topScores} />
      </div>

      <main className={`flex flex-col justify-center items-center w-full h-full ${isScoreModalOpen ? "hidden" : ""}`}>
        <div className="w-full h-[15%]"></div>
        <div className="main_modal-quickmatch top-0 z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%] relative">
          {hasBeatenHighScore && (
            <div className="text-yellow-400 font-bold text-lg animate-bounce">
              Nouveau Meilleur Score!
            </div>
          )}
          <div className="myscore_container text-[#61FF64] font-sixtyFour text-[16px]">
            <h2>Score: {score}</h2>
          </div>

          {currentQuestion && (
            <div className="question_container bg-[#2B0C39] bg-opacity-65 border-r-[#FF38D4] shadow-[3px_4px_0px_0px_rgba(255,57,212)] w-full h-full flex flex-col gap-5 items-center text-center p-10 justify-between rounded-3xl">
              <div className="question_header opacity-100 flex flex-row text-center self-center font-tiltNeon text-[30px] w-full justify-center m-0">
                <h2 className="flex font-bold text-shadow-neon-pink text-stroke-pink absolute">
                  {currentQuestion.type === "multiple" ? "Choix Multiple" : currentQuestion.type === "boolean" ? "Vrai ou Faux" : currentQuestion.type}
                </h2>
                <h2 className="text-white font-bold absolute">
                  {currentQuestion.type === "multiple" ? "Choix Multiple" : currentQuestion.type === "boolean" ? "Vrai ou Faux" : currentQuestion.type}
                </h2>
                <div className="w-full flex flex-row justify-between">
                  <div className="w-[40px] h-[40px]"></div>
                  <div className="timer_container relative justify-end w-[40px] h-[40px]">
                    <PieTimer key={currentQuestionIndex} duration={duration} onTimeUp={handleTimeUp} onTimeChange={handleTimeChange} />
                  </div>
                </div>
              </div>
              <h3 className="text-white font-montserrat font-semibold text-[16px]">{decodeHtmlEntities(currentQuestion.question)}</h3>
              <div className="w-full flex flex-row justify-end">
                <div className="question-progress flex text-white font-bold">
                  {currentQuestionIndex + 1}/{questions.length}
                </div>
              </div>
            </div>
          )}

          <nav className="answer_container flex flex-col items-center gap-5">
            {answers.map((answer, index) => (
              <button
                key={index}
                id="btn_reponse"
                className="font-montserrat font-bold text-white text-[12px] text-center border-[3.2px] rounded-[17px] border-[#FF38D3] bg-[#430086] w-[300px] md:w-[80vw] px-[20px] py-[12px] items-center"
                onClick={() => handleAnswer(answer === currentQuestion.correct_answer)}
              >
                {answer}
              </button>
            ))}
          </nav>
        </div>
        <div className="w-full">
          <button onClick={goToMenu} className="btn_homeLogo-customMatch flex flex-col cursor-pointer pt-5 pb-3 w-full">
            <div className="flex flex-col cursor-pointer pl-10">
              <div className="ctrl_logo_h1 flex blur-[0.5px]">
                <h1 className="font-tiltNeon text-[40px] text-shadow-neon-pink text-stroke-pink text-pink-100">TRIVIA</h1>
                <h1 className="font-tiltNeon text-[40px] absolute text-pink-100">TRIVIA</h1>
              </div>
              <div className="ctrl_logo_h2 flex w-full justify-end mt-[-10px] ml-[20px] blur-[0.5px]">
                <h2 className="font-girlNextDoor font-thin text-[25px] text-shadow-neon-purple text-stroke-purple text-pink-100">NIGHTS</h2>
                <h2 className="font-girlNextDoor font-thin text-[25px] absolute text-pink-100">NIGHTS</h2>
              </div>
            </div>
          </button>
        </div>
      </main>

      <ScoreModal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        score={score}
        isBestScore={hasBeatenHighScore}
        matchType={matchType}
        setQuestions={setQuestions}
        setScore={setScore}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setHasBeatenHighScore={setHasBeatenHighScore}
        setIsScoreModalOpen={setIsScoreModalOpen}
        loadQuickMatchQuestions={loadNewQuestions}
      />
    </div>
  );
}
