import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: ${({ $isDark }) => ($isDark ? "#1a1a1a" : "#f8f9fa")};
  min-height: 100vh;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: ${({ $isDark }) => ($isDark ? "yellow" : "black")};
  font-size: 28px;
  text-align: center;
  word-break: break-word;
  max-width: 90%;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 22px;
    padding: 0 15px;
  }
`;

const VenueCard = styled.div`
  background: ${({ $isDark }) => ($isDark ? "#2d2d2d" : "#ffffff")};
  color: ${({ $isDark }) => ($isDark ? "white" : "black")};
  padding: 20px;
  border-radius: 12px;
  margin: 20px auto;
  max-width: 90%;
  text-align: left;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 15px;
    font-size: 14px;
  }
`;

const InfoText = styled.p`
  color: ${({ $isDark }) => ($isDark ? "#e0e0e0" : "#333333")};
  margin: 8px 0;
  font-size: 16px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #003366, #0055aa);
  color: #ffffff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
  font-size: 16px;

  &:hover {
    background: linear-gradient(135deg, #0055aa, #0077cc);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
`;

const MyVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
    };

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!user || !token || !apiKey) {
      alert("⚠ Authorization missing! Please log in again.");
      navigate("/login");
      return;
    }

    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/profiles/${user.name}/venues`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": apiKey,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch venues.");
        }

        const data = await response.json();
        setVenues(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, [navigate]);

  if (loading) return <p>Loading your venues...</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <Container $isDark={isDarkMode}>
      <Title $isDark={isDarkMode}>My Venues</Title>
      {venues.length === 0 ? (
        <InfoText $isDark={isDarkMode}>
          You haven't created any venues yet.
        </InfoText>
      ) : (
        venues.map((venue) => (
          <VenueCard key={venue.id} $isDark={isDarkMode}>
            <h2 style={{ color: isDarkMode ? "#FFD700" : "#0055aa" }}>
              {venue.name}
            </h2>
            <InfoText $isDark={isDarkMode}>
              <strong>📍 Address:</strong> {venue.location?.address},{" "}
              {venue.location?.city}, {venue.location?.zip},{" "}
              {venue.location?.country}
            </InfoText>
            <InfoText $isDark={isDarkMode}>
              <strong>⭐ Rating:</strong> {venue.rating || "Not Rated"}
            </InfoText>
            <InfoText $isDark={isDarkMode}>
              <strong>🛏 Sleeps:</strong> {venue.maxGuests}
            </InfoText>
            <InfoText $isDark={isDarkMode}>
              <strong>📶 WiFi:</strong>{" "}
              {venue.wifi ? "Available" : "Not Available"}
            </InfoText>
            <InfoText $isDark={isDarkMode}>
              <strong>🚗 Parking:</strong>{" "}
              {venue.parking ? "Available" : "Not Available"}
            </InfoText>
            <InfoText $isDark={isDarkMode}>
              <strong>🐾 Pets:</strong> {venue.pets ? "Allowed" : "Not Allowed"}
            </InfoText>
            <InfoText $isDark={isDarkMode}>
              <strong>💰 Rate (€):</strong> {venue.price}
            </InfoText>
            <Button onClick={() => navigate(`/venues/${venue.id}/edit`)}>
              ✏️ Update Venue
            </Button>
            <Button onClick={() => navigate(`/venues/${venue.id}`)}>
              🔍 View Venue
            </Button>
          </VenueCard>
        ))
      )}
      <Button onClick={() => navigate("/dashboard")}>
        🏠 Back to Dashboard
      </Button>
    </Container>
  );
};

export default MyVenues;
