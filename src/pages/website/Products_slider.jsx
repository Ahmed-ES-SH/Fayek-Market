import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Use_Date } from "../../context/Data_context";
import { useVariabels } from "../../context/Variabel_conrexr";
import Product_item from "./Product_item";

const Products_slider = () => {
  const { products } = Use_Date();
  const { width, Dark } = useVariabels();
  const sliderRef = useRef(null);
  const [Data, setData] = useState(true);

  setTimeout(() => {
    setData(false);
  }, 6000);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  function SamplePrevArrow() {
    return <div style={{ display: "none" }} />;
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: width > 1000 ? 4 : width < 992 ? (width < 600 ? 2 : 3) : 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <SamplePrevArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const slier_show = (
    <Slider ref={sliderRef} {...settings}>
      {products.map((item, key) => (
        <div
          key={key}
          className={`bg-${Dark ? "dark" : "main"} text-${
            Dark ? "white" : "black"
          }   shadow-sky-500   shadow-md border border-sky-500 h-[400px] max-sm:h-[330px] p-4 duration-300 cursor-pointer relative hover:-translate-y-4  items-start flex flex-col rounded-md  max-sm:w-[300px]`}
        >
          <Product_item {...item} />
        </div>
      ))}
    </Slider>
  );
  return (
    <div className={`bg-${Dark ? "dark" : "main"} `}>
      <div className="main-title p-3 w-full m-auto">
        <h1 className="p-1 rounded-md text-white  bg-sky-500 w-fit">For you</h1>
        <h1 className="text-[22px] text-blue-900">most orders </h1>
      </div>
      <div className="w-[1200px]  max-lg:w-full  shadow-lg rounded-md m-auto relative ">
        {slier_show}
        <button className="z-9999 p-3 max-md:hidden" onClick={nextSlide}>
          <i
            style={{
              backgroundColor: Dark ? "#111" : "#eee",
              color: Dark ? "#999" : "black",
              border: "1px solid #333",
            }}
            className="fa-solid fa-angle-right absolute top-[44%] -right-0 py-1 px-2 bg-white border border-gray-300"
          ></i>
        </button>

        {/* زر الرجوع */}
        <button className="z-9999 p-3 max-md:hidden" onClick={prevSlide}>
          <i
            style={{
              backgroundColor: Dark ? "#111" : "#eee",
              color: Dark ? "#999" : "black",
              border: "1px solid #333",
            }}
            className="fa-solid fa-angle-left absolute top-[44%] -left-0 py-1 px-2 bg-white border border-gray-300 "
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Products_slider;
