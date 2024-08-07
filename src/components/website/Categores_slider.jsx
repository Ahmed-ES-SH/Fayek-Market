import React from "react";
import Slider from "react-slick";
import { useVariabels } from "../../context/Variabel_conrexr";
import { categorys } from "../../constants/opation";

const Categores_slider = () => {
  const { Dark, width } = useVariabels();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: width < 1050 ? (width < 768 ? 3 : 4) : 6,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className={`bg-${Dark ? "dark" : "main"}`}>
      <div className={` w-[1100px] max-lg:w-full   m-auto py-16`}>
        <h1 className="p-1 rounded-md text-white  bg-secend w-fit">shop by</h1>
        <h1 className="text-[22px] text-blue-900">categorys </h1>
        <Slider {...settings}>
          {categorys.map((item, index) => (
            <div className={` p-1 pt-2 z-[333] w-fit`} key={index}>
              <div
                className={` p-1 bg-${
                  Dark ? "third" : "secend"
                } cursor-pointer   h-[160px]  flex flex-col items-center justify-center    rounded-md`}
              >
                <img
                  className="block"
                  width={"50px"}
                  src={item.icon}
                  alt={item.title}
                />
                <h1 className=" whitespace-nowrap max-md:text-[12px] mt-2 block">
                  {item.title}
                </h1>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Categores_slider;
