import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { UploadCloud, XCircle } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const getMimeType = (file: File) => file.type || "application/octet-stream";

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

      const { data } = await axios.post(
        "http://localhost:8080/file/save-file",
        {
          name: file.name,
          type: fileType,
          size: file.size,
          url: uploadUrl,
        },
        { withCredentials: true }
      );

      setMessage("File uploaded successfully!");
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      if (selectedFile.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [], "application/pdf": [] },
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
   

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Header */}
       

        <div className="p-6 w-full max-w-lg bg-white shadow-xl rounded-lg text-center">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed ${
              isDragActive ? "border-green-500" : "border-gray-300"
            } p-6 rounded-lg cursor-pointer transition duration-200`}
          >
            <input {...getInputProps()} />
            <UploadCloud size={40} className="mx-auto text-gray-500" />
            <p className="text-gray-700 mt-2">
              {isDragActive ? "Drop the file here..." : "Drag & drop a file or click to upload"}
            </p>
          </div>

          {file && (
            <div className="mt-4 flex flex-col items-center">
              {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-2" />}
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

              <button
                onClick={() => setFile(null)}
                className="mt-2 text-red-500 flex items-center gap-1 hover:text-red-700"
              >
                <XCircle size={18} />
                Remove File
              </button>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-400"
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
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block text-blue-600 underline">
              Download File
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;