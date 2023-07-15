import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* public pages */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          <Route path="*" element={<ErrorPage />} />

          {/* private pages */}
          <Route element={<PrivateRouteLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
