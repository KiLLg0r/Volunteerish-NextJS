import { withProtected, withNavigation } from "../../utilities/routes";
import languages from "../../utilities/languages";
import { useAuth } from "../../context/AuthContext";
import { Grid, Button, Row, Col } from "@nextui-org/react";
import { useRouter } from "next/router";
import { BsChevronLeft } from "react-icons/bs";

import styles from "../styles/Shop.module.scss";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import Link from "next/link";

export const Order = ({ order }) => {
  const { Language } = useAuth();
  const time = new Date(order.time.seconds * 1000);
  const [minutes, hour, day, month, year] = [
    time.getMinutes(),
    time.getHours(),
    time.getDate(),
    time.getMonth(),
    time.getFullYear(),
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

  const date = `${day} ${months[month]} ${year}, ${hour < 10 ? "0" + hour : hour}:${minutes}`;

  return (
    <Grid xs={12} key={order.id} className={styles.order}>
      <Grid.Container gap={1}>
        <Grid xs={12} sm>
          <Col>
            <Row>
              <h3>
                {languages[Language].orders.orderTitle}: {order.id}
              </h3>
            </Row>
            <Row>
              <h5>
                {languages[Language].orders.placed} {date}
              </h5>
            </Row>
          </Col>
        </Grid>
        <Grid xs={12} sm={3}>
          <Link href={`/purchases/${order.id}`}>
            <Button color="error">{languages[Language].orders.viewMore}</Button>
          </Link>
        </Grid>
      </Grid.Container>
    </Grid>
  );
};

export const Purchases = () => {
  const router = useRouter();
  const { currentUser, Language } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async (id) => {
      const userRef = doc(db, "users", id);
      const orderRef = collection(userRef, "purchases");

      const ordersSnap = await getDocs(orderRef);

      let purchases = [];

      ordersSnap.forEach((order) => {
        purchases.push({
          id: order.id,
          ...order.data(),
        });
      });

      if (purchases.length > 0) setOrders(purchases);
    };
    if (orders.length === 0) getOrders(currentUser.uid);
  }, [currentUser, orders]);

  return (
    <Grid.Container css={{ padding: "1rem" }}>
      {router.asPath === "/purchases" && (
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
      )}
      <Grid xs={12}>
        <h2 className={styles.title}>{languages[Language].orders.title}</h2>
      </Grid>
      {orders &&
        orders.map((order) => {
          return <Order order={order} key={order.id} />;
        })}
    </Grid.Container>
  );
};

export default withProtected(withNavigation(Purchases));
