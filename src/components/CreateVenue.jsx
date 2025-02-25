import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CreateVenue = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    media: "",
  });
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://v2.api.noroff.dev/holidaze/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data.");
        const data = await response.json();

        if (data.role !== "Venue Manager") {
          setError("⚠️ You must be a Venue Manager to create venues.");
          navigate("/dashboard");
        } else {
          setUserRole(data.role);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.description || !formData.price || !formData.maxGuests) {
      setError("⚠️ All fields are required.");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          maxGuests: Number(formData.maxGuests),
          media: formData.media.split(","),
        }),
      });

      if (response.ok) {
        setSuccess("✅ Venue created successfully!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const data = await response.json();
        setError(data.message || "❌ Failed to create venue.");
      }
    } catch (err) {
      console.error("Error creating venue:", err);
      setError("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Create Venue</Title>
      {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
      {success && <SuccessMessage role="alert">{success}</SuccessMessage>}
      {userRole === "Venue Manager" && (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name">Venue Name:</Label>
          <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

          <Label htmlFor="description">Description:</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required rows="5" />

          <Label htmlFor="price">Price per Night:</Label>
          <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />

          <Label htmlFor="maxGuests">Max Guests:</Label>
          <Input type="number" id="maxGuests" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required />

          <Label htmlFor="media">Media (comma-separated URLs):</Label>
          <Input type="text" id="media" name="media" value={formData.media} onChange={handleChange} placeholder="https://example.com/image1.jpg,https://example.com/image2.jpg" />

          <Button type="submit">Create Venue</Button>
        </Form>
      )}
    </Container>
  );
};

// 📌 Styled Components (Mobil Uyumlu)
const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`;

export default CreateVenue;
