// src/components/ApiLatencyPieChart.js
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const ApiLatencyPieChart = () => {
  const [latencyCategories, setLatencyCategories] = useState({
    '0-100ms': 0,
    '101-200ms': 0,
    '201-300ms': 0,
    '301-400ms': 0,
    '401ms+': 0,
  });

  useEffect(() => {
    const fetchApiData = () => {
      const startTime = Date.now();
      fetch('https://blogapiserver.pythonanywhere.com/api/posts')
        .then(response => response.json())
        .then(data => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;

          setLatencyCategories(prevCategories => {
            if (responseTime <= 100) {
              return { ...prevCategories, '0-100ms': prevCategories['0-100ms'] + 1 };
            } else if (responseTime <= 200) {
              return { ...prevCategories, '101-200ms': prevCategories['101-200ms'] + 1 };
            } else if (responseTime <= 300) {
              return { ...prevCategories, '201-300ms': prevCategories['201-300ms'] + 1 };
            } else if (responseTime <= 400) {
              return { ...prevCategories, '301-400ms': prevCategories['301-400ms'] + 1 };
            } else {
              return { ...prevCategories, '401ms+': prevCategories['401ms+'] + 1 };
            }
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const interval = setInterval(fetchApiData, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: Object.keys(latencyCategories),
    datasets: [
      {
        label: 'API Latency Distribution',
        data: Object.values(latencyCategories),
        backgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(153,102,255,0.4)',
          'rgba(255,159,64,0.4)',
          'rgba(255,206,86,0.4)',
          'rgba(255,99,132,0.4)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(153,102,255,1)',
          'rgba(255,159,64,1)',
          'rgba(255,206,86,1)',
          'rgba(255,99,132,1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>API Latency Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default ApiLatencyPieChart;
