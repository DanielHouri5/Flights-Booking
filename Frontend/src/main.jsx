// Entry point for the React application
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Render the main App component inside the root DOM element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* StrictMode helps highlight potential problems in the app */}
    <App />
  </StrictMode>,
);
