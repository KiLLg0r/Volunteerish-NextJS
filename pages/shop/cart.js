import { useAuth } from "../../context/AuthContext";
import { withProtected, withNavigation } from "../../utilities/routes";
import { Row, Grid, Col, Button, Image, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { BsChevronLeft, BsFillTrashFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowSize } from "../../utilities/hooks";
import { abbreviateNumber } from "../../utilities/functions";
import languages from "../../utilities/languages.json";
import Head from "next/head";
import {
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import styles from "../styles/Shop.module.scss";

const Cart = () => {
  const router = useRouter();
  const { userData, currentUser, Language } = useAuth();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const size = useWindowSize();
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  const decrease = async (id) => {
    const quantity = userData?.shop[id];
    const newQuantity = quantity - 1;
    const shop = userData?.shop;

    const userRef = doc(db, "users", currentUser.uid);

    if (newQuantity === 0) {
      delete shop[id];
      setProducts(products.filter((product) => product.id !== id));
    } else shop[id] = newQuantity;

    await updateDoc(userRef, {
      shop: shop,
    });
  };

  const deleteProduct = async (id) => {
    const shop = userData?.shop;
    const userRef = doc(db, "users", currentUser.uid);

    delete shop[id];
    setProducts(products.filter((product) => product.id !== id));

    await updateDoc(userRef, {
      shop: shop,
    });
  };

  const increase = async (id) => {
    const quantity = userData?.shop[id];
    const newQuantity = quantity + 1;
    const shop = userData?.shop;

    const userRef = doc(db, "users", currentUser.uid);
    shop[id] = newQuantity;

    await updateDoc(userRef, {
      shop: shop,
    });
  };

  useEffect(() => {
    let userProducts = [];

    if (products.length === 0)
      if (userData?.shop !== null && userData?.shop !== undefined) {
        const productsIDs = Object.keys(userData?.shop);
        productsIDs.forEach(async (productID) => {
          const productRef = doc(db, "shop", productID);
          const productSnap = await getDoc(productRef);

          const newProduct = { id: productID, data: productSnap.data() };
          userProducts.push(newProduct);
        });
        setTimeout(() => {
          if (userProducts.length > 0) setProducts(userProducts);
        }, 500);
      }
  }, [products, totalPrice, userData]);

  useEffect(() => {
    let price = 0;
    products.forEach((product) => {
      const newPrice = product?.data?.price * userData?.shop[product.id];
      price = price + newPrice;
    });
    if (price > 0) setTotalPrice(price);
  }, [products, userData]);

  useEffect(() => {
    let numberOfProducts = 0;
    if (products.length > 0) {
      products.forEach((product) => {
        const productNumbers = userData?.shop[product.id];
        numberOfProducts = numberOfProducts + productNumbers;
      });
      if (numberOfProducts > 0) setTotalProducts(numberOfProducts);
    }
  }, [products, userData]);

  const checkQuantity = () => {
    let enoughQuantity = true;

    products.forEach((product) => {
      const quantity = userData?.shop[product.id];
      const availableQuantity = product?.data?.quantity;
      if (quantity > availableQuantity) enoughQuantity = false;
    });

    return enoughQuantity;
  };

  const buyNow = async () => {
    const userRef = doc(db, "users", currentUser.uid);
    const purchasesRef = collection(userRef, "purchases");

    if (checkQuantity()) {
      await addDoc(purchasesRef, {
        time: serverTimestamp(),
        totalPrice: totalPrice,
        totalProducts: totalProducts,
        products: userData?.shop,
      });
      products.forEach(async (product) => {
        const productRef = doc(db, "shop", product.id);
        await updateDoc(productRef, {
          quantity: product.data().quantity - userData?.shop[product.id],
        });
      });
      await updateDoc(userRef, {
        shop: {},
      });
      router.push("/purchases");
    } else {
      setError(languages[Language].modal.cart.body);
      setErrorModal(true);
    }
  };

  return (
    <section>
      <Head>
        <title>
          {languages[Language].headTags.cart} | {languages[Language].headTags.title}
        </title>
      </Head>
      <Grid.Container gap={2}>
        <Grid xs={12}>
          <Button
            onPress={() => router.back()}
            color="error"
            light
            icon={<BsChevronLeft />}
            className={styles.cartHeader}
            auto
          >
            {languages[Language].goBack}
          </Button>
        </Grid>
        <Grid xs={12}>
          <h2 className={styles.title}>{languages[Language].shop.cart.title}</h2>
        </Grid>
        <Grid xs={12} sm={8}>
          <Col>
            {products &&
              products.map((product) => {
                return (
                  <Row key={product.id} align="center" className={styles.userProduct}>
                    <Grid.Container gap={1}>
                      <Grid xs={4} sm={2}>
                        <Image
                          alt={product.data?.name}
                          src={product.data?.images[0]}
                          height={100}
                          width={100}
                          showSkeleton
                          maxDelay={5000}
                          objectFit="cover"
                        />
                      </Grid>
                      <Grid xs={8} sm={10}>
                        <Grid.Container gap={1}>
                          <Grid xs={12} sm>
                            <Row align="center">
                              <Col>
                                <Row>
                                  <Link href={`/shop/${product.id}`}>
                                    <a>
                                      <h4 style={{ cursor: "pointer", margin: "0" }}>{product.data?.name}</h4>
                                    </a>
                                  </Link>
                                </Row>
                                {size.width > 960 && (
                                  <Row className={styles.productDescription}>{product.data?.description}</Row>
                                )}
                              </Col>
                            </Row>
                          </Grid>
                          <Grid>
                            <Row align="center" gap={0.5} css={{ height: "100%" }}>
                              <Col>
                                <Button
                                  onPress={() => decrease(product.id)}
                                  auto
                                  bordered
                                  color="error"
                                  size={size.width < 800 ? "xs" : "sm"}
                                >
                                  -
                                </Button>
                              </Col>
                              <Col>
                                <Button disabled auto bordered size={size.width < 800 ? "xs" : "sm"}>
                                  {userData?.shop[product.id]}
                                </Button>
                              </Col>
                              <Col>
                                <Button
                                  onPress={() => increase(product.id)}
                                  auto
                                  bordered
                                  color="error"
                                  size={size.width < 800 ? "xs" : "sm"}
                                >
                                  +
                                </Button>
                              </Col>
                            </Row>
                          </Grid>
                          <Grid>
                            <Row align="center" css={{ height: "100%" }}>
                              {product.data?.price} {languages[Language].shop.points}
                            </Row>
                          </Grid>
                        </Grid.Container>
                      </Grid>
                      <Grid xs={12}>
                        <Row justify="flex-end">
                          <Button
                            color="error"
                            light
                            icon={<BsFillTrashFill />}
                            auto
                            onPress={() => deleteProduct(product.id)}
                          >
                            {languages[Language].shop.cart.deleteFromCart}
                          </Button>
                        </Row>
                      </Grid>
                    </Grid.Container>
                  </Row>
                );
              })}
          </Col>
        </Grid>
        <Grid xs={12} sm={4}>
          <div className={styles.rightMenu}>
            <Grid.Container>
              <Grid xs={12}>
                <h4 className={styles.title}>{languages[Language].shop.cart.order}</h4>
              </Grid>
              <Grid xs={12}>
                <h5>
                  {languages[Language].shop.cart.totalProducts}: {totalProducts}
                </h5>
              </Grid>
              <Grid xs={12}>
                <h5>
                  {languages[Language].shop.cart.totalPrice}: {totalPrice} {languages[Language].shop.points}
                </h5>
              </Grid>
              <Grid xs={12}>
                <h5>
                  {languages[Language].shop.cart.pointsAvailable}: {abbreviateNumber(userData?.points)}{" "}
                  {languages[Language].shop.points}
                </h5>
              </Grid>
              <Grid xs={12}>
                <Button
                  color="error"
                  auto
                  css={{ width: "100%" }}
                  disabled={userData?.points < totalPrice}
                  onPress={buyNow}
                >
                  {userData?.points < totalPrice
                    ? languages[Language].shop.cart.notEnoughPoints
                    : languages[Language].shop.cart.buyNow}
                </Button>
              </Grid>
            </Grid.Container>
          </div>
        </Grid>
      </Grid.Container>
      <Modal
        closeButton
        aria-labelledby="Not enough quantity"
        open={errorModal}
        onClose={() => setErrorModal(false)}
        blur
        css={{ backgroundColor: "var(--nextui-colors-background)" }}
      >
        <Modal.Header>
          <h3 style={{ color: "var(--nextui-colors-red500)" }}>{error}</h3>
        </Modal.Header>
        <Modal.Body>
          <h4 style={{ textAlign: "center" }}>{languages[Language].modal.cart.body2}</h4>
        </Modal.Body>
        <Modal.Footer>
          <Grid.Container gap={1}>
            <Grid xs>
              <Button auto color="error" onPress={() => setErrorModal(false)} css={{ width: "100%" }}>
                {languages[Language].modal.cart.cancel}
              </Button>
            </Grid>
          </Grid.Container>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default withProtected(withNavigation(Cart));
