import React, { useState, useEffect } from 'react';
import { getPendingQuestions, approveQuestion, rejectQuestion } from '../utils/api';

const AdminOversight = () => {
  const [pendingQuestions, setPendingQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const fetchPendingQuestions = async () => {
      try {
        const questions = await getPendingQuestions();
        setPendingQuestions(questions);
      } catch (error) {
        console.error('Failed to fetch pending questions:', error);
      }
    };

    fetchPendingQuestions();
  }, []);

  const handleApprove = async (questionId) => {
    try {
      await approveQuestion(questionId);
      setPendingQuestions(pendingQuestions.filter(q => q.id !== questionId));
      setSelectedQuestion(null);
    } catch (error) {
      console.error('Failed to approve question:', error);
    }
  };

  const handleReject = async (questionId) => {
    try {
      await rejectQuestion(questionId);
      setPendingQuestions(pendingQuestions.filter(q => q.id !== questionId));
      setSelectedQuestion(null);
    } catch (error) {
      console.error('Failed to reject question:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Oversight</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Pending Questions</h2>
        {pendingQuestions.length > 0 ? (
          <ul>
            {pendingQuestions.map((question) => (
              <li key={question.id} className="mb-2">
                <p><strong>Question:</strong> {question.question_text}</p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => handleApprove(question.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleReject(question.id)}
                >
                  Reject
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No pending questions available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOversight;
