import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewCorrection = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [correctionText, setCorrectionText] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/needs-review-correction');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleCorrectionTextChange = (e) => {
    setCorrectionText(e.target.value);
  };

  const handleCorrectionSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/review-correct`, {
        correction_text: correctionText,
      });
      setCorrectionText('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-review-correction');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting correction:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review and Correction</h1>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question) => (
            <li key={question.id} className="mb-2">
              <div
                className="p-4 border rounded cursor-pointer"
                onClick={() => handleQuestionSelect(question)}
              >
                <p className="font-semibold">{question.question_text}</p>
                <p className="text-sm text-gray-600">Type: {question.question_type}</p>
                <p className="text-sm text-gray-600">Status: {question.validation_status}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available for review and correction.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Correct Question</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={correctionText}
            onChange={handleCorrectionTextChange}
            placeholder="Enter correction text"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCorrectionSubmit}
          >
            Submit Correction
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewCorrection;
