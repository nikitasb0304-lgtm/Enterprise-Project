import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered (dummy)");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
          />
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </div>
    </div>
  );
}
