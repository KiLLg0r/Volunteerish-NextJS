import { db } from "../../config/firebase";
import { withProtected, withNavigation } from "../../utilities/routes";
import { Grid, Image, Col, Spacer, Row, Button, Collapse } from "@nextui-org/react";
import { BsChevronLeft } from "react-icons/bs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import languages from "../../utilities/languages.json";
import Head from "next/head";

import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

import styles from "../styles/Shop.module.scss";

const Product = ({ id, rawData }) => {
  const router = useRouter();
  const data = JSON.parse(rawData);
  const { userData, currentUser, Language } = useAuth();

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

  return (
    <section className={styles.productPage}>
      <Head>
        <title>
          {data?.name[Language]} | {languages[Language].headTags.title}
        </title>
      </Head>
      <Grid.Container gap={1}>
        <Grid xs={12}>
          <Button
            onPress={() => router.back()}
            color="error"
            light
            icon={<BsChevronLeft />}
            className={styles.productHeader}
            auto
          >
            {languages[Language].goBack}
          </Button>
        </Grid>
        <Grid xs={12}>
          <h2>{data?.name[Language]}</h2>
        </Grid>
        <Grid xs={12}>
          <h5 className={styles.productCode}>
            {languages[Language].shop.product.productCode}: {id}
          </h5>
        </Grid>
        <Grid xs={12}>
          <Grid.Container gap={2}>
            <Grid xs={12} sm={8}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {data.images &&
                  data.images.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          alt="Product image"
                          height={500}
                          width={500}
                          src={image}
                          objectFit="cover"
                          showSkeleton
                          maxDelay={5000}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </Grid>
            <Grid xs={12} sm={4}>
              <Col>
                <h3>{languages[Language].shop.product.price}</h3>
                <h2 style={{ color: "var(--nextui-colors-red500)" }}>
                  {data.price} {languages[Language].shop.points}
                </h2>
                <Spacer />

                <h3>{languages[Language].shop.product.inStock}</h3>
                <h5
                  style={{
                    color: data?.quantity > 0 ? "var(--nextui-colors-green700)" : "var(--nextui-colors-red500)",
                    fontStyle: "italic",
                  }}
                >
                  {data?.quantity > 0
                    ? languages[Language].shop.product.inStock
                    : languages[Language].shop.product.notInStock}
                </h5>
                <Spacer />
                <Button
                  color="error"
                  auto
                  css={{ width: "100%" }}
                  disabled={!data?.quantity > 0}
                  onPress={() => addToCart(id)}
                >
                  {!data?.quantity > 0
                    ? languages[Language].shop.product.notInStock
                    : languages[Language].shop.addToCart}
                </Button>
              </Col>
            </Grid>
          </Grid.Container>
        </Grid>
        <Grid xs={12}>
          <Collapse.Group css={{ width: "100%" }}>
            <Collapse shadow title={languages[Language].shop.product.description}>
              {data?.description[Language]}
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Grid.Container>
    </section>
  );
};

export default withProtected(withNavigation(Product));

export const getServerSideProps = async ({ params }) => {
  const productID = params.id;

  const productDoc = doc(db, "shop", productID);

  const productSnap = await getDoc(productDoc);
  const rawData = productSnap.data();

  return {
    props: {
      rawData: JSON.stringify(rawData),
      id: productID,
    },
  };
};
