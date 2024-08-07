import React, { useState } from "react";
import { Use_Date } from "../../context/Data_context";
import Product_item from "./Product_item";
import Loading from "../../components/Loading";
import { useVariabels } from "../../context/Variabel_conrexr";
import { useProducts_control } from "../../context/Products_control";
import Orders from "./Oreders";
import { useEffect } from "react";

const Products_show = () => {
  // All the stats
  const { products } = Use_Date();
  const { Dark, width } = useVariabels();
  const { open_close, open, cartitems } = useProducts_control();
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    setTimeout(() => {
      setData(false);
    }, 6000);
  }, [products]); // ا

  // make products => show

  return loading ? (
    <Loading />
  ) : (
    <div className={`bg-${Dark ? "dark" : "main"}`}>
      <div className="main-title w-[1200px] max-lg:w-full m-auto p-3">
        <h1 className="p-1 rounded-md text-white bg-secend w-fit">For you</h1>
        <h1 className="text-[22px] text-blue-900">Top Featured Products </h1>
      </div>
      <div
        onClick={() => open_close}
        style={{
          right: open ? "0" : "-100%",
        }}
        className=" absolute top-[75px] z-[99999] duration-300"
      >
        <div
          style={{
            width: open ? (width > 500 ? "500px" : `${width - 1}px`) : "0px",
          }}
          className=""
        >
          {open && <Orders orders={cartitems} products={products} />}
        </div>
      </div>
      <div className="absolute top-[1px] z-[99999] duration-300"></div>
      <div className="  duration-300  ">
        <div className="parent-products p-4 w-[1200px] m-auto  max-lg:w-full ">
          {products.map((item) => (
            <div key={item.id}>
              <div
                className={`bg-${Dark ? "dark" : "main"} text-${
                  Dark ? "white" : "black"
                }   
                shadow-sky-500   shadow-md border border-sky-500 h-[420px] max-sm:h-[360px]  p-4 duration-300 cursor-pointer relative hover:-translate-y-4  items-start flex flex-col rounded-md w-[220px] max-sm:w-[250px]`}
              >
                <Product_item {...item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products_show;
