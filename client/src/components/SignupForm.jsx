import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupForm({ onSubmit, loading = false, error = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [inputError, setInputError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setInputError({ ...inputError, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!form.name) {
      errors.name = "Name is required";
    }
    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email";
    }
    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setInputError(errors);
    return Object.keys(errors).length === 0;
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
      aria-label="Signup Form"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h2>
      {(error || Object.values(inputError).length > 0) && (
        <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
          {error || inputError.name || inputError.email || inputError.password}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none ${
            inputError.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {inputError.name && (
          <span className="text-red-500 text-xs">{inputError.name}</span>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-gray-700 mb-1 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={`w-full border p-2 rounded focus:outline-none ${
            inputError.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {inputError.email && (
          <span className="text-red-500 text-xs">{inputError.email}</span>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-gray-700 mb-1 font-medium">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={`w-full border p-2 rounded pr-10 focus:outline-none ${
              inputError.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-2 top-2 text-gray-500 text-xs"
            tabIndex={-1}
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
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition ${
          loading ? "opacity-70 cursor-wait" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline font-semibold">
          Log in
        </Link>
      </p>
    </form>
  );
}