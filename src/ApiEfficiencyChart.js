// src/components/ApiEfficiencyChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ApiEfficiencyChart = () => {
  const [responseTimes, setResponseTimes] = useState([]);
  const [successfulRequests, setSuccessfulRequests] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchApiData = () => {
      const startTime = Date.now();
      fetch('https://blogapiserver.pythonanywhere.com/api/posts')
        .then(response => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          if (response.ok) {
            setSuccessfulRequests(prev => prev + 1);
          }

          setResponseTimes(prevTimes => [...prevTimes, responseTime]);
          setTotalRequests(prev => prev + 1);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const interval = setInterval(fetchApiData, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length || 0;
  const successRate = (successfulRequests / totalRequests) * 100 || 0;

  const data = {
    labels: ['Average Response Time (ms)', 'Success Rate (%)'],
    datasets: [
      {
        label: 'API Efficiency Metrics',
        data: [averageResponseTime, successRate],
        backgroundColor: ['green', 'yellow'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(153,102,255,1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>API Efficiency Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ApiEfficiencyChart;
