import { withProtected, withNavigation } from "../../utilities/routes";
import languages from "../../utilities/languages";
import { useAuth } from "../../context/AuthContext";
import { Grid, Button, Row, Col, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";

import styles from "../styles/Shop.module.scss";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useWindowSize } from "../../utilities/hooks";
import Link from "next/link";

const Order = () => {
  const router = useRouter();
  const { currentUser, Language } = useAuth();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const size = useWindowSize();
  const [date, setDate] = useState("");

  useEffect(() => {
    let userProducts = [];

    const getOrder = async (id) => {
      const userRef = doc(db, "users", id);
      const orderRef = doc(userRef, "purchases", router.query.id);

      const orderData = await getDoc(orderRef);

      setOrder(orderData.data());
    };

    getOrder(currentUser.uid);

    if (products.length === 0)
      if (order?.products !== null && order?.products !== undefined) {
        const productsIDs = Object.keys(order?.products);
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
  }, [currentUser, order, products, router.query.id]);

  useEffect(() => {
    if (order) {
      const orderDate = new Date(order?.time?.seconds * 1000);
      const [minutes, hour, day, month, year] = [
        orderDate.getMinutes(),
        orderDate.getHours(),
        orderDate.getDate(),
        orderDate.getMonth(),
        orderDate.getFullYear(),
      ];

      const months = [
        languages[Language].months.january,
        languages[Language].months.february,
        languages[Language].months.march,
        languages[Language].months.april,
        languages[Language].months.may,
        languages[Language].months.june,
        languages[Language].months.july,
        languages[Language].months.august,
        languages[Language].months.september,
        languages[Language].months.october,
        languages[Language].months.november,
        languages[Language].months.december,
      ];

      setDate(`${day} ${months[month]} ${year}, ${hour < 10 ? "0" + hour : hour}:${minutes}`);
    }
  }, [Language, order]);

  return (
    <Grid.Container css={{ paddingTop: size.width > 650 ? "5rem" : "1rem" }} gap={1}>
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
        <h2 className={styles.title}>{languages[Language].orders.title}</h2>
      </Grid>
      <Grid xs={12} sm={4} className={styles.order}>
        <Col>
          <h4>
            {languages[Language].orders.orderTitle}: {router.query.id}
          </h4>
          <h5>
            {languages[Language].orders.placed}: {date}
          </h5>
          <h5>
            {languages[Language].orders.totalProducts}: {order?.totalProducts}
          </h5>
          <h5>
            {languages[Language].orders.totalPrice}: {order?.totalPrice} {languages[Language].shop.points}
          </h5>
        </Col>
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
                                    <h4 style={{ cursor: "pointer", margin: "0" }}>{product.data?.name[Language]}</h4>
                                  </a>
                                </Link>
                              </Row>
                              {size.width > 960 && (
                                <Row className={styles.productDescription}>{product.data?.description[Language]}</Row>
                              )}
                            </Col>
                          </Row>
                        </Grid>
                        <Grid>
                          <Row align="center" gap={0.5} css={{ height: "100%" }}>
                            <Col>
                              <Button disabled auto bordered size={size.width < 800 ? "xs" : "sm"}>
                                {order?.products[product.id]}{" "}
                                {order?.products[product.id] === 1
                                  ? languages[Language].orders.piece
                                  : languages[Language].orders.pieces}
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
                  </Grid.Container>
                </Row>
              );
            })}
        </Col>
      </Grid>
    </Grid.Container>
  );
};

export default withProtected(withNavigation(Order));
