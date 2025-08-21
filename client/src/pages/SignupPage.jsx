import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ Import navigation hook
import { AuthContext } from "../context/AuthContext";
import SignupForm from "../components/SignupForm";
import API from "../api";

const SignupPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // ⬅️ Initialize router
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {message && (
        <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-center font-semibold">
          {message}
        </div>
      )}
      <SignupForm onSubmit={handleSignup} error={error} />
    </div>
  );
};

export default SignupPage;
