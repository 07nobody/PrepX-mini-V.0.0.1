import React, { useEffect, useState } from 'react';
import { getLeaderboardData } from '../utils/api';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const data = await getLeaderboardData();
        setLeaderboard(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <div className="bg-white p-4 rounded shadow">
        {leaderboard.length > 0 ? (
          <ul>
            {leaderboard.map((student, index) => (
              <li key={student.id} className="mb-2">
                <p><strong>Rank:</strong> {index + 1}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Score:</strong> {student.score}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No leaderboard data available.</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
