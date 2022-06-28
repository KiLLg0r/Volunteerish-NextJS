import { Grid, Button, Container, Col, Image, Spacer, Input, Modal } from "@nextui-org/react";
import { useRef, useState, useEffect } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Country, State, City } from "country-state-city";
import { updateProfile } from "firebase/auth";
import { db, app } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import languages from "../utilities/languages.json";
import { withProtected } from "../utilities/routes";
import Head from "next/head";

import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import VolunteerSvg from "../public/svg/volunteer.svg";
import styles from "./styles/CreateNewAccount.module.scss";

const CreateNewAccount = () => {
  const { currentUser, Language } = useAuth();
  const router = useRouter();

  const storage = getStorage(app);

  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/placeholder.jpg?alt=media&token=8960960f-36a2-4a20-8115-c692d95e9fda",
  );
  const [preview, setPreview] = useState("");
  const imageInputRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [building, setBuilding] = useState("");
  const [apartment, setApartment] = useState("");
  const [zipcode, setZipcode] = useState("");

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryChange, setCountryChange] = useState(false);
  const [stateChange, setStateChange] = useState(false);

  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);

  const showStates = (e) => {
    setCountry(e.target.value);
    setCountryChange(true);
    setStateChange(true);
    setStates([]);
    setCities([]);
    setStates(State.getStatesOfCountry(countryRef.current.value));
    stateRef.current.selectedIndex = 0;
    cityRef.current.selectedIndex = 0;
  };

  const showCities = (e) => {
    setState(e.target.value);
    setCountryChange(false);
    setStateChange(true);
    setCities([]);
    setCities(City.getCitiesOfState(countryRef.current.value, stateRef.current.value));
    cityRef.current.selectedIndex = 0;
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const NextBtn = ({ disabled }) => {
    const swiper = useSwiper();

    return (
      <Button color="error" auto css={{ width: "100%" }} onPress={() => swiper.slideNext()} disabled={disabled}>
        {languages[Language].createNewAccount.nextStep}
      </Button>
    );
  };

  const PrevBtn = () => {
    const swiper = useSwiper();

    return (
      <Button color="error" bordered auto css={{ width: "100%" }} onPress={() => swiper.slidePrev()}>
        {languages[Language].createNewAccount.prevStep}
      </Button>
    );
  };

  const SubmitBtn = () => {
    return (
      <Button color="error" auto css={{ width: "100%" }} onPress={submitForm}>
        {languages[Language].createNewAccount.complete}
      </Button>
    );
  };

  const submitForm = () => {
    if (image) {
      const imageRef = ref(storage, `profile/${currentUser.uid}`);
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
          setError(languages[Language].modal.createNewAccount.error.imgUploadError);
          setShowError(true);
          imageInputRef.current.scrollIntoView({ behavior: "smooth" });
        },
        () =>
          getDownloadURL(task.snapshot.ref).then((url) => {
            setImgURL(url);
            updateProfile(currentUser, { photoURL: url })
              .then(() => {
                console.log(`Image updated successfully`);
                setImgURL(url);
              })
              .catch((error) => {
                console.log(error);
                setError(languages[Language].modal.createNewAccount.error.imgUpdateError);
                setShowError(true);
              });
          }),
      );
    } else {
      updateProfile(currentUser, { photoURL: imgURL })
        .then(() => console.log(`Image updated successfully`))
        .catch((error) => {
          console.log(error);
          setError(languages[Language].modal.createNewAccount.error.imgUpdateError);
          setShowError(true);
        });
    }

    updateProfile(currentUser, {
      displayName: firstName.concat(" ", lastName),
    });

    const updateUserDoc = async () => {
      const userDocRef = doc(db, "users", currentUser.uid);

      await setDoc(userDocRef, {
        name: firstName.concat(" ", lastName),
        photoURL: imgURL,
        email: currentUser.email,
        country: country,
        state: state,
        city: city,
        street: street,
        streetNumber: streetNumber,
        building: building,
        apartment: apartment,
        zipcode: zipcode,
        points: 0,
        helpedPeople: 0,
      }).catch((error) => {
        setError(error);
        setShowError(true);
      });
    };

    updateUserDoc();

    if (error.length === 0) setSuccess(true);
  };

  return (
    <Container xs css={{ paddingInline: "0" }}>
      <Head>
        <title>
          {languages[Language].headTags.createAccount} | {languages[Language].headTags.title}
        </title>
      </Head>
      <form onSubmit={submitForm}>
        <Swiper allowTouchMove={false} spaceBetween={30} className={styles.createNewAccountSwiper} preloadImages>
          <SwiperSlide className={styles.swiperSlide}>
            <Col className={styles.swiperColumn}>
              <h1 className={styles.title}>{languages[Language].createNewAccount.firstSlide.title}</h1>
              <VolunteerSvg className={styles.volunteerSvg} />
              <h1 className={styles.titleLogo}>Volunteerish</h1>
              <h3 className={styles.subtitle}>{languages[Language].createNewAccount.firstSlide.subtitle}</h3>
            </Col>
            <Grid.Container gap={1} className={styles.swiperBtns}>
              <Grid xs={12}>
                <NextBtn />
              </Grid>
            </Grid.Container>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Col className={styles.swiperColumn}>
              <h2 className={styles.title}>{languages[Language].createNewAccount.secondSlide.title}</h2>
              <Spacer />
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
                    src={preview ? preview : imgURL}
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
              <h4 className={styles.imageEditLabel}>{languages[Language].createNewAccount.secondSlide.img}</h4>
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
            </Col>
            <Grid.Container gap={1} className={styles.swiperBtns}>
              <Grid xs={12}>
                <PrevBtn />
              </Grid>
              <Grid xs={12}>
                <NextBtn />
              </Grid>
            </Grid.Container>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Col className={styles.swiperColumn}>
              <h3 className={styles.title}>{languages[Language].createNewAccount.thirdSlide.title}</h3>
              <Spacer />
              <Input
                label={languages[Language].userData.firstName}
                placeholder="John"
                required
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
                clearable
              />
              <Spacer />
              <Input
                label={languages[Language].userData.lastName}
                placeholder="Doe"
                required
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
                clearable
              />
              <Spacer />
              <Input
                type="date"
                label={languages[Language].userData.birth}
                required
                fullWidth
                onChange={(e) => setBirthDate(e.target.value)}
                clearable
              />
            </Col>
            <Grid.Container gap={1} className={styles.swiperBtns}>
              <Grid xs={12}>
                <PrevBtn />
              </Grid>
              <Grid xs={12}>
                <NextBtn
                  disabled={firstName.length > 0 && lastName.length > 0 && birthDate.length > 0 ? false : true}
                />
              </Grid>
            </Grid.Container>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Col className={styles.swiperColumn}>
              <h3 className={styles.title}>{languages[Language].createNewAccount.fourthSlide.title}</h3>
              <Spacer />
              <div className={styles.selectMenu}>
                <label htmlFor="country" className={styles.selectLabel}>
                  {languages[Language].select.country}
                </label>
                <select name="country" id="country" ref={countryRef} onChange={showStates} className={styles.select}>
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
              <Spacer />
              <div className={styles.selectMenu}>
                <label htmlFor="state" className={styles.selectLabel}>
                  {languages[Language].select.state}
                </label>
                <select id="state" ref={stateRef} onChange={showCities} className={styles.select}>
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
              <Spacer />
              <div className={styles.selectMenu}>
                <label htmlFor="city" className={styles.selectLabel}>
                  {languages[Language].select.city}
                </label>
                <select id="city" ref={cityRef} className={styles.select} onChange={(e) => setCity(e.target.value)}>
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
            </Col>
            <Grid.Container gap={1} className={styles.swiperBtns}>
              <Grid xs={12}>
                <PrevBtn />
              </Grid>
              <Grid xs={12}>
                <NextBtn disabled={country.length > 0 && state.length > 0 && city.length > 0 ? false : true} />
              </Grid>
            </Grid.Container>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Col className={styles.swiperColumn}>
              <h3 className={styles.title}>{languages[Language].createNewAccount.fifthSlide.title}</h3>
              <Spacer />
              <Grid.Container gap={1}>
                <Grid xs={12}>
                  <Input
                    label={languages[Language].userData.street}
                    placeholder="Fifth Avenue"
                    required
                    fullWidth
                    onChange={(e) => setStreet(e.target.value)}
                    clearable
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                    type="number"
                    label={languages[Language].userData.streetNumber}
                    placeholder="5"
                    required
                    fullWidth
                    onChange={(e) => setStreetNumber(e.target.value)}
                    clearable
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                    label={languages[Language].userData.building}
                    placeholder="23B"
                    required
                    fullWidth
                    onChange={(e) => setBuilding(e.target.value)}
                    clearable
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                    label={languages[Language].userData.apartment}
                    placeholder="14"
                    required
                    fullWidth
                    onChange={(e) => setApartment(e.target.value)}
                    clearable
                  />
                </Grid>
                <Grid xs={6}>
                  <Input
                    type="number"
                    label={languages[Language].userData.zipcode}
                    placeholder="10018"
                    required
                    fullWidth
                    onChange={(e) => setZipcode(e.target.value)}
                    clearable
                  />
                </Grid>
              </Grid.Container>
            </Col>
            <Grid.Container gap={1} className={styles.swiperBtns}>
              <Grid xs={12}>
                <PrevBtn />
              </Grid>
              <Grid xs={12}>
                <NextBtn
                  disabled={
                    street.length > 0 &&
                    streetNumber.length > 0 &&
                    building.length > 0 &&
                    apartment.length > 0 &&
                    zipcode.length > 0
                      ? false
                      : true
                  }
                />
              </Grid>
            </Grid.Container>
          </SwiperSlide>
          <SwiperSlide className={styles.swiperSlide}>
            <Col className={styles.swiperColumn}>
              <h3 className={styles.title}>{languages[Language].createNewAccount.lastSlide.title}</h3>
            </Col>
            <Grid.Container gap={1} className={styles.swiperBtns}>
              <Grid xs={12}>
                <PrevBtn />
              </Grid>
              <Grid xs={12}>
                <SubmitBtn />
              </Grid>
            </Grid.Container>
          </SwiperSlide>
        </Swiper>
      </form>
      <Modal
        closeButton
        aria-labelledby="Error modal"
        open={showError}
        onClose={() => {
          setShowError(false);
          setError("");
        }}
        blur
      >
        <Modal.Header>
          <h3>{languages[Language].modal.createNewAccount.error.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ textAlign: "center" }}>{error}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1}>
            <Grid xs>
              <Button
                auto
                flat
                color="error"
                onPress={() => {
                  setShowError(false);
                  setError("");
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.createNewAccount.error.close}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
      <Modal
        closeButton
        aria-labelledby="Success modal"
        open={success}
        onClose={() => {
          setSuccess(false);
          router.replace("/");
        }}
        blur
      >
        <Modal.Header>
          <h3>{languages[Language].modal.createNewAccount.success.title}</h3>
        </Modal.Header>
        <Modal.Body>
          <h6 style={{ textAlign: "center" }}>{languages[Language].modal.createNewAccount.success.body}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1}>
            <Grid xs>
              <Button
                auto
                color="error"
                onPress={() => {
                  setSuccess(false);
                  router.replace("/");
                }}
                css={{ width: "100%" }}
              >
                {languages[Language].modal.createNewAccount.success.close}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default withProtected(CreateNewAccount);
