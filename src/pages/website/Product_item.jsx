/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { Use_Date } from "../../context/Data_context";
import { useProducts_control } from "../../context/Products_control";

const Product_item = ({ title, id, price, category }) => {
  const { images } = Use_Date();
  const {
    get_item_quantity,
    increase_quantity,
    decrease_quantity,
    setcartitems,
  } = useProducts_control();

  const quantity = get_item_quantity(id);
  return (
    <div className={`w-full  `}>
      <Link
        to={`/${title}`}
        onClick={() => window.location.pathname(`/${title}`)}
        className=""
      >
        <h1 className="p-3 text-[20px] self-end">{title}</h1>
        <div className="">
          {images.map(
            (img, key) =>
              img.id == id && (
                <div key={key} className="w-fit m-auto ">
                  <img className="rounded-md p-1" width="170px" src={img.url} />
                </div>
              )
          )}
        </div>
        <div className="flex justify-between pt-4  w-full ">
          <h2 className="py-1 bg-slate-800 text-white px-4 rounded-md">
            {price}
          </h2>
          <h1 className="text-[20px] self-start">:السعر</h1>
        </div>
        <span className=" max-sm:hidden p-3 mt-3">{category}</span>
      </Link>
      {quantity === 0 ? (
        <div className=" absolute bottom-3 right-3">
          <i
            onClick={() => {
              increase_quantity(id),
                setcartitems((prev) => [
                  ...prev,
                  { quantity: 1, title, price, category, id },
                ]);
            }}
            className="fa-solid fa-cart-plus p-3 text-gray-400  text-[20px] z-[9999]"
          ></i>
        </div>
      ) : (
        <div className=" flex p-1 absolute    justify-between items-baseline w-full  bottom-1 left-0">
          <div className="flex w-full">
            <button
              onClick={() => decrease_quantity(id)}
              className="p-1 w-[40%] h-fit rounded-l-md text-center bg-slate-800 text-white"
            >
              -
            </button>
            <p className="px-3 w-[20%] text-center">{quantity}</p>
            <button
              onClick={() => increase_quantity(id)}
              className="p-1 w-[40%] h-fit rounded-r-md text-center bg-slate-800 text-white"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product_item;
