import { useEffect, useState } from "react";
import fetchQuizData from "./fetchQuizData";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchQuizData();
        if (data?.questions?.length) {
          setQuestions(data.questions);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        setError("Failed to load quiz. Please try again later.", err);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion]?.options?.find(opt => opt.is_correct)?.description) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedAnswer(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading quiz...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {!quizFinished ? (
        <>
          <h2 className="text-xl font-bold mb-4">
            {questions[currentQuestion]?.description}
          </h2>
          <ul className="space-y-2">
            {questions[currentQuestion]?.options?.map((option, index) => (
              <li
                key={option.id || index}
                className={`p-3 border rounded-lg cursor-pointer transition duration-200 ${
                  selectedAnswer === option.description
                    ? "bg-blue-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswer(option.description)}
              >
                {option.description}
              </li>
            ))}
          </ul>
          <button
            className={`mt-4 px-4 py-2 rounded transition duration-200 ${
              selectedAnswer
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion + 1 < questions.length ? "Next" : "Finish Quiz"}
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          <p className="mt-2 text-lg">
            Your Score: {score} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
