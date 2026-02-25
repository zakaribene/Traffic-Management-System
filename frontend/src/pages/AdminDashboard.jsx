import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    accidents: 0,
    signals: 0,
    reportsToday: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 1. Soo qaado xogta shilalka iyo siraadyada hal mar
        const [accRes, sigRes] = await Promise.all([
          fetch("http://localhost:7000/api/accidents"),
          fetch("http://localhost:7000/api/signals")
        ]);

        const accidents = await accRes.json();
        const signals = await sigRes.json();

        // 2. Laga xisaabiyo inta shil ee dhacay maanta (February 25, 2026)
        const maanta = new Date().toISOString().split('T')[0]; 
        const todayCount = accidents.filter(acc => 
          new Date(acc.date).toISOString().split('T')[0] === maanta
        ).length;

        setStats({
          accidents: accidents.length,
          signals: signals.length,
          reportsToday: todayCount
        });
      } catch (error) {
        console.error("Xogta Dashboard-ka waa la waayay:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title="Admin Dashboard" />
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Accidents */}
          <div className="bg-white p-6 shadow-lg rounded-xl border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Total Accidents</h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? "..." : stats.accidents}
            </p>
          </div>

          {/* Card 2: Active Signals */}
          <div className="bg-white p-6 shadow-lg rounded-xl border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Active Signals</h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? "..." : stats.signals}
            </p>
          </div>

          {/* Card 3: Reports Today */}
          <div className="bg-white p-6 shadow-lg rounded-xl border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Reports Today</h3>
            <p className="text-3xl font-bold text-gray-800">
              {loading ? "..." : stats.reportsToday}
            </p>
          </div>
        </div>

        {/* Waxaad halkan ku dari kartaa Chart ama Table kale dambe */}
      </div>
    </div>
  );
}