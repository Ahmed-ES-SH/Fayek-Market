import { useState } from "react";
import { Link } from "react-router-dom";
import MobailSaidbar from "./MobailSaidbar";
import { useVariabels } from "../../context/Variabel_conrexr";
import { Dropdown } from "../Dropdown";
import { Opationblog, Opationpages, mainopatio } from "../../constants/opation";
import Catergores_page from "./Catergores_page";
import { useFirebase_context } from "../../context/Firebase_Context";
import { useProducts_control } from "../../context/Products_control";

const Navbar = () => {
  const {
    openmain,
    setopenmain,
    blogopen,
    setblogopen,
    setpagesopen,
    pagesopen,
    opencat,
    setopencat,
    openmenue,
    setopenmenue,
    Dark,
  } = useVariabels();
  const { open_close } = useProducts_control();

  const [search, setsearch] = useState("");
  const [products, setproducts] = useState([]);

  return (
    <div
      className={`${Dark ? "bg-dark" : "bg-main"} ${
        Dark ? "text-white" : "text-black"
      }`}
    >
      {opencat && <Catergores_page />}
      <div
        style={{
          left: openmenue ? "0" : "-100%",
        }}
        className=" absolute  w-full z-[99999] duration-300"
      >
        {openmenue && <MobailSaidbar />}
      </div>

      <div className="first-half  border-b h-[80px]  flex justify-between items-center p-2">
        <div className="left-el flex items-center">
          <div
            className={`w-[100px] overflow-hidden   ${Dark && ""} ${
              Dark && ""
            } `}
          >
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Flogo.png?alt=media&token=a2ce30c0-e78e-4a44-bc80-42abc8db331a"
                alt=""
              />
            </Link>
          </div>
          <div className=" relative max-sm:hidden max-lg:hidden">
            <input
              type="search"
              name="search"
              style={{
                backgroundColor: Dark ? "#333" : "#eee",
                color: Dark ? "#999" : "black",
              }}
              className="  outline-none  p-1 h-[40px]  w-[300px] max-sm:w-[120px] rounded-lg ml-2 placeholder:text-black "
              placeholder="search for products..."
              onChange={(e) => setsearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass absolute right-1 text-gray-400 top-[30%]"></i>
          </div>
        </div>

        {/** 

///////////// right elements /////////////////////////


 */}

        <div className="right-el  flex items-center">
          <div className=" max-sm:hidden max-lg:hidden flex items-center p-3 cursor-pointer hover:text-secend duration-200">
            <i className="fa-solid fa-phone p-2"></i>
            <p>1800-000-000</p>
          </div>
          <Link
            className="max-sm:hidden max-lg:hidden flex items-center p-3 cursor-pointer hover:text-secend duration-200"
            to=""
          >
            <i className="fa-solid fa-gift p-2"></i>
            offers
          </Link>
          <Link
            className="max-sm:hidden max-lg:hidden flex items-center p-3 cursor-pointer hover:text-secend duration-200"
            to=""
          >
            <i className="fa-regular fa-circle-question p-2"></i>
            Help
          </Link>
          <Link
            className=" w-[40px] text-red-400 h-[40px] p-3 rounded-full mr-2 cursor-pointer hover:bg-white duration-200 bg-third flex items-center justify-center"
            to=""
          >
            <i className="fa-regular fa-heart p-2 "></i>
          </Link>
          <div
            onClick={() => {
              setopenmain((prev) => !prev);
            }}
            style={{
              backgroundColor: Dark ? "#333" : "#eee",
              color: Dark ? "#999" : "black",
            }}
            className=" cursor-pointer max-sm:w-[60px] w-[150px] h-[40px] rounded-lg p-1 flex items-center justify-between  "
          >
            <Link className="flex items-center">
              <img className="w-[30px]  rounded-full " src="" alt="" />
            </Link>
            <p className="whitespace-nowrap max-sm:hidden">Ahmed</p>
            <i className="fa-solid fa-caret-down "></i>
          </div>
        </div>
      </div>
      {openmain && (
        <div className=" absolute w-[200px] right-1 top-16 text-left z-[999999999]">
          {<Dropdown log={true} opation={mainopatio} />}
        </div>
      )}

      {/** secend half from the top bar secation 

//////////////////////////////////
/////////////////////////////////
//////secend half/////////////
*/}

      <div className="secend-half     flex justify-between items-center">
        <div className="nav-bar   flex items-center">
          <div
            onClick={() => setopencat((prev) => !prev)}
            className="select max-sm:hidden max-lg:hidden hover:bg-secend cursor-pointer py-4 duration-300 flex items-center pr-10 border-r-2 "
          >
            <i className="fa-solid fa-table p-2 "></i>
            select category
          </div>

          {/** 

start bares for the mobail

*/}

          <div
            onClick={() => setopenmenue((prev) => !prev)}
            className=" lg:hidden  text-[22px]  py-[13px] px-[15px] ml-[4px] bg-sky-500 rounded-md cursor-pointer  "
          >
            <i className="fa-solid fa-bars"></i>
          </div>

          {/** 

End bares for the mobail

*/}

          <ul className="flex max-lg:hidden max-sm:hidden">
            <li className="p-3 hover:text-secend duration-200 ">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3  hover:text-secend duration-200 ">
              <Link>New Products</Link>
            </li>
            <li className="p-3 hover:text-secend duration-200 ">
              <Link>Featured Products</Link>
            </li>
            <li
              onClick={() => {
                setblogopen((prev) => !prev), setpagesopen(false);
              }}
              className="p-3  "
            >
              <div className=" relative">
                <Link>
                  Blog
                  <i className="fa-solid fa-caret-down ml-2 "></i>
                  <div className=" absolute top-11 -left-1 z-40">
                    {blogopen && <Dropdown opation={Opationblog} />}
                  </div>
                </Link>
              </div>
            </li>
            <li
              onClick={() => {
                setpagesopen((prev) => !prev), setblogopen(false);
              }}
              className="p-3  duration-200 "
            >
              <div className=" relative">
                <Link>
                  Pages
                  <i className="fa-solid fa-caret-down ml-2 "></i>
                  <div className=" absolute top-11 -left-1 z-40">
                    {pagesopen && <Dropdown opation={Opationpages} />}
                  </div>
                </Link>
              </div>
            </li>
            <li className="p-3  hover:text-secend duration-200">
              <Link>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div
          onClick={() => open_close()}
          className="cart duration-300 w-[160px]  bg-secend text-center text-white cursor-pointer p-[20px] hover:bg-third"
        >
          <i className="fa-solid fa-cart-shopping p-1"></i>
          cart <i className="fa-solid fa-caret-down ml-2 "></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
