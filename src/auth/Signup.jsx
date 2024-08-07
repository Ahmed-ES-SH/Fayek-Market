import { Link, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useState } from "react";
import { useVariabels } from "../context/Variabel_conrexr";
import { useFirebase_context } from "../context/Firebase_Context";
import Loading from "../components/Loading";

const Signup = () => {
  const { Dark } = useVariabels();
  const { sign_up, update_profile, Auth } = useFirebase_context();
  const [user, setuser] = useState("");
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, seterr] = useState("");
  const [loading, setloading] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const cookie = Cookie();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      await sign_up(form.email, form.password, setuser, seterr);
      await cookie.set("user", Auth.currentUser.accessToken);
      setTimeout(() => {
        update_profile(form.name);
      }, 2000);
      navigate("/signin");
      setloading(false);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
      setloading(false); // Reset submit state
    }
  };

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  switch (err) {
    case "Firebase: Error (auth/email-already-in-use).":
      seterr("Email is already taken");
      break;
  }

  console.log(user);

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-full  ">
      <div className="absolute  -translate-x-1/2 -translate-y-1/2  top-[20%] left-[50%]">
        <img src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Flogo.png?alt=media&token=a2ce30c0-e78e-4a44-bc80-42abc8db331a" />
      </div>
      <div className="w-[500px] max-sm:w-full rounded-lg    absolute  -translate-x-1/2 -translate-y-1/2  top-[70%] left-[50%]">
        <h1 className="w-full text-white text-center rounded-t-lg  p-3 mt-4 text-[20px] bg-secend ">
          sign Up
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center p-2 bg-main ">
            <div className="flex flex-col items-start w-full">
              <label className=" tracking-[2px] p-1 ">Name:</label>
              <input
                name="name"
                type="text"
                value={form.name}
                placeholder="Enter Your Name ...."
                onChange={handelchange}
                required
                className=" valid:outline-green-600   p-3 mt-3 duration-300 w-full outline-red-500 rounded-md  "
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className=" tracking-[2px] p-1 ">Email:</label>
              <input
                name="email"
                type="Email"
                value={form.email}
                placeholder="Enter Your email ...."
                onChange={handelchange}
                required
                className=" valid:outline-green-600   p-3 mt-3 duration-300 w-full outline-red-500 rounded-md  "
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label className=" tracking-[2px] p-1 ">password:</label>
              <input
                name="password"
                type="password"
                value={form.password}
                placeholder="Enter Your password ...."
                onChange={handelchange}
                required
                className=" valid:outline-green-600   p-3 mt-3 duration-300 w-full outline-red-500 rounded-md"
              />
            </div>

            <input
              className=" py-3 w-full text-white  rounded-md mt-3 bg-secend duration-300 hover:bg-orange-300 cursor-pointer"
              type="submit"
              value={"Signup Now"}
            />
            {err && (
              <h1 className="w-full text-left bg-red-500 text-white p-2 mt-2">
                {err}
              </h1>
            )}
            <div className="w-full mt-2 flex justify-center items-center h-[60px] bg-secend  rounded-b-lg p-2">
              <h1 className="text-[18px] text-white">i have an account ?-</h1>
              <Link
                to="/signin"
                className="p-2 bg-black text-white rounded-lg ml-2 hover:bg-green-600 duration-300"
              >
                sign in Now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
