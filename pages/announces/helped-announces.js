import { withProtected, withNavigation } from "../../utilities/routes";
import nookies from "nookies";
import { firebaseAdmin } from "../../config/firebaseAdmin";
import { db } from "../../config/firebase";
import { query, getDocs, collection, where, limit, orderBy } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Grid, Button, Col, Row } from "@nextui-org/react";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import languages from "../../utilities/languages.json";
import AnnounceCard from "../../components/Card";
import Link from "next/link";
import Head from "next/head";

import NoAnnounces from "../../public/svg/no_announces.svg";
import styles from "../styles/Announces.module.scss";

const ClosedAnnounces = ({ initialAnnounces }) => {
  const router = useRouter();
  const announces = JSON.parse(initialAnnounces);
  const { Language } = useAuth();

  return (
    <Grid.Container gap={2}>
      <Head>
        <title>
          {languages[Language].helpedAnnounces} | {languages[Language].headTags.title}
        </title>
      </Head>
      <Grid xs={12}>
        <Button
          onPress={() => router.back()}
          color="error"
          light
          icon={<BsChevronLeft />}
          className={styles.announceHeader}
          auto
        >
          {languages[Language].goBack}
        </Button>
      </Grid>
      <Grid xs={12}>
        <h2 className={styles.title}>{languages[Language].helpedAnnounces}</h2>
      </Grid>
      {announces ? (
        announces.map((announce) => {
          return (
            <Grid xs={12} sm={6} key={announce.id} css={{ height: "fit-content" }}>
              <Link href={`/announces/${announce.id}`}>
                <a>
                  <AnnounceCard key={announce.id} data={announce.data} />
                </a>
              </Link>
            </Grid>
          );
        })
      ) : (
        <Grid xs={12} className={styles.noAnnouncesSVG}>
          <Col>
            <Row justify="center">
              <NoAnnounces />
            </Row>
            <Row>
              <h3 className={styles.subtitle}>{languages[Language].announces.noAnnounces}</h3>
            </Row>
          </Col>
        </Grid>
      )}
    </Grid.Container>
  );
};

export default withProtected(withNavigation(ClosedAnnounces));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = user;

    const q = query(
      collection(db, "announces"),
      where("status", "==", "helped"),
      where("uid", "!=", uid),
      where("helpedBy", "==", uid),
      orderBy("uid", "asc"),
      orderBy("posted", "desc"),
      limit(10),
    );

    const announces = await getDocs(q);

    let rawAnnounces = [];

    announces.forEach((announce) => {
      rawAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
    });

    const initialAnnounces = JSON.stringify(rawAnnounces);

    return {
      props: {
        initialAnnounces,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
