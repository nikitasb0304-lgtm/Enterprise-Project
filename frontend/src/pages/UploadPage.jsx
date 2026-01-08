import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/sop/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    }
  };

return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📄 Upload SOP
          </h2>
  
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select PDF File
          </label>
          
          <input
            type="file"
            accept="application/pdf"
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          />
  
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Upload File
          </button>
        </div>
      </div>
    );
  }
  