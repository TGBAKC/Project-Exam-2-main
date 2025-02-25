import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

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
          alert("You must be a Venue Manager to create venues.");
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
    if (!formData.name || !formData.description || !formData.price || !formData.maxGuests) {
      setError("All fields are required.");
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
        alert("Venue created successfully!");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to create venue.");
      }
    } catch (err) {
      console.error("Error creating venue:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Create Venue</Title>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userRole === "Venue Manager" && (
        <Form onSubmit={handleSubmit}>
          <Label>Venue Name:</Label>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <Label>Description:</Label>
          <Textarea name="description" value={formData.description} onChange={handleChange} required rows="5" />

          <Label>Price per Night:</Label>
          <Input type="number" name="price" value={formData.price} onChange={handleChange} required />

          <Label>Max Guests:</Label>
          <Input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleChange} required />

          <Label>Media (comma-separated URLs):</Label>
          <Input type="text" name="media" value={formData.media} onChange={handleChange} placeholder="e.g., https://example.com/image1.jpg,https://example.com/image2.jpg" />

          <Button type="submit">Create Venue</Button>
        </Form>
      )}
    </Container>
  );
};

export default CreateVenue;
