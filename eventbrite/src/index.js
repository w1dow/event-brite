import React from 'react';
import logo from "./logo.svg";
import "./App.css";
import ReactDOM from 'react-dom/client';

import { CookiesProvider } from 'react-cookie';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <App />
    </CookiesProvider>
  </React.StrictMode>
);

