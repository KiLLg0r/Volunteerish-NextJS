import { useAuth } from "../context/AuthContext";
import { withProtected } from "../utilities/routes";
import Loading from "../components/Loading";

function Index({ auth }) {
  const { logout, currentUser } = auth;
  return (
    <>
      <h1>{currentUser?.uid}</h1>
      <button onClick={logout}>Log out</button>
      <button onClick={() => console.log(currentUser)}>Show current user</button>
      {/* <Loading /> */}
    </>
  );
}

export default withProtected(Index);
