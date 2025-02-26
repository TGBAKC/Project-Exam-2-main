import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faCalendar, faUser, faEnvelope, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

const BookingListItem = ({ booking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const darkModeListener = (e) => setDarkMode(e.matches);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    mediaQuery.addEventListener("change", darkModeListener);
    return () => mediaQuery.removeEventListener("change", darkModeListener);
  }, []);

  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "N/A");

  const pricePerNight = Number(booking.venue?.price ?? 0);
  const guests = Number(booking.guests ?? 1);
  const totalPrice = (pricePerNight * guests).toFixed(2);

  return (
    <BookingContainer $darkMode={darkMode}>
      <BookingHeader onClick={() => setIsOpen(!isOpen)} $darkMode={darkMode}>
        <VenueName>{booking.venue?.name || "Unknown Venue"}</VenueName>
        <DateContainer>
          <FontAwesomeIcon icon={faCalendar} />
          <span>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</span>
        </DateContainer>
        <ToggleButton $darkMode={darkMode}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </ToggleButton>
      </BookingHeader>

      {isOpen && (
        <DetailsContainer $darkMode={darkMode}>
          <h3 aria-label="Booking Details">📖 Booking Details</h3>
          <DetailRow>
            <FontAwesomeIcon icon={faCalendar} />
            <strong>Created:</strong> {formatDate(booking.created)}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <strong>💰 Booking Value:</strong> €{totalPrice}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faMoneyBillWave} />
            <strong>💵 Price per Night:</strong> €{pricePerNight.toFixed(2)}
          </DetailRow>

          <h3 aria-label="Guest Details">👤 Guest Details</h3>
          <DetailRow>
            <FontAwesomeIcon icon={faUser} />
            <strong>Number of Guests:</strong> {guests}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faUser} />
            <strong>Contact Person:</strong> {booking.customer?.name || "Unknown"}
          </DetailRow>
          <DetailRow>
            <FontAwesomeIcon icon={faEnvelope} />
            <strong>📧 Contact Email:</strong> {booking.customer?.email || <span aria-hidden="true">No email</span>}
          </DetailRow>
        </DetailsContainer>
      )}
    </BookingContainer>
  );
};

// 📌 Styled Components (Mobil Uyumlu)
const BookingContainer = styled.div`
  background-color: ${(props) => (props.$darkMode ? "#333" : "#f4f8ff")};
  color: ${(props) => (props.$darkMode ? "white" : "black")};
  border-radius: 12px;
  padding: 15px;
  margin: 10px auto;
  width: 100%;
  max-width: 600px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const BookingHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.$darkMode ? "white" : "#004b8d")};

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const VenueName = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #004b8d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #004b8d;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const DetailsContainer = styled.div`
  background-color: ${(props) => (props.$darkMode ? "#222" : "white")};
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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
  align-self: flex-end;

  @media (max-width: 768px) {
    align-self: center;
  }
`;

export default BookingListItem;
