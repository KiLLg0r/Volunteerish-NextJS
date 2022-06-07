import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";
import { Grid, Collapse, Row, Col, Spacer, Table } from "@nextui-org/react";

import FaqSVG from "../public/svg/faq.svg";

import styles from "./styles/Help.module.scss";

const Help = () => {
  const router = useRouter();

  return (
    <section className={styles.helpAndSupport}>
      <header className={styles.header} onClick={() => router.push("/")}>
        <BsChevronLeft />
        Go back
      </header>
      <h1 className={styles.title}>Help &#38; Support</h1>
      <Grid.Container className={styles.FAQ}>
        <Grid xs={0} sm={5} alignItems="flex-start">
          <FaqSVG style={{ padding: "1rem" }} />
        </Grid>
        <Grid xs={12} sm={7}>
          <Collapse.Group css={{ width: "100%", padding: "1rem" }}>
            <Collapse title="How can i change my name / email / address / password ?">
              <div className={styles.faqText}>
                To change one of these pieces of information, go to the settings tab, the account section and click on
                one of the pieces of information you want to change.
              </div>
            </Collapse>
            <Collapse title="How do I post announces?">
              <div className={styles.faqText}>
                In order to post announces you have to go to the announces tab, complete all the fields and in the end
                press the &apos;Post announcement&apos; button.
              </div>
            </Collapse>
            <Collapse title="How can i talk to the person who help me?">
              <div className={styles.faqText}>
                <Col>
                  <Row>Here we have 3 options:</Row>
                  <Row>
                    1. you will have to go to the home tab, the announce center section and click on the yellow
                    &apos;Send message&apos; button on the respective announcement.
                  </Row>
                  <Row>
                    2. you will have to go to the message tab, where you will be able to see the messages with all the
                    people you are helping.
                  </Row>
                  <Row>
                    3. you will have to go to the home tab, the announce center section, click on the red &apos;More
                    info&apos; button on the respective announcement and there you will be able to find the phone number
                    of the respective person (if this person has a phone number)
                  </Row>
                  <Spacer />
                </Col>
              </div>
            </Collapse>
            <Collapse title="How do i help a person?">
              <div className={styles.faqText}>
                All you have to do is go to the announces tab and click on the announcement you want. Then you will be
                redirected to that announcement page where you click the green &apos;Help this person&apos; at the end
                of the page.
              </div>
            </Collapse>
            <Collapse title="How can I get points for the shop?">
              <div className={styles.faqText}>
                You can get points by helping people. The number of points obtained depends on the difficulty and
                duration of the activities you do.
              </div>
            </Collapse>
            <Collapse title="How the points system works?">
              <Table
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
                color="error"
                aria-label="Table of content for points system depending on category and difficulty"
              >
                <Table.Header>
                  <Table.Column className={styles.category}>CATEGORY</Table.Column>
                  <Table.Column className={styles.easy}>EASY</Table.Column>
                  <Table.Column className={styles.medium}>MEDIUM</Table.Column>
                  <Table.Column className={styles.hard}>HARD</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="1">
                    <Table.Cell>Groceries</Table.Cell>
                    <Table.Cell>10 points</Table.Cell>
                    <Table.Cell>25 points</Table.Cell>
                    <Table.Cell>40 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="2">
                    <Table.Cell>School meditations</Table.Cell>
                    <Table.Cell>40 points</Table.Cell>
                    <Table.Cell>50 points</Table.Cell>
                    <Table.Cell>60 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="3">
                    <Table.Cell>Shopping</Table.Cell>
                    <Table.Cell>10 points</Table.Cell>
                    <Table.Cell>25 points</Table.Cell>
                    <Table.Cell>40 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="4">
                    <Table.Cell>Cleaning</Table.Cell>
                    <Table.Cell>20 points</Table.Cell>
                    <Table.Cell>35 points</Table.Cell>
                    <Table.Cell>50 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="5">
                    <Table.Cell>Walking</Table.Cell>
                    <Table.Cell>15 points</Table.Cell>
                    <Table.Cell>30 points</Table.Cell>
                    <Table.Cell>45 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="6">
                    <Table.Cell>Cooking</Table.Cell>
                    <Table.Cell>25 points</Table.Cell>
                    <Table.Cell>45 points</Table.Cell>
                    <Table.Cell>60 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="7">
                    <Table.Cell>Paying of bills</Table.Cell>
                    <Table.Cell>15 points</Table.Cell>
                    <Table.Cell>20 points</Table.Cell>
                    <Table.Cell>30 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="8">
                    <Table.Cell>Emotional support</Table.Cell>
                    <Table.Cell>20 points</Table.Cell>
                    <Table.Cell>40 points</Table.Cell>
                    <Table.Cell>60 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="9">
                    <Table.Cell>Physical labour</Table.Cell>
                    <Table.Cell>40 points</Table.Cell>
                    <Table.Cell>60 points</Table.Cell>
                    <Table.Cell>80 points</Table.Cell>
                  </Table.Row>
                  <Table.Row key="10">
                    <Table.Cell>Hard work</Table.Cell>
                    <Table.Cell>40 points</Table.Cell>
                    <Table.Cell>60 points</Table.Cell>
                    <Table.Cell>80 points</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </section>
  );
};

export default Help;
