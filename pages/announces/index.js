import { withProtected, withNavigation } from "../../utilities/routes";
import AnnounceCard from "../../components/Card";
import { useState, useRef, useEffect } from "react";
import { Collapse, Grid, Col, Row, Button } from "@nextui-org/react";
import { query, collection, getDocs, orderBy, where, limit } from "firebase/firestore";
import { Country, State, City } from "country-state-city";
import { useRouter } from "next/router";
import { useWindowSize } from "../../utilities/hooks";
import { db } from "../../config/firebase";
import nookies from "nookies";
import { firebaseAdmin } from "../../config/firebaseAdmin";
import { BsPlusCircleFill } from "react-icons/bs";
import Link from "next/link";
import languages from "../../utilities/languages.json";
import { useAuth } from "../../context/AuthContext";

import NoAnnounces from "../../public/svg/no_announces.svg";
import styles from "../styles/Announces.module.scss";

const Announces = ({ initialAnnounces, initialLastKey }) => {
  const { Language } = useAuth();
  const announces = JSON.parse(initialAnnounces);
  const lastKey = initialLastKey ? JSON.parse(initialLastKey) : "";
  const router = useRouter();
  const queryURL = router.query;
  const size = useWindowSize();

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const categoryRef = useRef(null);
  const orderByRef = useRef(null);
  const difficultyRef = useRef(null);

  const handleChange = () =>
    router.replace({
      pathname: "/announces",
      query: {
        ...(countryRef.current.value && { country: countryRef.current.value }),
        ...(stateRef.current.value && { state: stateRef.current.value }),
        ...(cityRef.current.value && { city: cityRef.current.value }),
        ...(categoryRef.current.value && { category: categoryRef.current.value }),
        ...(difficultyRef.current.value && { difficulty: difficultyRef.current.value }),
        ...(orderByRef.current.value && { orderBy: orderByRef.current.value }),
      },
    });

  useEffect(() => {
    if (queryURL) {
      setStates(State.getStatesOfCountry(queryURL?.country));
      setCities(City.getCitiesOfState(queryURL?.country, queryURL?.state));
    }
  }, [announces, queryURL]);

  return (
    <Grid.Container gap={2} css={{ position: "relative" }}>
      <Grid xs={12}>
        <h2 className={styles.title}>{languages[Language].announces.title}</h2>
      </Grid>
      <Grid xs={12} sm={3}>
        <Collapse.Group css={{ width: "100%" }}>
          <Collapse expanded={size.width > 650} title={languages[Language].announces.filter}>
            <form>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>{languages[Language].select.category}</label>
                <select
                  className={styles.select}
                  ref={categoryRef}
                  defaultValue={queryURL?.category}
                  onChange={handleChange}
                >
                  <option value="">{languages[Language].select.categoryOption}</option>
                  <option value="Groceries">{languages[Language].announces.groceries}</option>
                  <option value="School meditations">{languages[Language].announces.schoolMeditations}</option>
                  <option value="Shopping">{languages[Language].announces.shopping}</option>
                  <option value="Cleaning">{languages[Language].announces.cleaning}</option>
                  <option value="Walking">{languages[Language].announces.walking}</option>
                  <option value="Cooking">{languages[Language].announces.cooking}</option>
                  <option value="Paying of bills">{languages[Language].announces.payingOfBills}</option>
                  <option value="Emotional support">{languages[Language].announces.emotionalSupport}</option>
                  <option value="Physical labour">{languages[Language].announces.physicalLabour}</option>
                  <option value="Hard work">{languages[Language].announces.hardWork}</option>
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>{languages[Language].select.difficulty}</label>
                <select
                  className={styles.select}
                  ref={difficultyRef}
                  defaultValue={queryURL?.difficulty}
                  onChange={handleChange}
                >
                  <option value="">{languages[Language].select.difficultyOption}</option>
                  <option value="easy">{languages[Language].announces.easy}</option>
                  <option value="medium">{languages[Language].announces.medium}</option>
                  <option value="hard">{languages[Language].announces.hard}</option>
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>{languages[Language].select.country}</label>
                <select
                  className={styles.select}
                  ref={countryRef}
                  defaultValue={queryURL?.country}
                  onChange={() => {
                    setStates([]);
                    setCities([]);
                    stateRef.current.selectedIndex = 0;
                    cityRef.current.selectedIndex = 0;
                    handleChange();
                  }}
                >
                  <option value="">{languages[Language].select.countryOption}</option>
                  {countries &&
                    countries.map((country) => {
                      return (
                        <option value={country.isoCode} key={country.isoCode}>
                          {country.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>{languages[Language].select.state}</label>
                <select
                  className={styles.select}
                  ref={stateRef}
                  defaultValue={queryURL?.state}
                  onChange={() => {
                    setCities([]);
                    cityRef.current.selectedIndex = 0;
                    handleChange();
                  }}
                >
                  <option value="">{languages[Language].select.stateOption}</option>
                  {states &&
                    states.map((state) => {
                      return (
                        <option value={state.isoCode} key={state.isoCode}>
                          {state.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>{languages[Language].select.city}</label>
                <select className={styles.select} defaultValue={queryURL?.city} ref={cityRef} onChange={handleChange}>
                  <option value="">{languages[Language].select.cityOption}</option>
                  {cities &&
                    cities.map((city) => {
                      return (
                        <option value={city.name} key={city.name}>
                          {city.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>{languages[Language].select.orderBy}</label>
                <select
                  className={styles.select}
                  ref={orderByRef}
                  defaultValue={queryURL?.orderBy}
                  onChange={handleChange}
                >
                  <option value="recent">{languages[Language].select.orderByOption1}</option>
                  <option value="latest">{languages[Language].select.orderByOption2}</option>
                </select>
              </div>
            </form>
          </Collapse>
        </Collapse.Group>
      </Grid>
      <Grid xs={12} sm={9}>
        <Grid.Container gap={2}>
          {announces &&
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
            })}
          {lastKey?.length > 0 && (
            <Grid xs={12} justify="center">
              <Button color="error" bordered>
                {languages[Language].announces.loadMoreAnnounces}
              </Button>
            </Grid>
          )}
          {announces.length === 0 && (
            <Grid xs={12} className={styles.noAnnouncesSVG}>
              <Col>
                <NoAnnounces />
                <Row>
                  <h3 className={styles.subtitle}>{languages[Language].announces.noAnnounces}</h3>
                </Row>
              </Col>
            </Grid>
          )}
        </Grid.Container>
      </Grid>
      <Link href="/announces/add-new-announce">
        <a className={styles.addNewAnnounce}>
          <BsPlusCircleFill />
        </a>
      </Link>
    </Grid.Container>
  );
};

export default withProtected(withNavigation(Announces));

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const user = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid } = user;

    const URLQuery = ctx.query;

    let URLQueryItems = [];

    if (URLQuery?.country) URLQueryItems.push(where("country", "==", URLQuery.country));
    if (URLQuery?.state) URLQueryItems.push(where("state", "==", URLQuery.state));
    if (URLQuery?.city) URLQueryItems.push(where("city", "==", URLQuery.city));
    if (URLQuery?.category) URLQueryItems.push(where("category", "==", URLQuery.category));
    if (URLQuery?.difficulty)
      if (URLQuery.difficulty === "easy") URLQueryItems.push(where("difficulty", "==", "0"));
      else if (URLQuery.difficulty === "medium") URLQueryItems.push(where("difficulty", "==", "1"));
      else if (URLQuery.difficulty === "hard") URLQueryItems.push(where("difficulty", "==", "2"));
    if (URLQuery?.orderBy) {
      if (URLQuery.orderBy === "recent") URLQueryItems.push(orderBy("posted", "desc"));
      else if (URLQuery.orderBy === "latest") URLQueryItems.push(orderBy("posted", "asc"));
    } else URLQueryItems.push(orderBy("posted", "desc"));

    const q = query(
      collection(db, "announces"),
      where("status", "==", "active"),
      where("uid", "!=", uid),
      orderBy("uid", "desc"),
      ...URLQueryItems,
      limit(15),
    );

    const announcesSnapshot = await getDocs(q);

    let rawAnnounces = [];
    let rawLastKey = [];
    let announcesNumber = 0;

    announcesSnapshot.forEach((announce) => {
      rawAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
      rawLastKey = announce.data().posted;
      announcesNumber++;
    });

    const initialAnnounces = JSON.stringify(rawAnnounces);
    const initialLastKey = announcesNumber > 15 ? JSON.stringify(rawLastKey) : "";

    return {
      props: {
        initialAnnounces,
        initialLastKey,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
