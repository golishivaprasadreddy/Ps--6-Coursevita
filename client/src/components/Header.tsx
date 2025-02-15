import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Correct import
import { Menu, X } from "lucide-react";
import axios from "axios";

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate(); // Corrected navigation

  // Check authentication status on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("token", "real-auth-token");
    document.cookie = "auth_token=real-auth-token; path=/"; // Set auth cookie
    setIsAuthenticated(true);
    onLoginClick();
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    await axios.post("http://localhost:8080/user/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
    const navigate = useNavigate();
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">CourseDrive</h1>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsAuthenticated(!isAuthenticated)}>
        {isAuthenticated ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation */}
      <nav className="md:flex md:items-center">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-medium shadow-md transition duration-300 hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow-md transition duration-300 hover:bg-blue-100 hover:text-blue-700"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
