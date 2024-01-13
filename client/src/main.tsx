import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ToastContextProvider} from "./components/Toast";
import {AuthProvider} from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
          <ToastContextProvider>
              <App />
          </ToastContextProvider>
      </AuthProvider>
  </React.StrictMode>,
)
