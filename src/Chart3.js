import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Chart3.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FetchApiWithMetrics3 = () => {
  const [url, setUrl] = useState('');
  const [responseTimes, setResponseTimes] = useState([]);
  const [responseSizes, setResponseSizes] = useState([]);

  const handleFetch = async () => {
    const times = [];
    const sizes = [];
    for (let i = 0; i < 10; i++) {
      const start = performance.now();
      const response = await fetch(url);
      const end = performance.now();
      const timeTaken = (end - start).toFixed(2);  // Format the response time to 2 decimal places

      const data = await response.blob();
      const sizeInMB = (data.size / (1024 * 1024)).toFixed(2);  // Convert size to MB and format to 2 decimal places

      times.push(parseFloat(timeTaken));
      sizes.push(parseFloat(sizeInMB));
    }
    setResponseTimes(times);
    setResponseSizes(sizes);
  };

  const data = {
    labels: responseTimes.map((_, index) => `Request ${index + 1}`),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: responseTimes,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Response Size (MB)',
        data: responseSizes,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
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
        text: 'API Response Times and Sizes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  

  return (
    <div className='container'>
      <h1>Fetch API Data and Measure Efficiency</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter API URL"
        className='input'
      />
      <button onClick={handleFetch} className='button'>Fetch Data</button>
      {responseTimes.length > 0 && <Bar data={data} options={options} />}
    </div>
  );
};

export default FetchApiWithMetrics3;
