import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faCalendar, faUser, faEnvelope, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const BookingContainer = styled.div`
  background-color: ${(props) => (props.$darkMode ? "#333" : "#f4f8ff")};
  color: ${(props) => (props.$darkMode ? "white" : "black")};
  border-radius: 12px;
  padding: 15px;
  width: 100%;
  max-width: 750px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.$darkMode ? "white" : "#004b8d")};
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
`;

const DetailsContainer = styled.div`
  background-color: ${(props) => (props.$darkMode ? "#222" : "white")};
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  padding: 6px 0;
  color: ${(props) => (props.$darkMode ? "#ddd" : "#333")};
  strong {
    color: ${(props) => (props.$darkMode ? "#f4f8ff" : "#004b8d")};
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$darkMode ? "white" : "#004b8d")};
  font-size: 18px;
`;

const BookingListItem = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    document.body.classList.contains("dark-mode")
  );

  // 🌙 Dark mode değişimlerini dinle
  useEffect(() => {
    const checkDarkMode = () => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    };

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  console.log("📌 Booking Data:", booking);

  const pricePerNight = booking.venue?.price ?? 0;
  const guests = booking.guests ?? 1;
  const totalPrice = ((pricePerNight * guests) || 0).toFixed(2);

  return (
    <BookingContainer $darkMode={darkMode}>
      <BookingHeader onClick={() => setIsOpen(!isOpen)} $darkMode={darkMode}>
        <span>{booking.venue?.name || "Unknown Venue"}</span>
        <span>
          <FontAwesomeIcon icon={faCalendar} />{" "}
          {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
          {new Date(booking.dateTo).toLocaleDateString()}
        </span>
        <ToggleButton $darkMode={darkMode}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </ToggleButton>
      </BookingHeader>

      {isOpen && (
        <DetailsContainer $darkMode={darkMode}>
          <h3 style={{ color: darkMode ? "white" : "black" }}>📖 Booking Details</h3>
          <DetailRow $darkMode={darkMode}>
            <FontAwesomeIcon icon={faCalendar} />
            <strong>Created:</strong> {new Date(booking.created).toLocaleDateString()}
          </DetailRow>
          <DetailRow $darkMode={darkMode}>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <strong>💰 Booking Value:</strong> €{totalPrice}
          </DetailRow>
          <DetailRow $darkMode={darkMode}>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <strong>💵 Price per Night:</strong> €{pricePerNight.toFixed(2)}
          </DetailRow>

          <h3 style={{ color: darkMode ? "white" : "black" }}>👤 Guest Details</h3>
          <DetailRow $darkMode={darkMode}>
            <FontAwesomeIcon icon={faUser} />
            <strong>Number of Guests:</strong> {guests}
          </DetailRow>
          <DetailRow $darkMode={darkMode}>
            <FontAwesomeIcon icon={faUser} />
            <strong>Contact Person:</strong> {booking.customer?.name || "Unknown"}
          </DetailRow>
          <DetailRow $darkMode={darkMode}>
            <FontAwesomeIcon icon={faEnvelope} />
            <strong>📧 Contact Email:</strong> {booking.customer?.email || "No email"}
          </DetailRow>
        </DetailsContainer>
      )}
    </BookingContainer>
  );
};

export default BookingListItem;
