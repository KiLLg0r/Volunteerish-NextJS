import { Spacer, User, Table, Button } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";

import styles from "../pages/styles/Home.module.scss";

const Leaderboard = () => {
  const { users } = useAuth();

  return (
    <>
      <h3 className={styles.subtitle}>Leaderboard</h3>
      {users && (
        <Table aria-label="Leaderboard" compact>
          <Table.Header>
            <Table.Column>NO</Table.Column>
            <Table.Column>USER</Table.Column>
            <Table.Column>POINTS</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.slice(0, 5).map((user, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell css={{ paddingRight: "0" }}>
                    <User src={user.data?.photoURL} name={user.data?.name} size="sm" />
                  </Table.Cell>
                  <Table.Cell>{user.data.points}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
      <Spacer />
      <Button color="error" bordered css={{ width: "100%" }}>
        View all leaderboard
      </Button>
    </>
  );
};

export default Leaderboard;
