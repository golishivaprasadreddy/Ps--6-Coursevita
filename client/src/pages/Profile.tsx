import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/me", {
          withCredentials: true,
        });
        console.log("Fetched user:", response.data.user);
        setUser(response.data.user); // Fix: Accessing `user` from response
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
        { fileId }, // Send fileId in the request body
        { withCredentials: true }
      );
  
      if (response.data.downloadUrl) {
        window.open(response.data.downloadUrl, "_blank");
      } else {
        console.error("No download URL received.");
      }
    } catch (error) {
      console.error("Error generating download URL:", error);
    }
  };
  
  

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* User Info */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user?.avatar || "https://via.placeholder.com/100"}
          alt="User Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user?.fullName}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <span
            className={`px-3 py-1 text-sm font-semibold rounded ${
              user?.isPremium ? "bg-green-500 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {user?.isPremium ? "Premium User" : "Free User"}
          </span>
        </div>
      </div>

      {/* User Files */}
      {(user?.files || []).length > 0 ? (
        <ul className="space-y-2">
          {user?.files.map((file) => (
            <li
              key={file._id}
              className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
            >
              <span>{file.name}</span>
              <button
                onClick={() => handleDownload(file._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default UserProfile;
