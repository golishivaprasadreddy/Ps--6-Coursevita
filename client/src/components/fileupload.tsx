import { useState, useEffect } from "react";
import axios from "axios";

const getMimeType = (file: File) => {
  return file.type && file.type !== "" ? file.type : "application/octet-stream";
};

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("application/octet-stream");

  useEffect(() => {
    if (!file) return;

    const fetchUploadUrl = async () => {
      try {
        const mimeType = getMimeType(file);
        setFileType(mimeType);

        const { data } = await axios.post(
          "http://localhost:8080/file/puturl",
          { fileType: mimeType },
          { withCredentials: true }
        );

        setUploadUrl(data.uploadUrl);
      } catch (error) {
        console.error("Error fetching upload URL:", error);
        setMessage("Failed to get upload URL.");
      }
    };

    fetchUploadUrl();
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !uploadUrl) {
      setMessage("File or upload URL is missing.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": fileType },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || file.size)
          );
          setProgress(percentCompleted);
        },
      });

      const fileName = file.name;

      const { data } = await axios.post(
        "http://localhost:8080/file/save-file",
        {
          name: fileName,
          type: fileType,
          size: file.size,
          url: uploadUrl,
        },
        { withCredentials: true }
      );

      setMessage("File uploaded and saved successfully!");
      setDownloadUrl(data.file.url);
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

      {file && (
        <div className="mt-2 text-sm text-gray-700">
          <p>
            <strong>File:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      )}

      {preview && (
        <img src={preview} alt="Preview" className="mt-3 w-full h-40 object-cover rounded-lg" />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !uploadUrl}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 mt-3 rounded-lg disabled:bg-gray-400"
      >
        {uploading ? `Uploading ${progress}%...` : "Upload File"}
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

      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 text-center text-blue-600 underline"
        >
          Download File
        </a>
      )}
    </div>
  );
};

export default FileUpload;
