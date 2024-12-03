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
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/authSlice";
import { useEffect } from "react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
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
        <Route
          path="/create-good"
          element={
            <ProtectedRoute>
              <CreateGoodForm />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
