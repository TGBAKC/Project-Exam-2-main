import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bookingDetails, setBookingDetails] = useState(null);
  const [editedBooking, setEditedBooking] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          `https://v2.api.noroff.dev/holidaze/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch booking details");
        }

        const data = await response.json();
        setBookingDetails(data);
        setEditedBooking({
          startDate: data.startDate,
          endDate: data.endDate,
          guests: data.guests,
        });
      } catch (error) {
        console.error("❌ Error fetching booking:", error);
        setError("⚠️ Error fetching booking data!");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleChange = (e) => {
    setEditedBooking({ ...editedBooking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

      setSuccess("✅ Booking updated successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error) {
      setError("❌ Error updating booking: " + error.message);
    }
  };

  if (loading) return <p>Loading booking details...</p>;

  return (
    <Container>
      <Title>✏️ Edit Booking</Title>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      {success && <SuccessMessage role="alert">{success}</SuccessMessage>}

      {bookingDetails && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="startDate">📅 Start Date:</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            value={editedBooking.startDate}
            min={new Date().toISOString().split("T")[0]} 
            onChange={handleChange}
            required
          />

          <Label htmlFor="endDate">📆 End Date:</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={editedBooking.endDate}
            min={editedBooking.startDate}
            onChange={handleChange}
            required
          />

          <Label htmlFor="guests">👤 Number of Guests:</Label>
          <Input
            type="number"
            id="guests"
            name="guests"
            value={editedBooking.guests}
            min="1"
            max="10"
            onChange={handleChange}
            required
          />

          <ButtonGroup>
            <Button type="submit" bgColor="#28a745">💾 Save Changes</Button>
            <Button type="button" onClick={() => navigate("/dashboard")}>❌ Cancel</Button>
          </ButtonGroup>
        </Form>
      )}
    </Container>
  );
};

// 📌 Styled Components (Mobil Uyumlu)
const Container = styled.div`
  padding: 20px;
  max-width: 450px;
  margin: 80px auto;
  text-align: center;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #003366;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`;

export default EditBookingPage;
