import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContextProvider } from "./components/common/Toast";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import "./services/i18n";
import { Loader } from "./components/common/Loader";
import { Provider } from "react-redux";
import { store } from "./state/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={<Loader />}>
        <Router>
          <AuthProvider>
            <UserProvider>
              <ToastContextProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </ToastContextProvider>
            </UserProvider>
          </AuthProvider>
        </Router>
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);
