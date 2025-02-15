import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      
      // Generate a preview if it's an image
      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      // Get pre-signed URL from the backend
      const { data } = await axios.post(
        "http://localhost:8080/file/puturl",
        { fileType: file.type },
        { withCredentials: true }
      );

      const uploadUrl = data.uploadUrl;

      // Upload file to S3 with progress tracking
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || file.size)
          );
          setProgress(percentCompleted);
        },
      });

      // Save file metadata in the database
      await axios.post(
        "http://localhost:8080/file/save-file",
        {
          name: file.name,
          type: file.type,
          size: file.size,
          url: uploadUrl.split("?")[0],
        },
        { withCredentials: true }
      );

      setMessage("File uploaded successfully!");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Error uploading file.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto bg-white">
      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer p-2"
      />

      {preview && (
        <img src={preview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg" />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 mt-3 rounded-lg disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {uploading && (
        <div className="mt-2 w-full bg-gray-300 rounded">
          <div
            className="bg-blue-500 text-xs font-medium text-white text-center py-1 rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default FileUpload;
