import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Signin from "./signin";
import Signup from "./signup";
import FileUpload from "../components/fileupload";
import UserProfile from "./Profile";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleUploadClick = () => {
    navigate("/fileupload");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header onLoginClick={handleLoginClick} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 relative">
          {/* Floating Upload Button */}
          <button
              onClick={handleUploadClick}
              className="fixed bottom-6 right-6 bg-green-300 text-white p-4 rounded-full shadow-lg  transition-all"
              >
              <img src="https://static.vecteezy.com/system/resources/previews/010/150/750/original/button-plus-icon-sign-symbol-design-free-png.png" alt="Upload" className="w-6 h-6" />
              </button>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;