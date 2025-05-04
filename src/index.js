import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// React 18のcreateRootを使ってレンダリング
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 