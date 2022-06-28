import { Container, Grid, Button, Image, Input, Checkbox, Textarea, Spacer, Modal } from "@nextui-org/react";
import { useRouter } from "next/router";
import { withProtected } from "../../utilities/routes";
import { BsChevronLeft } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef } from "react";
import { db } from "../../config/firebase";
import { doc, updateDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Country, State, City } from "country-state-city";
import languages from "../../utilities/languages.json";

import styles from "../styles/Announces.module.scss";

const AddNewAnnounce = () => {
  const router = useRouter();
  const { currentUser, userData, Language } = useAuth();

  const firstName = currentUser.displayName.split(" ")[0];
  const lastName = currentUser.displayName.split(" ")[1];

  const [otherAddress, setOtherAddress] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryChange, setCountryChange] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [zipcode, setZipcode] = useState("");

  const defaultMessage = languages[Language].defaultMessage;

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

  const setTemporaryAddress = async () => {
    const userDoc = doc(db, "users", currentUser.uid);
    await updateDoc(userDoc, {
      temporaryAddress: {
        country: countryRef.current.value,
        state: stateRef.current.value,
        city: cityRef.current.value,
        street: street,
        streetNumber: streetNumber,
        building: building,
        apartment: apartment,
        zipcode: zipcode,
      },
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.address);
      setErrorModal(true);
    });
  };

  const setAnnounceID = async (id) => {
    const userDoc = doc(db, "users", currentUser.uid);
    await updateDoc(userDoc, {
      announceID: id,
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.announceID);
      setErrorModal(true);
    });
  };

  const createAnnounce = async () => {
    const name =
      (fName.length > 0 && firstName !== fName) || (lName.length > 0 && lastName !== lName)
        ? fName.concat(" ", lName)
        : "";
    const announceRef = await addDoc(collection(db, "announces"), {
      name: name.length > 0 ? name : currentUser.displayName,
      imgURL: currentUser.photoURL,
      category: category,
      difficulty: difficulty,
      description: description.length > 0 ? description : defaultMessage,
      uid: currentUser.uid,
      helpedBy: "",
      status: "active",
      points: calculatePoints(),
      posted: serverTimestamp(),
    });

    console.log(announceRef.id);

    setAnnounceID(announceRef.id);
  };

  const validateErrors = () => {
    if (category.length === 0 && difficulty.length === 0) {
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.categoryAndDifficulty);
      setErrorModal(true);
      return 0;
    } else if (category.length === 0) {
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.category);
      setErrorModal(true);
      return 0;
    } else if (difficulty.length === 0) {
      setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.difficulty);
      setErrorModal(true);
      return 0;
    }

    if (otherAddress) {
      if (countryRef.current.value === "") {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.country);
        setErrorModal(true);
        return 0;
      } else if (stateRef.current.value === "") {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.state);
        setErrorModal(true);
        return 0;
      } else if (cityRef.current.value === "") {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.city);
        setErrorModal(true);
        return 0;
      } else if (street.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.street);
        setErrorModal(true);
        return 0;
      } else if (streetNumber.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.streetNumber);
        setErrorModal(true);
        return 0;
      } else if (building.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.building);
        setErrorModal(true);
        return 0;
      } else if (apartment.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.apartment);
        setErrorModal(true);
        return 0;
      } else if (zipcode.length === 0) {
        setErrorModalMessage(languages[Language].modal.addNewAnnounce.error.zipcode);
        setErrorModal(true);
        return 0;
      }
    }
    return 1;
  };

  const calculatePoints = () => {
    switch (category) {
      case "Groceries":
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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
        switch (difficulty) {
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

  const addAnnounce = () => {
    if (userData?.announceID) {
      setErrorModalMessage(
        "You already have an active announce. You cannot post another until you closed the previous one.",
      );
      setErrorModal(true);
    } else {
      if (validateErrors()) {
        createAnnounce();
        if (otherAddress) setTemporaryAddress();
        router.push("/");
      }
    }
  };

  return (
    <Container xs css={{ paddingInline: "0" }}>
      <form>
        <Grid.Container gap={1.5}>
          <Grid xs={12}>
            <Button
              onPress={() => router.push("/announces")}
              color="error"
              light
              icon={<BsChevronLeft />}
              className={styles.newAnnounceHeader}
            >
              {languages[Language].goBack}
            </Button>
          </Grid>
          <Grid xs={12}>
            <h2 className={styles.title}>{languages[Language].announces.addNewAnnounce.title}</h2>
          </Grid>
          <Grid xs={6}>
            <Image
              alt="User image"
              height={175}
              width={175}
              src={currentUser.photoURL}
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
                  label={languages[Language].announces.addNewAnnounce.firstName}
                  initialValue={firstName}
                  fullWidth
                  onChange={(e) => setFName(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  label={languages[Language].announces.addNewAnnounce.lastName}
                  initialValue={lastName}
                  fullWidth
                  onChange={(e) => setLName(e.target.value)}
                />
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid xs={12}>
            <div className={styles.selectMenu}>
              <label className={styles.selectLabel}>{languages[Language].announces.filter.category}</label>
              <select className={styles.select} onChange={(e) => setCategory(e.target.value)}>
                <option value="">{languages[Language].announces.filter.categoryOption}</option>
                <option value="Groceries">{languages[Language].announces.filter.groceries}</option>
                <option value="School meditations">{languages[Language].announces.filter.schoolMeditations}</option>
                <option value="Shopping">{languages[Language].announces.filter.shopping}</option>
                <option value="Cleaning">{languages[Language].announces.filter.cleaning}</option>
                <option value="Walking">{languages[Language].announces.filter.walking}</option>
                <option value="Cooking">{languages[Language].announces.filter.cooking}</option>
                <option value="Paying of bills">{languages[Language].announces.filter.payingOfBills}</option>
                <option value="Emotional support">{languages[Language].announces.filter.emotionalSupport}</option>
                <option value="Physical labour">{languages[Language].announces.filter.physicalLabour}</option>
                <option value="Hard work">{languages[Language].announces.filter.hardWork}</option>
              </select>
            </div>
          </Grid>
          <Grid xs={12}>
            <div className={styles.selectMenu}>
              <label className={styles.selectLabel}>{languages[Language].announces.filter.difficulty}</label>
              <select className={styles.select} onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">{languages[Language].announces.filter.difficultyOption}</option>
                <option value="0">{languages[Language].announces.filter.easy}</option>
                <option value="1">{languages[Language].announces.filter.medium}</option>
                <option value="2">{languages[Language].announces.filter.hard}</option>
              </select>
            </div>
          </Grid>
          <Grid xs={12}>
            <Textarea
              minRows={15}
              label={languages[Language].announces.addNewAnnounce.description}
              placeholder={languages[Language].announces.addNewAnnounce.descriptionInfo}
              fullWidth
              size="lg"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Checkbox isSelected={otherAddress} color="error" onChange={setOtherAddress}>
              {languages[Language].announces.addNewAnnounce.anotherAddress}
            </Checkbox>
          </Grid>
          {otherAddress && (
            <>
              <Grid xs={12}>
                <div className={styles.selectMenu}>
                  <label className={styles.selectLabel}>{languages[Language].announces.filter.country}</label>
                  <select className={styles.select} onChange={showStates} ref={countryRef}>
                    <option value="">{languages[Language].announces.filter.countryOption}</option>
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
                    {languages[Language].announces.filter.state}
                  </label>
                  <select id="state" onChange={showCities} className={styles.select} ref={stateRef}>
                    {countryChange && <option value="">{languages[Language].announces.filter.stateOption}</option>}
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
                    {languages[Language].announces.filter.city}
                  </label>
                  <select id="city" className={styles.select} ref={cityRef}>
                    {stateChange && <option value="">{languages[Language].announces.filter.cityOption}</option>}
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
                  label={languages[Language].address.street}
                  fullWidth
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  size="lg"
                  label={languages[Language].address.streetNumber}
                  fullWidth
                  type="number"
                  onChange={(e) => setStreetNumber(e.target.value)}
                />
              </Grid>
              <Grid xs={6}>
                <Input
                  size="lg"
                  label={languages[Language].address.building}
                  fullWidth
                  onChange={(e) => setBuilding(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  size="lg"
                  label={languages[Language].address.apartment}
                  fullWidth
                  type="number"
                  onChange={(e) => setApartment(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <Input
                  size="lg"
                  label={languages[Language].address.zipcode}
                  fullWidth
                  type="number"
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </Grid>
              <Grid xs={12}>
                <Spacer />
              </Grid>
            </>
          )}
          <Grid xs={12}>
            <Button color="gradient" auto css={{ width: "100%" }} size="lg" onPress={addAnnounce}>
              {languages[Language].announces.addNewAnnounce.addAnnounce}
            </Button>
          </Grid>
        </Grid.Container>
      </form>
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

export default withProtected(AddNewAnnounce);
