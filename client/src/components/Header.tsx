import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import icons

interface HeaderProps {
  onLoginClick: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Simulated login (Replace with actual authentication logic)
  const handleLogin = () => {
    setIsAuthenticated(true);
    setUser({ name: "John Doe", avatar: "https://i.pravatar.cc/40" }); // Example avatar
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
      {/* Logo */}
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">CourseDrive</h1>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <nav className={`md:flex md:items-center md:gap-6 ${menuOpen ? "absolute top-16 left-0 w-full bg-blue-600 p-4 space-y-4 md:space-y-0 md:bg-transparent md:static md:w-auto md:p-0" : "hidden md:flex"}`}>
        <ul className="flex flex-col md:flex-row gap-6 items-center">
          {isAuthenticated && user ? (
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow-md transition duration-300 hover:bg-blue-100 hover:text-blue-700">
                <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full" />
                {user.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <li>
              <button
                onClick={() => {
                  handleLogin();
                  onLoginClick();
                }}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow-md transition duration-300 hover:bg-blue-100 hover:text-blue-700"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
