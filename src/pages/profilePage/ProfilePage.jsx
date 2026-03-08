import { useSelector } from "react-redux";

function ProfilePage() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>

      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.city}</p>
    </div>
  );
}

export default ProfilePage;
