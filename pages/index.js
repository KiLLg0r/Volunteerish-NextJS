import { withProtected, withNavigation } from "../utilities/routes";
import { Row, Col, Spacer, Grid, Collapse, Button, Container } from "@nextui-org/react";
import { BsChevronBarRight } from "react-icons/bs";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import nookies from "nookies";
import { firebaseAdmin } from "../config/firebaseAdmin";

import { db } from "../config/firebase";

import AnnounceCard from "../components/Card";
import Leaderboard from "../components/Leaderboards";

import styles from "./styles/Home.module.scss";

function Index({
  auth,
  initialUserAnnounces,
  userAnnouncesLastKey,
  initialUserHelpingAnnounces,
  userHelpingAnnouncesLastKey,
  initialUserHelpedAnnounces,
  userHelpedAnnouncesLastKey,
  initialUserClosedAnnounces,
  userClosedAnnouncesLastKey,
}) {
  const { userData, currentUser } = auth;

  const myAnnounces = JSON.parse(initialUserAnnounces);
  const myHelpingAnnounces = JSON.parse(initialUserHelpingAnnounces);
  const myHelpedAnnounces = JSON.parse(initialUserHelpedAnnounces);
  const myClosedAnnounces = JSON.parse(initialUserClosedAnnounces);

  const myAnnouncesLastKey = userAnnouncesLastKey ? JSON.parse(userAnnouncesLastKey) : "";
  const myHelpingAnnouncesLastKey = userHelpingAnnouncesLastKey ? JSON.parse(userHelpingAnnouncesLastKey) : "";
  const myHelpedAnnouncesLastKey = userHelpedAnnouncesLastKey ? JSON.parse(userHelpedAnnouncesLastKey) : "";
  const myClosedAnnouncesLastKey = userClosedAnnouncesLastKey ? JSON.parse(userClosedAnnouncesLastKey) : "";

  return (
    <section className={styles.dashboard}>
      <h2 className={styles.title} onClick={() => console.log(currentUser)}>
        Dashboard
      </h2>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={3}>
          <Col>
            <h3 className={styles.subtitle}>Stats</h3>

            <Col css={{ fontSize: "1.25rem", fontWeight: "600" }}>
              <Container fluid className={styles.stats}>
                <Row>
                  <Col>People helped</Col>
                  <span style={{ color: "var(--nextui-colors-cyan600)" }}>
                    {userData?.helpedPeople ? userData.helpedPeople : "0"}
                  </span>
                </Row>
              </Container>

              <Spacer />

              <Container fluid className={styles.stats}>
                <Row>
                  <Col>Points</Col>
                  <span style={{ color: "var(--nextui-colors-yellow700)" }}>
                    {userData?.points ? userData.points : "0"}
                  </span>
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
                  {myHelpedAnnouncesLastKey && (
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

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = user;

    const userAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "==", "active"),
      where("uid", "==", uid),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userHelpingAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "==", "helping"),
      where("uid", "!=", uid),
      where("helpingBy", "==", uid),
      orderBy("uid", "desc"),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userHelpedAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "==", "helped"),
      where("uid", "!=", uid),
      where("helpingBy", "==", uid),
      orderBy("uid", "desc"),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userClosedAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "==", "closed"),
      where("uid", "==", uid),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userAnnouncesSnapshot = await getDocs(userAnnouncesQuery);
    const userHelpingAnnouncesSnapshot = await getDocs(userHelpingAnnouncesQuery);
    const userHelpedAnnouncesSnapshot = await getDocs(userHelpedAnnouncesQuery);
    const userClosedAnnouncesSnapshot = await getDocs(userClosedAnnouncesQuery);

    let rawUserAnnounces = [];
    let rawUserAnnouncesLastKey = "";
    let userAnnouncesNumber = 0;

    let rawUserHelpingAnnounces = [];
    let rawUserHelpingAnnouncesLastKey = "";
    let userHelpingAnnouncesNumber = 0;

    let rawUserHelpedAnnounces = [];
    let rawUserHelpedAnnouncesLastKey = "";
    let userHelpedAnnouncesNumber = 0;

    let rawUserClosedAnnounces = [];
    let rawUserClosedAnnouncesLastKey = "";
    let userClosedAnnouncesNumber = 0;

    userAnnouncesSnapshot.forEach((announce) => {
      rawUserAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      rawUserAnnouncesLastKey = announce.data().posted;
      userAnnouncesNumber++;
    });

    userHelpingAnnouncesSnapshot.forEach((announce) => {
      rawUserHelpingAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      rawUserHelpingAnnouncesLastKey = announce.data().posted;
      userHelpingAnnouncesNumber++;
    });

    userHelpedAnnouncesSnapshot.forEach((announce) => {
      rawUserHelpedAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      rawUserHelpedAnnouncesLastKey = announce.data().posted;
      userHelpedAnnouncesNumber++;
    });

    userClosedAnnouncesSnapshot.forEach((announce) => {
      rawUserClosedAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      rawUserClosedAnnouncesLastKey = announce.data().posted;
      userClosedAnnouncesNumber++;
    });

    const initialUserAnnounces = JSON.stringify(rawUserAnnounces);
    const initialUserHelpingAnnounces = JSON.stringify(rawUserHelpingAnnounces);
    const initialUserHelpedAnnounces = JSON.stringify(rawUserHelpedAnnounces);
    const initialUserClosedAnnounces = JSON.stringify(rawUserClosedAnnounces);

    const userAnnouncesLastKey = userAnnouncesNumber > 5 ? JSON.stringify(rawUserAnnouncesLastKey) : "";
    const userHelpingAnnouncesLastKey =
      userHelpingAnnouncesNumber > 5 ? JSON.stringify(rawUserHelpingAnnouncesLastKey) : "";
    const userHelpedAnnouncesLastKey =
      userHelpedAnnouncesNumber > 5 ? JSON.stringify(rawUserHelpedAnnouncesLastKey) : "";
    const userClosedAnnouncesLastKey =
      userClosedAnnouncesNumber > 5 ? JSON.stringify(rawUserClosedAnnouncesLastKey) : "";

    return {
      props: {
        initialUserAnnounces,
        userAnnouncesLastKey,
        initialUserHelpingAnnounces,
        userHelpingAnnouncesLastKey,
        initialUserHelpedAnnounces,
        userHelpedAnnouncesLastKey,
        initialUserClosedAnnounces,
        userClosedAnnouncesLastKey,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};
