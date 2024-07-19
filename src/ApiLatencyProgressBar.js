// src/components/ApiLatencyProgressBar.js
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';

const ApiLatencyProgressBar = () => {
  const [responseTimes, setResponseTimes] = useState([]);
  const [averageResponseTime, setAverageResponseTime] = useState(0);

  useEffect(() => {
    const fetchApiData = () => {
      const startTime = Date.now();
      fetch('https://blogapiserver.pythonanywhere.com/api/posts')
        .then(response => response.json())
        .then(data => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          setResponseTimes(prevTimes => {
            const newTimes = [...prevTimes, responseTime];
            const avgTime = newTimes.reduce((a, b) => a + b, 0) / newTimes.length;
            setAverageResponseTime(avgTime);
            return newTimes;
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const interval = setInterval(fetchApiData, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>API Latency Progress Bar</h2>
      <ProgressBar 
        now={averageResponseTime} 
        label={`${averageResponseTime.toFixed(2)}ms`} 
        max={500} // Adjust the max value based on expected response times
      />
    </div>
  );
};

export default ApiLatencyProgressBar;
