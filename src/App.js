
import React from 'react';
import FetchApiWithMetrics2 from './Chart2';
import SuccessRate from './successrate';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 align='center'>Time To Live (TTL)</h1>
        <br />

        {/* <FetchApiWithChart /> */}
        <FetchApiWithMetrics2 />

      </header>
    </div>
  );
  
}

export default App;
