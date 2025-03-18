import React, { useState, useEffect } from 'react';
import { getExams, createExam, updateExam, deleteExam } from '../utils/api';

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({ title: '', description: '', duration: '' });

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const fetchedExams = await getExams();
        setExams(fetchedExams);
      } catch (error) {
        console.error('Failed to fetch exams:', error);
      }
    };

    fetchExams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ ...newExam, [name]: value });
  };

  const handleCreateExam = async () => {
    try {
      const createdExam = await createExam(newExam);
      setExams([...exams, createdExam]);
      setNewExam({ title: '', description: '', duration: '' });
    } catch (error) {
      console.error('Failed to create exam:', error);
    }
  };

  const handleUpdateExam = async (id, updatedExam) => {
    try {
      const updated = await updateExam(id, updatedExam);
      setExams(exams.map((exam) => (exam.id === id ? updated : exam)));
    } catch (error) {
      console.error('Failed to update exam:', error);
    }
  };

  const handleDeleteExam = async (id) => {
    try {
      await deleteExam(id);
      setExams(exams.filter((exam) => exam.id !== id));
    } catch (error) {
      console.error('Failed to delete exam:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exam Management</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Exam</h2>
        <input
          type="text"
          name="title"
          value={newExam.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="description"
          value={newExam.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          name="duration"
          value={newExam.duration}
          onChange={handleInputChange}
          placeholder="Duration (minutes)"
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleCreateExam} className="bg-blue-500 text-white p-2 rounded">
          Create Exam
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Existing Exams</h2>
        {exams.length > 0 ? (
          <ul>
            {exams.map((exam) => (
              <li key={exam.id} className="mb-2">
                <p><strong>Title:</strong> {exam.title}</p>
                <p><strong>Description:</strong> {exam.description}</p>
                <p><strong>Duration:</strong> {exam.duration} minutes</p>
                <button onClick={() => handleUpdateExam(exam.id, { ...exam, title: 'Updated Title' })} className="bg-yellow-500 text-white p-2 rounded mr-2">
                  Update
                </button>
                <button onClick={() => handleDeleteExam(exam.id)} className="bg-red-500 text-white p-2 rounded">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exams available.</p>
        )}
      </div>
    </div>
  );
};

export default ExamManagement;
