import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionLiveDeployment = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [liveDeploymentStatus, setLiveDeploymentStatus] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/ready-for-live');
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

  const handleLiveDeploymentStatusChange = (e) => {
    setLiveDeploymentStatus(e.target.value);
  };

  const handleLiveDeploymentSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/live-deploy`, {
        live_deployment_status: liveDeploymentStatus,
      });
      setLiveDeploymentStatus('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/ready-for-live');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting live deployment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Live Deployment</h1>
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
        <p>No questions available for live deployment.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Deploy Question Live</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
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
            onClick={handleLiveDeploymentSubmit}
          >
            Submit Live Deployment
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionLiveDeployment;
