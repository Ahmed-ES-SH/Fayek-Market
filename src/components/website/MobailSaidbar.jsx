import { useState } from "react";
import { Link } from "react-router-dom";
import { Opationblog, Opationpages } from "../../constants/opation";
import { useVariabels } from "../../context/Variabel_conrexr";

const MobailSaidbar = () => {
  const { setopencat, setopenmenue, Dark } = useVariabels();
  const [openblog, setopenblog] = useState(false);
  const [openpages, setopenpages] = useState(false);
  const [search, setsearch] = useState("");

  return (
    <>
      <div
        className={`fixed w-full p-2 h-[600px] overflow-y-auto ${
          Dark ? "bg-dark" : "bg-white"
        }`}
      >
        <div className="flex justify-between items-center ">
          <div className=" bg-sky-500 rounded-full">
            <img
              width={"80px"}
              src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Flogo.png?alt=media&token=a2ce30c0-e78e-4a44-bc80-42abc8db331a"
            />
          </div>
          <button
            onClick={() => setopenmenue((prev) => !prev)}
            className="px-5 py-2 text-sky-400 rounded-lg text-[22px] bg-sky-400"
          >
            x
          </button>
        </div>
        <div className=" relative bg-sky-400 mt-3 rounded-lg ">
          <input
            type="search"
            name="search"
            className=" border outline-none border-sky-400 p-4 bg-sky-400  w-[300px] max-sm:w-[120px] rounded-lg ml-2 placeholder:text-black "
            placeholder="search for products..."
            onChange={(e) => setsearch(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute h-full p-5 rounded-r-lg bg-main text-black right-0  "></i>
        </div>
        <div>
          <div
            onClick={() => {
              setopencat((prev) => !prev);
            }}
            className="select m-auto bg-sky-500 rounded-lg mt-3 cursor-pointer py-4 duration-300 flex items-center w-full "
          >
            <div className="w-fit m-auto text-white">
              <i className="fa-solid fa-table p-2 "></i>
              select category
            </div>
          </div>
          <ul className="flex flex-col pt-3 justify-start ">
            <li className="p-3  hover:text-black hover:bg-sky-400 duration-200 ">
              <Link to="/">Home</Link>
            </li>
            <li className="p-3  hover:text-black hover:bg-sky-400 duration-200 ">
              <Link>New Products</Link>
            </li>
            <li className="p-3 hover:text-black hover:bg-sky-400 duration-200 ">
              <Link>Featured Products</Link>
            </li>
            <li
              onClick={() => {
                setopenblog((prev) => !prev), setopenpages(false);
              }}
              className="p-3 hover:bg-sky-400  "
            >
              <div className=" relative flex  justify-between items-center cursor-pointer">
                <Link className="hover:text-black">Blog</Link>
                <i className="fa-solid fa-caret-down ml-2 "></i>
              </div>
              {openblog && (
                <ul className="flex flex-col pt-2">
                  {Opationblog.map((title, key) => (
                    <Link
                      className="p-2 hover:text-black duration-300"
                      key={key}
                    >
                      {title.name}
                    </Link>
                  ))}
                </ul>
              )}
            </li>
            <li
              onClick={() => {
                setopenpages((prev) => !prev), setopenblog(false);
              }}
              className="p-3  hover:bg-sky-400  duration-200 "
            >
              <div className=" relative  flex justify-between items-center cursor-pointer">
                <Link className="">Pages</Link>
                <i className="fa-solid fa-caret-down ml-2 "></i>
              </div>
              {openpages && (
                <ul className="flex flex-col pt-2">
                  {Opationpages.map((title, key) => (
                    <Link
                      className="p-2 hover:text-black duration-300"
                      key={key}
                    >
                      {title.name}
                    </Link>
                  ))}
                </ul>
              )}
            </li>
            <li className="p-3 hover:bg-sky-400  hover:text-black duration-200 border-b-2 border-sky-400">
              <Link>Contact Us</Link>
            </li>
          </ul>
          <div className="  flex hover:bg-sky-400 items-center p-3 cursor-pointer hover:text-red-400 duration-200">
            <i className="fa-solid fa-phone p-2"></i>
            <p>1800-000-000</p>
          </div>
          <Link
            className=" flex hover:bg-sky-400 items-center p-3 cursor-pointer hover:text-red-400 duration-200"
            to=""
          >
            <i className="fa-solid fa-gift p-2"></i>
            offers
          </Link>
          <Link
            className=" flex hover:bg-sky-400 items-center p-3 cursor-pointer hover:text-red-400 duration-200"
            to=""
          >
            <i className="fa-regular fa-circle-question p-2"></i>
            Help
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobailSaidbar;
