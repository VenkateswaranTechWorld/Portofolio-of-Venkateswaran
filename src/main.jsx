import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
// ✅ CORRECT Import (Imports all necessary icons)
import { ArrowUp10 } from 'lucide-react';

// ❌ INCORRECT Import (Don't use paths like this unless you know exactly why)
// import ArrowUp10 from 'lucide-react/icons/arrow-up-1-0';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
