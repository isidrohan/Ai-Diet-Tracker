import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- for navigation
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import API from "../api";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // <-- react-router hook
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    setMessage("");
    setError("");
    console.log("Login formData:", formData); // Debug
    try {
      const res = await API.post("/auth/login", formData);
      console.log("Login response:", res.data); // Debug
      login(res.data); // Store user + token
      setMessage("Login successful! Welcome, " + res.data.user.name + ".");

      // ✅ Redirect after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500); // Delay to show success message
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Login failed");
        console.error("Login error response:", err.response.data);
      } else {
        setError("Network or server error");
        console.error("Login error:", err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="flex w-full max-w-6xl mx-auto px-4">
        {/* Left Section - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          {message && (
            <div className="mb-4 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-lg shadow-sm text-center font-medium animate-fadeIn">
              {message}
            </div>
          )}
          <LoginForm onSubmit={handleLogin} error={error} />
        </div>

        {/* Right Section - Features */}
        <div className="hidden md:flex md:w-1/2 p-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl">
          <div className="flex flex-col justify-center text-white">
            <h2 className="text-4xl font-bold mb-6">Welcome to Smart Diet Tracker</h2>
            <p className="text-emerald-50 mb-8 text-lg">
              Your personal AI-powered nutrition companion for a healthier lifestyle.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Track Your Progress</h3>
                  <p className="text-emerald-50 text-sm">Monitor your daily nutrition intake and achieve your health goals.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">AI-Powered Insights</h3>
                  <p className="text-emerald-50 text-sm">Get personalized recommendations based on your eating habits.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Real-time Tracking</h3>
                  <p className="text-emerald-50 text-sm">Log your meals and see your progress in real-time.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
