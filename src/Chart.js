import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FetchApiWithChart = () => {
  const [url, setUrl] = useState('');
  const [responseTimes, setResponseTimes] = useState([]);

  const handleFetch = async () => {
    const times = [];
    for (let i = 0; i < 10; i++) {
      const start = performance.now();
      await fetch(url);
      const end = performance.now();
      times.push(end - start);
    }
    setResponseTimes(times);
  };

  const data = {
    labels: responseTimes.map((_, index) => `Request ${index + 1}`),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseTimes,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],

  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'API Response Times',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Fetch API Data and Measure Efficiency</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter API URL"
      />
      <button onClick={handleFetch}>Fetch Data</button>

    <p>Original Delay Time : {responseTimes}</p>

      <Line data={data} options={options} />
    </div>
  );
};

export default FetchApiWithChart;
