import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Col } from "react-bootstrap";

function DinamicRatingStars({ onRate, initialRating }) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRate?.(value);
  };

  return (
    <Col className="flex-row wrap-nowrap d-flex align-items-center justify-content-end gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className="star"
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          style={{
            cursor: "pointer",
            color: star <= (hover || rating) ? "#f5c76a" : "#555",
          }}
        />
      ))}
    </Col>
  );
}

export default DinamicRatingStars;
