import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Users from "./pages/Users";
import Bookings from "./pages/Bookings";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/events">Events</Link> | 
        <Link to="/users">Users</Link> | 
        <Link to="/bookings">Bookings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
}
