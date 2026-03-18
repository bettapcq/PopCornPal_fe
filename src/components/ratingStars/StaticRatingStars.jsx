import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";

function StaticRatingStars({ rating = 0 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStarHalfStroke} className="star" />,
      );
    } else {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className="star star-empty" />,
      );
    }
  }

  return (
    <Col className="flex-row wrap-nowrap d-flex align-items-center gap-1">
      {stars}
    </Col>
  );
}

export default StaticRatingStars;
