import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Accidents() {
  const [accidents, setAccidents] = useState([]);

  // Fetch all accidents
  const fetchAccidents = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/accidents");
      const data = await res.json();
      setAccidents(data);
    } catch (error) {
      console.log("Error fetching accidents:", error);
    }
  };

  useEffect(() => {
    fetchAccidents();
  }, []);

  // Delete accident
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this accident?")) return;

    try {
      const res = await fetch(`http://localhost:7000/api/accidents/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      // remove from state
      setAccidents(accidents.filter((acc) => acc._id !== id));
    } catch (error) {
      alert("Error deleting accident");
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <Header title="Accidents List" />
      <div className="ml-64 p-6">
        <table className="w-full bg-white shadow rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Vehicle Number</th>
              <th className="p-3">Location</th>
              <th className="p-3">Description</th>
              <th className="p-3">Image</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {accidents.length > 0 ? (
              accidents.map((acc) => (
                <tr key={acc._id} className="text-center border-t">
                  <td className="p-3">{acc.vehicleNumber}</td>
                  <td className="p-3">{acc.location}</td>
                  <td className="p-3">{acc.description}</td>
                  <td className="p-3">
                    {acc.img && (
                      <img
                        src={`http://localhost:7000/images/${acc.img}`}
                        alt="accident"
                        className="w-20 h-20 object-cover rounded mx-auto"
                      />
                    )}
                  </td>
                  <td className="p-3">
                    {new Date(acc.date).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(acc._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No accidents reported yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}