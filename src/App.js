import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={Login}/>
        </Routes>
      <Login />
    </Router>
  );
}

export default App;
