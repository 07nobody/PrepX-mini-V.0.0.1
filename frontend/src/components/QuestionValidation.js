import React, { useState } from 'react';
import axios from 'axios';

const QuestionValidation = () => {
  const [question, setQuestion] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleValidation = async () => {
    try {
      const response = await axios.post('https://api.huggingface.co/validate', {
        question,
      });
      setValidationResult(response.data);
    } catch (error) {
      console.error('Error validating question:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Validation</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Enter your question here"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleValidation}
      >
        Validate Question
      </button>
      {validationResult && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Validation Result</h2>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(validationResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QuestionValidation;
