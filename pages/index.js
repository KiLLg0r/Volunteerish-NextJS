import { useState, useEffect } from "react";
import { withProtected, withNavigation } from "../utilities/routes";
import { Row, Col, Spacer, Grid, Image, Collapse, Button, Container } from "@nextui-org/react";
import { BsChevronBarRight } from "react-icons/bs";

import AnnounceCard from "../components/Card";
import Leaderboard from "../components/Leaderboards";

import Queries from "../utilities/queries";

import styles from "./styles/Home.module.scss";

function Index({ auth }) {
  const { currentUser, userData } = auth;

  const [myAnnounces, setMyAnnounces] = useState([]);
  const [myHelpingAnnounces, setMyHelpingAnnounces] = useState([]);
  const [myHelpedAnnounces, setMyHelpedAnnounces] = useState([]);
  const [myClosedAnnounces, setMyClosedAnnounces] = useState([]);

  const [myAnnouncesLastKey, setMyAnnouncesLastKey] = useState("");
  const [myHelpingAnnouncesLastKey, setMyHelpingAnnouncesLastKey] = useState("");
  const [myHelpedAnnounceLastKey, setMyHelpedAnnounceLastKey] = useState("");
  const [myClosedAnnouncesLastKey, setMyClosedAnnouncesLastKey] = useState("");

  useEffect(() => {
    Queries.userAnnouncesFirstFetch(currentUser.uid, "active").then((res) => {
      if (res) {
        setMyAnnounces(res.announces);
        setMyAnnouncesLastKey(res.lastKey);
      }
    });
    Queries.helperUserAnnouncesFirstFetch(currentUser.uid, "helping").then((res) => {
      if (res) {
        setMyHelpingAnnounces(res.announces);
        setMyHelpingAnnouncesLastKey(res.lastKey);
      }
    });
    Queries.helperUserAnnouncesFirstFetch(currentUser.uid, "helped").then((res) => {
      if (res) {
        setMyHelpedAnnounces(res.announces);
        setMyHelpedAnnounceLastKey(res.lastKey);
      }
    });
    Queries.userAnnouncesFirstFetch(currentUser.uid, "closed").then((res) => {
      if (res) {
        setMyClosedAnnounces(res.announces);
        setMyClosedAnnouncesLastKey(res.lastKey);
      }
    });
  }, [currentUser.uid]);

  return (
    <section className={styles.dashboard}>
      <h2 className={styles.title}>Dashboard</h2>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={3}>
          <Col>
            <h3 className={styles.subtitle}>Stats</h3>

            <Col css={{ fontSize: "1.25rem", fontWeight: "600" }}>
              <Container fluid className={styles.stats}>
                <Row>
                  <Col>People helped</Col>
                  <span style={{ color: "var(--nextui-colors-cyan600)" }}>{userData?.helpedPeople}</span>
                </Row>
              </Container>

              <Spacer />

              <Container fluid className={styles.stats}>
                <Row>
                  <Col>Points</Col>
                  <span style={{ color: "var(--nextui-colors-yellow700)" }}>{userData?.points}</span>
                </Row>
              </Container>

              <Spacer />

              <Leaderboard />
            </Col>

            <Spacer />
          </Col>
        </Grid>
        <Grid xs={12} sm={9}>
          <Col>
            <h3 className={styles.subtitle}>Announces</h3>

            <Collapse.Group css={{ padding: "0" }}>
              <Collapse title="Active announce">
                <div className={styles.horizontalScrollContainer}>
                  {myAnnounces &&
                    myAnnounces.map((announce) => {
                      return <AnnounceCard key={announce.ID} data={announce.data} />;
                    })}
                  {myAnnouncesLastKey && (
                    <Button
                      color="error"
                      css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                      bordered
                      borderWeight={3}
                    >
                      See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                    </Button>
                  )}
                </div>
              </Collapse>
              <Collapse title="Helping now" expanded>
                <div className={styles.horizontalScrollContainer}>
                  {myHelpingAnnounces &&
                    myHelpingAnnounces.map((announce) => {
                      return <AnnounceCard key={announce.ID} data={announce.data} />;
                    })}
                  {myHelpingAnnouncesLastKey && (
                    <Button
                      color="error"
                      css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                      bordered
                      borderWeight={3}
                    >
                      See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                    </Button>
                  )}
                </div>
              </Collapse>
              <Collapse title="Helped">
                <div className={styles.horizontalScrollContainer}>
                  {myHelpedAnnounces &&
                    myHelpedAnnounces.map((announce) => {
                      return <AnnounceCard key={announce.ID} data={announce.data} />;
                    })}
                  {myHelpedAnnounceLastKey && (
                    <Button
                      color="error"
                      css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                      bordered
                      borderWeight={3}
                    >
                      See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                    </Button>
                  )}
                </div>
              </Collapse>
              <Collapse title="Closed announces">
                <div className={styles.horizontalScrollContainer}>
                  {myClosedAnnounces &&
                    myClosedAnnounces.map((announce) => {
                      return <AnnounceCard key={announce.ID} data={announce.data} />;
                    })}
                  {myClosedAnnouncesLastKey && (
                    <Button
                      color="error"
                      css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                      bordered
                      borderWeight={3}
                    >
                      See all announces <BsChevronBarRight style={{ fontSize: "2rem" }} />
                    </Button>
                  )}
                </div>
              </Collapse>
            </Collapse.Group>
          </Col>
        </Grid>
      </Grid.Container>
    </section>
  );
}

export default withProtected(withNavigation(Index));
