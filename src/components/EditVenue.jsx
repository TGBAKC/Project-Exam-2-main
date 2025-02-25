import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Form = styled.form`
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 100px;
`;

const Button = styled.button`
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateButton = styled(Button)`
  background-color: #007bff;
  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  margin-top: 10px;
  &:hover {
    background-color: #b02a37;
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

const EditVenue = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    maxGuests: 1,
    price: 1,
    media: [],
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch venue details.");
        const data = await response.json();

        setVenueData({
          name: data.data.name,
          description: data.data.description,
          price: data.data.price,
          maxGuests: data.data.maxGuests,
          media: data.data.media ? data.data.media.map((url) => ({ url })) : [],
          location: {
            address: data.data.location?.address || "",
            city: data.data.location?.city || "",
            zip: data.data.location?.zip || "",
            country: data.data.location?.country || "",
          },
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load venue details.");
      }
      setLoading(false);
    };

    fetchVenueDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData((prevState) => {
      if (name.startsWith("location.")) {
        const field = name.split(".")[1];
        return {
          ...prevState,
          location: {
            ...prevState.location,
            [field]: value,
          },
        };
      } else if (name === "media") {
        return {
          ...prevState,
          media: value ? value.split(",").map((url) => ({ url: url.trim() })) : [],
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let token = localStorage.getItem("authToken");
    let apiKey = localStorage.getItem("apiKey");
  
    if (!token || !apiKey) {
      alert("❌ Your session has expired. Please log in again.");
      navigate("/login");
      return;
    }
  
    // ✅ `media` dizisini doğru formatta nesnelere çevir
    let formattedMedia = Array.isArray(venueData.media)
      ? venueData.media.map(m => (typeof m === "string" ? { url: m.trim() } : m))
      : [];
  
    // ✅ `location` verisini eksiksiz gönder
    let locationData = venueData.location || {
      address: "",
      city: "",
      zip: "",
      country: "",
    };
  
    // ✅ API'ye gönderilecek JSON verisini oluştur
    const dataToSend = {
      name: venueData.name,
      description: venueData.description,
      price: Number(venueData.price),
      maxGuests: Number(venueData.maxGuests),
      media: formattedMedia, // `media` dizisini nesneler olarak gönderiyoruz
      location: locationData,
    };
  
    console.log("📤 API'ye Gönderilen Veri:", JSON.stringify(dataToSend, null, 2));
  
    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(dataToSend), // ✅ `dataToSend` JSON formatında
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        alert(`❌ API Error: ${responseData.errors?.[0]?.message || "Unknown error"}`);
        return;
      }
  
      alert("✅ Venue updated successfully!");
      navigate("/my-venues");
  
    } catch (error) {
      console.error("❌ Error updating venue:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm("⚠ Are you sure you want to delete this venue?");
    if (!confirmDelete) return;

    let token = localStorage.getItem("authToken");
    let apiKey = localStorage.getItem("apiKey");

    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "X-Noroff-API-Key": apiKey,
        },
      });

      if (!response.ok) {
        alert("❌ Failed to delete venue. Please try again.");
        return;
      }

      alert("✅ Venue deleted successfully!");
      navigate("/my-venues");

    } catch (error) {
      console.error("❌ Error deleting venue:", error);
      alert("❌ Something went wrong. Please try again.");
    }
  };

  if (loading) return <p>Loading venue details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container>
      <h1>Edit Venue</h1>
      <Form onSubmit={handleSubmit}>
        <Label>Venue Name:</Label>
        <Input
          type="text"
          name="name"
          value={venueData.name}
          onChange={handleChange}
          required
        />
  
        <Label>Description:</Label>
        <Textarea
          name="description"
          value={venueData.description}
          onChange={handleChange}
          required
        />
  
        <Label>Price per Night:</Label>
        <Input
          type="number"
          name="price"
          value={venueData.price}
          onChange={handleChange}
          required
        />
  
        <Label>Max Guests:</Label>
        <Input
          type="number"
          name="maxGuests"
          value={venueData.maxGuests}
          onChange={handleChange}
          required
        />
  
       
        <Label>Media URLs (comma separated):</Label>
        <Input
          type="text"
          name="media"
          placeholder="Add Media URLs (comma separated)"
          value={venueData.media.map((m) => m.url).join(", ") || ""}
          onChange={handleChange}
          required
        />
  
        
        <Label>Address:</Label>
        <Input
          type="text"
          name="location.address"
          placeholder="Address"
          value={venueData.location.address}
          onChange={handleChange}
          required
        />
  
        <Label>City:</Label>
        <Input
          type="text"
          name="location.city"
          placeholder="City"
          value={venueData.location.city}
          onChange={handleChange}
          required
        />
  
        <Label>ZIP Code:</Label>
        <Input
          type="text"
          name="location.zip"
          placeholder="ZIP Code"
          value={venueData.location.zip}
          onChange={handleChange}
          required
        />
  
        <Label>Country:</Label>
        <Input
          type="text"
          name="location.country"
          placeholder="Country"
          value={venueData.location.country}
          onChange={handleChange}
          required
        />
  
        <UpdateButton type="submit">Update Venue</UpdateButton>
        <DeleteButton type="button" onClick={handleDelete}>
          Delete Venue
        </DeleteButton>
      </Form>
    </Container>
  );
  
};

export default EditVenue;