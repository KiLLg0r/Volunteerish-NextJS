import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper";
import { Grid, Button } from "@nextui-org/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import styles from "./styles/CreateNewAccount.module.scss";
import { useRef, useState } from "react";

const CreateNewAccount = () => {
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  return (
    <Swiper
      allowTouchMove={false}
      spaceBetween={30}
      effect={"fade"}
      modules={[Navigation, EffectFade]}
      navigation={{
        nextEl: nextButtonRef.current,
        prevEl: prevButtonRef.current,
      }}
      onBeforeInit={(swiper) => {
        swiper.params.navigation.prevEl = prevButtonRef.current;
        swiper.params.navigation.nextEl = nextButtonRef.current;
      }}
      onActiveIndexChange={(swiper) => {
        console.log(swiper.activeIndex);
        if (swiper.activeIndex === 0) setShowPrevButton(false);
        if (swiper.activeIndex === 8) setShowNextButton(false);
        if (swiper.activeIndex !== 0 && swiper.activeIndex !== 8) {
          setShowPrevButton(true);
          setShowNextButton(true);
        }
      }}
      className={styles.createNewAccountSwiper}
    >
      <SwiperSlide style={{ backgroundColor: "red" }}>Slide 1</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "blue" }}>Slide 2</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "pink" }}>Slide 3</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "yellow" }}>Slide 4</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "white" }}>Slide 5</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "green" }}>Slide 6</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "gray" }}>Slide 7</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "coral" }}>Slide 8</SwiperSlide>
      <SwiperSlide style={{ backgroundColor: "purple" }}>Slide 9</SwiperSlide>
      <Grid.Container gap={1} className={styles.swiperBtns}>
        <Grid xs={12} sm={6}>
          <Button bordered color="error" auto css={{ width: "100%" }} ref={prevButtonRef} disabled={!showPrevButton}>
            Previous step
          </Button>
        </Grid>
        <Grid xs={12} sm={6}>
          <Button color="error" auto css={{ width: "100%" }} ref={nextButtonRef} disabled={!showNextButton}>
            Next step
          </Button>
        </Grid>
      </Grid.Container>
    </Swiper>
  );
};

export default CreateNewAccount;
