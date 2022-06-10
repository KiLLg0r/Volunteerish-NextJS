
import { Container, Row, Spacer, User } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";

import styles from "../pages/styles/Home.module.scss";

const Leaderboard = () => {
  const { users } = useAuth();

  return (
    <Container fluid>
      <h3 className={styles.subtitle}>Leaderboard</h3>
      {users &&
        users.slice(0, 5).map((user) => {
          return (
            <>
              <Row key={user.id} gap={1}>
                <User src={user.data?.photoURL} name={user.data?.name} />
                {user.data.points}
              </Row>
              <Spacer />
            </>
          );
        })}
    </Container>
  );
};

export default Leaderboard;
