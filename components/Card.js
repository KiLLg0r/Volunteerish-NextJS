import { Row, Col, Grid, Card } from "@nextui-org/react";
import { useState, useEffect } from "react";

import styles from "./styles/Card.module.scss";

const AnnounceCard = ({ data }) => {
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    switch (data.difficulty) {
      case "0":
        setDifficulty("Easy");
        break;
      case "1":
        setDifficulty("Medium");
        break;
      case "2":
        setDifficulty("Hard");
        break;
      default:
        break;
    }
  }, [data.difficulty]);

  return (
    <Card
      isPressable
      className={styles.card}
      variant="flat"
      css={{ height: "275px", background: "var(--nextui-colors-gradient)" }}
    >
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
                <Row>Category</Row>
                <Row css={{ color: "var(--nextui-colors-cyan700)" }} className={styles.category}>
                  {data.category}
                </Row>
              </Col>
            </Row>
          </Grid>
          <Grid xs={4} css={{ fontWeight: "600" }}>
            <Row>
              <Col>
                <Row>Difficulty</Row>
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
