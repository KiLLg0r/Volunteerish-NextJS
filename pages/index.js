import { useAuth } from "../context/AuthContext";
import { withProtected, withNavigation } from "../utilities/routes";
import Loading from "../components/Loading";

function Index({ auth }) {
  const { logout, currentUser } = auth;
  return (
    <main>
      <h4>{currentUser?.uid}</h4>
      <button onClick={logout}>Log out</button>
      <button onClick={() => console.log(currentUser)}>Show current user</button>
      {/* <Loading /> */}
    </main>
  );
}

export default withProtected(withNavigation(Index));
