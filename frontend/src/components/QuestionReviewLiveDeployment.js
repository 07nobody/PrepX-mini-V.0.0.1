import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewLiveDeployment = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [reviewStatus, setReviewStatus] = useState('');
  const [liveDeploymentStatus, setLiveDeploymentStatus] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/pending-review-live-deployment');
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

  const handleReviewStatusChange = (e) => {
    setReviewStatus(e.target.value);
  };

  const handleLiveDeploymentStatusChange = (e) => {
    setLiveDeploymentStatus(e.target.value);
  };

  const handleReviewLiveDeploymentSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/review-live-deploy`, {
        review_status: reviewStatus,
        live_deployment_status: liveDeploymentStatus,
      });
      setReviewStatus('');
      setLiveDeploymentStatus('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/pending-review-live-deployment');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting review and live deployment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review and Live Deployment</h1>
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
        <p>No questions available for review and live deployment.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Review and Deploy Question Live</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <select
            className="w-full p-2 border rounded mb-4"
            value={reviewStatus}
            onChange={handleReviewStatusChange}
          >
            <option value="">Select Review Status</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
          <select
            className="w-full p-2 border rounded mb-4"
            value={liveDeploymentStatus}
            onChange={handleLiveDeploymentStatusChange}
          >
            <option value="">Select Live Deployment Status</option>
            <option value="live_deployed">Deploy Live</option>
            <option value="not_live_deployed">Do Not Deploy Live</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleReviewLiveDeploymentSubmit}
          >
            Submit Review and Live Deployment
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewLiveDeployment;
