import React, { useState } from 'react';

function SuccessRate() {
  const [successCount, setSuccessCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  // Function to calculate and display metrics
  const calculateMetrics = () => {
    const successRate = totalCount === 0 ? 0 : (successCount / totalCount) * 100;
    const averageTime = totalCount === 0 ? 0 : totalTime / totalCount;
    return { successRate, averageTime };
  };

  // Example function to make an API request
  const makeApiRequest = async () => {
    const startTime = Date.now();
    setTotalCount(prevCount => prevCount + 1);

    try {
      const response = await fetch('https://zinny.pythonanywhere.com/api/agendas');
    //   const data = await response.json();
      if (response.ok) {
        setSuccessCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      const endTime = Date.now();
      setTotalTime(prevTime => prevTime + (endTime - startTime));
    }
  };

  const { successRate, averageTime } = calculateMetrics();

  return (
    <div>
      <h1>API Metrics</h1>
      <p>Success Rate: {successRate.toFixed(2)}%</p>
      <p>Average Time: {averageTime.toFixed(2)}ms</p>
      <button onClick={makeApiRequest}>Make API Request</button>
    </div>
  );
}

export default SuccessRate;
