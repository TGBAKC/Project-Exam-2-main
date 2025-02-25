import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  max-width: 700px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  margin-top: 6rem;
  margin-bottom: 6rem;
`;

const Title = styled.h1`
  font-size: 26px;
  font-weight: bold;
  color: #003366;
`;

const Image = styled.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  text-align: center;
  color: #555;
  font-size: 16px;
  line-height: 1.5;
`;

const Strong = styled.strong`
  color: #0066cc;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #ea6659;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background-color: #d65245;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

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
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      alert("⚠ You must be logged in to book a venue!");
      navigate("/login"); 
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
      {venue.media.length > 0 ? <Image src={venue.media[0].url} alt="Venue" /> : <Text>No Image Available</Text>}
      <Text>{venue.description || "Description not available."}</Text>
      <Text><Strong>💰 Price per night:</Strong> ${venue.price}</Text>
      <Text><Strong>🛏 Max Guests:</Strong> {venue.maxGuests}</Text>
      <Text>
        {[...Array(Math.round(venue.rating || 0))].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} style={{ color: "gold" }} />
        ))}
      </Text>
      <Label>Select Start Date:</Label>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} />
      <Label>Select End Date:</Label>
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
      <Label>Number of Guests:</Label>
      <Input type="number" value={numberOfGuests} min="1" max={venue.maxGuests} onChange={(e) => setNumberOfGuests(Number(e.target.value))} />
      <Button onClick={handleConfirm}>BOOK NOW</Button>
      <Text><Strong>Total Price:</Strong> {startDate && endDate ? `$${Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) * venue.price}` : "N/A"}</Text>
    </Container>
  );
};

export default VenueDetailsPage;
