import { withProtected, withNavigation } from "../utilities/routes";
import { Row, Col, Spacer, Grid, Image, Collapse, Button, Container } from "@nextui-org/react";
import { BsChevronBarRight } from "react-icons/bs";

import styles from "./styles/Home.module.scss";

function Index({ auth }) {
  const { currentUser, userData } = auth;
  const firstName = currentUser.displayName.split(" ")[0];
  const lastName = currentUser.displayName.split(" ")[1];

  return (
    <section className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <Container css={{ display: "flex", flexFlow: "column", "@sm": { flexFlow: "row" } }} fluid>
        <div className={styles.leftSide}>
          <Grid.Container className={styles.userHeader}>
            <Grid xs={5} className={styles.imageCol}>
              <div className={styles.coloredBorder}>
                <Image
                  src={currentUser.photoURL}
                  alt="User profile image"
                  objectFit="cover"
                  showSkeleton
                  maxDelay={5000}
                  height={"100%"}
                  width={"100%"}
                />
              </div>
            </Grid>
            <Grid xs={1} justify="center" alignItems="center">
              <div className={styles.bar}></div>
            </Grid>
            <Grid xs={6} className={styles.textGrid}>
              <Row>
                <div className={styles.firstName}>{firstName}</div>
              </Row>
              <Row>
                <div className={styles.lastName}>{lastName}</div>
              </Row>
            </Grid>
          </Grid.Container>

          <Spacer />

          <Row css={{ fontSize: "1.25rem", fontWeight: "600" }}>
            <Col>
              <Row>Points</Row>
              <Row>
                <span style={{ color: "var(--nextui-colors-yellow700)" }}>{userData?.points}</span>
              </Row>
            </Col>
            <Col>
              <Row>People helped</Row>
              <Row>
                <span style={{ color: "var(--nextui-colors-cyan600)" }}>{userData?.helpedPeople}</span>
              </Row>
            </Col>
          </Row>

          <Spacer />
        </div>

        <div className={styles.rightSide}>
          <h3 className={styles.subtitle}>Announces</h3>

          <Collapse.Group css={{ padding: "0" }}>
            <Collapse title="Active announce">
              <div className={styles.horizontalScrollContainer}>
                <Button
                  color="error"
                  css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                  bordered
                  borderWeight={3}
                >
                  See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                </Button>
              </div>
            </Collapse>
            <Collapse title="Helping now" expanded>
              <div className={styles.horizontalScrollContainer}>
                <Button
                  color="error"
                  css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                  bordered
                  borderWeight={3}
                >
                  See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                </Button>
              </div>
            </Collapse>
            <Collapse title="Helped">
              <div className={styles.horizontalScrollContainer}>
                <Button
                  color="error"
                  css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                  bordered
                  borderWeight={3}
                >
                  See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                </Button>
              </div>
            </Collapse>
            <Collapse title="Closed announces">
              <div className={styles.horizontalScrollContainer}>
                <Button
                  color="error"
                  css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                  bordered
                  borderWeight={3}
                >
                  See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                </Button>
              </div>
            </Collapse>
          </Collapse.Group>
        </div>
      </Container>
    </section>
  );
}

export default withProtected(withNavigation(Index));
