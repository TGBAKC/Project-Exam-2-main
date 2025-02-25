import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: #003366;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-top: 5px;
`;

const Button = styled.button`
  background: ${(props) => props.bgColor || "#ccc"};
  color: ${(props) => (props.bgColor === "#28a745" ? "#fff" : "#000")};
  padding: 12px 18px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;

  &:hover {
    opacity: 0.85;
    transform: translateY(-2px);
  }
`;

const EditBookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); // URL'den ID'yi al

  const [bookingDetails, setBookingDetails] = useState(null);
  const [editedBooking, setEditedBooking] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
  });


  const fetchBookingDetails = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch booking details");
      }
  
      setBookingDetails(data);
      setEditedBooking({
        startDate: data.startDate,
        endDate: data.endDate,
        guests: data.guests,
      });
    } catch (error) {
      console.error("❌ Error fetching booking:", error);
      alert("Error fetching booking data!");
    }
  };
  
 
  useEffect(() => {
    fetchBookingDetails();
  }, [id, location.state?.booking]);  
  

  const handleChange = (e) => {
    setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/bookings/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedBooking),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update booking");
      }

      alert("✅ Booking updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Error updating booking: " + error.message);
    }
  };

  if (!bookingDetails) return <p>Loading booking details...</p>;

  return (
    <Container>
      <Title>✏️ Edit Booking</Title>
      <form onSubmit={handleSubmit}>
        <Label>📅 Start Date:</Label>
        <Input
          type="date"
          name="startDate"
          value={editedBooking.startDate}
          onChange={handleChange}
          required
        />
        <Label>📆 End Date:</Label>
        <Input
          type="date"
          name="endDate"
          value={editedBooking.endDate}
          onChange={handleChange}
          required
        />
        <Label>👤 Number of Guests:</Label>
        <Input
          type="number"
          name="guests"
          value={editedBooking.guests}
          min="1"
          max="10"
          onChange={handleChange}
          required
        />
        <Button type="submit" bgColor="#28a745">💾 Save Changes</Button>
        <Button type="button" onClick={() => navigate("/dashboard")}>❌ Cancel</Button>
      </form>
    </Container>
  );
};

export default EditBookingPage;
