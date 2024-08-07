import { Link, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { useVariabels } from "../context/Variabel_conrexr";
import { useFirebase_context } from "../context/Firebase_Context";
const Signin = () => {
  const { Dark } = useVariabels();
  const { sign_in, update_profile, make_list, Auth } = useFirebase_context();

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const [err, seterr] = useState("");
  const [loading, setloading] = useState(false);

  const navegate = useNavigate();
  const cookie = Cookie();

  const Add_user_auto = () => {
    if (Auth.currentUser !== null) {
      const { displayName, email, accessToken, metadata, uid } =
        Auth.currentUser;
      const { createdAt, creationTime, lastLoginAt, lastSignInTime } = metadata;
      const form_send = {
        name: displayName,
        email: email,
        token: accessToken,
        createdAt: createdAt,
        creationTime: creationTime,
        lastLoginAt: lastLoginAt,
        lastSignInTime: lastSignInTime,
        id: uid,
        role: "user",
      };
      make_list("users", displayName, form_send);
      cookie.set("user", accessToken);
      console.log(form_send);
    }
  };

  const now = new Date();
  console.log(now.getMonth());

  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      await sign_in(form.email, form.password);
      Add_user_auto();

      navegate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full h-full ">
      <div className="absolute  -translate-x-1/2 -translate-y-1/2  top-[22%] left-[50%]">
        <img src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Flogo.png?alt=media&token=a2ce30c0-e78e-4a44-bc80-42abc8db331a" />
      </div>
      <div className="w-[500px] max-sm:w-full rounded-lg    absolute  -translate-x-1/2 -translate-y-1/2  top-[66%] left-[50%]">
        <h1 className="w-full text-white text-center rounded-t-lg  p-3 mt-4 text-[20px] bg-secend ">
          sign in
        </h1>
        <form onSubmit={handelsubmit}>
          <div className="flex flex-col items-center p-2 bg-main ">
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
              value={"Signin Now"}
            />
            {err && (
              <h1 className="w-full text-left bg-red-500 text-white p-2 mt-2">
                {err}
              </h1>
            )}
            <div className="w-full mt-2 flex justify-center items-center h-[60px] bg-secend  rounded-b-lg p-2">
              <h1 className="text-[18px] text-white">
                You dont have an account ?-
              </h1>
              <Link
                to="/signup"
                className="p-2 bg-black text-white rounded-lg ml-2 hover:bg-green-600 duration-300"
              >
                sign up Now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
