import { useLocation, useNavigate } from "react-router-dom";
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

  @media (max-width: 600px) {
    width: 90%;
    margin: 50px auto;
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: black;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Subtitle = styled.h3`
  font-size: 18px;
  color: #444;
  margin-bottom: 15px;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #555;
  margin: 8px 0;
  word-wrap: break-word;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 12px 16px;
  background-color: #ea6659;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #d65245;
    transform: scale(1.05);
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 14px;
  }
`;

const ConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state || {}; 

  const { venueName, startDate, endDate, guests } = bookingDetails;

  if (!bookingDetails || Object.keys(bookingDetails).length === 0) {
    return (
      <Container>
        <Title>No Booking Found</Title>
        <InfoText>Please make a booking first.</InfoText>
        <Button onClick={() => navigate("/")}>🏠 Back to Home</Button>
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
      <Button onClick={() => navigate("/")}>🏠 Back to Home</Button>
    </Container>
  );
};

export default ConfirmPage;
