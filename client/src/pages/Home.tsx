import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Signin from "./signin";
import Signup from "./signup";
import FileUpload from "../components/fileupload";

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
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
          >
            +
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
      </Routes>
    </Router>
  );
};

export default App;
