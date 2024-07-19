import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your API endpoint
    const apiUrl = 'https://api.example.com/data';

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        // Assuming the API returns data in the format
        // { labels: ['label1', 'label2'], values: [value1, value2] }
        const pieData = {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }
          ]
        };

        setChartData(pieData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartComponent;
