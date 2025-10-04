import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css'; // 👈 import CSS here

createRoot(document.getElementById('root')!).render(

  <App />

)
