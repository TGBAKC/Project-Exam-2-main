import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    onSearch({ destination, startDate, endDate, guests });
  };

  return (
    <SearchContainer>
      <Row>
        <InputGroup className="full-width">
          <Input
            type="text"
            placeholder="Search Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </InputGroup>

        <InputGroup>
          <GuestContainer>
            <FontAwesomeIcon icon={faUser} />
            <GuestInput
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </GuestContainer>
        </InputGroup>

        <SearchButton onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </SearchButton>
      </Row>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; 
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%; 
  max-width: 900px; 
  margin: auto;

  @media (max-width: 768px) {
    width: 95%; 
    padding: 10px; 
  }

  @media (max-width: 480px) {
    width: 100%; 
    border-radius: 0; 
    padding: 8px;
  }
`;


const Row = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
  gap: 12px;
  padding: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 140px;
  
  @media (max-width: 768px) {
    width: 100%;
  }

  &.full-width {
    flex: 2;
  }
`;

const GuestContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  justify-content: center;
  min-width: 100px;
`;


const GuestInput = styled.input`
  border: none;
  width: 40px;
  text-align: center;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: #e57373;
  color: white;
  border: none;
  padding: 14px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  flex: 1;
  min-width: 100px;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    background-color: #d64d4d;
  }
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box; /* İç padding genişliği artırmaz */
  min-width: 140px; 

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default SearchBar;
