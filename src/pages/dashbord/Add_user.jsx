import React, { useState } from "react";
import { useFirebase_context } from "../../context/Firebase_Context";

const Add_user = () => {
  const { sign_up, update_profile, make_list, Auth } = useFirebase_context();
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "select an option",
  });

  const Add_user_auto = async () => {
    try {
      if (Auth.currentUser !== null) {
        const { accessToken, metadata, uid } = Auth.currentUser;
        const { createdAt, creationTime, lastLoginAt, lastSignInTime } =
          metadata;
        const form_send = {
          name: form.name,
          email: form.email,
          token: accessToken,
          createdAt: createdAt,
          creationTime: creationTime,
          lastLoginAt: lastLoginAt,
          lastSignInTime: lastSignInTime,
          id: uid,
          role: form.role,
        };
        await make_list("users", form.name, form_send);
        window.location.pathname = "/dashbord/users";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      await sign_up(form.email, form.password);
      const update_name = setTimeout(() => {
        update_profile(form.name);
      }, 2000);
      clearTimeout(update_name);
      Add_user_auto();
    } catch (err) {
      console.log(err);
    }
  };

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const style = {
    input:
      " valid:outline-green-600 h-fit text-black border-gray-300 border p-3 mt-1 duration-300 w-full outline-red-500 rounded-md  bg-slate-300",
  };

  return (
    <>
      <div className="block">
        <form onSubmit={handelsubmit}>
          <div className="">
            <label className="text-[20px]">Name:</label>
            <input
              name="name"
              type="text"
              value={form.name}
              placeholder="Enter Your email ...."
              onChange={handelchange}
              required
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">Email:</label>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="Enter Your email ...."
              onChange={handelchange}
              required
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">password:</label>
            <input
              name="password"
              type="password"
              value={form.password}
              placeholder="Enter Your password ...."
              onChange={handelchange}
              required
              className={style.input}
            />
          </div>
          <select
            name="role"
            onChange={handelchange}
            value={form.role}
            className="w-full rounded-md bg-slate-300 mt-3 p-3 outline-none"
          >
            <option disabled className="text-white">
              select an option
            </option>
            <option value="user">user</option>
            <option value="Admin">Admin</option>
            <option value="writer">writer</option>
            <option value="product manger">product manger</option>
          </select>
          <input
            className="py-3 w-full text-white  rounded-md mt-3 bg-sky-500 duration-300 hover:bg-secend cursor-pointer"
            type="submit"
            value={"Add"}
          />
        </form>
      </div>
    </>
  );
};

export default Add_user;
