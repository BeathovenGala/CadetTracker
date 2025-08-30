// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { Toaster } from './components/ui/toaster';
import { ToastProvider } from './components/ui/use-toast'; // <-- add this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ToastProvider>
      <App />
      <Toaster />
    </ToastProvider>
  </BrowserRouter>
);
