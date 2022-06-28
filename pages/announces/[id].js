import { useRouter } from "next/router";
import { Container, Grid, Button, Image, Input, Textarea, Spacer, Modal } from "@nextui-org/react";
import { BsChevronLeft, BsPencilSquare } from "react-icons/bs";
import { db } from "../../config/firebase";
import { collection, getDoc, getDocs, doc, updateDoc, deleteField } from "firebase/firestore";
import { useWindowSize } from "../../utilities/hooks";
import { useState, useRef, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useAuth } from "../../context/AuthContext";
import languages from "../../utilities/languages.json";
import Head from "next/head";
import styles from "../styles/Announces.module.scss";

const Announce = ({ id, data }) => {
  const router = useRouter();
  const announceData = JSON.parse(data);
  const size = useWindowSize();
  const { userData, currentUser, Language } = useAuth();

  const firstName = announceData.name.split(" ")[0];
  const lastName = announceData.name.split(" ")[1];

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState(null);
  const [showAddress, setShowAddress] = useState(false);
  const [edit, setEdit] = useState(false);

  const [errorModal, setErrorModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [confirmEditModal, setConfirmEditModal] = useState(false);
  const [cancelEditModal, setCancelEditModal] = useState(false);
  const [closeAnnounceModal, setCloseAnnounceModal] = useState(false);
  const [finishAnnounceModal, setFinishAnnounceModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryChange, setCountryChange] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const difficultyRef = useRef(null);
  const streetRef = useRef(null);
  const streetNumberRef = useRef(null);
  const buildingRef = useRef(null);
  const apartmentRef = useRef(null);
  const zipcodeRef = useRef(null);

  const showStates = () => {
    setCountryChange(true);
    setStateChange(true);
    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(countryRef.current.value));
    stateRef.current.selectedIndex = 0;
    cityRef.current.selectedIndex = 0;
  };

  const showCities = () => {
    setCountryChange(false);
    setStateChange(true);
    setCities([]);
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
    cityRef.current.selectedIndex = 0;
  };

  const getData = async () => {
    const userRef = doc(db, "users", announceData.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userDocData = userSnap.data();
      const data = userDocData.temporaryAddress;

      setEmail(userDocData.email);

      if (data) {
        setAddress(data);
        setStates(State.getStatesOfCountry(data?.country));
        setCities(City.getCitiesOfState(data?.country, data?.state));
      } else {
        setAddress({
          country: userDocData.country,
          state: userDocData.state,
          city: userDocData.city,
          street: userDocData.street,
          streetNumber: userDocData.streetNumber,
          building: userDocData.building,
          apartment: userDocData.apartment,
          zipcode: userDocData.zipcode,
        });
        setStates(State.getStatesOfCountry(userDocData?.country));
        setCities(City.getCitiesOfState(userDocData?.country, userDocData?.state));
      }
    }
  };

  const calculatePoints = () => {
    switch (categoryRef.current.value) {
      case "Groceries":
        switch (difficultyRef.current.value) {
          case "0":
            return 10;
          case "1":
            return 25;
          case "2":
            return 40;
          default:
            break;
        }
      case "School meditations":
        switch (difficultyRef.current.value) {
          case "0":
            return 40;
          case "1":
            return 50;
          case "2":
            return 60;
          default:
            break;
        }
      case "Shopping":
        switch (difficultyRef.current.value) {
          case "0":
            return 10;
          case "1":
            return 25;
          case "2":
            return 40;
          default:
            break;
        }
      case "Cleaning":
        switch (difficultyRef.current.value) {
          case "0":
            return 20;
          case "1":
            return 35;
          case "2":
            return 50;
          default:
            break;
        }
      case "Walking":
        switch (difficultyRef.current.value) {
          case "0":
            return 15;
          case "1":
            return 30;
          case "2":
            return 45;
          default:
            break;
        }
      case "Cooking":
        switch (difficultyRef.current.value) {
          case "0":
            return 25;
          case "1":
            return 45;
          case "2":
            return 60;
          default:
            break;
        }
      case "Paying of bills":
        switch (difficultyRef.current.value) {
          case "0":
            return 15;
          case "1":
            return 20;
          case "2":
            return 30;
          default:
            break;
        }
      case "Emotional support":
        switch (difficultyRef.current.value) {
          case "0":
            return 20;
          case "1":
            return 40;
          case "2":
            return 60;
          default:
            break;
        }
      case "Physical labour":
        switch (difficultyRef.current.value) {
          case "0":
            return 40;
          case "1":
            return 60;
          case "2":
            return 80;
          default:
            break;
        }
      case "Hard work":
        switch (difficultyRef.current.value) {
          case "0":
            return 40;
          case "1":
            return 60;
          case "2":
            return 80;
          default:
            break;
        }
      default:
        break;
    }
  };

  const validateErrors = () => {
    if (categoryRef.current.value.length === 0 && difficultyRef.current.value.length === 0) {
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.categoryAndDifficulty);
      setErrorModal(true);
      return 0;
    } else if (categoryRef.current.value.length === 0) {
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.category);
      setErrorModal(true);
      return 0;
    } else if (difficultyRef.current.value.length === 0) {
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.difficulty);
      setErrorModal(true);
      return 0;
    }

    if (showAddress)
      if (countryRef.current.value.length === "") {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.country);
        setErrorModal(true);
        return 0;
      } else if (stateRef.current.value.length === "") {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.state);
        setErrorModal(true);
        return 0;
      } else if (cityRef.current.value.length === "") {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.city);
        setErrorModal(true);
        return 0;
      } else if (street.current.value.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.street);
        setErrorModal(true);
        return 0;
      } else if (streetNumber.current.value.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.streetNumber);
        setErrorModal(true);
        return 0;
      } else if (building.current.value.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.building);
        setErrorModal(true);
        return 0;
      } else if (apartment.current.value.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.apartment);
        setErrorModal(true);
        return 0;
      } else if (zipcode.current.value.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.zipcode);
        setErrorModal(true);
        return 0;
      }

    return 1;
  };

  const helpPerson = async () => {
    if (userData?.helpingAnnounceID) {
      setErrorModalMessage(languages[Language].modal.announce.error.alreadyHelp);
      setErrorModal(true);
      return;
    }

    const announceDoc = doc(db, "announces", id);
    const userDoc = doc(db, "users", currentUser.uid);

    await updateDoc(announceDoc, {
      helpedBy: currentUser.uid,
      status: "helping",
    }).catch((error) => {
      console.log(error);
      setErrorModal(true);
      setErrorModalMessage(languages[Language].modal.announce.error.cantHelp);
    });

    await updateDoc(userDoc, {
      helpingAnnounceID: id,
    }).catch((error) => {
      console.log(error);
      setErrorModal(true);
      setErrorModalMessage(languages[Language].modal.announce.error.cantHelp);
    });

    if (errorModalMessage.length === 0) router.replace(router.asPath);
  };

  const saveChanges = async () => {
    const announceDoc = doc(db, "announces", id);
    const userDoc = doc(db, "users", currentUser.uid);

    if (validateErrors())
      await updateDoc(announceDoc, {
        name: firstNameRef.current.value.concat(" ", lastNameRef.current.value),
        category: categoryRef.current.value,
        difficulty: difficultyRef.current.value,
        points: calculatePoints(),
      }).catch((error) => {
        console.log(error);
        setErrorModalMessage(languages[Language].modal.announce.error.cantUpdate);
        setErrorModal(true);
      });

    if (userData?.temporaryAddress) {
      await updateDoc(userDoc, {
        temporaryAddress: {
          country: countryRef.current.value,
          state: stateRef.current.value,
          city: cityRef.current.value,
          street: streetRef.current.value,
          streetNumber: streetNumberRef.current.value,
          building: buildingRef.current.value,
          apartment: apartmentRef.current.value,
          zipcode: zipcodeRef.current.value,
        },
      }).catch((error) => {
        console.log(error);
        setErrorModalMessage(languages[Language].modal.announce.error.cantUpdate);
        setErrorModal(true);
      });
    }

    if (errorModalMessage.length === 0) router.replace(router.asPath);
  };

  const closeAnnounce = async () => {
    const announceDoc = doc(db, "announces", id);
    const userDoc = doc(db, "users", currentUser.uid);

    await updateDoc(announceDoc, {
      status: "closed",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.announce.error.cantClose);
      setErrorModal(true);
    });

    await updateDoc(userDoc, {
      announceID: "",
      temporaryAddress: deleteField(),
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.announce.error.cantClose);
      setErrorModal(true);
    });

    if (errorModalMessage.length === 0) router.replace(router.asPath);
  };

  const finishAnnounce = async () => {
    const announceDoc = doc(db, "announces", id);
    const helpingUserDoc = doc(db, "users", announceData.helpedBy);
    const helpedUserDoc = doc(db, "users", announceData.uid);

    await updateDoc(announceDoc, {
      status: "helped",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.announce.error.cantFinish);
      setErrorModal(true);
    });

    await updateDoc(helpedUserDoc, {
      temporaryAddress: deleteField(),
      announceID: "",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.announce.error.cantFinish);
      setErrorModal(true);
    });

    const helpingUserSnap = await getDoc(helpingUserDoc).catch((error) =>
      console.log("I couldn't get the user's who help me data"),
    );
    const helpingUserData = helpingUserSnap.data();

    const points = helpingUserData.points + announceData.points;
    const helpedPeople = helpingUserData.helpedPeople + 1;

    await updateDoc(helpingUserDoc, {
      points: points,
      helpedPeople: helpedPeople,
      helpingAnnounceID: "",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.announce.error.cantFinish);
      setErrorModal(true);
    });

    if (errorModalMessage.length === 0) router.replace(router.asPath);
  };

  useEffect(() => {
    if (announceData.uid === currentUser.uid) {
      setStates(State.getStatesOfCountry(userData?.country));
      setCities(City.getCitiesOfState(userData?.country, userData?.state));
    }
  }, [announceData.uid, currentUser.uid, userData?.country, userData?.state]);

  return (
    <Container xs css={{ paddingInline: "0" }}>
      <Head>
        <title>
          {languages[Language].headTags.announce}: {id} | {languages[Language].headTags.title}
        </title>
      </Head>
      <Grid.Container gap={1}>
        <Grid xs={12}>
          <Button
            onPress={() => router.back()}
            color="error"
            light
            icon={<BsChevronLeft />}
            className={styles.announceHeader}
          >
            {languages[Language].goBack}
          </Button>
        </Grid>
        <Grid xs={6}>
          <Image
            alt="User image"
            height={size.width > 650 ? 300 : 175}
            width={size.width > 650 ? 300 : 175}
            src={announceData.imgURL}
            objectFit="cover"
            showSkeleton
            maxDelay={5000}
            css={{ borderRadius: "0.875rem" }}
          />
        </Grid>
        <Grid xs={6}>
          <Grid.Container>
            <Grid xs={12}>
              <Input
                label={languages[Language].userData.firstName}
                initialValue={firstName}
                fullWidth
                readOnly={!edit}
                ref={firstNameRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                label={languages[Language].userData.lastName}
                initialValue={lastName}
                fullWidth
                readOnly={!edit}
                ref={lastNameRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={12} sm={6}>
          <div className={styles.selectMenu}>
            <label className={styles.selectLabel}>{languages[Language].select.category}</label>
            <select className={styles.select} disabled={!edit} defaultValue={announceData.category} ref={categoryRef}>
              <option value={"Groceries"}>{languages[Language].announces.groceries}</option>
              <option value={"School meditations"}>{languages[Language].announces.schoolMeditations}</option>
              <option value={"Shopping"}>{languages[Language].announces.shopping}</option>
              <option value={"Cleaning"}>{languages[Language].announces.cleaning}</option>
              <option value={"Walking"}>{languages[Language].announces.walking}</option>
              <option value={"Cooking"}>{languages[Language].announces.cooking}</option>
              <option value={"Paying of bills"}>{languages[Language].announces.payingOfBills}</option>
              <option value={"Emotional support"}>{languages[Language].announces.emotionalSupport}</option>
              <option value={"Physical labour"}>{languages[Language].announces.physicalLabour}</option>
              <option value={"Hard work"}>{languages[Language].announces.hardWork}</option>
            </select>
          </div>
        </Grid>
        <Grid xs={12} sm={6}>
          <div className={styles.selectMenu}>
            <label className={styles.selectLabel}>{languages[Language].select.difficulty}</label>
            <select
              className={styles.select}
              disabled={!edit}
              defaultValue={announceData.difficulty}
              ref={difficultyRef}
            >
              <option value={"0"}>{languages[Language].announces.easy}</option>
              <option value={"1"}>{languages[Language].announces.medium}</option>
              <option value={"2"}>{languages[Language].announces.hard}</option>
            </select>
          </div>
        </Grid>
        <Grid xs={12}>
          <Textarea
            minRows={20}
            label={languages[Language].announces.addNewAnnounce.description}
            initialValue={announceData.description}
            fullWidth
            size="lg"
            readOnly={!edit}
            ref={descriptionRef}
            contentRight={edit && <BsPencilSquare />}
          />
        </Grid>
        {announceData.status !== "closed" &&
          announceData.status !== "helped" &&
          (announceData.uid === currentUser.uid || announceData.helpedBy === currentUser.uid) && (
            <Grid xs={12}>
              <Button
                ripple
                color="gradient"
                onPress={() => {
                  setShowAddress(!showAddress);
                  if (!showAddress) getData();
                }}
              >
                {!showAddress
                  ? languages[Language].announces.announce.show
                  : languages[Language].announces.announce.hide}{" "}
                {languages[Language].announces.announce.address}
              </Button>
            </Grid>
          )}
        {showAddress && (
          <>
            <Grid xs={12}>
              <Input size="lg" label={languages[Language].email} fullWidth type="email" initialValue={email} readOnly />
            </Grid>
            <Grid xs={12}>
              <div className={styles.selectMenu}>
                <label className={styles.selectLabel}>{languages[Language].select.country}</label>
                <select
                  className={styles.select}
                  onChange={showStates}
                  ref={countryRef}
                  defaultValue={address?.country}
                  disabled={!edit}
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
            </Grid>
            <Grid xs={12}>
              <div className={styles.selectMenu}>
                <label htmlFor="state" className={styles.selectLabel}>
                  {languages[Language].select.state}
                </label>
                <select
                  id="state"
                  onChange={showCities}
                  className={styles.select}
                  ref={stateRef}
                  defaultValue={address?.state}
                  disabled={!edit}
                >
                  {countryChange && <option value="">{languages[Language].select.stateOption}</option>}
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
            </Grid>
            <Grid xs={12}>
              <div className={styles.selectMenu}>
                <label htmlFor="city" className={styles.selectLabel}>
                  {languages[Language].select.city}
                </label>
                <select id="city" className={styles.select} ref={cityRef} defaultValue={address?.city} disabled={!edit}>
                  {stateChange && <option value="">{languages[Language].select.cityOption}</option>}
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
            </Grid>
            <Grid xs={12}>
              <Input
                size="lg"
                label={languages[Language].userData.street}
                fullWidth
                initialValue={address?.street}
                readOnly={!edit}
                ref={streetRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
            <Grid xs={6}>
              <Input
                size="lg"
                label={languages[Language].userData.streetNumber}
                fullWidth
                type="number"
                initialValue={address?.streetNumber}
                readOnly={!edit}
                ref={streetNumberRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
            <Grid xs={6}>
              <Input
                size="lg"
                label={languages[Language].userData.building}
                fullWidth
                initialValue={address?.building}
                readOnly={!edit}
                ref={buildingRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                size="lg"
                label={languages[Language].userData.apartment}
                fullWidth
                type="number"
                initialValue={address?.apartment}
                readOnly={!edit}
                ref={apartmentRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                size="lg"
                label={languages[Language].userData.zipcode}
                fullWidth
                type="number"
                initialValue={address?.zipcode}
                readOnly={!edit}
                ref={zipcodeRef}
                contentRight={edit && <BsPencilSquare />}
              />
            </Grid>
            <Grid xs={12}>
              <Spacer />
            </Grid>
          </>
        )}
        <Grid xs={12}>
          <Spacer />
        </Grid>
        {edit && (
          <>
            {announceData.uid === currentUser.uid && (
              <Grid xs={12} sm={6}>
                <Button color="error" onPress={() => setCancelEditModal(true)} css={{ width: "100%" }}>
                  {languages[Language].announces.announce.buttons.cancel}
                </Button>
              </Grid>
            )}
            {announceData.uid === currentUser.uid && (
              <Grid xs={12} sm={6}>
                <Button color="success" onPress={() => setConfirmEditModal(true)} css={{ width: "100%" }}>
                  {languages[Language].announces.announce.buttons.save}
                </Button>
              </Grid>
            )}
          </>
        )}
        {!edit && (
          <>
            {announceData.uid === currentUser.uid && (
              <>
                {announceData.status !== "closed" && announceData.status !== "helped" && (
                  <Grid xs={12} sm={6}>
                    <Button color="success" onPress={() => setEdit(true)} css={{ width: "100%" }}>
                      {languages[Language].announces.announce.buttons.edit}
                    </Button>
                  </Grid>
                )}

                {announceData.status === "active" && (
                  <Grid xs={12} sm={6}>
                    <Button color="error" onPress={() => setCloseAnnounceModal(true)} css={{ width: "100%" }}>
                      {languages[Language].announces.announce.buttons.close}
                    </Button>
                  </Grid>
                )}
                {announceData.status === "helping" && (
                  <Grid xs={12} sm={6}>
                    <Button color="error" onPress={() => setFinishAnnounceModal(true)} css={{ width: "100%" }}>
                      {languages[Language].announces.announce.buttons.finish}
                    </Button>
                  </Grid>
                )}
              </>
            )}
            {announceData.helpedBy.length === 0 && announceData.uid != currentUser.uid && (
              <Grid xs={12}>
                <Button color="success" onPress={() => setHelpModal(true)} css={{ width: "100%" }}>
                  {languages[Language].announces.announce.buttons.help}
                </Button>
              </Grid>
            )}
          </>
        )}

        <Grid xs={12}></Grid>
      </Grid.Container>
      <Modal
        closeButton
        aria-labelledby="Confirm edit announce"
        open={confirmEditModal}
        onClose={() => setConfirmEditModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3>{languages[Language].modal.announce.save.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{languages[Language].modal.announce.save.body}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button auto flat ripple color="error" onPress={() => setConfirmEditModal(false)} css={{ width: "100%" }}>
                {languages[Language].modal.announce.save.button.cancel}
              </Button>
            </Grid>
            <Grid xs>
              <Button
                auto
                ripple
                color="success"
                onPress={() => {
                  setConfirmEditModal(false);
                  saveChanges();
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.save.buttons.confirm}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="Cancel edit announce"
        open={cancelEditModal}
        onClose={() => setCancelEditModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3>{languages[Language].modal.announce.discard.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{languages[Language].modal.announce.discard.body}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button auto light ripple color="error" onPress={() => setCancelEditModal(false)} css={{ width: "100%" }}>
                {languages[Language].modal.announce.discard.buttons.cancel}
              </Button>
            </Grid>
            <Grid xs>
              <Button
                auto
                ripple
                color="error"
                onPress={() => {
                  setCancelEditModal(false);
                  setEdit(false);
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.discard.buttons.discard}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="Finish announce"
        open={finishAnnounceModal}
        onClose={() => setFinishAnnounceModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3>{languages[Language].modal.announce.finish.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{languages[Language].modal.announce.finish.body}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button
                auto
                flat
                ripple
                color="error"
                onPress={() => setFinishAnnounceModal(false)}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.finish.buttons.cancel}
              </Button>
            </Grid>
            <Grid xs>
              <Button
                auto
                ripple
                color="success"
                onPress={() => {
                  setFinishAnnounceModal(false);
                  finishAnnounce();
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.finish.buttons.finish}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="Close announce"
        open={closeAnnounceModal}
        onClose={() => setCloseAnnounceModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3>{languages[Language].modal.announce.close.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{languages[Language].modal.announce.close.body}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button
                auto
                light
                ripple
                color="error"
                onPress={() => setCloseAnnounceModal(false)}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.close.buttons.cancel}
              </Button>
            </Grid>
            <Grid xs>
              <Button
                auto
                ripple
                color="error"
                onPress={() => {
                  setCloseAnnounceModal(false);
                  closeAnnounce();
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.close.buttons.close}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="Help person"
        open={helpModal}
        onClose={() => setHelpModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3>{languages[Language].modal.announce.help.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>{languages[Language].modal.announce.help.body}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button auto flat ripple color="error" onPress={() => setHelpModal(false)} css={{ width: "100%" }}>
                {languages[Language].modal.announce.help.buttons.cancel}
              </Button>
            </Grid>
            <Grid xs>
              <Button
                auto
                ripple
                color="success"
                onPress={() => {
                  setHelpModal(false);
                  helpPerson();
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.announce.help.buttons.help}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="Error modal"
        open={errorModal}
        onClose={() => {
          setErrorModal(false);
          setErrorModalMessage("");
        }}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3 style={{ color: "var(--nextui-colors-red500)" }}>Error!</h3>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ textAlign: "center" }}>{errorModalMessage}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1}>
            <Grid xs>
              <Button
                auto
                color="error"
                onPress={() => {
                  setErrorModal(false);
                  setErrorModalMessage("");
                }}
                css={{ width: "100%" }}
              >
                Close
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Announce;

export const getStaticPaths = async () => {
  const announcesCollection = collection(db, "announces");
  const announcesQuerySnapshot = await getDocs(announcesCollection);

  let paths = [];

  announcesQuerySnapshot.forEach((announce) => {
    paths.push({
      params: {
        id: `${announce.id}`,
      },
    });
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const announceID = params.id;
  const announceDoc = doc(db, "announces", announceID);

  const announceSnap = await getDoc(announceDoc);

  return {
    props: {
      id: announceID,
      data: JSON.stringify(announceSnap.data()),
    },
  };
};
