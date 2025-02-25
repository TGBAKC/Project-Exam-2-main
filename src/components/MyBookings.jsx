import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BookingListItem from "./BookingListItem";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  color: ${(props) => (props.$darkMode ? "white" : "#333")};
  margin-bottom: 20px;
`;

const BookingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const Message = styled.p`
  font-size: 18px;
  color: gray;
`;

const BackButton = styled.button`
  padding: 10px 15px;
  background-color: #ea6659;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: 0.3s;

  &:hover {
    background-color: #d14b44;
  }
`;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  // 🌙 Dark mode değişimlerini dinle ve state'i güncelle
  useEffect(() => {
    const checkDarkMode = () => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    };

    // Kullanıcı dark mode değiştirince çalışsın
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("authToken");
      const user = JSON.parse(localStorage.getItem("user"));
      const apiKey = localStorage.getItem("apiKey");

      if (!token || !user || !apiKey) {
        alert("⚠ Authorization missing! Please log in again.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      console.log("📌 Fetching bookings for:", user.name);

      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/bookings?_venue=true&_customer=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("📌 API Response Status:", response.status);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch bookings.");
        }

        const data = await response.json();
        console.log("📌 Full API Booking Response:", data);
        setBookings(data.data);
      } catch (err) {
        console.error("❌ API Fetch Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  if (loading) return <Message>⏳ Loading bookings...</Message>;
  if (error) return <Message style={{ color: "red" }}>❌ {error}</Message>;

  return (
    <Container>
         <h1 style={{ color: darkMode ? "white" : "black" }}>My Bookings</h1>

      {bookings.length === 0 ? (
        <Message>🚫 No bookings found.</Message>
      ) : (
        <BookingList>
          {bookings.map((booking) => (
            <BookingListItem key={booking.id} booking={booking} />
          ))}
        </BookingList>
      )}

      <BackButton onClick={() => navigate("/dashboard")}>
        🏠 Back to Dashboard
      </BackButton>
    </Container>
  );
};

export default MyBookings;
