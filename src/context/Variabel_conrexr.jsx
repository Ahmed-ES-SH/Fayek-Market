import { useContext, createContext, useState, useEffect } from "react";

const variabels = createContext();

const Variabels_context = ({ children }) => {
  const inatial_state_mode = JSON.parse(window.localStorage.getItem("dark"));

  const [width, setwidth] = useState(window.innerWidth);
  const [openmain, setopenmain] = useState(false);
  const [blogopen, setblogopen] = useState(false);
  const [pagesopen, setpagesopen] = useState(false);
  const [openorder, setopenorder] = useState(false);
  const [opencat, setopencat] = useState(false);
  const [openmenue, setopenmenue] = useState(false);
  const [Dark, setDark] = useState(inatial_state_mode);

  useEffect(() => {
    window.addEventListener("resize", () => setwidth(window.innerWidth));
  }, [width]);

  return (
    <variabels.Provider
      value={{
        width,
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
        openorder,
        setopenorder,
        Dark,
        setDark,
      }}
    >
      {children}
    </variabels.Provider>
  );
};

export default Variabels_context;

export const useVariabels = () => {
  return useContext(variabels);
};
