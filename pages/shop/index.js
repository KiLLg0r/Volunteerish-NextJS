import { withProtected, withNavigation } from "../../utilities/routes";
import { firebaseAdmin } from "../../config/firebaseAdmin";
import { Card, Row, Text, Grid, Col, Button, Spacer } from "@nextui-org/react";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";
import { db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import languages from "../../utilities/languages.json";
import styles from "../styles/Shop.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";

const Shop = ({ productsStringify }) => {
  const router = useRouter();

  const addToCart = async (id) => {
    const userRef = doc(db, "users", currentUser.uid);
    const shop = userData?.shop;
    if (shop[id]) shop[id] = shop[id] + 1;
    else shop[id] = 1;

    await updateDoc(userRef, {
      shop: shop,
    });

    router.push("/shop/cart");
  };

  const products = JSON.parse(productsStringify);
  const { currentUser, userData, Language } = useAuth();

  return (
    <section>
      <Head>
        <title>
          {languages[Language].headTags.shop} | {languages[Language].headTags.title}
        </title>
      </Head>
      <h2 className={styles.title}>{languages[Language].shop.title}</h2>
      <Grid.Container gap={2}>
        {products &&
          products.map((product) => {
            return (
              <Grid key={product.id} xs={6} sm={2}>
                <Card isPressable key={product.id}>
                  <Card.Body css={{ p: 0 }}>
                    <Link href={`/shop/${product.id}`}>
                      <a style={{ width: "100%" }}>
                        <Card.Image
                          src={product?.images[0]}
                          objectFit="cover"
                          width="100%"
                          height={140}
                          alt={product?.name[Language]}
                        />
                      </a>
                    </Link>
                  </Card.Body>
                  <Card.Footer css={{ justifyItems: "flex-start" }}>
                    <Col>
                      <Row>
                        <Text b css={{ height: "3rem", overflow: "hidden" }}>
                          {product?.name[Language]}
                        </Text>
                      </Row>
                      <Row justify="flex-end">
                        <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                          {product?.price} {languages[Language].shop.points}
                        </Text>
                      </Row>
                      <Spacer />
                      <Row>
                        <Button
                          auto
                          css={{ width: "100%" }}
                          color="error"
                          onPress={() => addToCart(product.id)}
                          size="sm"
                          disabled={product?.quantity <= 0}
                        >
                          {product?.quantity <= 0
                            ? languages[Language].shop.product.notInStock
                            : languages[Language].shop.addToCart}
                        </Button>
                      </Row>
                    </Col>
                  </Card.Footer>
                </Card>
              </Grid>
            );
          })}
      </Grid.Container>
      <Link href="/shop/cart">
        <a className={styles.cart}>
          <BsCart2 />
        </a>
      </Link>
    </section>
  );
};

export default withProtected(withNavigation(Shop));

export const getServerSideProps = async () => {
  const db = firebaseAdmin.firestore();

  let rawProducts = [];

  await db
    .collection("shop")
    .get()
    .then((snapshot) => {
      snapshot.forEach((product) => {
        rawProducts.push({
          ...product.data(),
          id: product.id,
        });
      });
    })
    .catch((error) => console.log(error));

  const productsStringify = JSON.stringify(rawProducts);

  return {
    props: {
      productsStringify,
    },
  };
};
