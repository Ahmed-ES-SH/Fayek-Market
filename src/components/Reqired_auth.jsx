/* eslint-disable react/prop-types */
import Cookie from "cookie-universal";

import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading";
import Page404 from "../pages/dashbord/Page_404";
import { useFirebase_context } from "../context/Firebase_Context";

const RequireAuth = () => {
  const { Auth } = useFirebase_context();
  const cookie = Cookie();
  const token = cookie.get("user");
  const Admin = Auth.currentUser;
  console.log(Auth);
  return (
    <>
      {token ? (
        Admin === "" ? (
          <Loading />
        ) : Admin && Admin.email === "cxcxc@gmail.com" ? (
          <Outlet />
        ) : (
          <Page404 />
        )
      ) : (
        <Navigate to={"/signin"} replace={true} />
      )}
    </>
  );
};

export default RequireAuth;
