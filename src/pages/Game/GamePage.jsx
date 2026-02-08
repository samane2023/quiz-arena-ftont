import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataContext";
import { useAuth } from "../../contexts/AuthContext";

const POINTS_PER_CORRECT = 10;

const GREEN = "#1D3C41";
const ORANGE = "#FA812F";

const GamePage = () => {
  const { categoryId } = useParams();
  const categoryIdNum = Number(categoryId);
  const { questions, recordGameResult, categories } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === categoryIdNum);
  const categoryName = category ? category.name : "نامشخص";

  const gameQuestions = useMemo(
    () => questions.filter((q) => q.categoryId === categoryIdNum && q.active),
    [questions, categoryIdNum]
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (gameQuestions.length === 0) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl font-bold">Game - {categoryName}</h1>
        <p>No questions.</p>
      </div>
    );
  }

  const currentQuestion = gameQuestions[currentIndex];

  const handleOptionClick = (option) => {
    if (hasAnswered) return;

    setSelectedOptionId(option.id);
    setHasAnswered(true);

    if (option.isCorrect) {
      setScore((prev) => prev + POINTS_PER_CORRECT);
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const isLast = currentIndex === gameQuestions.length - 1;

    if (isLast) {
      if (currentUser) {
        recordGameResult(currentUser.id, categoryIdNum, score);
      }
      navigate("/result", {
        state: {
          totalQuestions: gameQuestions.length,
          correctCount,
          score,
          categoryId: categoryIdNum,
        },
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setHasAnswered(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
    setSelectedOptionId(null);
    setHasAnswered(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-6">Game - {categoryName}</h1>

      {!gameStarted ? (
        <div
          className="mx-auto mt-16 p-10 rounded-2xl text-white shadow-xl max-w-md"
          style={{ backgroundColor: GREEN }}
        >
          <h2 className="text-2xl font-black mb-6">
            Ready to start the game?
          </h2>
          <button
            onClick={() => setGameStarted(true)}
            className="px-8 py-3 rounded-xl text-white font-bold text-lg"
            style={{ backgroundColor: ORANGE }}
          >
            Let's go!🚀
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 font-bold">
            <span>
              Question {currentIndex + 1} from {gameQuestions.length}
            </span>
            <span> Score : {score}</span>
          </div>

          <div
            className="mx-auto mb-8 p-6 rounded-2xl text-white text-lg max-w-md"
            style={{ backgroundColor: GREEN }}
          >
            {currentQuestion.text}
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {currentQuestion.options.map((opt) => {
              let bg = GREEN;

              if (hasAnswered) {
                if (opt.isCorrect) bg = "#2ecc71";
                else if (selectedOptionId === opt.id) bg = "#e74c3c";
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt)}
                  disabled={hasAnswered}
                  className="p-5 rounded-xl text-white font-semibold transition transform hover:scale-105"
                  style={{ backgroundColor: bg }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between max-w-md mx-auto mt-8">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-6 py-2 rounded-xl text-white font-bold disabled:opacity-50"
              style={{ backgroundColor: ORANGE }}
            >
              Previous Question
            </button>

            {hasAnswered && (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-xl text-white font-bold"
                style={{ backgroundColor: ORANGE }}
              >
                {currentIndex === gameQuestions.length - 1
                  ? "End of Game"
                  : "Next Question"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
