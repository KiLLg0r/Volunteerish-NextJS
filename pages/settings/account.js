import { Button, Col, Container, Grid, Input, Spacer, Collapse, Row, Text } from "@nextui-org/react";
import { withNavigation, withProtected } from "../../utilities/routes";
import { BsChevronLeft, BsPencilSquare } from "react-icons/bs";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "../../context/AuthContext";

import styles from "../styles/Settings.module.scss";

export const Account = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const imageInputRef = useRef(null);

  const router = useRouter();
  const { currentUser, sendUserEmailVerification, userData } = useAuth();

  const firstName = currentUser.displayName.split(" ")[0];
  const lastName = currentUser.displayName.split(" ")[1];

  const [newChanges, setNewChanges] = useState(false);
  const [discardChanges, setDiscardChanges] = useState(false);

  const handleChanges = () => {
    setNewChanges(true);
    setDiscardChanges(false);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Container sm className={styles.account}>
      {router.asPath === "/account" && (
        <header className={styles.header} onClick={() => router.push("/")}>
          <BsChevronLeft />
          Go back
        </header>
      )}
      <form>
        <h2 className={styles.title}>Edit profile</h2>
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
              <Input size="lg" label="First Name" initialValue={firstName} fullWidth onChange={handleChanges} />
              <Spacer />
              <Input size="lg" label="Last Name" initialValue={lastName} fullWidth onChange={handleChanges} />
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
              <Input size="lg" label="Country" initialValue={userData?.country} fullWidth onChange={handleChanges} />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input size="lg" label="State" initialValue={userData?.state} fullWidth onChange={handleChanges} />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input size="lg" label="City" initialValue={userData?.city} fullWidth onChange={handleChanges} />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input size="lg" label="Street" initialValue={userData?.street} fullWidth onChange={handleChanges} />
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
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input size="lg" label="Building" initialValue={userData?.building} fullWidth onChange={handleChanges} />
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
              />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
          <Grid xs={12} sm={6}>
            <Col>
              <Input size="lg" label="Zipcode" initialValue={userData?.zipcode} fullWidth onChange={handleChanges} />
              <Spacer />
            </Col>
            <Spacer />
          </Grid>
        </Grid.Container>
        <Spacer />
        {newChanges && (
          <>
            <Button bordered css={{ width: "100%" }} size="lg" color="error" onPress={() => setDiscardChanges(true)}>
              Discard changes
            </Button>
            <Spacer />
            <Button css={{ width: "100%" }} size="lg" color="error">
              Save changes
            </Button>
          </>
        )}
        <Spacer />
      </form>
    </Container>
  );
};

export default withProtected(withNavigation(Account));
