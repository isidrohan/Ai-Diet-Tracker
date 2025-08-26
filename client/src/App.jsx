import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import GoalForm from "./pages/GoalForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { FoodLogProvider } from "./context/FoodLogContext";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <FoodLogProvider>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/goalform"
                element={
                  <ProtectedRoute>
                    <GoalForm />
                  </ProtectedRoute>
                }
              />

              {/* Optional: Redirect root path */}
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </FoodLogProvider>
    </Router>
  );
}

export default App;
