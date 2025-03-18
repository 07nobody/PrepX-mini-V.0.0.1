import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionApproval = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/pending');
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

  const handleApprovalStatusChange = (e) => {
    setApprovalStatus(e.target.value);
  };

  const handleApprovalSubmit = async () => {
    if (!selectedQuestion) return;

    try {
      await axios.post(`/api/questions/${selectedQuestion.id}/approve`, {
        approval_status: approvalStatus,
      });
      setApprovalStatus('');
      setSelectedQuestion(null);
      // Refresh the question list
      const response = await axios.get('/api/questions/pending');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error submitting approval:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Approval</h1>
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
        <p>No questions available for approval.</p>
      )}

      {selectedQuestion && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Approve Question</h2>
          <p className="mb-2">{selectedQuestion.question_text}</p>
          <select
            className="w-full p-2 border rounded mb-4"
            value={approvalStatus}
            onChange={handleApprovalStatusChange}
          >
            <option value="">Select Approval Status</option>
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleApprovalSubmit}
          >
            Submit Approval
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionApproval;
