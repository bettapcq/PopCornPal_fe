import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/UserActions";
import {
  getUserFutureEvents,
  getUserPastEvents,
  getUserJoinedEvents,
} from "../../redux/actions/EventActions";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHero from "../../components/hero/ProfileHero";
import AsideSection from "../../components/asideSection/AsideSection";
import ProfileMainSection from "../../components/ProfileMainSection/ProfileMainSection";

function ProfilePage() {
  const myId = useSelector((state) => state.auth.userLogged?.userId);
  const profileUsername = useSelector(
    (state) => state.auth.userLogged?.username,
  );
  const params = useParams();
  const userId = params.userId;
  // const events = useSelector((state) => state.events.events);

  const profileId = userId || myId;

  console.log("userId param:", userId);
  console.log("myId from store:", myId);
  console.log("profileId:", profileId);
  console.log(
    "AUTH STATE:",
    useSelector((state) => state.auth),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // no rerender if userId === profileId
    if (!profileId) return;

    dispatch(getProfile(profileId));
    dispatch(getUserFutureEvents(profileId));
    dispatch(getUserPastEvents(profileId));
    dispatch(getUserJoinedEvents(profileId));
  }, [dispatch, userId, myId]);

  return (
    <Container className="main-content" fluid>
      <Row className="d-flex flex-column flex-lg-row ">
        {/* col dx */}
        <Col xs={12} lg={8}>
          <Row className="d-flex flex-column">
            <Col>
              <ProfileHero />
            </Col>
            <Col>
              <ProfileMainSection profileUsername={profileUsername} />
            </Col>
          </Row>
        </Col>
        {/* col sx */}
        <Col xs={12} lg={4}>
          <AsideSection />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
