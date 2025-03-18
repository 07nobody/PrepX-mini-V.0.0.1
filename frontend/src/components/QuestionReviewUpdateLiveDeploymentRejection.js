import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewUpdateLiveDeploymentRejection = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [liveDeploymentStatus, setLiveDeploymentStatus] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/needs-update-live-deployment-review');
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

  const handleLiveDeploymentStatusChange = (e) => {
    setLiveDeploymentStatus(e.target.value);
  };

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleUpdateLiveDeploymentRejectionSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/update-live-deploy-reject`, {
        update_text: updateText,
        live_deployment_status: liveDeploymentStatus,
        rejection_reason: rejectionReason,
      });
      setUpdateText('');
      setLiveDeploymentStatus('');
      setRejectionReason('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-update-live-deployment-review');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting update, live deployment, and rejection:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review, Update, Live Deployment, and Rejection</h1>
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
        <p>No questions available for review, update, live deployment, and rejection.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Update, Deploy Live, and Reject Question</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={updateText}
            onChange={handleUpdateTextChange}
            placeholder="Enter update text"
          />
          <select
            className="w-full p-2 border rounded mb-4"
            value={liveDeploymentStatus}
            onChange={handleLiveDeploymentStatusChange}
          >
            <option value="">Select Live Deployment Status</option>
            <option value="live_deployed">Deploy Live</option>
            <option value="not_live_deployed">Do Not Deploy Live</option>
          </select>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={rejectionReason}
            onChange={handleRejectionReasonChange}
            placeholder="Enter rejection reason"
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateLiveDeploymentRejectionSubmit}
          >
            Submit Update, Live Deployment, and Rejection
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewUpdateLiveDeploymentRejection;
