import { deleteUser } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Use_Date } from "../../context/Data_context";
import { useVariabels } from "../../context/Variabel_conrexr";
import { useFirebase_context } from "../../context/Firebase_Context";

const User = () => {
  const { Dark } = useVariabels();
  const { Auth } = useFirebase_context();
  const { users } = Use_Date();
  const [user_del, setuser_del] = useState({});
  const [form, setform] = useState({
    name: user_del.name,
    email: user_del.email,
    role: user_del.role,
  });

  console.log();
  const id = window.location.pathname.split("/")[3];

  const handel_change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    deleteUser(user_del).catch((err) => console.log(err));
  };
  useEffect(() => {
    users.map((user) => {
      if (user.data.id === id) {
        setuser_del(user.data);
      }
    });
  }, []);
  useEffect(() => {
    if (user_del) {
      setform({
        name: user_del.name,
        email: user_del.email,
        role: user_del.role,
      });
    }
  }, [users]);

  console.log(form);

  return (
    <>
      <div className={`block text-black`}>
        <form onSubmit={handelsubmit}>
          <div className="">
            <label className="text-[20px]">Name:</label>
            <input
              name="name"
              type="text"
              value={form.name}
              placeholder="Enter Your email ...."
              onChange={handel_change}
              required
              className=" valid:outline-green-600 h-fit border-gray-300 border p-3 mt-1 duration-300 w-full outline-red-500 rounded-md  bg-slate-300"
            />
          </div>
          <div className="">
            <label className="text-[20px]">Email:</label>
            <input
              name="email"
              type="email"
              value={form.email}
              placeholder="Enter Your email ...."
              onChange={handel_change}
              required
              className=" valid:outline-green-600 h-fit border-gray-300 border p-3 mt-1 duration-300 w-full outline-red-500 rounded-md  bg-slate-300"
            />
          </div>
          <select
            onChange={handel_change}
            name="role"
            value={form.role}
            className="w-full rounded-md bg-slate-500 mt-3 p-3 outline-none"
          >
            <option value="user">user</option>
            <option value="Admin">Admin</option>
            <option value="writer">writer</option>
            <option value="product manger">product manger</option>
          </select>
          <input
            className="py-3 w-full   rounded-md mt-3 bg-sky-500 duration-300 hover:bg-secend cursor-pointer"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default User;
