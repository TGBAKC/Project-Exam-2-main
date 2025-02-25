import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Checkbox,
  Container,
  ErrorMessage,
  Form,
  FormWrapper,
  Input,
  Label,
  Title,
} from "../../styled-components/Register/RegisterPage.styles";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "my_username",
    email: "user@stud.noroff.no",
    password: "securepassword",
    venueManager: true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@stud.noroff.no")) {
      setError("You must use a @stud.noroff.no email to register.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          ...(formData.avatarUrl && { avatar: formData.avatarUrl }),
          venueManager: formData.venueManager,
        }),
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const data = await response.json();
        console.error("API Error Response:", data.errors);
        setError(data.errors ? data.errors[0].message : "Registration failed.");
      }
    } catch (err) {
      console.error("Registration error:", err.message);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Email:
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Password:
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Venue Manager:
            <Checkbox
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleChange}
            />
          </Label>
          <Button type="submit">Register</Button>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default RegisterPage;
