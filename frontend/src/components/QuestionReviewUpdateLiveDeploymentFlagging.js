import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewUpdateLiveDeploymentFlagging = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [liveDeploymentStatus, setLiveDeploymentStatus] = useState('');
  const [flagReason, setFlagReason] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/needs-update-live-deployment-flagging');
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

  const handleFlagReasonChange = (e) => {
    setFlagReason(e.target.value);
  };

  const handleUpdateLiveDeploymentFlagSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/update-live-deploy-flag`, {
        update_text: updateText,
        live_deployment_status: liveDeploymentStatus,
        flag_reason: flagReason,
      });
      setUpdateText('');
      setLiveDeploymentStatus('');
      setFlagReason('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-update-live-deployment-flagging');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting update, live deployment, and flag:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review, Update, Live Deployment, and Flagging</h1>
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
        <p>No questions available for update, live deployment, and flagging.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Update, Deploy Live, and Flag Question</h2>
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
            value={flagReason}
            onChange={handleFlagReasonChange}
            placeholder="Enter flag reason"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleUpdateLiveDeploymentFlagSubmit}
          >
            Submit Update, Live Deployment, and Flag
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewUpdateLiveDeploymentFlagging;
