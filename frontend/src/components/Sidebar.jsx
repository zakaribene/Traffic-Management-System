import { Link } from "react-router-dom";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5 fixed">
      <h2 className="text-2xl font-bold mb-8">Traffic System</h2>

      <ul className="space-y-4">
        {user?.role === "admin" && (
          <>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/acidents">Reporting Accidents</Link></li>
            <li><Link to="/signals">Signals Control</Link></li>
            <li><Link to="/map">Map View</Link></li>
          </>
        )}

        {user?.role === "user" && (
          <li><Link to="/report"> Accident</Link></li>
        )}
      </ul>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
        className="mt-10 bg-red-500 px-3 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}