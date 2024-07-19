// src/components/ApiFetchBarChart.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ApiFetchBarChart = () => {
  const [responseTimes, setResponseTimes] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    const fetchApiData = () => {
      const startTime = Date.now();
      fetch('https://blogapiserver.pythonanywhere.com/api/posts')
        .then(response => response.json())
        .then(data => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          setResponseTimes(prevTimes => [...prevTimes, responseTime]);
          setFetchCount(prevCount => prevCount + 1);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const interval = setInterval(fetchApiData, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: Array.from({ length: responseTimes.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'API Response Time (ms)',
        data: responseTimes,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fetch Count',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Response Time (ms)',
        },
      },
    },
  };

  return (
    <div>
      <h2>API Response Time Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ApiFetchBarChart;
