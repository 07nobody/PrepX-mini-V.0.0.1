import React, { useEffect, useState } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { getUserResults } from '../utils/api';

const Dashboard = () => {
  const { user } = useClerk();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userResults = await getUserResults(user.id);
        setResults(userResults);
      } catch (error) {
        console.error('Failed to fetch user results:', error);
      }
    };

    fetchResults();
  }, [user.id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <p><strong>Name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.emailAddress}</p>
      </div>
      <div className="bg-white p-4 rounded shadow mt-4">
        <h2 className="text-xl font-semibold mb-2">Test Results</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id} className="mb-2">
                <p><strong>Test:</strong> {result.testTitle}</p>
                <p><strong>Score:</strong> {result.score}</p>
                <p><strong>Date:</strong> {new Date(result.completedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No test results available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
