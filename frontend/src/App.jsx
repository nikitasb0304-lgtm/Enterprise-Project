import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadPage from "./pages/UploadPage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* NAVBAR */}
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">OpsMind AI</Link>

        {user ? (
          <div className="flex gap-4 items-center">
            <Link to="/upload" className="px-4 py-2 bg-gray-200 rounded">Upload</Link>
            <Link to="/chat" className="px-4 py-2 bg-gray-200 rounded">Chat</Link>
            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</Link>
            <Link to="/register" className="px-4 py-2 border rounded">Register</Link>
          </div>
        )}
      </nav>

      {/* ROUTES */}
      <div className="p-6">
        <Routes>
          {!user && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}

          {user && (
            <>
              <Route path="/" element={<Navigate to="/upload" />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="*" element={<Navigate to="/upload" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}
