"use client";
import { useEffect, useState, useMemo, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  fetchQuestionsCMatch,
  saveGameState,
  loadGameState,
  clearGameState,
} from "../../utilities/fetch";
import { saveScore, getScores } from "../../utilities/scores";
import RotatingScores from "../../utilities/RotatingScores";
import ScoreModal from "../../utilities/ScoreModal";
import PieTimer from "../../utilities/pieTimer";
import HighScoreModal from "../../utilities/highScoreModal";

function decodeHtmlEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

function QueryParamsComponent({ setQueryParams }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    setQueryParams({
      amount: searchParams.get("amount"),
      category: searchParams.get("category"),
      difficulty: searchParams.get("difficulty"),
      type: searchParams.get("type"),
    });
  }, [searchParams, setQueryParams]);

  return null;
}

export default function CustomGamePage() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({
    amount: null,
    category: null,
    difficulty: null,
    type: null,
  });
  const [showHighScores, setShowHighScores] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [topScores, setTopScores] = useState([]);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [hasBeatenHighScore, setHasBeatenHighScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const matchType = "customMatch";
  const duration = 20;

  const goToMenu = () => {
    router.push("/gameMenu");
  };

  useEffect(() => {
    // Charger les meilleurs scores pour customMatch depuis le localStorage
    const scores = getScores(matchType)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
    setTopScores(scores);
  }, []);

  // Surveiller les changements de score pour détecter si le meilleur score est battu
  useEffect(() => {
    const currentHighScore = Math.max(...topScores.map((s) => s.score), 0);
    if (score > currentHighScore) {
      setHasBeatenHighScore(true);
    }
  }, [score, topScores]);

  const loadNewQuestions = useCallback(async () => {
    const hasValidQueryParams =
      queryParams.amount &&
      queryParams.category &&
      queryParams.difficulty &&
      queryParams.type;

    if (hasValidQueryParams) {
      try {
        const questionData = await fetchQuestionsCMatch(
          queryParams.amount,
          queryParams.category,
          queryParams.difficulty,
          queryParams.type
        );
        setQuestions(questionData.questions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(duration);
      } catch (error) {
        console.error("Erreur de chargement des questions:", error);
      }
    } else {
      router.push("/customMatch");
    }
  }, [queryParams, duration, router]);

  useEffect(() => {
    const savedGameState = loadGameState(matchType);

    if (
      savedGameState?.savedQuestions?.length > 0 &&
      savedGameState.savedQuestions
    ) {
      setQuestions(savedGameState.savedQuestions);
      setCurrentQuestionIndex(savedGameState.currentQuestionIndex || 0);
      setScore(savedGameState.currentScore || 0);
      setTimeLeft(duration);
    } else {
      loadNewQuestions();
    }
  }, [queryParams, duration, matchType, loadNewQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      saveGameState(questions, currentQuestionIndex, score, matchType);
    }
  }, [questions, currentQuestionIndex, score, matchType]);

  const currentQuestion = questions[currentQuestionIndex];

  const answers = useMemo(() => {
    if (currentQuestion) {
      return [
        ...currentQuestion.incorrect_answers,
        currentQuestion.correct_answer,
      ]
        .map(decodeHtmlEntities)
        .sort(() => Math.random() - 0.5);
    }
    return [];
  }, [currentQuestion]);

  const handleTimeUp = () => {
    handleAnswer(false);
  };

  const handleAnswer = (isCorrect) => {
    const baseScore = 200000;
    const penaltyPerSecond = 10000;

    const timeScore = isCorrect
      ? Math.max(
          baseScore - Math.floor((duration - timeLeft) * penaltyPerSecond),
          0
        )
      : 0;
    let updatedScore = score + timeScore;
    setScore(updatedScore);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(duration);
    } else {
      if (checkIfBestScore(updatedScore)) setHasBeatenHighScore(true);
      setIsScoreModalOpen(true);
    }
  };

  function checkIfBestScore(currentScore) {
    const scores = getScores(matchType);
    const highestScore = scores.length
      ? Math.max(...scores.map((s) => s.score))
      : 0;
    return currentScore > highestScore;
  }

  const handleReplay = (name) => {
    saveScore(name, score, matchType);
    clearGameState(matchType);
    setQuestions([]);
    setScore(0);
    setCurrentQuestionIndex(0);
    setHasBeatenHighScore(false);
    setIsScoreModalOpen(false);
    router.push("/customMatch");
  };

  const handleTimeChange = (newTimeLeft) => {
    setTimeLeft(newTimeLeft);
  };

  return (
    <div className="z-0 bg-brick-background bg-repeat bg-contain bg-[#31325D] w-full h-[100vh]">
      <Suspense fallback={<div>Loading...</div>}>
        <QueryParamsComponent setQueryParams={setQueryParams} />
      </Suspense>
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
            <p className={`text-lg text-[#FEFFB2] items-baseline ${showHighScores ? "-rotate-90" : "rotate-90"} transition-transform duration-200`}>
              &gt;
            </p>
          </button>
          {showHighScores && <HighScoreModal onClose={() => setShowHighScores(false)} />}
        </div>
        <RotatingScores topScores={topScores} />
      </div>
      <main
        className={`flex flex-col justify-center items-center w-full h-full ${
          isScoreModalOpen ? "hidden" : ""
        }`}
      >
        <div className="w-full h-[15%]"></div>
        <div className="main_modal-custommatch top-0 z-10 flex flex-col gap-10 justify-center items-center w-[90%] h-[90%]">
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
                  {currentQuestion.type === "multiple"
                    ? "Choix Multiple"
                    : currentQuestion.type === "boolean"
                    ? "Vrai ou Faux"
                    : currentQuestion.type}
                </h2>
                <h2 className="text-white font-bold absolute">
                  {currentQuestion.type === "multiple"
                    ? "Choix Multiple"
                    : currentQuestion.type === "boolean"
                    ? "Vrai ou Faux"
                    : currentQuestion.type}
                </h2>
                <div className="w-full flex flex-row justify-between">
                  <div className="w-[40px] h-[40px]"></div>
                  <div className="timer_container relative justify-end w-[40px] h-[40px]">
                    <PieTimer
                      key={currentQuestionIndex}
                      duration={duration}
                      onTimeUp={handleTimeUp}
                      onTimeChange={handleTimeChange}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-white font-montserrat font-semibold text-[16px]">
                {decodeHtmlEntities(currentQuestion.question)}
              </h3>
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
                onClick={() =>
                  handleAnswer(answer === currentQuestion.correct_answer)
                }
              >
                {answer}
              </button>
            ))}
          </nav>
        </div>
        <div className="w-full">
        <button
          onClick={goToMenu}
          className="btn_homeLogo-customMatch group z-30 flex mb-[10px] flex-row items-center gap-12 cursor-pointer w-full"
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
