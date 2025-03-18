import React, { useState } from 'react';

const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test</h1>
      {score === null ? (
        <div>
          {questions.length > 0 ? (
            <div>
              <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p>{questions[currentQuestionIndex].questionText}</p>
                <div className="mt-2">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <div key={option} className="mb-2">
                      <label>
                        <input
                          type="radio"
                          name={`question-${questions[currentQuestionIndex].id}`}
                          value={option}
                          checked={answers[questions[currentQuestionIndex].id] === option}
                          onChange={() =>
                            handleAnswerChange(questions[currentQuestionIndex].id, option)
                          }
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0))
                  }
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() =>
                    setCurrentQuestionIndex((prevIndex) =>
                      Math.min(prevIndex + 1, questions.length - 1)
                    )
                  }
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </button>
              </div>
              {currentQuestionIndex === questions.length - 1 && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Score</h2>
          <p>{score} out of {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default Test;
