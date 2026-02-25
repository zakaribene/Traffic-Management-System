import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState(""); // Waxaan u beddelnay username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:7000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Waxaan u diraynaa username halkii email laga diri lahaa
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Kaydi xogta isticmaalaha
        localStorage.setItem("user", JSON.stringify(data));

        // U kala saar meesha ay aadeyaan iyadoo la eegayo role-ka uu doortay
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/report");
        }
      } else {
        setError(data.message || "Username ama Password khaldan!");
      }
    } catch (err) {
      setError("Server-ka ma shaqaynayo, fadlan dib u tijaabi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-sans">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-96 border-t-4 border-blue-600">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Soo Dhawaaw</h2>
        <p className="text-center text-gray-500 mb-6 text-sm">Gali xogtaada si aad u gasho nidaamka</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-xs font-bold border border-red-200">
             ❌ {error}
          </div>
        )}

        {/* Doorashada Role-ka */}
        <div className="mb-4">
          <label className="block text-xs font-bold mb-1 text-gray-700 uppercase">Login As:</label>
          <select
            className="w-full p-2.5 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User / Reporter</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-xs font-bold mb-1 text-gray-700 uppercase">Username:</label>
          <input
            type="text"
            placeholder="Gali username-kaaga"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold mb-1 text-gray-700 uppercase">Password:</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          disabled={loading}
          className={`w-full text-white p-3 rounded-lg font-bold transition-all shadow-lg ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Checking..." : "Login Now"}
        </button>
      </form>
    </div>
  );
}