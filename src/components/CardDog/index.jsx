import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import CardContent from "../CardContent";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import OptionMenu from "../../components/OptionMenu";
// import { Container } from './styles';

function CardDog(props) {


  return (
    <>
      <Header display={"true"} logo="none" background="white">
        <Logo margin={"none"} />
        <OptionMenu displayProfile="flex" />
      </Header>

      <Swiper
        spaceBetween={0.9}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <CardContent />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
export default CardDog;
