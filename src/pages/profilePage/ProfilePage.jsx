import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/actions/UserActions";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHero from "../../components/hero/ProfileHero";
import AsideSection from "../../components/asideSection/AsideSection";

function ProfilePage() {
  const { userId } = useParams();
  const user = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    // if(userId){
    //   dispatch(getUserProfile(userId));
    // }
    dispatch(getMyProfile());
  }, [dispatch]);

  return (
    <Container className="main-content" fluid>
      <Row className="d-flex flex-column flex-lg-row ">
        {/* col dx */}
        <Col xs={12} lg={9}>
          <Row className="d-flex flex-column">
            <Col>
              <ProfileHero />
            </Col>
            <Col>MY EVENTS SECTION</Col>
          </Row>
        </Col>
        {/* col sx */}
        <Col xs={12} lg={3}>
          <AsideSection />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
