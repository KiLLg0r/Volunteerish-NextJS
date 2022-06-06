import { withProtected, withNavigation } from "../utilities/routes";
import { Row, Col, Spacer, Grid, Image, Collapse, Card, Button } from "@nextui-org/react";
import { BsChevronBarRight } from "react-icons/bs";

import styles from "./styles/Home.module.scss";

function Index({ auth }) {
  const { currentUser, userData } = auth;
  const firstName = currentUser.displayName.split(" ")[0];
  const lastName = currentUser.displayName.split(" ")[1];

  return (
    <section className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <Grid.Container className={styles.userHeader}>
        <Grid xs={5} className={styles.imageCol}>
          <Image
            src={currentUser.photoURL}
            alt="User profile image"
            objectFit="cover"
            showSkeleton
            maxDelay={5000}
            height={"100%"}
            width={"100%"}
          />
        </Grid>
        <Grid xs={1} justify="center" alignItems="center">
          <div className={styles.bar}></div>
        </Grid>
        <Grid xs={6} className={styles.textGrid}>
          <Col className={styles.textCol}>
            <Row justify="space-between">
              People helped
              <span style={{ color: "var(--nextui-colors-cyan600)" }}>{userData?.helpedPeople}</span>
            </Row>
            <Row justify="space-between">
              Points
              <span style={{ color: "var(--nextui-colors-yellow700)" }}>{userData?.points}</span>
            </Row>
          </Col>
        </Grid>
      </Grid.Container>

      <Row>
        <div className={styles.firstName}>{firstName}</div>
        <Spacer x={0.25} />
        <div className={styles.lastName}>{lastName}</div>
      </Row>

      <Spacer />

      <h3 className={styles.subtitle}>Announces</h3>

      <Collapse.Group css={{ padding: "0" }}>
        <Collapse title="Active announce">
          <div className={styles.horizontalScrollContainer}>
            <Card clickable className={styles.card} color="gradient" css={{ height: "250px" }}>
              <Card.Header>
                <h3>{currentUser.displayName}</h3>
              </Card.Header>
              <Card.Body css={{ padding: "0 var(--nextui-space-lg)" }}>
                <Row css={{ height: "100%", width: "100%" }}>
                  <Col span={4} css={{ height: "100%" }}>
                    <Image
                      src={currentUser.photoURL}
                      alt="User profile image"
                      showSkeleton
                      maxDelay={5000}
                      width={"100%"}
                      autoResize
                      css={{ aspectRatio: "1", objectFit: "cover", borderRadius: "0.875rem" }}
                    />
                  </Col>
                  <Spacer />
                  <Col span={8} css={{ height: "100%" }}>
                    <Row>Description</Row>
                    <Row>Lorem ipsum dolor sit ...</Row>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col>
                    <Row>Category</Row>
                    <Row>Grocery</Row>
                  </Col>
                  <Col>
                    <Row>Difficulty</Row>
                    <Row>Easy</Row>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
            <Button
              color="error"
              css={{ height: "250px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
              bordered
              borderWeight={3}
            >
              See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
            </Button>
          </div>
        </Collapse>
        <Collapse title="Helping now" expanded></Collapse>
        <Collapse title="Helped">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </Collapse>
        <Collapse title="Closed announces">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </Collapse>
      </Collapse.Group>
    </section>
  );
}

export default withProtected(withNavigation(Index));
