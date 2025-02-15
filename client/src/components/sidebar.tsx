import { Link } from "react-router-dom";
import { FaFolder, FaFileAlt, FaShareAlt, FaClock, FaTrash } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-60 h-screen bg-gray-900 text-white flex flex-col p-5 shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-200">Dashboard</h2>
      
      <nav>
        <ul className="flex flex-col gap-3">
          <li>
            <Link to="/files" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition">
              <FaFileAlt className="text-blue-400" />
              <span>My Files</span>
            </Link>
          </li>
          <li>
            <Link to="/folders" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition">
              <FaFolder className="text-yellow-400" />
              <span>My Folders</span>
            </Link>
          </li>
          <li>
            <Link to="/shared" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition">
              <FaShareAlt className="text-green-400" />
              <span>Shared with Me</span>
            </Link>
          </li>
          
          <li>
            <Link to="/trash" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-700 transition">
              <FaTrash className="text-red-400" />
              <span>Trash</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
