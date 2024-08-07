import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useVariabels } from "../../context/Variabel_conrexr";
import { Use_Date } from "../../context/Data_context";

const Slider_offers = () => {
  const { Dark, width } = useVariabels();
  const { slider_images } = Use_Date();
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: width < 1030 ? (width < 768 ? 1 : 2) : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <div className={`bg-${Dark ? "dark" : "main"} `}>
      <Slider {...settings}>
        {slider_images.map((item, index) => (
          <div key={index}>
            <div className="relative p-2  ">
              <div className=" bg-gradient-to-r from-white to-transparent w-full top-[10%] p-2 h-[120px]  absolute">
                <p className="text-red-400 py-1 text-[14px]">{item.discount}</p>
                <p className="text-[17px] py-1">{item.title}</p>
                <p className="text-gray-400 py-1">{item.category}</p>
              </div>
              <img className="rounded-lg w-full   h-[280px]" src={item.url} />
              <Link className=" absolute text-white bottom-4 white-space-nowrap py-2 px-8 bg-secend right-4 rounded-lg cursor-pointer">
                shop now
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slider_offers;
