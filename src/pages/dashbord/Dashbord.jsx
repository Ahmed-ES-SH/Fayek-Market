import React from "react";
import { Outlet } from "react-router-dom";
import Top_bar from "./Top_bar";
import Side_bar from "./Side_bar";
import { useVariabels } from "../../context/Variabel_conrexr";

const Dashbord = () => {
  const { Dark } = useVariabels();
  return (
    <div
      className={`bg-${Dark ? "dark" : "white"} text-${
        Dark ? "white" : "black"
      }`}
    >
      <Top_bar />
      <div className="flex gap-1  ">
        <Side_bar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
