import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  max-width: 450px;
  margin: 80px auto;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const Subtitle = styled.h3`
  font-size: 18px;
  color: #444;
  margin-bottom: 15px;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #555;
  margin: 8px 0;
`;

const ConfirmPage = () => {
  const location = useLocation();
  const bookingDetails = location.state || {}; 

  const { venueName, startDate, endDate, guests } = bookingDetails;

  if (!bookingDetails || Object.keys(bookingDetails).length === 0) {
    return (
      <Container>
        <Title>No Booking Found</Title>
        <InfoText>Please make a booking first.</InfoText>
      </Container>
    );
  }

  return (
    <Container>
      <Title>✅ Booking Confirmed!</Title>
      <Subtitle>Booking Details</Subtitle>
      <InfoText>
        <strong>🏨 Venue:</strong> {venueName}
      </InfoText>
      <InfoText>
        <strong>📅 Start Date:</strong> {new Date(startDate).toLocaleDateString()}
      </InfoText>
      <InfoText>
        <strong>📆 End Date:</strong> {new Date(endDate).toLocaleDateString()}
      </InfoText>
      <InfoText>
        <strong>👤 Guests:</strong> {guests}
      </InfoText>
    </Container>
  );
};

export default ConfirmPage;
