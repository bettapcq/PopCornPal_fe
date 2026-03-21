import { useEffect, useState } from "react";
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
  const params = useParams();
  const userId = params.userId;

  const profileId = userId ? Number(userId) : myId;
  const dispatch = useDispatch();

  useEffect(() => {
    // no rerender if userId === profileId or nan
    if (!profileId || isNaN(profileId)) return;

    dispatch(getProfile(profileId));

    if (profileId) {
      dispatch(getUserFutureEvents(profileId));
      dispatch(getUserPastEvents(profileId));
      dispatch(getUserJoinedEvents(profileId));
      dispatch(getUserFutureEventsToJoin(profileId));
    }
  }, [dispatch, profileId]);

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
              <ProfileMainSection />
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
