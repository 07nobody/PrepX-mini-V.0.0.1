import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewUpdateRejectionCorrection = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [correctionText, setCorrectionText] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/needs-update-review-correction');
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

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleCorrectionTextChange = (e) => {
    setCorrectionText(e.target.value);
  };

  const handleRejectionSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/update-review-reject`, {
        rejection_reason: rejectionReason,
      });
      setRejectionReason('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-update-review-correction');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting rejection:', error);
    }
  };

  const handleCorrectionSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/correct`, {
        correction_text: correctionText,
      });
      setCorrectionText('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-update-review-correction');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting correction:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review, Update, Rejection, and Correction</h1>
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
        <p>No questions available for review, update, rejection, or correction.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Reject Question</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={rejectionReason}
            onChange={handleRejectionReasonChange}
            placeholder="Enter rejection reason"
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleRejectionSubmit}
          >
            Submit Rejection
          </button>
        </div>
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

export default QuestionReviewUpdateRejectionCorrection;
