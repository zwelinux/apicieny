import React, { useState } from 'react';

const FetchApiComponent = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  return (
    <div>
      <h1>Fetch API Data</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter API URL"
      />
      <button onClick={handleFetch}>Fetch Data</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data && (
        <pre style={{ textAlign: 'left' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FetchApiComponent;
