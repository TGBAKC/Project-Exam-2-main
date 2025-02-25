import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import PropTypes from "prop-types";

const VenueCardComponent = ({ venue }) => (
  <Card to={`/venues/${venue.id}`} key={venue.id}>
    {venue.media?.length > 0 && (
      <Image src={venue.media[0]?.url} alt={venue.name || "Venue image"} />
    )}
    <VenueInfo>
      <VenueName>
        {venue.name.length > 40
          ? `${venue.name.substring(0, 40)}...`
          : venue.name}
      </VenueName>
      <DetailText>
        <strong>Rating:</strong> <Rating rating={venue.rating || 0} />
      </DetailText>
      <DetailText>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "#EA6659" }} aria-hidden="true" />
        {venue.location?.address || "Location not available"}
      </DetailText>
      <DetailText>Price: {venue.price ? `$${venue.price}` : "Contact for pricing"}</DetailText>
      <DetailText>Max Guests: {venue.maxGuests || "N/A"}</DetailText>
      <AvailabilityButton type="button" aria-label="Check venue availability">
        CHECK AVAILABILITY
      </AvailabilityButton>
    </VenueInfo>
  </Card>
);

// 📌 PropTypes
VenueCardComponent.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number,
    price: PropTypes.number,
    maxGuests: PropTypes.number,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    location: PropTypes.shape({
      address: PropTypes.string,
    }),
  }).isRequired,
};

// 📌 Styled Components
const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: black;
  transition: transform 0.2s, box-shadow 0.2s;
  width: 100%;
  max-width: 100%;
  flex: 1 1 300px;
  margin: 10px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const VenueInfo = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const VenueName = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const DetailText = styled.p`
  font-size: 14px;
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AvailabilityButton = styled.button`
  background-color: #ea6659;
  color: white;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border:none;
  border-radius:5px;
`;

export default VenueCardComponent;
