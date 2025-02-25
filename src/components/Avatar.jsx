import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Avatar = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!avatarUrl.trim() || !isValidUrl(avatarUrl)) {
      setError("❌ Please enter a valid image URL.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("authToken");

    if (!user || !user.name) {
      setError("❌ User not found! Please log in again.");
      navigate("/login");
      return;
    }

    if (!token) {
      setError("❌ Authentication token missing! Please log in again.");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://v2.api.noroff.dev/holidaze/profiles/${user.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            avatar: { url: avatarUrl, alt: "User avatar" },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "❌ Failed to update avatar.");
      }

      const updatedUser = { ...user, avatar: { url: avatarUrl, alt: "User avatar" } };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSuccess("✅ Avatar updated successfully!");
    } catch (error) {
      setError(error.message || "❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Update Avatar</Title>
      {error && <ErrorMessage aria-live="polite">{error}</ErrorMessage>}
      {success && <SuccessMessage aria-live="polite">{success}</SuccessMessage>}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="avatar-url">Avatar URL:</Label>
        <Input
          id="avatar-url"
          type="text"
          placeholder="Enter image URL"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Avatar"}
        </Button>
      </Form>
    </Container>
  );
};

// 📌 Styled Components
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
  max-width: 350px;
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
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
`;

export default Avatar;
