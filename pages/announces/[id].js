import { useRouter } from "next/router";
import { Container, Grid, Button, Image, Input, Textarea, Spacer, Modal } from "@nextui-org/react";
import { BsChevronLeft } from "react-icons/bs";
import { db } from "../../config/firebase";
import { collection, getDoc, getDocs, doc, updateDoc, deleteField } from "firebase/firestore";
import { useWindowSize } from "../../utilities/hooks";
import { useState, useRef, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { useAuth } from "../../context/AuthContext";

import styles from "../styles/Announces.module.scss";

const Announce = ({ id, data }) => {
  const router = useRouter();
  const announceData = JSON.parse(data);
  const size = useWindowSize();
  const { userData, currentUser } = useAuth();

  const firstName = announceData.name.split(" ")[0];
  const lastName = announceData.name.split(" ")[1];

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

  const getAddress = async () => {
    const userRef = doc(db, "users", announceData.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userDocData = userSnap.data();
      const data = userDocData.temporaryAddress;
      console.log(data);
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
      setErrorModalMessage("You have to provide a category and a difficulty for the announcement!");
      setErrorModal(true);
      return 0;
    } else if (categoryRef.current.value.length === 0) {
      setErrorModalMessage("You have to provide a category for the announcement!");
      setErrorModal(true);
      return 0;
    } else if (difficultyRef.current.value.length === 0) {
      setErrorModalMessage("You have to provide a difficulty for the announcement!");
      setErrorModal(true);
      return 0;
    }

    if (showAddress)
      if (countryRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a country for the address!");
        setErrorModal(true);
        return 0;
      } else if (stateRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a state for the address!");
        setErrorModal(true);
        return 0;
      } else if (cityRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a city for the address!");
        setErrorModal(true);
        return 0;
      } else if (streetRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a street for the address!");
        setErrorModal(true);
        return 0;
      } else if (streetNumberRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a street number for the address!");
        setErrorModal(true);
        return 0;
      } else if (buildingRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a building for the address!");
        setErrorModal(true);
        return 0;
      } else if (apartmentRef.current.value.length === 0) {
        setErrorModalMessage("You have to set an apartment number for the address!");
        setErrorModal(true);
        return 0;
      } else if (zipcodeRef.current.value.length === 0) {
        setErrorModalMessage("You have to set a zipcode for the address!");
        setErrorModal(true);
        return 0;
      }

    return 1;
  };

  const helpPerson = async () => {
    if (userData?.helpingAnnounceID) {
      setErrorModalMessage(
        "You already help someone. You cannot help other people until you finish with the one you help now!",
      );
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
      setErrorModalMessage("Something went wrong. You can't help this person right now");
    });

    await updateDoc(userDoc, {
      helpingAnnounceID: id,
    }).catch((error) => {
      console.log(error);
      setErrorModal(true);
      setErrorModalMessage("Something went wrong. You can't help this person right now");
    });

    if (errorModalMessage.length === 0) router.reload();
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
        setErrorModalMessage("Something went wrong. We couldn't update the new changes!");
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
        setErrorModalMessage("Something went wrong. We couldn't update the new changes!");
        setErrorModal(true);
      });
    }

    if (errorModalMessage.length === 0) router.reload();
  };

  const closeAnnounce = async () => {
    const announceDoc = doc(db, "announces", id);
    const userDoc = doc(db, "users", currentUser.uid);

    await updateDoc(announceDoc, {
      status: "closed",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage("Something went wrong. We couldn't close the announce!");
      setErrorModal(true);
    });

    await updateDoc(userDoc, {
      announceID: "",
      temporaryAddress: deleteField(),
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage("Something went wrong. We couldn't close the announce!");
      setErrorModal(true);
    });

    if (errorModalMessage.length === 0) router.reload();
  };

  const finishAnnounce = async () => {
    const announceDoc = doc(db, "announces", id);
    const helpingUserDoc = doc(db, "users", announceData.helpedBy);
    const helpedUserDoc = doc(db, "users", announceData.uid);

    await updateDoc(announceDoc, {
      status: "helped",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage("Something went wrong. We couldn't finish the announce!");
      setErrorModal(true);
    });

    await updateDoc(helpedUserDoc, {
      temporaryAddress: deleteField(),
      announceID: "",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage("Something went wrong. We couldn't finish the announce!");
      setErrorModal(true);
    });

    const helpingUserSnap = await getDoc(helpingUserDoc).catch((error) =>
      console.log("I couldn't get the user's who help me data"),
    );
    const helpingUserData = helpingUserSnap.data();

    console.log(helpingUserSnap.data());

    const points = helpingUserData.points + announceData.points;
    const helpedPeople = helpingUserData.helpedPeople + 1;

    await updateDoc(helpingUserDoc, {
      points: points,
      helpedPeople: helpedPeople,
      helpingAnnounceID: "",
    }).catch((error) => {
      console.log(error);
      setErrorModalMessage("Something went wrong. We couldn't finish the announce!");
      setErrorModal(true);
    });

    if (errorModalMessage.length === 0) router.reload();
  };

  useEffect(() => {
    if (announceData.uid === currentUser.uid) {
      setStates(State.getStatesOfCountry(userData?.country));
      setCities(City.getCitiesOfState(userData?.country, userData?.state));
    }
  }, [announceData.uid, currentUser.uid, userData?.country, userData?.state]);

  return (
    <Container xs css={{ paddingInline: "0" }}>
      <Grid.Container gap={1}>
        <Grid xs={12}>
          <Button
            onPress={() => router.back()}
            color="error"
            light
            icon={<BsChevronLeft />}
            className={styles.announceHeader}
          >
            Go back
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
              <Input label="First name" initialValue={firstName} fullWidth readOnly={!edit} ref={firstNameRef} />
            </Grid>
            <Grid xs={12}>
              <Input label="Last name" initialValue={lastName} fullWidth readOnly={!edit} ref={lastNameRef} />
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={12} sm={6}>
          <div className={styles.selectMenu}>
            <label className={styles.selectLabel}>Category</label>
            <select className={styles.select} disabled={!edit} defaultValue={announceData.category} ref={categoryRef}>
              <option value={"Groceries"}>Groceries</option>
              <option value={"School meditations"}>School meditations</option>
              <option value={"Shopping"}>Shopping</option>
              <option value={"Cleaning"}>Cleaning</option>
              <option value={"Walking"}>Walking</option>
              <option value={"Cooking"}>Cooking</option>
              <option value={"Paying of bills"}>Paying of bills</option>
              <option value={"Emotional support"}>Emotional support</option>
              <option value={"Physical labour"}>Physical labour</option>
              <option value={"Hard work"}>Hard work</option>
            </select>
          </div>
        </Grid>
        <Grid xs={12} sm={6}>
          <div className={styles.selectMenu}>
            <label className={styles.selectLabel}>Difficulty</label>
            <select
              className={styles.select}
              disabled={!edit}
              defaultValue={announceData.difficulty}
              ref={difficultyRef}
            >
              <option value="">Select a difficulty</option>
              <option value={"0"}>Easy</option>
              <option value={"1"}>Medium</option>
              <option value={"2"}>Hard</option>
            </select>
          </div>
        </Grid>
        <Grid xs={12}>
          <Textarea
            minRows={20}
            label="Description"
            initialValue={announceData.description}
            fullWidth
            size="lg"
            readOnly={!edit}
            ref={descriptionRef}
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
                  if (!showAddress) getAddress();
                }}
              >
                {!showAddress ? "Show" : "Hide"} address
              </Button>
            </Grid>
          )}
        {showAddress && (
          <>
            <Grid xs={12}>
              <div className={styles.selectMenu}>
                <label className={styles.selectLabel}>Country</label>
                <select
                  className={styles.select}
                  onChange={showStates}
                  ref={countryRef}
                  defaultValue={address?.country}
                  disabled={!edit}
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
            </Grid>
            <Grid xs={12}>
              <div className={styles.selectMenu}>
                <label htmlFor="state" className={styles.selectLabel}>
                  State
                </label>
                <select
                  id="state"
                  onChange={showCities}
                  className={styles.select}
                  ref={stateRef}
                  defaultValue={address?.state}
                  disabled={!edit}
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
            </Grid>
            <Grid xs={12}>
              <div className={styles.selectMenu}>
                <label htmlFor="city" className={styles.selectLabel}>
                  City
                </label>
                <select id="city" className={styles.select} ref={cityRef} defaultValue={address?.city} disabled={!edit}>
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
            </Grid>
            <Grid xs={12}>
              <Input
                size="lg"
                label="Street"
                fullWidth
                initialValue={address?.street}
                readOnly={!edit}
                ref={streetRef}
              />
            </Grid>
            <Grid xs={6}>
              <Input
                size="lg"
                label="Street number"
                fullWidth
                type="number"
                initialValue={address?.streetNumber}
                readOnly={!edit}
                ref={streetNumberRef}
              />
            </Grid>
            <Grid xs={6}>
              <Input
                size="lg"
                label="Building"
                fullWidth
                initialValue={address?.building}
                readOnly={!edit}
                ref={buildingRef}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                size="lg"
                label="Apartment"
                fullWidth
                type="number"
                initialValue={address?.apartment}
                readOnly={!edit}
                ref={apartmentRef}
              />
            </Grid>
            <Grid xs={12}>
              <Input
                size="lg"
                label="Zipcode"
                fullWidth
                type="number"
                initialValue={address?.zipcode}
                readOnly={!edit}
                ref={zipcodeRef}
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
                  Cancel
                </Button>
              </Grid>
            )}
            {announceData.uid === currentUser.uid && (
              <Grid xs={12} sm={6}>
                <Button color="success" onPress={() => setConfirmEditModal(true)} css={{ width: "100%" }}>
                  Save changes
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
                      Edit announce
                    </Button>
                  </Grid>
                )}

                {announceData.status === "active" && (
                  <Grid xs={12} sm={6}>
                    <Button color="error" onPress={() => setCloseAnnounceModal(true)} css={{ width: "100%" }}>
                      Close announce
                    </Button>
                  </Grid>
                )}
                {announceData.status === "helping" && (
                  <Grid xs={12} sm={6}>
                    <Button color="error" onPress={() => setFinishAnnounceModal(true)} css={{ width: "100%" }}>
                      Finish
                    </Button>
                  </Grid>
                )}
              </>
            )}
            {announceData.helpedBy.length === 0 && announceData.uid != currentUser.uid && (
              <Grid xs={12}>
                <Button color="success" onPress={() => setHelpModal(true)} css={{ width: "100%" }}>
                  Help this person
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
          <h3>Save changes ?</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>Are you sure you want to save the changes ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button auto flat ripple color="error" onPress={() => setConfirmEditModal(false)} css={{ width: "100%" }}>
                Cancel
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
                Confirm changes
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
          <h3>Discard the changes ?</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>Are you sure you want to discard the changes ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button auto light ripple color="error" onPress={() => setCancelEditModal(false)} css={{ width: "100%" }}>
                Cancel
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
                Discard changes
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
          <h3>Finish this announce ?</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>Are you sure you want to finish this announce ?</h5>
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
                Cancel
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
                Finish
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
          <h3>Close this announce ?</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>Are you sure you want to close this announce ?</h5>
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
                Cancel
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
                Close
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
          <h3>Help this person ?</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 style={{ textAlign: "center" }}>Are you sure you want to help this person ?</h5>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1} justify="center">
            <Grid xs>
              <Button auto flat ripple color="error" onPress={() => setHelpModal(false)} css={{ width: "100%" }}>
                Cancel
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
                Help now
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
