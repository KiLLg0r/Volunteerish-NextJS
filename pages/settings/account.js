import { Button, Col, Container, Grid, Input, Spacer, Collapse, Row, Text, Modal } from "@nextui-org/react";
import { withNavigation, withProtected } from "../../utilities/routes";
import { BsChevronLeft, BsPencilSquare } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { Country, State, City } from "country-state-city";
import Image from "next/image";

import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../../config/firebase";

import styles from "../styles/Settings.module.scss";

export const Account = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const imageInputRef = useRef(null);

  const router = useRouter();
  const { currentUser, sendUserEmailVerification, userData, getUserData, setUserData } = useAuth();

  const firstName = currentUser.displayName.split(" ")[0];
  const lastName = currentUser.displayName.split(" ")[1];

  const [newChanges, setNewChanges] = useState(false);
  const [discardChanges, setDiscardChanges] = useState(false);

  const [discardConfirmationVisible, setDiscardConfirmationVisible] = useState(false);
  const openDiscardConfirmation = () => setDiscardConfirmationVisible(true);
  const closeDiscardConfirmation = () => setDiscardConfirmationVisible(false);

  const [saveConfirmationVisible, setSaveConfirmationVisible] = useState(false);
  const openSaveConfirmation = () => setSaveConfirmationVisible(true);
  const closeSaveConfirmation = () => setSaveConfirmationVisible(false);

  const [error, setError] = useState("");

  const countries = Country.getAllCountries();
  const [states, setStates] = useState(State.getStatesOfCountry(userData?.country));
  const [cities, setCities] = useState(City.getCitiesOfState(userData?.country, userData?.state));

  const [countryChange, setCountryChange] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const userRef = doc(db, "users", currentUser.uid);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
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
    handleChanges();
    setStates(State.getStatesOfCountry(countryRef.current.value));
    stateRef.current.selectedIndex = 0;
    cityRef.current.selectedIndex = 0;
  };

  const showCities = () => {
    setCountryChange(false);
    setStateChange(true);
    setCities([]);
    handleChanges();
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
    cityRef.current.selectedIndex = 0;
  };

  const handleChanges = () => {
    setNewChanges(true);
    setError("");
    setDiscardChanges(false);
  };

  const discardFormChanges = () => {
    closeDiscardConfirmation();
    setTimeout(() => {
      setDiscardChanges(true);
      setCities(City.getCitiesOfState(userData?.country, userData?.state));
      setStates(State.getStatesOfCountry(userData?.country));
      setNewChanges(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const handleSubmit = () => {
    closeSaveConfirmation();

    setTimeout(() => {
      const name = firstNameRef.current.value.concat(" ", lastNameRef.current.value);

      updateProfile(currentUser, { displayName: name }).catch((error) => {
        console.log(error);
        setError("Failed to update name!");
        imgRef.current.scrollIntoView({ behavior: "smooth" });
      });

      const updateUser = async () => {
        await updateDoc(userRef, {
          country: countryRef.current.value,
          state: stateRef.current.value,
          city: cityRef.current.value,
          street: streetRef.current.value,
          streetNumber: streetNumberRef.current.value,
          building: buildingRef.current.value,
          apartment: apartmentRef.current.value,
          zipcode: zipcodeRef.current.value,
        }).catch((error) => {
          console.log(error);
          setError("Failed to update address!");
          imgRef.current.scrollIntoView({ behavior: "smooth" });
        });
      };

      updateUser();

      if (error.length === 0) {
        setDiscardChanges(true);
        setCities(City.getCitiesOfState(userData?.country, userData?.state));
        setStates(State.getStatesOfCountry(userData?.country));
        setNewChanges(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 0);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [currentUser, getUserData, image, setUserData, userData, userRef]);

  return (
    <Container sm className={styles.account} key={discardChanges}>
      {router.asPath === "/account" && (
        <header className={styles.header} onClick={() => router.push("/")}>
          <BsChevronLeft />
          Go back
        </header>
      )}
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>Edit profile</h2>
        {error && <div className={styles.error}>{error}</div>}
        <Grid.Container>
          <Grid xs={12} sm={6} css={{ flexFlow: "column" }}>
            <div
              className={styles.imageEdit}
              onClick={(e) => {
                e.preventDefault();
                imageInputRef.current.click();
              }}
            >
              <Image
                alt="User image"
                height={200}
                width={200}
                src={preview ? preview : currentUser.photoURL}
                objectFit="cover"
              />
              <div className={styles.imageEditSVG}>
                <BsPencilSquare />
              </div>
            </div>
            <h4 className={styles.imageEditLabel}>Change profile image</h4>
            <input
              type="file"
              style={{ display: "none" }}
              ref={imageInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && file.type.substring(0, 5) === "image") setImage(file);
                else setImage(null);
              }}
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col css={{ display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
              <Input
                size="lg"
                label="First Name"
                initialValue={firstName}
                fullWidth
                onChange={handleChanges}
                ref={firstNameRef}
              />
              <Spacer />
              <Input
                size="lg"
                label="Last Name"
                initialValue={lastName}
                fullWidth
                onChange={handleChanges}
                ref={lastNameRef}
              />
            </Col>
          </Grid>
        </Grid.Container>
        <Grid.Container>
          <Grid xs={12}>
            <Collapse.Group css={{ width: "100%" }}>
              <Collapse title="Email" subtitle={currentUser.email}>
                <Container sm css={{ fontSize: "1.25rem" }}>
                  <Row>
                    <Col>Status email: </Col>
                    <Col>
                      <Text color={currentUser.emailVerified ? "success" : "error"} h4>
                        {currentUser.emailVerified ? "Verified" : "Unverified"}
                      </Text>
                    </Col>
                  </Row>
                  <Spacer />
                  {!currentUser.emailVerified && (
                    <>
                      <Row>
                        <Col>Send email verification link</Col>
                        <Col>
                          <Button flat color="error" onPress={sendUserEmailVerification}>
                            Send link
                          </Button>
                        </Col>
                      </Row>
                      <Spacer />
                    </>
                  )}
                  <Row>
                    <Col>Change email</Col>
                    <Col>
                      <Button color="error" bordered>
                        Change email
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Collapse>
            </Collapse.Group>
          </Grid>
          <Grid xs={12}>
            <h3 className={styles.subtitle}>Address</h3>
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <div className={styles.selectMenu}>
                <label htmlFor="country" className={styles.selectLabel}>
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  ref={countryRef}
                  onChange={showStates}
                  className={styles.select}
                  defaultValue={userData?.country}
                >
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
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <div className={styles.selectMenu}>
                <label htmlFor="state" className={styles.selectLabel}>
                  State
                </label>
                <select
                  id="state"
                  ref={stateRef}
                  onChange={showCities}
                  className={styles.select}
                  defaultValue={userData?.state}
                >
                  {countryChange && <option value="">Select state</option>}
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
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <div className={styles.selectMenu}>
                <label htmlFor="city" className={styles.selectLabel}>
                  City
                </label>
                <select
                  id="city"
                  ref={cityRef}
                  onChange={handleChanges}
                  className={styles.select}
                  defaultValue={userData?.city}
                >
                  {stateChange && <option value="">Select city</option>}
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
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input
                size="lg"
                label="Street"
                initialValue={userData?.street}
                fullWidth
                onChange={handleChanges}
                ref={streetRef}
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input
                size="lg"
                label="Street number"
                initialValue={userData?.streetNumber}
                fullWidth
                onChange={handleChanges}
                type="number"
                ref={streetNumberRef}
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input
                size="lg"
                label="Building"
                initialValue={userData?.building}
                fullWidth
                onChange={handleChanges}
                ref={buildingRef}
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input
                size="lg"
                label="Apartment"
                initialValue={userData?.apartment}
                fullWidth
                onChange={handleChanges}
                type="number"
                ref={apartmentRef}
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input
                size="lg"
                label="Zipcode"
                initialValue={userData?.zipcode}
                fullWidth
                onChange={handleChanges}
                type="number"
                ref={zipcodeRef}
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
        </Grid.Container>
        <Spacer />
        {newChanges && (
          <>
            <Button bordered css={{ width: "100%" }} size="lg" color="error" onPress={openDiscardConfirmation}>
              Discard changes
            </Button>
            <Modal
              closeButton
              aria-labelledby="Discard changes"
              open={discardConfirmationVisible}
              onClose={closeDiscardConfirmation}
              blur
            >
              <Modal.Header>
                <h3>Discard changes</h3>
              </Modal.Header>
              <Modal.Body>
                <h5 style={{ textAlign: "center" }}>Are you sure you want to discard these changes?</h5>
              </Modal.Body>
              <Modal.Footer>
                <Grid.Container gap={1}>
                  <Grid xs>
                    <Button auto light color="error" onPress={closeDiscardConfirmation} css={{ width: "100%" }}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs>
                    <Button auto flat color="error" onPress={discardFormChanges} css={{ width: "100%" }}>
                      Discard changes
                    </Button>
                  </Grid>
                </Grid.Container>
              </Modal.Footer>
            </Modal>
            <Spacer />
            <Button css={{ width: "100%" }} size="lg" color="error" onPress={openSaveConfirmation}>
              Save changes
            </Button>
            <Modal
              closeButton
              aria-labelledby="Save changes"
              open={saveConfirmationVisible}
              onClose={closeSaveConfirmation}
              blur
            >
              <Modal.Header>
                <h3>Save changes</h3>
              </Modal.Header>
              <Modal.Body>
                <h5 style={{ textAlign: "center" }}>Are you sure you want to save these changes?</h5>
              </Modal.Body>
              <Modal.Footer>
                <Grid.Container gap={1}>
                  <Grid xs>
                    <Button auto flat color="error" onPress={closeSaveConfirmation} css={{ width: "100%" }}>
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs>
                    <Button auto color="success" onPress={handleSubmit} css={{ width: "100%" }}>
                      Save changes
                    </Button>
                  </Grid>
                </Grid.Container>
              </Modal.Footer>
            </Modal>
          </>
        )}
        <Spacer />
      </form>
    </Container>
  );
};

export default withProtected(withNavigation(Account));
