import { useState } from "react";
import Quiz from "./components/Quiz";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!quizStarted ? (
        <div className="bg-white p-8 shadow-lg rounded-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz</h1>
          <p className="text-gray-600 mb-6">Test your knowledge and see how well you do!</p>
          <button
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition duration-200"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
