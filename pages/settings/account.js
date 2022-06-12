import { Button, Col, Container, Grid, Input, Spacer, Collapse, Row, Text, Modal, Image } from "@nextui-org/react";
import { withNavigation, withProtected } from "../../utilities/routes";
import { BsChevronLeft, BsPencilSquare } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { Country, State, City } from "country-state-city";
import { validateError } from "../../utilities/functions";
import { db, app } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { EmailAuthProvider, reauthenticateWithCredential, updateProfile, updateEmail } from "firebase/auth";
import { updateAllImages } from "../../utilities/functions";

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
  const [saveConfirmationVisible, setSaveConfirmationVisible] = useState(false);
  const [reauthenticateUserModal, setReauthenticateUserModal] = useState(false);
  const [emailChangedSuccessfully, setEmailChangedSuccessfully] = useState(false);
  const [authenticatedSuccessfully, setAuthenticatedSuccessfully] = useState(false);
  const [sendEmailVerification, setSendEmailVerification] = useState(false);

  const [error, setError] = useState("");

  const countries = Country.getAllCountries();
  const [states, setStates] = useState(State.getStatesOfCountry(userData?.country));
  const [cities, setCities] = useState(City.getCitiesOfState(userData?.country, userData?.state));

  const [countryChange, setCountryChange] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const [userProvidedPassword, setUserProvidedPassword] = useState("");
  const [userProvidedEmail, setUserProvidedEmail] = useState("");
  const [changeEmailError, setChangeEmailError] = useState({ email: "", password: "" });

  const userRef = doc(db, "users", currentUser.uid);
  const storage = getStorage(app);

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
    setDiscardConfirmationVisible(false);
    setTimeout(() => {
      setDiscardChanges(true);
      setCities(City.getCitiesOfState(userData?.country, userData?.state));
      setStates(State.getStatesOfCountry(userData?.country));
      setNewChanges(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const reauthenticateUser = () => {
    const credential = EmailAuthProvider.credential(currentUser.email, userProvidedPassword);
    reauthenticateWithCredential(currentUser, credential)
      .then(() => {
        setAuthenticatedSuccessfully(true);
        console.log("Successfully authenticated");
        setReauthenticateUserModal(false);
      })
      .catch((error) => {
        const errorValidated = validateError(error.code);
        if (errorValidated.type === "password") setChangeEmailError({ email: "", password: errorValidated.error });
      });
  };

  const changeEmail = () => {
    console.log(userProvidedEmail);
    updateEmail(currentUser, userProvidedEmail)
      .then(() => {
        setEmailChangedSuccessfully(true);
        console.log("Email changed successfully");
        setAuthenticatedSuccessfully(false);
      })
      .catch((error) => {
        const errorValidated = validateError(error.code);
        if (errorValidated.type === "email") setChangeEmailError({ email: errorValidated.error, password: "" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault;

    setSaveConfirmationVisible(false);

    setTimeout(() => {
      const name =
        firstNameRef.current.value !== firstName || lastNameRef.current.value !== lastName
          ? firstNameRef.current.value.concat(" ", lastNameRef.current.value)
          : "";

      const imageRef = ref(storage, `profile/${currentUser.uid}`);

      if (image) {
        const task = uploadBytesResumable(imageRef, image);

        task.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log(error);
            setError("Failed to upload image!");
            imageInputRef.current.scrollIntoView({ behavior: "smooth" });
          },
          () =>
            getDownloadURL(task.snapshot.ref).then((url) => {
              updateAllImages(currentUser.uid, url);
              updateProfile(currentUser, { photoURL: url })
                .then(() => console.log(`Image updated successfully`))
                .catch((error) => {
                  console.log(error);
                  setError("Failed to update image!");
                  imageInputRef.current.scrollIntoView({ behavior: "smooth" });
                });
            }),
        );
      }

      if (name.length > 0)
        updateProfile(currentUser, { displayName: name }).catch((error) => {
          console.log(error);
          setError("Failed to update name!");
          imageInputRef.current.scrollIntoView({ behavior: "smooth" });
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
          imageInputRef.current.scrollIntoView({ behavior: "smooth" });
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
              <div className={styles.image}>
                <Image
                  alt="User image"
                  height={200}
                  width={200}
                  src={preview ? preview : currentUser.photoURL}
                  objectFit="cover"
                  showSkeleton
                  maxDelay={5000}
                  css={{
                    overflow: "hidden",
                  }}
                />
              </div>
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
                setNewChanges(true);
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
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Collapse.Group css={{ width: "100%" }}>
              <Collapse title="Email" subtitle={currentUser.email}>
                <Col>
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
                          <Button
                            auto
                            flat
                            color="error"
                            onPress={() => {
                              setSendEmailVerification(true);
                              sendUserEmailVerification();
                            }}
                          >
                            Send link
                          </Button>
                          <Modal
                            closeButton
                            aria-labelledby="Send email verification link"
                            open={sendEmailVerification}
                            onClose={() => {
                              setSendEmailVerification(false);
                            }}
                            blur
                          >
                            <Modal.Header>
                              <h3>Email verification link</h3>
                            </Modal.Header>
                            <Modal.Body>
                              <h6 style={{ textAlign: "center" }}>Email verification link sent successfully!</h6>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                auto
                                bordered
                                color="error"
                                onPress={() => {
                                  setSendEmailVerification(false);
                                }}
                                css={{ width: "100%" }}
                              >
                                Close this modal
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Col>
                      </Row>
                      <Spacer />
                    </>
                  )}
                  <Row>
                    <Col>Change email</Col>
                    <Col>
                      <Button color="error" bordered onPress={() => setReauthenticateUserModal(true)} auto>
                        Change email
                      </Button>
                      <Modal
                        closeButton
                        aria-labelledby="Change email"
                        open={reauthenticateUserModal}
                        onClose={() => setReauthenticateUserModal(false)}
                        blur
                        css={{ backgroundColor: "var(--nextui-colors-background)" }}
                      >
                        <Modal.Header>
                          <h3>Change email address</h3>
                        </Modal.Header>
                        <Modal.Body>
                          <h6 style={{ textAlign: "center" }}>
                            In order to change the current email address you need to reauthenticate
                          </h6>
                          <Input size="lg" label="Email" initialValue={currentUser.email} fullWidth readOnly />
                          <Input.Password
                            clearable
                            label="Password"
                            placeholder="Password"
                            fullWidth
                            onChange={(e) => {
                              setUserProvidedPassword(e.target.value);
                              setChangeEmailError({ email: "", password: "" });
                            }}
                            size="lg"
                            status={changeEmailError.password.length > 0 && "error"}
                            helperText={changeEmailError.password.length > 0 && changeEmailError.password}
                            helperColor={changeEmailError.password.length > 0 && "error"}
                            required
                          />
                          <Spacer />
                        </Modal.Body>
                        <Modal.Footer>
                          <Grid.Container gap={1}>
                            <Grid xs>
                              <Button
                                auto
                                bordered
                                color="error"
                                onPress={() => setReauthenticateUserModal(false)}
                                css={{ width: "100%" }}
                              >
                                Cancel
                              </Button>
                            </Grid>
                            <Grid xs>
                              <Button auto color="success" onPress={reauthenticateUser} css={{ width: "100%" }}>
                                Authenticate
                              </Button>
                            </Grid>
                          </Grid.Container>
                        </Modal.Footer>
                      </Modal>
                      <Modal
                        closeButton
                        aria-labelledby="Change email"
                        open={authenticatedSuccessfully}
                        onClose={() => setAuthenticatedSuccessfully(false)}
                        blur
                        css={{ backgroundColor: "var(--nextui-colors-background)" }}
                      >
                        <Modal.Header>
                          <h3>Change email address</h3>
                        </Modal.Header>
                        <Modal.Body>
                          <h6 style={{ textAlign: "center" }}>Enter your new email address</h6>
                          <Input
                            clearable
                            label="Email"
                            placeholder="Your new email address"
                            fullWidth
                            onChange={(e) => {
                              setUserProvidedEmail(e.target.value);
                              setChangeEmailError({ email: "", password: "" });
                            }}
                            size="lg"
                            status={changeEmailError.email.length > 0 && "error"}
                            helperText={changeEmailError.email.length > 0 && changeEmailError.email}
                            helperColor={changeEmailError.email.length > 0 && "error"}
                            required
                          />
                          <Spacer />
                        </Modal.Body>
                        <Modal.Footer>
                          <Grid.Container gap={1}>
                            <Grid xs>
                              <Button
                                auto
                                bordered
                                color="error"
                                onPress={() => setAuthenticatedSuccessfully(false)}
                                css={{ width: "100%" }}
                              >
                                Cancel
                              </Button>
                            </Grid>
                            <Grid xs>
                              <Button auto color="success" onPress={changeEmail} css={{ width: "100%" }}>
                                Change email
                              </Button>
                            </Grid>
                          </Grid.Container>
                        </Modal.Footer>
                      </Modal>
                      <Modal
                        closeButton
                        aria-labelledby="Change email"
                        open={emailChangedSuccessfully}
                        onClose={() => setEmailChangedSuccessfully(false)}
                        blur
                      >
                        <Modal.Body>
                          <h5 style={{ textAlign: "center" }}>Your email was changed successfully!</h5>
                          <p>
                            Your new email address is:{" "}
                            <span style={{ fontStyle: "italic", color: "var(--nextui-colors-red500)" }}>
                              {currentUser.email}
                            </span>
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            auto
                            bordered
                            color="error"
                            onPress={() => setEmailChangedSuccessfully(false)}
                            css={{ width: "100%" }}
                          >
                            Close this modal
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Col>
                  </Row>
                </Col>
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
            </Col>
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
            </Col>
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
            </Col>
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
            </Col>
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
            </Col>
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
            </Col>
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
            </Col>
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
            </Col>
          </Grid>
        </Grid.Container>
        <Spacer />
        {newChanges && (
          <>
            <Button
              bordered
              css={{ width: "100%" }}
              size="lg"
              color="error"
              onPress={() => setDiscardConfirmationVisible(true)}
            >
              Discard changes
            </Button>
            <Modal
              closeButton
              aria-labelledby="Discard changes"
              open={discardConfirmationVisible}
              onClose={() => setDiscardConfirmationVisible(false)}
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
                    <Button
                      auto
                      light
                      color="error"
                      onPress={() => setDiscardConfirmationVisible(false)}
                      css={{ width: "100%" }}
                    >
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
            <Button css={{ width: "100%" }} size="lg" color="error" onPress={() => setSaveConfirmationVisible(true)}>
              Save changes
            </Button>
            <Modal
              closeButton
              aria-labelledby="Save changes"
              open={saveConfirmationVisible}
              onClose={() => setSaveConfirmationVisible(false)}
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
                    <Button
                      auto
                      flat
                      color="error"
                      onPress={() => setSaveConfirmationVisible(false)}
                      css={{ width: "100%" }}
                    >
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
