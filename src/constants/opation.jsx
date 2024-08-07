import { Link } from "react-router-dom";

export const Opationblog = [
  { name: "Our blog" },
  { name: "Our blog with sidebar" },
  { name: "Our blog with left sidebar" },
  { name: "Our blog with right sidebar" },
  { name: "blog details view" },
  { name: "blog details view width sidebar" },
];
export const Opationpages = [
  { name: "Acount" },
  { name: "About us" },
  { name: "online shop" },
  { name: "single product view" },
  { name: "Cheak out" },
  { name: "product request" },
  { name: "order placed" },
  { name: "Bil slip" },
  { name: "jop detail view" },
  { name: <Link to={"/signin"}>sign in</Link> },
  { name: <Link to={"/signup"}>sign up</Link> },
  { name: "forget password " },
];

export const mainopatio = [
  {
    name: <Link to="/dashbord">Dashbord</Link>,
    icon: <i className="fa-solid fa-table p-2 text-[14px]"></i>,
  },

  {
    name: "my orders",
    icon: <i className="fa-solid fa-cube p-2 text-[14px]"></i>,
  },

  {
    name: "my wishes",
    icon: <i className="fa-solid fa-heart p-2 text-[14px]"></i>,
  },
  {
    name: "my wailts",
    icon: <i className="fa-solid fa-dollar-sign p-2 text-[14px]"></i>,
  },
  {
    name: "my adress",
    icon: <i className="fa-solid fa-location-dot p-2 text-[14px]"></i>,
  },
  {
    name: "offers",
    icon: <i className="fa-solid fa-gift p-2 text-[14px]"></i>,
  },
  {
    name: "Help",
    icon: <i className="fa-solid fa-circle-question p-2 text-[14px]"></i>,
  },
];

export const categorys = [
  {
    title: "fruites and vegtabels",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-1.svg?alt=media&token=64e036e7-fbe6-4087-980b-f96bf92e1c34",
  },
  {
    title: "grocery and stapels",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-2.svg?alt=media&token=83bb40ff-9348-4536-a3de-3b09cd5735fd",
  },
  {
    title: "Dairy & Eggs",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-3.svg?alt=media&token=b301a9fa-cdfa-489b-8dfd-692432997942",
  },
  {
    title: "Beverages",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-4.svg?alt=media&token=de1d9d0e-55f5-45d8-8067-222660466c82",
  },
  {
    title: "snakes",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-5.svg?alt=media&token=fd166452-9d7e-47e0-83ce-7490a43fb7e2",
  },
  {
    title: "Home care",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-6.svg?alt=media&token=60e26de0-7816-4d3c-852a-625d1e9256bf",
  },
  {
    title: "Noodels & sausees",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-7.svg?alt=media&token=32b36b90-6d27-4b9c-a523-cc6dba752836",
  },
  {
    title: "personal care",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-8.svg?alt=media&token=0a947267-2905-4232-a0da-f7300beeb872",
  },
  {
    title: "pet care",
    icon: "https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Ficon-9.svg?alt=media&token=d2ae9b57-530f-4694-8f22-caf73a2760f4",
  },
];

export const NavLinks = [
  {
    link: "users",
    to: "users",
    icon: <i className="fa-solid fa-users p-3  text-[20px]"></i>,
  },
  {
    link: "Add user",
    to: "user/add",
    icon: <i className="fa-solid fa-user-plus p-3  text-[20px]"></i>,
  },
  {
    link: "categores",
    to: "categores",
    icon: <i className="fa-solid fa-cart-shopping p-3  text-[20px]"></i>,
  },
  {
    link: " Add categore",
    to: "addcategory",
    icon: <i className="fa-solid fa-cart-plus p-3  text-[20px]"></i>,
  },
  {
    link: " Products",
    to: "Products",
    icon: <i className="fa-solid fa-truck-fast p-3  text-[20px]"></i>,
  },
  {
    link: " Add Products",
    to: "addProduct",
    icon: <i className="fa-solid fa-plus p-3  text-[20px]"></i>,
  },
  {
    link: " Slider-control",
    to: "slidercontrol",
    icon: <i className="fa-solid fa-images p-3  text-[20px]"></i>,
  },
];

export const headerusers = [
  {
    key: "id",
    name: "id",
    icon: <i className="fa-solid fa-hashtag p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "name",
    name: "name",
    icon: <i className="fa-solid fa-user p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "email",
    name: "Email",
    icon: <i className="fa-solid fa-envelope p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "role",
    name: "role",
    icon: <i className="fa-solid fa-key p-1 mr-1  text-[14px]"></i>,
  },
];
export const catsheaders = [
  {
    key: "name",
    name: "name",
    icon: <i className="fa-solid fa-pen-clip p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "image",
    name: "Image",
    icon: <i className="fa-solid fa-envelope p-1 mr-1  text-[14px]"></i>,
  },
];

export const productsheader = [
  {
    key: "id",
    name: "id",
    icon: <i className="fa-solid fa-hashtag p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "title",
    name: "title",
    icon: <i className="fa-solid fa-user p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "images",
    name: "images",
    icon: <i className="fa-solid fa-envelope p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "price",
    name: "price",
    icon: <i className="fa-solid fa-key p-1 mr-1  text-[14px]"></i>,
  },
  {
    key: "rating",
    name: "rating",
    icon: <i className="fa-solid fa-key p-1 mr-1  text-[14px]"></i>,
  },
];

// Footer
