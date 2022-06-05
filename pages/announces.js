import { withProtected, withNavigation } from "../utilities/routes";

const Announces = () => {
  return (
    <>
      <h1>Ceaw!</h1>
    </>
  );
};

export default withProtected(withNavigation(Announces));
