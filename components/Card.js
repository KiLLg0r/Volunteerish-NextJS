import { Row, Col, Grid, Card } from "@nextui-org/react";
import { useState, useEffect } from "react";
import languages from "../utilities/languages.json";
import { useAuth } from "../context/AuthContext";
import styles from "./styles/Card.module.scss";

const AnnounceCard = ({ data }) => {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const { Language } = useAuth();

  useEffect(() => {
    switch (data.difficulty) {
      case "0":
        setDifficulty(languages[Language].announces.easy);
        break;
      case "1":
        setDifficulty(languages[Language].announces.medium);
        break;
      case "2":
        setDifficulty(languages[Language].announces.hard);
        break;
      default:
        break;
    }

    switch (data.category) {
      case "Groceries":
        setCategory(languages[Language].announces.groceries);
        break;
      case "School Meditations":
        setCategory(languages[Language].announces.schoolMeditations);
        break;
      case "Shopping":
        setCategory(languages[Language].announces.shopping);
        break;
      case "Cleaning":
        setCategory(languages[Language].announces.cleaning);
        break;
      case "Walking":
        setCategory(languages[Language].announces.walking);
        break;
      case "Cooking":
        setCategory(languages[Language].announces.cooking);
        break;
      case "Paying of bills":
        setCategory(languages[Language].announces.payingOfBills);
        break;
      case "Emotional support":
        setCategory(languages[Language].announces.emotionalSupport);
        break;
      case "Physical labour":
        setCategory(languages[Language].announces.physicalLabour);
        break;
      case "Hard work":
        setCategory(languages[Language].announces.hardWork);
        break;
      default:
        break;
    }
  }, [Language, data.category, data.difficulty]);

  return (
    <Card className={styles.card} variant="flat" css={{ height: "275px", background: "var(--nextui-colors-gradient)" }}>
      <Card.Header>
        <h3>{data.name}</h3>
      </Card.Header>
      <Card.Body css={{ paddingBlock: "0" }}>
        <Grid.Container gap={1}>
          <Grid xs={4}>
            <div className={styles.imgWrapper}>
              <Card.Image
                src={data.imgURL}
                objectFit="cover"
                alt="User image"
                showSkeleton
                maxDelay={5000}
                width={100}
                height={100}
              />
            </div>
          </Grid>
          <Grid xs={8} className={styles.cardDescription}>
            {data.description}
          </Grid>
          <Grid xs={8} css={{ fontWeight: "600" }}>
            <Row>
              <Col>
                <Row>{languages[Language].select.category}</Row>
                <Row css={{ color: "var(--nextui-colors-cyan700)" }} className={styles.category}>
                  {category}
                </Row>
              </Col>
            </Row>
          </Grid>
          <Grid xs={4} css={{ fontWeight: "600" }}>
            <Row>
              <Col>
                <Row>{languages[Language].select.difficulty}</Row>
                <Row className={`${styles.difficulty} ${styles[difficulty]}`}>{difficulty}</Row>
              </Col>
            </Row>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default AnnounceCard;
