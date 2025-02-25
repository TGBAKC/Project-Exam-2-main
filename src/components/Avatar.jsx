import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
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
  align-items: center;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 15px;
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

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!avatarUrl.trim()) {
      alert("❌ Please enter a valid image URL!");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");

    if (!user || !user.name) {
      alert("❌ User not found! Please log in again.");
      navigate("/login");
      return;
    }

    if (!token) {
      alert("❌ Authentication token missing! Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar: {
              url: avatarUrl,
              alt: "User avatar",
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "❌ Failed to update avatar.");
      }

      const updatedUser = { ...user, avatar: { url: avatarUrl, alt: "User avatar" } };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("✅ Avatar updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error updating avatar:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Title>Update Avatar</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Avatar URL:</Label>
        <Input
          type="text"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <Button type="submit">Update Avatar</Button>
      </Form>
    </Container>
  );
};

export default Avatar;
