// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

import cata1 from "../../../assets/home/slide1.jpg";
import cata2 from "../../../assets/home/slide2.jpg";
import cata3 from "../../../assets/home/slide3.jpg";
import cata4 from "../../../assets/home/slide4.jpg";
import cata5 from "../../../assets/home/slide5.jpg";
import SectionTItle from "../../../Components/SectionTItle/SectionTItle";

const Catagory = () => {
  return (
    <section className="my-24">
        <SectionTItle
        subHeading={'From 11.00am to 10.00pm'}
        heading={'ORDER ONLINE'}
        ></SectionTItle>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper my-24 w-3/4"
      >
        <SwiperSlide>
          <img src={cata1} alt="" />
          <h3 className="text-lg text-center uppercase -mt-16 text-white">
            salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={cata2} alt="" />
          <h3 className="text-lg text-center uppercase -mt-16 text-white">
            pizza
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={cata3} alt="" />
          <h3 className="text-lg text-center uppercase -mt-16 text-white">
            Shoup
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={cata4} alt="" />
          <h3 className="text-lg text-center uppercase -mt-16 text-white">
            cake
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={cata5} alt="" />
          <h3 className="text-lg text-center uppercase -mt-16 text-white">
            salads
          </h3>
        </SwiperSlide>
        <SwiperSlide>
          <img src={cata3} alt="" />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Catagory;
