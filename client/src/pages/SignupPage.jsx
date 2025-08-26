import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SignupForm from "../components/SignupForm";
import { motion } from "framer-motion";
import API from "../api";

const SignupPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (formData) => {
    setMessage("");
    setError("");
    try {
      const res = await API.post("/auth/register", formData);
      login(res.data); // Store user in context or localStorage
      setMessage("Signup successful! Welcome, " + res.data.user.name + ".");

      // ⏳ Optional: show message for 1.5 sec, then redirect to /goalform
      setTimeout(() => {
        navigate("/goalform");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      console.error("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-lg shadow-lg text-center font-medium z-50 min-w-[300px]"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{message}</span>
            </div>
          </motion.div>
        )}
        
        <div className="flex flex-col items-center gap-12 w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <SignupForm onSubmit={handleSignup} error={error} />
          </motion.div>

          {/* Premium features section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full text-center text-gray-600"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Why Join Smart Diet Tracker?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-4">
                <div className="bg-white p-3 rounded-full shadow-md mb-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">AI-Powered Tracking</h4>
                <p className="text-sm text-gray-500">Smart food logging with AI technology</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="bg-white p-3 rounded-full shadow-md mb-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Personalized Analytics</h4>
                <p className="text-sm text-gray-500">Track your progress with detailed insights</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="bg-white p-3 rounded-full shadow-md mb-3">
                  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium mb-2">Real-time Updates</h4>
                <p className="text-sm text-gray-500">Stay on top of your nutrition goals</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
