import { useEffect, useState } from "react";
import api from "../api/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings").then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
      
      <div className="card">
        {bookings.map(b => (
          <div key={b._id}>
            user: {b.userId} | event: {b.eventId}
          </div>
        ))}
      </div>
    </div>
  );
}