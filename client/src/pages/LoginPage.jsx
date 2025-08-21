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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {message && (
        <div className="mb-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow text-center font-semibold">
          {message}
        </div>
      )}
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
};

export default LoginPage;
