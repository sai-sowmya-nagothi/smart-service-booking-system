import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/api/bookings/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setBookings(res.data))
    .catch(() => alert("Error loading bookings"));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
  <h2 style={{ textAlign: "center" }}>My Bookings</h2>

  {bookings.map(b => (
    <div
      key={b.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "15px auto",
        padding: "15px 25px",
        width: "80%",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)"
      }}
    >
      {/* Left side */}
      <div>
        <p><b>Service:</b> {b.service_name}</p>
      </div>

      {/* Right side */}
      <div>
        <p><b>Status:</b> {b.status}</p>
      </div>
    </div>
  ))}
</div>
  );
}


