import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { logger } from './middleware/logger';

// Log application startup
logger.logInfo('APP_STARTED', { message: 'Application initialized' });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
