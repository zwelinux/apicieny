// src/components/ApiLatencyChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ApiLatencyChart = () => {
  const [responseTimes, setResponseTimes] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const fetchApiData = () => {
      const startTime = Date.now();
      fetch('https://blogapiserver.pythonanywhere.com/api/posts')
        .then(response => response.json())
        .then(data => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          const timestamp = new Date().toLocaleTimeString();

          setResponseTimes(prevTimes => [...prevTimes, responseTime]);
          setTimestamps(prevTimestamps => [...prevTimestamps, timestamp]);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    const interval = setInterval(fetchApiData, 5000); // fetch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'API Latency (ms)',
        data: responseTimes,
        fill: false,
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
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Latency (ms)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>API Latency Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ApiLatencyChart;
