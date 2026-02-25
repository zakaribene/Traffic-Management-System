import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function ReportAccident() {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!image) {
      setMessage("Image is required!");
      return;
    }

    const formData = new FormData();
    formData.append("userId", "699ec35b1274f81eda8321b5"); // muhiim
    formData.append("vehicleNumber", vehicleNumber);
    formData.append("location", location);
    formData.append("description", description);
    formData.append("img", image);

    try {
      const response = await fetch("http://localhost:7000/api/accidents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setMessage("Accident reported successfully ✅");

      // reset form
      setVehicleNumber("");
      setLocation("");
      setDescription("");
      setImage(null);
      e.target.reset(); // file input clear
    } catch (error) {
      setMessage("Server error ❌");
    }
  };

  return (
    <>
      <Sidebar />
      <Header title="Report Accident" />

      <div className="ml-64 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="w-full p-2 border mb-4"
            required
          />

          <input
            type="text"
            placeholder="Location (e.g. Ceelsha KM4)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border mb-4"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border mb-4"
            required
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mb-4"
            required
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-blue-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}