import { useEffect, useState } from "react";
import api from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      
      <div className="card">
        {users.map(u => (
          <div key={u._id}>
            {u.email} ({u.role})
          </div>
        ))}
      </div>
    </div>
  );
}