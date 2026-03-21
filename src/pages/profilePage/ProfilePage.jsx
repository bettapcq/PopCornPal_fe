import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/UserActions";
import {
  getUserFutureEvents,
  getUserPastEvents,
  getUserJoinedEvents,
  getUserFutureEventsToJoin,
} from "../../redux/actions/EventActions";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHero from "../../components/profileHero/ProfileHero";
import AsideSectionDx from "../../components/asideSections/AsideSectionDx";
import AsideSectionSx from "../../components/asideSections/AsideSectionSx";
import ProfileMainSection from "../../components/ProfileMainSection/ProfileMainSection";

function ProfilePage() {
  const myId = useSelector((state) => state.auth.userLogged?.userId);
  const profileUsername = useSelector(
    (state) => state.auth.userLogged?.username,
  );
  const userLogged = useSelector((state) => state.auth.userLogged);
  const params = useParams();
  const userId = params.userId;
  // const events = useSelector((state) => state.events.events);

  const profileId = userId ? Number(userId) : myId;
  const dispatch = useDispatch();

  useEffect(() => {
    // no rerender if userId === profileId
    if (!profileId) return;

    dispatch(getProfile(profileId));

    if (userLogged?.userId) {
      dispatch(getUserFutureEvents(userLogged.userId));
      dispatch(getUserPastEvents(userLogged.userId));
      dispatch(getUserJoinedEvents(userLogged.userId));
      dispatch(getUserFutureEventsToJoin(userLogged.userId));
    }
  }, [dispatch, userId, myId]);

  return (
    <Container className="main-content" fluid>
      <Row className="d-flex flex-column flex-lg-row justify-content-between">
        {/* col sx */}
        <Col xs={12} md={3} className="order-2 order-lg-1">
          <AsideSectionSx />
        </Col>
        {/* col center */}
        <Col xs={12} md={6} className="order-1 order-lg-2">
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
        <Col xs={12} md={3} className="order-3 ">
          <AsideSectionDx />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
