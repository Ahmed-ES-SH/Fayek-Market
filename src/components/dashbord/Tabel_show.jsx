/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useVariabels } from "../../context/Variabel_conrexr";
import { useFirebase_context } from "../../context/Firebase_Context";
import { useState } from "react";
import PaginatedItems from "./Pagenaton";

const Tabelshow = (props) => {
  const { Dark, openorder } = useVariabels();
  const { Auth } = useFirebase_context();

  //states

  const [search, setsearch] = useState("");

  // data
  const images = props.images;
  const currentuser = Auth.currentUser || { name: "" };
  const main_data = props.data || [];

  const filter_data_ny_name =
    search.length > 0 &&
    main_data.filter((item) =>
      item[props.search_type].toLowerCase().includes(search.toLowerCase())
    );
  const data_map = search.length > 0 ? filter_data_ny_name : main_data;

  // maping

  const headersshow = props.headers.map((header, key) => (
    <th scope="col" className="px-6 py-3  " key={key}>
      {header.icon}
      {header.name}
    </th>
  ));

  const datashow = data_map.map((data, key) => (
    <tr className=" border-b  " key={key}>
      {props.headers.map((title, index) => (
        <td className="px-6 py-4  " key={index}>
          {title.key === "image" ? (
            <img width={"70px"} src={data[title.key].imageInfo.url} />
          ) : title.key === "images" ? (
            images.map(
              (img, key) =>
                img.id === data.id && (
                  <img
                    width={"70px"}
                    key={key}
                    src={img.url}
                    alt={data[title.key]}
                  />
                )
            )
          ) : title.key === "id" ? (
            key + 1
          ) : data[title.key] ? (
            currentuser && currentuser.displayName === data[title.key] ? (
              `${data.name} (You)`
            ) : (
              data[title.key]
            )
          ) : (
            data[title.key]
          )}
        </td>
      ))}
      <td className="px-6 py-4  ">
        {currentuser.displayName !== data.name && (
          <button>
            <i
              onClick={() => props.delete(data[props.search_type])}
              className="text-red-600 fas fa-trash p-1 "
            ></i>
          </button>
        )}
        {!openorder && (
          <Link to={`${data.id}`}>
            <i className="text-sky-600 fas fa-edit p-1"></i>
          </Link>
        )}
      </td>
    </tr>
  ));

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-1">
      <label className="w-full block py-2">Search by Name:</label>
      <input
        type="text"
        className=" text-black h-fit border-gray-300 border p-3 mt-1 duration-300 w-3/4 ml-2 outline-sky-500 rounded-md  bg-white"
        onChange={(e) => setsearch(e.target.value)}
      />
      <table
        className={`w-full mt-2 overflow-x-auto text-sm text-left bg-${
          Dark ? "dark" : "white"
        } text-${Dark ? "white" : "black"}  `}
      >
        <thead className="text-xs border-b border-gray-200 uppercase ">
          <tr className="">
            {headersshow}
            <th scope="col" className="px-6 py-3  ">
              <i className="fa-solid fa-wand-magic-sparkles p-1 mr-1  text-[14px]"></i>
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {main_data.length === 0 ? (
            <tr>
              <td colSpan={12} className="text-center h-[60px]">
                Loading...
              </td>
            </tr>
          ) : (
            datashow
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tabelshow;
