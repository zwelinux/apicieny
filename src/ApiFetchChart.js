// src/components/ApiFetchChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ApiFetchChart = () => {
  const [responseTimes, setResponseTimes] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: Array.from({ length: responseTimes.length }, (_, i) => i + 1),
    datasets: [
      {
        label: 'API Response Time (ms)',
        data: responseTimes,
        fill: false,
        backgroundColor: 'rgba(35,112,191,0.1)',
        borderColor: 'rgba(75,192,192,1)',
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
      <h2>TTL Handshake</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ApiFetchChart;
