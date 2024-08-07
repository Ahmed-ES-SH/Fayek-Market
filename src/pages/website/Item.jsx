import { useState } from "react";
import { useVariabels } from "../../context/Variabel_conrexr";
import { Use_Date } from "../../context/Data_context";
import Footer from "../../components/website/Footer";
import Products_slider from "./Products_slider";
import Navbar from "../../components/website/Navbar";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { useFirebase_context } from "../../context/Firebase_Context";
import Mini_slider from "../../components/website/Mini_slider";

const Item = () => {
  const { Dark } = useVariabels();
  const { images } = Use_Date();
  const { get_doc } = useFirebase_context();
  const [product, setproduct] = useState("");
  const [img_url, setimg_url] = useState("");
  const [number, setnumber] = useState(1);
  const [heart, setheart] = useState(false);
  const [loading, setLoading] = useState(false);
  const path = window.location.pathname.split("%20");
  const title = `${path[0].slice(1)} ${path[1]}`;
  console.log(title);

  useEffect(() => {
    const fetchData = async () => {
      const result_product = await get_doc("products", `${title}`, setproduct);

      const result_img = await get_doc(
        "products_images",
        `${title}`,
        setimg_url
      );
    };

    fetchData();
  }, []); // ضع الـ id هنا لتحديث البيانات عندما يتغير

  return loading ? (
    <Loading />
  ) : (
    <div
      className={`bg-${Dark ? "dark" : "main"} text-${Dark ? "#999" : "black"}`}
    >
      <Navbar />
      <div className="first-half">
        <div className="w-full py-3 bg-teal-900 text-white">
          <h1 className="pl-10">
            {product.category === 7 ? "vegtabels&friuts" : product.category} /{" "}
            {product.title}
          </h1>
        </div>
        <div
          style={{
            backgroundColor: Dark ? "#222" : "#eee",
            color: Dark ? "#999" : "black",
          }}
          className="product  mt-14 mb-10 p-2 roudned-md max-md:flex-col flex items-center gap-4 w-[1200px] max-md:w-full  m-auto"
        >
          <div className=" p-1 relative ">
            <img src={img_url[0]?.url} />
          </div>
          <div>
            <h1 className="font-bold text-[26px] mb-3">{product.title}</h1>
            <div className="flex items-center  gap-2">
              <h2 className="text-[13px]">
                product no.
                <a className="text-blue-500" href="#">
                  12345
                </a>
              </h2>
              <h2 className="text-[13px] flex">
                avaliable<span className="text-blue-500">(instock)</span>
              </h2>
            </div>
            {/*<Weight />*/}
            <p className="mt-3 text-[11px] w-full">{product.description}</p>
            <div
              style={{ backgroundColor: Dark ? "#333" : "#eee" }}
              className="price mt-2 px-2  py-3 rounded-md"
            >
              <div className="flex gap-6 items-center">
                <div className="text-blue-500 text-[20px]">
                  Discount Price
                  <span className="text-gray-400 px-2">
                    ${product.price}
                  </span>{" "}
                </div>
                -
                <div>
                  <strike className="text-center text-[20px]">
                    MRP Price
                    <span className="px-1 text-red-400">
                      ${product.discount}
                    </span>
                  </strike>
                </div>
              </div>
              <div className="flex mt-4">
                <button
                  onClick={() => number > 1 && setnumber((prev) => prev - 1)}
                  className="p-1 w-[75px] h-fit rounded-l-md text-center bg-slate-800 text-white"
                >
                  -
                </button>
                <p className="px-3 py-1 bg-white text-center">{number}</p>
                <button
                  onClick={() => setnumber((prev) => prev + 1)}
                  className="p-1 w-[75px] h-fit rounded-r-md text-center bg-slate-800 text-white"
                >
                  +
                </button>
                <div
                  onClick={() => setheart((prev) => !prev)}
                  style={{ backgroundColor: heart && "orange" }}
                  className="px-2 text-lg cursor-pointer duration-300 flex items-center justify-center ml-3 rounded-full bg-sky-200"
                >
                  {heart ? (
                    <i
                      style={{ color: heart ? "white" : "orange" }}
                      className="fa-solid fa-heart  duration-300 "
                    ></i>
                  ) : (
                    <i
                      style={{ color: heart ? "white" : "orange" }}
                      className="fa-regular fa-heart duration-500  "
                    ></i>
                  )}
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <button className="p-2 bg-sky-500 border border-sky-500 rounded-md text-white ">
                  <i className="fa-solid fa-cart-shopping p-1"></i>
                  Add to Card
                </button>
                <button className="p-2 text-sky-500  border border-sky-500 rounded-md hover:bg-sky-500 hover:text-white duration-300 ">
                  Order Now
                </button>
              </div>
            </div>
            <div
              style={{ backgroundColor: Dark ? "#333" : "#eee" }}
              className="after_price max-md:flex-col flex gap-2 items-center bg-[#eee] mt-8 p-2 rounded-md"
            >
              <div className="flex gap-4 border-l border-gray-300 px-3 items-center">
                <i className="fa-solid fa-sack-dollar text-[30px] text-red-400"></i>
                <div className="content  p-2 ">
                  <h1>Lowest Price Guaranteed</h1>
                  <p className="py-4 leading-10">
                    Get difference refunded if you find it cheaper anywhere else
                    .
                  </p>
                </div>
              </div>
              <div className="flex gap-4 border-l border-gray-300 px-3 items-center">
                <i className="fa-solid fa-cloud text-[30px] text-red-400"></i>

                <div className="content p-2 ">
                  <h1>Easy Returns & Refunds</h1>
                  <p className="py-4 leading-10">
                    Return products at doorstep and get refund in seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: Dark ? "#333" : "#eee" }}
        className="secend-half gap-2 relative pb-5 max-md:w-full max-md:flex-col flex justify-between items-center w-[1200px] m-auto"
      >
        <div
          style={{ backgroundColor: Dark ? "#333" : "#eee" }}
          className="  rounded-md max-md:w-full shadow-lg "
        >
          <Mini_slider />
        </div>
        <div className="right max-md:w-full rounded-md shadow-lg overflow-y-auto w-[800px]  leading-[50px] h-[400px]">
          <h1 className="font-bold text-[22px]   p-2 border-b border-gray-300">
            Product Details
          </h1>
          <p className="p-2">{product.description}</p>
          <p className="p-2">{product.About}</p>
        </div>
      </div>
      <div className="shadow-lg shadow-red">
        <Products_slider />
      </div>
      <Footer />
    </div>
  );
};

export default Item;
