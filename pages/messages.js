import { withProtected, withNavigation } from "../utilities/routes";

const Messages = () => {
  return (
    <>
      <h2>Ciao bella!</h2>
    </>
  );
};

export default withProtected(withNavigation(Messages));
