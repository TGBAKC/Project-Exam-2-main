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

// 📌 Genel Container
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
  margin: auto;
`;

// 📌 Büyük ekranda yatay, mobilde dikey düzen
const Row = styled.div`
  display: flex;
  flex-wrap: wrap; /* Küçük ekranlarda iç içe girmeyi önler */
  width: 100%;
  gap: 18px; /* Inputlar arasındaki boşluğu artırdık */
 padding:2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
 
 
  }
`;

// 📌 Input Grupları
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 180px; /* Daha geniş input kutuları */
  margin-right: 15px; /* Sağ tarafta boşluk bırak */

  &:last-child {
    margin-right: 0; /* Son elemanda sağ boşluk olmasın */
  }

  &.full-width {
    flex: 2;
  }
`;

// 📌 Guests Container
const GuestContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  justify-content: center;
  min-width: 120px;
`;

const GuestInput = styled.input`
  border: none;
  width: 50px;
  text-align: center;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

// 📌 Buton Stili
const SearchButton = styled.button`
  background-color: #e57373;
  color: white;
  border: none;
  padding: 16px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  flex: 1;
  min-width: 130px;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    background-color: #d64d4d;
  }
`;

// 📌 Input Alanları
const Input = styled.input`
  padding: 14px; /* İç boşlukları büyüttük */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  min-width: 180px; /* Daha iyi görünüm için genişlik artırıldı */
`;

export default SearchBar;
