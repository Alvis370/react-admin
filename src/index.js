import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import memoryUtils from './utils/memoryUtils';
import storageUtils from './utils/storageUtils';

const user = storageUtils.getUser();
memoryUtils.user = user;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
