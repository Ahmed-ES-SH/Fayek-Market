/* eslint-disable react/prop-types */

import { Use_Date } from "../../context/Data_context";
import { useProducts_control } from "../../context/Products_control";
import { useVariabels } from "../../context/Variabel_conrexr";
import FormatCurrency from "./Format_Curreny";

const Orders = (props) => {
  const { open_close, increase_quantity, decrease_quantity, remove_from_cart } =
    useProducts_control();
  const { Dark } = useVariabels();
  const { images } = Use_Date();

  const orders_show = props.orders.map((item, key) => (
    <div key={key}>
      <div className="flex justify-between items-center relative p-2  ">
        <div className="">
          {images.map(
            (img, key) =>
              img.id === item.id && (
                <img width={"80px"} key={key} src={img.url} />
              )
          )}
        </div>
        <div>
          <h1>{item.title}</h1>
          <div className="flex w-[150px] mr-10 items-center h-[100px] justify-between">
            <div className="flex">
              <button
                onClick={() => decrease_quantity(item.id)}
                className="px-3 h-fit rounded-l-md text-center bg-slate-800 text-white"
              >
                -
              </button>
              <p className="px-3 text-center">{item.quantity}</p>
              <button
                onClick={() => increase_quantity(item.id)}
                className="px-3 h-fit rounded-r-md text-center bg-slate-800 text-white"
              >
                +
              </button>
            </div>
            <h1 className="p-3">
              {FormatCurrency(item.price * item.quantity)}
            </h1>
          </div>
        </div>
        <button
          onClick={() => remove_from_cart(item.id)}
          className=" absolute right-2 top-2 px-3 py-1 hover:bg-red-500 hover:border-white duration-300 rounded-md   border-2 border-gray-500"
        >
          -
        </button>
      </div>
    </div>
  ));
  return (
    <>
      <div
        style={{
          backgroundColor: Dark ? "#111" : "#eee",
          color: Dark ? "#999" : "black",
        }}
        className="parent     h-200vh  "
      >
        <div className="main-head h-[80px] flex items-center justify-between bg-slate-800 text-white">
          <div className="flex p-2 gap-2">
            <h1 className="">My Card</h1>
            <span className="text-sky-500">({props.orders.length}) item</span>
          </div>
          <div
            onClick={() => open_close()}
            className="px-4 mr-2 cursor-pointer  text-main text-center text-[25px] rounded-md"
          >
            x
          </div>
        </div>
        <div className="flex p-1 items-center justify-between">
          <h1>Gambo Super Market</h1>
          <h1 className="text-gray-500">
            {FormatCurrency(
              props.orders.reduce((total, cartItem) => {
                const item = props.products.find((i) => i?.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </h1>
        </div>
        <div className="flex p-1 items-center justify-between border-b-2 border-gray-400">
          <h1>Delivery Charges</h1>
          <h1 className="text-gray-500">1$</h1>
        </div>
        {orders_show}
        <div className="  w-full p-[40px] flex items-center justify-between font-bold text-2xl">
          <h1 className=" ">Total</h1>
          <div className="text-sky-500">
            {FormatCurrency(
              props.orders.reduce((total, cartItem) => {
                const item = props.products.find((i) => i?.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0) + 1
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-400 shadow-lg p-2 py-4 ">
          <div>
            <h1>have a promo code ?</h1>
          </div>
          <div>
            <button className="p-3 bg-sky-500 rounded-md text-white">
              proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
