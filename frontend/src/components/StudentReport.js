import React, { useEffect, useState } from 'react';
import { getStudentReports } from '../utils/api';

const StudentReport = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const studentReports = await getStudentReports();
        setReports(studentReports);
      } catch (error) {
        console.error('Failed to fetch student reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Reports</h1>
      <div className="bg-white p-4 rounded shadow">
        {reports.length > 0 ? (
          <ul>
            {reports.map((report) => (
              <li key={report.id} className="mb-2">
                <p><strong>Student Name:</strong> {report.studentName}</p>
                <p><strong>Test:</strong> {report.testTitle}</p>
                <p><strong>Score:</strong> {report.score}</p>
                <p><strong>Date:</strong> {new Date(report.completedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No student reports available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentReport;
