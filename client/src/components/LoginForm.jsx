import { useState } from "react";
import { Link } from "react-router-dom";  // <-- import Link

export default function LoginForm({ onSubmit, loading = false, error = "" }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
  };

  const validate = () => {
    let valid = true;
    const errors = {};
    if (!form.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }
    if (!form.password) {
      errors.password = "Password is required";
      valid = false;
    }
    setInputError(errors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto p-8 bg-white rounded shadow"
      autoComplete="off"
      aria-label="Login Form"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
      {(error || inputError.email || inputError.password) && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
          {error || inputError.email || inputError.password}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none focus:border-green-500 transition
            ${inputError.email ? "border-red-500" : "border-gray-300"}`}
        />
        {inputError.email && (
          <span className="text-red-500 text-xs">{inputError.email}</span>
        )}
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border p-2 rounded pr-10 focus:outline-none focus:border-green-500 transition
              ${inputError.password ? "border-red-500" : "border-gray-300"}`}
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-2 text-gray-500 text-xs"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {inputError.password && (
          <span className="text-red-500 text-xs">{inputError.password}</span>
        )}
      </div>
      <button
        type="submit"
        className={`w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition
          ${loading ? "opacity-70 cursor-wait" : ""}`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* SIGNUP LINK */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-600 hover:underline font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
}