import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/website/Home";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Users from "./pages/dashbord/Users";
import User from "./pages/dashbord/User";
import Add_user from "./pages/dashbord/Add_user";
import Categores from "./pages/dashbord/Categores";
import Add_category from "./pages/dashbord/Add_category";
import Categoy from "./pages/dashbord/Categoy";
import Products from "./pages/dashbord/Products";
import Add_product from "./pages/dashbord/Add_product";
import Product_page from "./pages/dashbord/Product_page";
import Dashbord from "./pages/dashbord/Dashbord";
import Slider_control from "./pages/dashbord/Slider_control";
import Page404 from "./pages/dashbord/Page_404";
import Item from "./pages/website/Item";
import RequireAuth from "./components/Reqired_auth";

const App = () => {
  return (
    <div>
      <Routes>
        {/*start auth pages*/}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/*End auth pages*/}
        {/**start dashbord pages */}
        {/*page 404 fon not found the page */}
        <Route path="/*" element={<Page404 />} />

        {/**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}

        <Route path="/dashbord" element={<Dashbord />}>
          <Route path="slidercontrol" element={<Slider_control />} />

          {/**start users pages */}
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<User />} />
          <Route path="user/add" element={<Add_user />} />

          {/**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
          {/**End users pages */}

          <Route path="categores" element={<Categores />} />
          <Route path="addcategory" element={<Add_category />} />
          <Route path="categores/:id" element={<Categoy />} />
          {/**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}
          {/**start products pages */}
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<Product_page />} />
          <Route path="addproduct" element={<Add_product />} />
        </Route>

        {/**End dashbord pages */}

        <Route path="/" element={<Home />} />
        <Route path="/:title" element={<Item />} />
      </Routes>
    </div>
  );
};

export default App;
