import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";
import DashboardPage from "./pages/DashboardPage";
import Layout from "./components/Layout";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout";
import GrammarPage from "./pages/GrammarPage";
import ExercisePage from "./pages/ExercisePage";
import VocabularyPage from "./pages/VocabularyPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* public pages */}
          <Route exact path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/auth" element={<AuthenticationPage />} />
          {/* Grammar */}
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/grammar/:topic" element={<ExercisePage />} />
          {/* Vocabulary */}
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/vocabulary/:topic" element={<ExercisePage />} />

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
