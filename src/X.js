// src/ApiEfficiencyChart.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ApiEfficiencyChart = () => {
  const [chartData, setChartData] = useState({});
  const [apiUrl, setApiUrl] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Process your data here to extract necessary information for the chart
      const labels = data.map(item => item.timestamp); // Adjust according to your API response
      const responseTimes = data.map(item => item.responseTime); // Adjust according to your API response

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'API Response Time',
            data: responseTimes,
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
          }
        ]
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setApiUrl(event.target.value);
  };

  const handleButtonClick = () => {
    fetchData();
  };

  return (
    <div>
      <h2>API Efficiency</h2>
      <input
        type="text"
        value={apiUrl}
        onChange={handleInputChange}
        placeholder="Enter API URL"
      />
      <button onClick={handleButtonClick}>Fetch Data</button>
      {chartData.labels && chartData.labels.length > 0 && (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default ApiEfficiencyChart;
