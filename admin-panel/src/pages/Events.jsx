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

  
}