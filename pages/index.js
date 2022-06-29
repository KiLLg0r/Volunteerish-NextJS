import { withProtected, withNavigation } from "../utilities/routes";
import { Row, Col, Spacer, Grid, Collapse, Button, Container } from "@nextui-org/react";
import { BsChevronBarRight } from "react-icons/bs";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";
import nookies from "nookies";
import { firebaseAdmin } from "../config/firebaseAdmin";
import languages from "../utilities/languages.json";
import Head from "next/head";
import Link from "next/link";
import { abbreviateNumber } from "../utilities/functions";

import { db } from "../config/firebase";

import AnnounceCard from "../components/Card";

import styles from "./styles/Home.module.scss";

function Index({
  auth,
  initialUserAnnounces,
  initialUserHelpingAnnounces,
  initialUserHelpedAnnounces,
  userHelpedAnnouncesLastKey,
  initialUserClosedAnnounces,
  userClosedAnnouncesLastKey,
}) {
  const { userData, Language } = auth;

  const myAnnounces = JSON.parse(initialUserAnnounces);
  const myHelpingAnnounces = JSON.parse(initialUserHelpingAnnounces);
  const myHelpedAnnounces = JSON.parse(initialUserHelpedAnnounces);
  const myClosedAnnounces = JSON.parse(initialUserClosedAnnounces);

  const myHelpedAnnouncesLastKey = JSON.parse(userHelpedAnnouncesLastKey);
  const myClosedAnnouncesLastKey = JSON.parse(userClosedAnnouncesLastKey);

  return (
    <section className={styles.dashboard}>
      <Head>
        <title>
          {languages[Language].headTags.home} | {languages[Language].headTags.title}
        </title>
      </Head>
      <h2 className={styles.title}>{languages[Language].home.title}</h2>
      <Grid.Container gap={2}>
        <Grid xs={12} sm={3}>
          <Col>
            <h3 className={styles.subtitle}>{languages[Language].home.stats}</h3>

            <Col css={{ fontSize: "1.25rem", fontWeight: "600" }}>
              <Container fluid className={styles.stats}>
                <Row>
                  <Col>{languages[Language].home.peopleHelped}</Col>
                  <span style={{ color: "var(--nextui-colors-cyan600)" }}>
                    {userData?.helpedPeople ? userData.helpedPeople : "0"}
                  </span>
                </Row>
              </Container>

              <Spacer />

              <Container fluid className={styles.stats}>
                <Row>
                  <Col>{languages[Language].home.points}</Col>
                  <span style={{ color: "var(--nextui-colors-yellow700)" }}>
                    {userData?.points ? abbreviateNumber(userData.points) : "0"}
                  </span>
                </Row>
              </Container>

              <Spacer />
            </Col>

            <Spacer />
          </Col>
        </Grid>
        <Grid xs={12} sm={9}>
          <Col>
            <h3 className={styles.subtitle}>{languages[Language].home.announces}</h3>

            <Collapse.Group css={{ padding: "0" }}>
              <Collapse title={languages[Language].home.activeAnnounce}>
                <div className={styles.horizontalScrollContainer}>
                  {myAnnounces &&
                    myAnnounces.map((announce) => {
                      return (
                        <Link href={`/announces/${announce.id}`} key={announce.ID}>
                          <a>
                            <AnnounceCard key={announce.ID} data={announce.data} />
                          </a>
                        </Link>
                      );
                    })}
                </div>
              </Collapse>
              <Collapse title={languages[Language].home.helpingNow} expanded>
                <div className={styles.horizontalScrollContainer}>
                  {myHelpingAnnounces &&
                    myHelpingAnnounces.map((announce) => {
                      return (
                        <Link href={`/announces/${announce.id}`} key={announce.ID}>
                          <a>
                            <AnnounceCard key={announce.ID} data={announce.data} />
                          </a>
                        </Link>
                      );
                    })}
                </div>
              </Collapse>
              <Collapse title={languages[Language].home.helped}>
                <div className={styles.horizontalScrollContainer}>
                  {myHelpedAnnounces &&
                    myHelpedAnnounces.map((announce) => {
                      return (
                        <Link href={`/announces/${announce.id}`} key={announce.ID}>
                          <a>
                            <AnnounceCard key={announce.ID} data={announce.data} />
                          </a>
                        </Link>
                      );
                    })}
                  {myHelpedAnnouncesLastKey && (
                    <Link href="/announces/helped-announces">
                      <Button
                        color="error"
                        css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                        bordered
                        borderWeight={3}
                      >
                        {languages[Language].home.seeAllAnnounces}
                        <BsChevronBarRight style={{ fontSize: "2rem" }} />
                      </Button>
                    </Link>
                  )}
                </div>
              </Collapse>
              <Collapse title={languages[Language].home.closedAnnounces}>
                <div className={styles.horizontalScrollContainer}>
                  {myClosedAnnounces &&
                    myClosedAnnounces.map((announce) => {
                      return (
                        <Link href={`/announces/${announce.id}`} key={announce.ID}>
                          <a>
                            <AnnounceCard key={announce.ID} data={announce.data} />
                          </a>
                        </Link>
                      );
                    })}
                  {myClosedAnnouncesLastKey && (
                    <Link href="/announces/closed-announces">
                      <Button
                        color="error"
                        css={{ height: "275px", fontSize: "1.25rem", color: "$red500", borderColor: "$red500" }}
                        bordered
                        borderWeight={3}
                      >
                        {languages[Language].home.seeAllAnnounces}
                        <BsChevronBarRight style={{ fontSize: "2rem" }} />
                      </Button>
                    </Link>
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
      where("status", "in", ["active", "helping"]),
      where("uid", "==", uid),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userHelpingAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "==", "helping"),
      where("uid", "!=", uid),
      where("helpedBy", "==", uid),
      orderBy("uid", "desc"),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userHelpedAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "==", "helped"),
      where("uid", "!=", uid),
      where("helpedBy", "==", uid),
      orderBy("uid", "desc"),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userClosedAnnouncesQuery = query(
      collection(db, "announces"),
      where("status", "in", ["closed", "helped"]),
      where("uid", "==", uid),
      orderBy("posted", "desc"),
      limit(5),
    );

    const userAnnouncesSnapshot = await getDocs(userAnnouncesQuery);
    const userHelpingAnnouncesSnapshot = await getDocs(userHelpingAnnouncesQuery);
    const userHelpedAnnouncesSnapshot = await getDocs(userHelpedAnnouncesQuery);
    const userClosedAnnouncesSnapshot = await getDocs(userClosedAnnouncesQuery);

    let rawUserAnnounces = [];

    let rawUserHelpingAnnounces = [];

    let rawUserHelpedAnnounces = [];
    let userHelpedAnnouncesNumber = 0;

    let rawUserClosedAnnounces = [];
    let userClosedAnnouncesNumber = 0;

    userAnnouncesSnapshot.forEach((announce) => {
      rawUserAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
    });

    userHelpingAnnouncesSnapshot.forEach((announce) => {
      rawUserHelpingAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
    });

    userHelpedAnnouncesSnapshot.forEach((announce) => {
      rawUserHelpedAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      userHelpedAnnouncesNumber++;
    });

    userClosedAnnouncesSnapshot.forEach((announce) => {
      rawUserClosedAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      userClosedAnnouncesNumber++;
    });

    const initialUserAnnounces = JSON.stringify(rawUserAnnounces);
    const initialUserHelpingAnnounces = JSON.stringify(rawUserHelpingAnnounces);
    const initialUserHelpedAnnounces = JSON.stringify(rawUserHelpedAnnounces);
    const initialUserClosedAnnounces = JSON.stringify(rawUserClosedAnnounces);

    const userHelpedAnnouncesLastKey = userHelpedAnnouncesNumber >= 5 ? JSON.stringify(true) : JSON.stringify(false);
    const userClosedAnnouncesLastKey = userClosedAnnouncesNumber >= 5 ? JSON.stringify(true) : JSON.stringify(false);

    return {
      props: {
        initialUserAnnounces,
        initialUserHelpingAnnounces,
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
