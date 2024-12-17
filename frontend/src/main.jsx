import react from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <react.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    
  </react.StrictMode>
)
