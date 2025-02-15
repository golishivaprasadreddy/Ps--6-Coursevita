import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Home';
import './index.css'; // Ensure you have global styles if needed

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);