import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SeizedGoodsList from "./pages/SeizedGoodsList";
import GoodDetail from "./pages/GoodDetail";
import CreateGoodForm from "./components/CreateGoodForm";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import SeizedGoodNotifications from "./components/SeizedGoodNotification";
import axios from "axios";
import "./index.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }} />
      {/* Sidebar or header for notifications */}
      <div style={{ width: "20%" }}>
        <SeizedGoodNotifications />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/goods" element={<SeizedGoodsList />} />
        <Route path="/goods/:id" element={<GoodDetail />} />
        <Route path="/create-good" element={<CreateGoodForm />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <h2>Protected Page</h2>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
