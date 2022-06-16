import { withProtected, withNavigation } from "../utilities/routes";
import AnnounceCard from "../components/Card";
import { useState, useRef, useEffect } from "react";
import { Collapse, Grid, Col, Row } from "@nextui-org/react";
import { query, collection, getDocs, orderBy, where } from "firebase/firestore";
import { Country, State, City } from "country-state-city";
import { useRouter } from "next/router";
import { useWindowSize } from "../utilities/hooks";
import { db } from "../config/firebase";
import nookies from "nookies";
import { firebaseAdmin } from "../config/firebaseAdmin";

import NoAnnounces from "../public/svg/no_announces.svg";
import styles from "./styles/Announces.module.scss";

const Announces = ({ initialAnnounces }) => {
  const announces = JSON.parse(initialAnnounces);
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
    if (queryURL?.country) {
      setStates(State.getStatesOfCountry(queryURL.country));
      if (queryURL?.state) setCities(City.getCitiesOfState(queryURL.country, queryURL.state));
    }
  }, [announces, initialAnnounces, queryURL]);

  return (
    <Grid.Container gap={2}>
      <Grid xs={12}>
        <h2 className={styles.title}>Announces</h2>
      </Grid>
      <Grid xs={12} sm={3}>
        <Collapse.Group css={{ width: "100%" }}>
          <Collapse expanded={size.width > 650} title="Filter">
            <form>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>Category</label>
                <select
                  className={styles.select}
                  ref={categoryRef}
                  defaultValue={queryURL?.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Groceries">Groceries</option>
                  <option value="School meditations">School meditations</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Walking">Walking</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Paying of bills">Paying of bills</option>
                  <option value="Emotional support">Emotional support</option>
                  <option value="Physical labour">Physical labour</option>
                  <option value="Hard work">Hard work</option>
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>Difficulty</label>
                <select
                  className={styles.select}
                  ref={difficultyRef}
                  defaultValue={queryURL?.difficulty}
                  onChange={handleChange}
                >
                  <option value="">Select a difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className={styles.filterOption}>
                <label className={styles.selectLabel}>Country</label>
                <select
                  className={styles.select}
                  ref={countryRef}
                  defaultValue={queryURL?.country}
                  onChange={handleChange}
                >
                  <option value="">Select country</option>
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
                <label className={styles.selectLabel}>State</label>
                <select className={styles.select} ref={stateRef} defaultValue={queryURL?.state} onChange={handleChange}>
                  <option value="">Select state</option>
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
                <label className={styles.selectLabel}>City</label>
                <select className={styles.select} defaultValue={queryURL?.city} ref={cityRef} onChange={handleChange}>
                  <option value="">Select city</option>
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
                <label className={styles.selectLabel}>Order by</label>
                <select
                  className={styles.select}
                  ref={orderByRef}
                  defaultValue={queryURL?.orderBy}
                  onChange={handleChange}
                >
                  <option value="recent">The newest</option>
                  <option value="latest">The oldest</option>
                </select>
              </div>
            </form>
          </Collapse>
        </Collapse.Group>
      </Grid>
      <Grid xs={12} sm={9}>
        <Grid.Container gap={3}>
          {announces &&
            announces.map((announce) => {
              return (
                <Grid xs={12} sm={6} key={announce.id}>
                  <AnnounceCard key={announce.id} data={announce.data} />
                </Grid>
              );
            })}
          {announces.length === 0 && (
            <Grid xs={12} className={styles.noAnnouncesSVG}>
              <Col>
                <NoAnnounces />
                <Row>
                  <h3 className={styles.subtitle}>No announces at the time!</h3>
                </Row>
              </Col>
            </Grid>
          )}
        </Grid.Container>
      </Grid>
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
    console.log(URLQuery);

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
    );

    const announcesSnapshot = await getDocs(q);

    let rawAnnounces = [];

    announcesSnapshot.forEach((announce) => {
      rawAnnounces.push({
        id: announce.id,
        data: announce.data(),
      });
    });

    console.log(rawAnnounces);

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
