import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/UserActions";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHero from "../../components/hero/ProfileHero";
import AsideSection from "../../components/asideSection/AsideSection";

function ProfilePage() {
  const user = useSelector((state) => state.users.profile);
  const myId = useSelector((state) => state.auth.userLogged?.userId);
  const params = useParams();
  const userId = params.userId;
  // const events = useSelector((state) => state.events.events);

  const profileId = userId || myId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!profileId) return;
    if (profileId !== user?.userId) {
      dispatch(getProfile(profileId));
      dispatch(getUserFutureEvents(profileId));
      dispatch(getUserPastEvents(profileId));
      //TODO:
      //dispatch(getUserJoinedEvents(profileId))
    }
  }, [dispatch, profileId]);

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
