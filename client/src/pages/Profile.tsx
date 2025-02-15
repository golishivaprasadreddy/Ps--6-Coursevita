import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added import
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

interface File {
  _id: string;
  name: string;
  url: string;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  files: File[];
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // ✅ Ensure useNavigate is imported

  const handleUploadClick = () => {
    navigate("/fileupload"); // ✅ Closing bracket was missing
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/me", {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDownload = async (fileId: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/file/download`,
        { fileId },
        { withCredentials: true }
      );
      if (response.data.downloadUrl) {
        window.open(response.data.downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Error generating download URL:", error);
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`http://localhost:8080/file/${fileId}`, {
        withCredentials: true,
      });
      setUser((prevUser) => ({
        ...prevUser!,
        files: prevUser!.files.filter((file) => file._id !== fileId),
      }));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 relative">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={user?.avatar || "https://www.pngall.com/wp-content/uploads/15/User-PNG-Picture.png"}
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-4 border-gray-300"
              />
              <div>
                <h2 className="text-xl font-bold">{user?.fullName}</h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className={`px-3 py-1 text-sm font-semibold rounded ${user?.isPremium ? "bg-green-500 text-white" : "bg-gray-400 text-white"}`}>
                  {user?.isPremium ? "Premium User" : "Free User"}
                </span>
              </div>
            </div>

            {user?.files.length > 0 ? (
              <ul className="space-y-3">
                {user.files.map((file) => (
                  <li key={file._id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <span>{file.name}</span>
                    <div className="flex space-x-2">
                      <button onClick={() => handleDownload(file._id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                        Download
                      </button>
                      <button onClick={() => handleDelete(file._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No files uploaded yet.</p>
            )}
          </div>

          {/* ✅ Fixed the missing function issue */}
          <button
            onClick={handleUploadClick}
            className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
          >
            <img src="https://static.vecteezy.com/system/resources/previews/010/150/750/original/button-plus-icon-sign-symbol-design-free-png.png" alt="Upload" className="w-6 h-6" />
          </button>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
