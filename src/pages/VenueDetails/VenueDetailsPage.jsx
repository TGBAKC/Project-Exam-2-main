import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${id}?_media=true&_meta=true`
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch venue details.");
        }
        setVenue(responseData.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchVenueDetails();
  }, [id]);

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert("⚠ Please select a valid date range.");
      return;
    }

    navigate("/confirm", {
      state: {
        id: venue.id,
        venueName: venue.name,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        guests: numberOfGuests,
      },
    });
  };

  if (loading) return <Text>Loading venue details...</Text>;
  if (error || !venue) return <Text>Failed to load venue details.</Text>;

  return (
    <Container>
      <Title>{venue.name || "Venue Name Not Available"}</Title>
      {venue.media.length > 0 ? (
        <Image src={venue.media[0].url} alt="Venue" />
      ) : (
        <Text>No Image Available</Text>
      )}
      <Text>{venue.description || "Description not available."}</Text>
      <Text>
        <Strong>💰 Price per night:</Strong> ${venue.price}
      </Text>
      <Text>
        <Strong>🛏 Max Guests:</Strong> {venue.maxGuests}
      </Text>
      <StarsContainer>
        {[...Array(Math.round(venue.rating || 0))].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} style={{ color: "gold" }} />
        ))}
      </StarsContainer>

      <FormContainer>
        <Label>Select Start Date:</Label>
        <StyledDatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
        />

        <Label>Select End Date:</Label>
        <StyledDatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />

        <Label>Number of Guests:</Label>
        <Input
          type="number"
          value={numberOfGuests}
          min="1"
          max={venue.maxGuests}
          onChange={(e) => setNumberOfGuests(Number(e.target.value))}
        />
      </FormContainer>

      <Button onClick={handleConfirm}>BOOK NOW</Button>

      <TotalPrice>
        <Strong>Total Price:</Strong>{" "}
        {startDate && endDate
          ? `$${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) * venue.price}`
          : "N/A"}
      </TotalPrice>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  max-width: 700px;
  margin: auto;
  background-color: #f9f9f9;
  
  @media (max-width: 768px) {
    padding: 20px;
margin:2em;
    max-width: 95%;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #003366;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 20px; 
    padding: 0 10px; 
  }
`;


const Image = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 768px) {
    max-height: 250px;
  }
`;

const Text = styled.p`
  text-align: center;
  color: #555;
  font-size: 16px;
`;

const Strong = styled.strong`
  color: #0066cc;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-right:20px;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
    width: 100%;
  }
`;
const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #ea6659;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  max-width: 400px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #d65245;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TotalPrice = styled.p`
  
  font-size: 18px;
  
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default VenueDetailsPage;
