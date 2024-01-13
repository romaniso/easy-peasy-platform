import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {ToastContextProvider} from "./components/Toast";
import {AuthProvider} from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Router>
          <AuthProvider>
              <ToastContextProvider>
                  <Routes>
                    <Route path='/*' element={<App />}/>
                  </Routes>
              </ToastContextProvider>
          </AuthProvider>
      </Router>
  </React.StrictMode>,
)
