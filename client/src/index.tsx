import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactGA from "react-ga4";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (process.env.REACT_APP_GOOGLE_ANALYTICS) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
