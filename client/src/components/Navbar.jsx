import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg h-12"
          : "bg-transparent h-16"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? "h-12" : "h-16"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div
                className={`rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center transition-all duration-300 ${
                  isScrolled ? "w-6 h-6" : "w-8 h-8"
                }`}
              >
                <svg
                  className={`text-white transition-all duration-300 ${
                    isScrolled ? "w-4 h-4" : "w-5 h-5"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span
                className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 ${
                  isScrolled ? "text-lg" : "text-xl"
                }`}
              >
                NutriTrack
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>

            {/* User Profile */}
            <div className="flex items-center gap-4">
              {user?.user?.name && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {user.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.user.name}
                  </span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-lg shadow-lg">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-lg text-sm font-medium ${
              isActive("/dashboard")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/goalform"
            className={`block px-3 py-2 rounded-lg text-sm font-medium ${
              isActive("/goalform")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Set Goals
          </Link>
          <div className="px-3 py-2">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
