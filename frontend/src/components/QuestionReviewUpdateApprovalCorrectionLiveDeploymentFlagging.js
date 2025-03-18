import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionReviewUpdateApprovalCorrectionLiveDeploymentFlagging = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [updateText, setUpdateText] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [correctionText, setCorrectionText] = useState('');
  const [liveDeploymentStatus, setLiveDeploymentStatus] = useState('');
  const [flaggingReason, setFlaggingReason] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/needs-review');
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

  const handleApprovalStatusChange = (e) => {
    setApprovalStatus(e.target.value);
  };

  const handleCorrectionTextChange = (e) => {
    setCorrectionText(e.target.value);
  };

  const handleLiveDeploymentStatusChange = (e) => {
    setLiveDeploymentStatus(e.target.value);
  };

  const handleFlaggingReasonChange = (e) => {
    setFlaggingReason(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/review`, {
        update_text: updateText,
        approval_status: approvalStatus,
        correction_text: correctionText,
        live_deployment_status: liveDeploymentStatus,
        flagging_reason: flaggingReason,
      });
      setUpdateText('');
      setApprovalStatus('');
      setCorrectionText('');
      setLiveDeploymentStatus('');
      setFlaggingReason('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/needs-review');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Review, Update, Approval, Correction, Live Deployment, and Flagging</h1>
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
        <p>No questions available for review.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Review and Update Question</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={updateText}
            onChange={handleUpdateTextChange}
            placeholder="Enter update text"
          />
          <select
            className="w-full p-2 border rounded mb-4"
            value={approvalStatus}
            onChange={handleApprovalStatusChange}
          >
            <option value="">Select Approval Status</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={correctionText}
            onChange={handleCorrectionTextChange}
            placeholder="Enter correction text"
          />
          <select
            className="w-full p-2 border rounded mb-4"
            value={liveDeploymentStatus}
            onChange={handleLiveDeploymentStatusChange}
          >
            <option value="">Select Live Deployment Status</option>
            <option value="deploy">Deploy</option>
            <option value="do-not-deploy">Do Not Deploy</option>
          </select>
          <textarea
            className="w-full p-2 border rounded mb-4"
            value={flaggingReason}
            onChange={handleFlaggingReasonChange}
            placeholder="Enter flagging reason"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionReviewUpdateApprovalCorrectionLiveDeploymentFlagging;
