// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS file you created
import App from './App'; // Import your main application component

// Use ReactDOM.createRoot for React 18+ projects
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Note: If your project uses an older React version, the syntax might be:
// ReactDOM.render(<App />, document.getElementById('root'));
