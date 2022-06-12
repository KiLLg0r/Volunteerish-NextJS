import { useAuth } from "../context/AuthContext";
import { withProtected, withNavigation } from "../utilities/routes";

const Announces = () => {
  const { userData } = useAuth();
  return (
    <>
      <h1>{userData?.points}</h1>
    </>
  );
};

export default withProtected(withNavigation(Announces));
