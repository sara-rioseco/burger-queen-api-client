import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
// CSS
import './index.css'
// COMPONENTES
import { Router } from './App';

// CONFIGURACIÓN DE LA RAIZ DE LA APP
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
)
