import { Row, Col, Spacer, Grid, Card } from "@nextui-org/react";

const CustomCard = () => {
  return (
    <Card clickable className={styles.card} color="gradient" css={{ height: "275px" }}>
      <Card.Header>
        <h3>{currentUser.displayName}</h3>
      </Card.Header>
      <Card.Body>
        <Grid.Container>
          <Grid xs={4}>
            <div className={styles.imgWrapper}>
              <Card.Image
                src={currentUser.photoURL}
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur fugiat quibusdam repellendus deserunt
            sint. Dolorem commodi dolore molestias eveniet modi.
          </Grid>
          <Grid xs={12}>
            <Spacer />
          </Grid>
          <Grid xs={6} css={{ fontWeight: "600" }}>
            <Row>
              <Col>
                <Row>Category</Row>
                <Row css={{ color: "var(--nextui-colors-cyan700)" }} className={styles.category}>
                  Groceries
                </Row>
              </Col>
            </Row>
          </Grid>
          <Grid xs={6} css={{ fontWeight: "600" }}>
            <Row>
              <Col>
                <Row>Difficulty</Row>
                <Row className={`${styles.difficulty} ${styles.Hard}`}>Medium</Row>
              </Col>
            </Row>
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
