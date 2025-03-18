import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewUpdateRejectionLiveDeployment = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/needs-update');
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

  const handleUpdateTextChange = (e) => {
    setUpdateText(e.target.value);
  };

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleUpdateSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/update`, {
        update_text: updateText,
      });
      setUpdateText('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-update');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting update:', error);
    }
  };

  const handleRejectionSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/review-reject`, {
        rejection_reason: rejectionReason,
      });
      setRejectionReason('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-update');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting rejection:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review, Update, Rejection, and Live Deployment</h1>
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
        <p>No questions available for update, rejection, or live deployment.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Update Question</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={updateText}
            onChange={handleUpdateTextChange}
            placeholder="Enter update text"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateSubmit}
          >
            Submit Update
          </button>
        </div>
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
    </div>
  );
};

export default QuestionReviewUpdateRejectionLiveDeployment;
