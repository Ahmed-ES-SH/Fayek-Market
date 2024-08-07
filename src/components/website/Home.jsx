import Slider_offers from "./Slider_offers";
import Categores_slider from "./Categores_slider";
import Offers from "./Offers";
import Navbar from "./Navbar";
import Products_show from "../../pages/website/Products_show";
import Products_slider from "../../pages/website/Products_slider";
import Footer from "./Footer";
import { useFirebase_context } from "../../context/Firebase_Context";

const Home = () => {
  const { Auth } = useFirebase_context();
  console.log(Auth.currentUser);
  return (
    <div>
      <Navbar />
      <Slider_offers />
      <Categores_slider />
      <Products_show />
      <Offers />
      <Products_slider />
      <Footer />
    </div>
  );
};

export default Home;
