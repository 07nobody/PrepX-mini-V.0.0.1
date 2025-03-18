import React, { useState } from 'react';
import axios from 'axios';

const QuestionSubmission = () => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('MCQ');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/questions', {
        question_text: questionText,
        question_type: questionType,
        options,
        correct_answer: correctAnswer,
      });
      setSubmissionStatus('Question submitted successfully!');
    } catch (error) {
      setSubmissionStatus('Error submitting question.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit a Question</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={questionText}
        onChange={handleQuestionTextChange}
        placeholder="Enter your question here"
      />
      <select
        className="w-full p-2 border rounded mb-4"
        value={questionType}
        onChange={handleQuestionTypeChange}
      >
        <option value="MCQ">Multiple Choice Question</option>
        <option value="True/False">True/False</option>
      </select>
      {questionType === 'MCQ' && (
        <div className="mb-4">
          {options.map((option, index) => (
            <input
              key={index}
              className="w-full p-2 border rounded mb-2"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
      )}
      <input
        className="w-full p-2 border rounded mb-4"
        value={correctAnswer}
        onChange={handleCorrectAnswerChange}
        placeholder="Enter the correct answer"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit Question
      </button>
      {submissionStatus && (
        <div className="mt-4">
          <p>{submissionStatus}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionSubmission;
