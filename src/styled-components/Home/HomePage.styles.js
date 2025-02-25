import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const VenueGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

export const VenueCard = styled(Link)`
  flex: 1 1 calc(25% - 20px);
  max-width: calc(25% - 20px);
  min-width: 300px;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

export const VenueImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

export const AvailabilityText = styled.p`
  color: #ea6659;
  font-weight: bold;
`;
