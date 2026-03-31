import { useEffect, useState } from "react";
import api from "../api/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [seats, setSeats] = useState(0);

  const load = () => {
    api.get("/events").then(res => setEvents(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await api.post("/events", {
      title,
      seats
    });

    load();
  };

  const remove = async (id) => {
    await api.delete(`/events/${id}`);
    load();
  };

  return (
    <div>
      <h1>Events</h1>

      <input placeholder="title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="seats" type="number" onChange={e => setSeats(e.target.value)} />

      <button onClick={create}>Create</button>

      <div className="list">
        {events.map(e => (
          <div className="card" key={e._id}>
            <h3>{e.title}</h3>
            <p>{e.availableSeats} seats</p>
            <button className="delete" onClick={() => remove(e._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}