import React, { useEffect, useState } from 'react';
import { getPerformanceData } from '../utils/api';
import { Line } from 'react-chartjs-2';

const PerformanceTracking = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const data = await getPerformanceData();
        setPerformanceData(data);
      } catch (error) {
        console.error('Failed to fetch performance data:', error);
      }
    };

    fetchPerformanceData();
  }, []);

  const chartData = {
    labels: performanceData.map((data) => data.date),
    datasets: [
      {
        label: 'Performance Score',
        data: performanceData.map((data) => data.score),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Performance Tracking</h1>
      <div className="bg-white p-4 rounded shadow">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default PerformanceTracking;
