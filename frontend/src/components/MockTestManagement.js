import React, { useState, useEffect } from 'react';
import { getMockTests, createMockTest, updateMockTest, deleteMockTest } from '../utils/api';

const MockTestManagement = () => {
  const [mockTests, setMockTests] = useState([]);
  const [newMockTest, setNewMockTest] = useState({ title: '', description: '', duration: '' });

  useEffect(() => {
    const fetchMockTests = async () => {
      try {
        const tests = await getMockTests();
        setMockTests(tests);
      } catch (error) {
        console.error('Failed to fetch mock tests:', error);
      }
    };

    fetchMockTests();
  }, []);

  const handleCreateMockTest = async () => {
    try {
      const createdTest = await createMockTest(newMockTest);
      setMockTests([...mockTests, createdTest]);
      setNewMockTest({ title: '', description: '', duration: '' });
    } catch (error) {
      console.error('Failed to create mock test:', error);
    }
  };

  const handleUpdateMockTest = async (id, updatedTest) => {
    try {
      const updated = await updateMockTest(id, updatedTest);
      setMockTests(mockTests.map(test => (test.id === id ? updated : test)));
    } catch (error) {
      console.error('Failed to update mock test:', error);
    }
  };

  const handleDeleteMockTest = async (id) => {
    try {
      await deleteMockTest(id);
      setMockTests(mockTests.filter(test => test.id !== id));
    } catch (error) {
      console.error('Failed to delete mock test:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mock Test Management</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Mock Test</h2>
        <input
          type="text"
          placeholder="Title"
          value={newMockTest.title}
          onChange={(e) => setNewMockTest({ ...newMockTest, title: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={newMockTest.description}
          onChange={(e) => setNewMockTest({ ...newMockTest, description: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={newMockTest.duration}
          onChange={(e) => setNewMockTest({ ...newMockTest, duration: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button onClick={handleCreateMockTest} className="bg-blue-500 text-white p-2 rounded">
          Create Mock Test
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Existing Mock Tests</h2>
        {mockTests.length > 0 ? (
          <ul>
            {mockTests.map((test) => (
              <li key={test.id} className="mb-2">
                <p><strong>Title:</strong> {test.title}</p>
                <p><strong>Description:</strong> {test.description}</p>
                <p><strong>Duration:</strong> {test.duration} minutes</p>
                <button onClick={() => handleUpdateMockTest(test.id, { ...test, title: 'Updated Title' })} className="bg-yellow-500 text-white p-2 rounded mr-2">
                  Update
                </button>
                <button onClick={() => handleDeleteMockTest(test.id)} className="bg-red-500 text-white p-2 rounded">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No mock tests available.</p>
        )}
      </div>
    </div>
  );
};

export default MockTestManagement;
