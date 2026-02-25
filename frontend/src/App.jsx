<<<<<<< HEAD
function App(){
  return(
    <>
    <div>
      <h1 className="bg-red-500">Hello world</h1>
    </div>
    </>
  )
}export default App
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ReportAccident from "./pages/ReportAccident.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SignalsControl from "./pages/SignalsControl.jsx";
import MapView from "./pages/MapView.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Accidents from "./pages/Accidents.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/report"
          element={
            <PrivateRoute role="user">
              <ReportAccident />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/signals"
          element={
            <PrivateRoute role="admin">
              <SignalsControl />
            </PrivateRoute>
          }
        />

        <Route
          path="/map"
          element={
            <PrivateRoute role="admin">
              <MapView />
            </PrivateRoute>
          }
        />
        <Route
          path="/acidents"
          element={
            <PrivateRoute role="admin">
              <Accidents/>
            </PrivateRoute>
          }
        />
    

        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
>>>>>>> db20fe8a390d4b1106bde0492382fc61a521ca2a
