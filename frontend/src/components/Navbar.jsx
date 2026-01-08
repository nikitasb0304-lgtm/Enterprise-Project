import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link className="font-bold text-xl" to="/">OpsMind AI</Link>

      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/upload">Upload SOP</Link>
            <Link to="/chat">Chat</Link>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
