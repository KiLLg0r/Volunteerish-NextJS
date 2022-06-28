import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";
import { Grid, Collapse, Row, Col, Spacer, Table, Container } from "@nextui-org/react";
import languages from "../utilities/languages.json";
import FaqSVG from "../public/svg/faq.svg";
import Head from "next/head";
import styles from "./styles/Help.module.scss";
import { useAuth } from "../context/AuthContext";

export const Help = () => {
  const router = useRouter();
  const { Language } = useAuth();

  return (
    <Container sm className={styles.helpAndSupport}>
      <Head>
        <title>
          {languages[Language].headTags.help} | {languages[Language].headTags.title}
        </title>
      </Head>
      {router.asPath === "/help" && (
        <header className={styles.header} onClick={() => router.push("/")}>
          <BsChevronLeft />
          {languages[Language].goBack}
        </header>
      )}
      <h2 className={styles.title}>{languages[Language].helpSupport.title}</h2>
      <Grid.Container className={styles.FAQ}>
        <Grid xs={0} sm={router.asPath === "/settings" ? 0 : 5} alignItems="flex-start">
          <FaqSVG style={{ padding: "1rem" }} />
        </Grid>
        <Grid xs={12} sm={router.asPath === "/settings" ? 12 : 7}>
          <Collapse.Group css={{ width: "100%", padding: "1rem" }}>
            <Collapse title={languages[Language].helpSupport.Q1.title}>
              <div className={styles.faqText}>{languages[Language].helpSupport.Q1.info}</div>
            </Collapse>
            <Collapse title={languages[Language].helpSupport.Q2.title}>
              <div className={styles.faqText}>{languages[Language].helpSupport.Q2.info}</div>
            </Collapse>
            <Collapse title={languages[Language].helpSupport.Q3.title}>
              <div className={styles.faqText}>{languages[Language].helpSupport.Q3.info}</div>
            </Collapse>
            <Collapse title={languages[Language].helpSupport.Q4.title}>
              <div className={styles.faqText}>{languages[Language].helpSupport.Q4.info}</div>
            </Collapse>
            <Collapse title={languages[Language].helpSupport.Q5.title}>
              <div className={styles.faqText}>{languages[Language].helpSupport.Q5.info}</div>
            </Collapse>
            <Collapse title={languages[Language].helpSupport.Q6.title}>
              <Table
                css={{
                  height: "auto",
                  minWidth: "100%",
                }}
                color="error"
                aria-label="Table of content for points system depending on category and difficulty"
              >
                <Table.Header>
                  <Table.Column className={styles.category}>{languages[Language].select.category}</Table.Column>
                  <Table.Column className={styles.easy}>{languages[Language].announces.easy}</Table.Column>
                  <Table.Column className={styles.medium}>{languages[Language].announces.medium}</Table.Column>
                  <Table.Column className={styles.hard}>{languages[Language].announces.hard}</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row key="1">
                    <Table.Cell>{languages[Language].announces.groceries}</Table.Cell>
                    <Table.Cell>10 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>25 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>40 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="2">
                    <Table.Cell>{languages[Language].announces.schoolMeditations}</Table.Cell>
                    <Table.Cell>40 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>50 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>60 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="3">
                    <Table.Cell>{languages[Language].announces.shopping}</Table.Cell>
                    <Table.Cell>10 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>25 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>40 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="4">
                    <Table.Cell>{languages[Language].announces.cleaning}</Table.Cell>
                    <Table.Cell>20 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>35 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>50 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="5">
                    <Table.Cell>{languages[Language].announces.walking}</Table.Cell>
                    <Table.Cell>15 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>30 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>45 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="6">
                    <Table.Cell>{languages[Language].announces.cooking}</Table.Cell>
                    <Table.Cell>25 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>45 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>60 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="7">
                    <Table.Cell>{languages[Language].announces.payingOfBills}</Table.Cell>
                    <Table.Cell>15 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>20 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>30 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="8">
                    <Table.Cell>{languages[Language].announces.emotionalSupport}</Table.Cell>
                    <Table.Cell>20 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>40 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>60 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="9">
                    <Table.Cell>{languages[Language].announces.physicalLabour}</Table.Cell>
                    <Table.Cell>40 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>60 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>80 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                  <Table.Row key="10">
                    <Table.Cell>{languages[Language].announces.hardWork}</Table.Cell>
                    <Table.Cell>40 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>60 {languages[Language].shop.points}</Table.Cell>
                    <Table.Cell>80 {languages[Language].shop.points}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Help;
