// src/components/ApiEfficiencyProgressBar.js
import React, { useState, useEffect } from 'react';
import { ProgressBar, Container, Row, Col } from 'react-bootstrap';

const ApiEfficiencyProgressBar = () => {
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

  return (
    <Container>
      <h2>API Efficiency Progress Bars</h2>
      <Row className="mb-3">
        <Col>
          <h5>Average Response Time</h5>
          <ProgressBar 
            now={averageResponseTime} 
            label={`${averageResponseTime.toFixed(2)}ms`} 
            max={1000} // Adjust the max value based on expected response times
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Success Rate</h5>
          <ProgressBar 
            now={successRate} 
            label={`${successRate.toFixed(2)}%`} 
            max={100}
            variant={successRate > 80 ? 'success' : successRate > 50 ? 'warning' : 'danger'}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ApiEfficiencyProgressBar;
