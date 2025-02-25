import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Rating = ({ rating }) => {
  const renderStar = (index) => {
    const isFull = index <= rating;
    const isHalf = Math.abs(index - rating) < 0.5;

    return (
      <Star
        key={`star-${index}`}
        icon={isFull ? faStar : isHalf ? faStarHalfAlt : faStar}
        $isActive={isFull || isHalf}
      />
    );
  };

  return (
    <StarContainer title={`${rating} out of 5 stars`} aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => renderStar(i + 1))}
      <ScreenReaderText>{rating} out of 5 stars</ScreenReaderText>
    </StarContainer>
  );
};


const StarContainer = styled.span.attrs({ role: "img" })`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  position: relative;
`;

const Star = styled(FontAwesomeIcon)`
  color: ${(props) => (props.$isActive ? props.theme?.colors?.star || "#FFD700" : "#ccc")};
  font-size: 1.2rem;
`;


const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;


Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default React.memo(Rating);
