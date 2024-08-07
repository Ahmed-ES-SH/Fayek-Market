import React from "react";
import { NavLink } from "react-router-dom";
import { NavLinks } from "../../constants/opation";
import { useVariabels } from "../../context/Variabel_conrexr";

const Side_bar = () => {
  const { openmenue } = useVariabels();
  return (
    <div>
      <div
        style={{ width: openmenue ? "200px" : "fit-content" }}
        className="shadow-2xl h-screen  duration-300  "
      >
        {NavLinks.map((link, key) => (
          <NavLink
            className="p-1  rounded-sm flex items-center   justify-between hover:bg-sky-500 duration-300 w-full"
            key={key}
            to={link.to}
          >
            <h1
              style={{ display: openmenue ? "block" : "none" }}
              className=" duration-200 "
            >
              {link.link}
            </h1>
            <div>{link.icon}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Side_bar;
