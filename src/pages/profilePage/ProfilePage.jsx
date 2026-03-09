import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../../redux/actions/UserActions";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProfileHero from "../../components/hero/ProfileHero";

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
    <div>
      <Container>
        <Row className="d-flex flex-column flex-lg-row">
          {/* col dx */}
          <Col xs={12} lg={8}>
            <Row className="d-flex flex-column">
              <Col>
                <ProfileHero />
              </Col>
              <Col>betta events</Col>
            </Row>
          </Col>
          {/* col sx */}
          <Col xs={12} lg={4}>
            aside
          </Col>
        </Row>
      </Container>
      <h1>Profile</h1>

      {/* <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p> */}
    </div>
  );
}

export default ProfilePage;
