// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/dashboard">NutriTrack</Link>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        {user?.user?.name && (
          <span className="font-semibold">👋 {user.user.name}</span>
        )}

        <button
          onClick={handleLogout}
          className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
