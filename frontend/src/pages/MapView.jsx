import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "leaflet/dist/leaflet.css";

// 1. Icon-ka Shilalka (Red)
const accidentIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// 2. Icon-ka Siraadyada (Green)
const signalIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapView() {
  const [accidents, setAccidents] = useState([]);
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:7000";
  const DEFAULT_CENTER = [2.0469, 45.3182]; // Mogadishu Fallback

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accRes, sigRes] = await Promise.all([
          fetch(`${API_BASE}/api/accidents`),
          fetch(`${API_BASE}/api/signals`)
        ]);

        const accData = await accRes.json();
        const sigData = await sigRes.json();

        setAccidents(accData);
        setSignals(sigData);
      } catch (error) {
        console.error("Xogta lama soo helin:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 ml-64 flex flex-col h-full">
        <Header title="Interactive Traffic & Accident Map" />
        
        <main className="p-6 flex-1 overflow-auto">
          {/* Legend for clarity */}
          <div className="flex gap-4 mb-4 bg-white p-2 rounded shadow-sm w-fit border border-gray-200 text-xs font-bold">
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-600 rounded-full"></span> Accidents</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-600 rounded-full"></span> Signals</div>
          </div>

          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-300 h-[80vh]">
            {loading ? (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <span className="animate-spin mr-2">⏳</span> Loading Map Data...
              </div>
            ) : (
              <MapContainer 
                center={DEFAULT_CENTER} 
                zoom={13} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />

                {/* Markers for Accidents (Red) */}
                {accidents.map((acc) => (
                  <Marker 
                    key={`acc-${acc._id}`} 
                    position={[acc.latitude || DEFAULT_CENTER[0], acc.longitude || DEFAULT_CENTER[1]]} 
                    icon={accidentIcon}
                  >
                    <Popup>
                      <div className="w-48">
                        <h4 className="font-bold text-red-700 uppercase text-xs">⚠️ Accident Report</h4>
                        <hr className="my-1" />
                        <p className="text-sm"><strong>Vehicle:</strong> {acc.vehicleNumber}</p>
                        <p className="text-sm"><strong>Location:</strong> {acc.location}</p>
                        <p className="text-xs text-gray-600 italic mt-1">{acc.description}</p>
                        {acc.img && (
                          <img 
                            src={`${API_BASE}/images/${acc.img}`} 
                            className="w-full h-24 mt-2 rounded-md object-cover border" 
                            alt="accident" 
                          />
                        )}
                        <p className="text-[10px] text-gray-400 mt-2">{new Date(acc.date).toLocaleString()}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Markers for Signals (Green) */}
                {signals.map((sig) => (
                  <Marker 
                    key={`sig-${sig._id}`} 
                    position={[sig.latitude || DEFAULT_CENTER[0], sig.longitude || DEFAULT_CENTER[1]]} 
                    icon={signalIcon}
                  >
                    <Popup>
                      <div className="w-48">
                        <h4 className="font-bold text-green-700 uppercase text-xs">🚦 Traffic Signal</h4>
                        <hr className="my-1" />
                        <p className="text-sm"><strong>Status:</strong> <span className="text-green-600 font-bold uppercase">{sig.status}</span></p>
                        <p className="text-sm"><strong>Location:</strong> {sig.location}</p>
                        {sig.img && (
                          <img 
                            src={`${API_BASE}/images/${sig.img}`} 
                            className="w-full h-24 mt-2 rounded-md object-contain bg-gray-50 border" 
                            alt="signal" 
                          />
                        )}
                        <p className="text-[10px] text-gray-400 mt-2">{new Date(sig.date).toLocaleString()}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}