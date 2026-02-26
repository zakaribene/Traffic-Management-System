import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function SignalsControl() {
  const [signals, setSignals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    status: "",
    description: "",
    img: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all signals
  const fetchSignals = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/signals");
      const data = await res.json();
      setSignals(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, img: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit form (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("location", formData.location);
    fd.append("status", formData.status);
    fd.append("description", formData.description);
    if (formData.img) fd.append("img", formData.img);

    try {
      let res;
      if (editingId) {
        res = await fetch(`http://localhost:7000/api/signals/${editingId}`, {
          method: "PUT",
          body: fd,
        });
      } else {
        res = await fetch("http://localhost:7000/api/signals", {
          method: "POST",
          body: fd,
        });
      }

      if (!res.ok) throw new Error("Failed");

      setMessage(editingId ? "Signal updated ✅" : "Signal added ✅");
      setFormData({ location: "", status: "", description: "", img: null });
      setEditingId(null);
      setShowForm(false);
      fetchSignals();
    } catch (error) {
      setMessage("Error processing signal ❌");
      console.log(error);
    }
  };

  // Delete signal
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this signal?")) return;
    try {
      const res = await fetch(`http://localhost:7000/api/signals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setSignals(signals.filter((s) => s._id !== id));
    } catch (error) {
      alert("Error deleting signal");
      console.log(error);
    }
  };

  // Edit signal
  const handleEdit = (signal) => {
    setFormData({
      location: signal.location,
      status: signal.status,
      description: signal.description,
      img: null, // file input empty initially
    });
    setEditingId(signal._id);
    setShowForm(true);
  };

  return (
    <>
      <Sidebar />
      <Header title="Signals Control" />
      <div className="ml-64 p-6 min-h-screen bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Traffic Signals</h2>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ location:"",status:"",description:"",img:null }); }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {showForm ? "Close Form" : "Add Signal"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow w-full max-w-lg mb-6"
          >
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border mb-4"
              required
            />
            <input
              type="text"
              name="status"
              placeholder="Status (Red/Yellow/Green)"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border mb-4"
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border mb-4"
              required
            ></textarea>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleChange}
              className="w-full mb-4"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              {editingId ? "Update Signal" : "Add Signal"}
            </button>
            {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
          </form>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Description</th>
                <th className="p-3">Image</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {signals.length > 0 ? (
                signals.map((signal) => (
                  <tr key={signal._id} className="text-center">
                    <td className="p-3">{signal.location}</td>
                    <td className="p-3">{signal.status}</td>
                    <td className="p-3">{signal.description}</td>
                    <td className="p-3">
                      {signal.img && (
                        <img
                          src={`http://localhost:7000/images/${signal.img}`}
                          alt="signal"
                          className="w-20 h-20 object-cover rounded mx-auto"
                        />
                      )}
                    </td>
                    <td className="p-3">
                      {new Date(signal.date).toLocaleString()}
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(signal)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(signal._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No signals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}