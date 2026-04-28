import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate(); // ✅ FIXED
  const [services, setServices] = useState([]);

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // 📡 Fetch services
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/services/")
      .then(res => setServices(res.data));
  }, []);

  // 🛠 Booking function
  const bookService = async (serviceId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login again");
      navigate("/");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/bookings/",
        {
          service: serviceId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Booking Confirmed!");
    } catch (err) {
      console.log(err.response?.data);
      alert("Booking failed");
    }
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>

  {/* 🔴 Small Logout Button (Top Right) */}
  <div style={{
  display: "top-right",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: "10px"
}}>
  <button
    onClick={logout}
    style={{
      background: "#ff4d4f",
      color: "white",
      padding: "6px 14px",
      border: "none",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "500",
      cursor: "pointer"
    }}
  >
    Logout
  </button>
</div>

  {/* 🎯 App Title Centered */}
  <h2 style={{ textAlign: "center", marginTop: "10px" }}>
    Service App
  </h2>

  {/* 🔗 Bookings Button */}
  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button onClick={() => navigate("/bookings")}>
      My Bookings
    </button>
  </div>

      <h2 style={{ textAlign: "center" }}>Available Services</h2>

      {/* 📦 Services Grid */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {services.map(service => (
          <div
            key={service.id}
            style={{
              width: "300px",
              margin: "15px",
              padding: "20px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              textAlign: "center"
            }}
          >
            <h3>{service.name}</h3>
            <p>{service.description}</p>

            <button onClick={() => bookService(service.id)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}