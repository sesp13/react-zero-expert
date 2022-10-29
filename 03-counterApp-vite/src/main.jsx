import React from 'react';
import ReactDOM from 'react-dom/client';
// import { HelloWorldApp } from './HelloWorldApp';
// import { FirstApp } from './FirstApp';
import { CounterApp } from './CounterApp';

// Import css
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <HelloWorldApp /> */}
    {/* <FirstApp></FirstApp> */}
    <CounterApp value={0} />
  </React.StrictMode>
);
