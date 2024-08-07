import { useRef, useState } from "react";

import { useFirebase_context } from "../../context/Firebase_Context";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../components/Firebase";
import { Use_Date } from "../../context/Data_context";

const Addproduct = () => {
  const { categores } = Use_Date();
  const { make_list } = useFirebase_context();
  const storge = getStorage(app);
  const [images, setimages] = useState([]);
  const [images_url, setimages_url] = useState([]);
  const [stop, setstop] = useState(false);
  const openfile = useRef(null);
  const [progress, setprogress] = useState(Number);
  const [form, setform] = useState({
    category: "select an option",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    id: "",
    rating: "0",
  });

  // categorys get and show

  // %%%%%%%%%%%%%%%%  Funcation %%%%%%%%%%%
  // Add product
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      await make_list("products_images", form.title, images_url);
      await make_list("products", form.title, form);
      window.location.pathname = "/dashbord/products";
    } catch (err) {
      console.log(err);
    }
  };

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
    setstop(true);
  };

  const handel_images = (e) => {
    const files = [...e.target.files];
    setimages(files);
    const promises = [];
    files.forEach((file) => {
      const storageRef = ref(storge, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress);
      });
      promises.push(
        uploadTask.then(() => {
          return getDownloadURL(storageRef).then((url) => {
            return {
              url: url,
              file_name: file.name,
              file_size: file.size,
              id: form.id,
            };
          });
        })
      );
    });

    Promise.all(promises)
      .then((urls) => {
        setimages_url(urls);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  // images get and show
  const imagesshow = images.map((img, key) => (
    <div key={key} className="mt-4 mb-1 ">
      <div className="flex justify-between items-center">
        <div className="flex">
          <img width={"130px"} src={URL.createObjectURL(img)} alt="img" />
          <p className=" self-end p-1">
            {(img.size / 1024).toFixed(2) > 1000
              ? (img.size / (1024 * 1024)).toFixed(2) + "MB"
              : (img.size / 1024).toFixed(2) + "KB"}
          </p>
        </div>

        <i
          onClick={() =>
            setimages((prev) => prev.filter((item) => item !== img))
          }
          className="p-3 fas fa-trash cursor-pointer rounded-lg bg-red-600 mr-2"
        ></i>
      </div>
      {progress > 0 && (
        <div className="progress w-full duration-300 rounded-lg bg-slate-400 h-[12px] mt-8 relative">
          <span
            style={{ width: `${progress.toFixed(0)}%` }}
            className={` absolute duration-300   h-[12px] rounded-lg bg-sky-500`}
          >
            <p className="w-[50px] h-[30px] text-center bg-black text-white absolute  right-0 -top-8 ">
              {progress.toFixed(0)}%
            </p>
          </span>
        </div>
      )}
    </div>
  ));
  //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
  const style = {
    input:
      " valid:outline-green-600 text-black h-fit border-gray-300 border p-3 mt-1 duration-300 w-full outline-yellow-500 rounded-md  bg-slate-300",
  };

  return (
    <>
      <div className="block">
        <form onSubmit={handelsubmit}>
          <label className="text-[20px]">category:</label>
          <select
            name="category"
            onChange={handelchange}
            placeholder="select catergory ... "
            value={form.category}
            className="w-full cursor-pointer rounded-md bg-sky-500 mt-1 p-3 outline-none"
          >
            <option disabled className="">
              select an option
            </option>
            {categores.map((cat, key) => (
              <option key={key}>{cat.name}</option>
            ))}
          </select>
          <div className="">
            <label className="text-[20px]">id:</label>
            <input
              name="id"
              type="number"
              value={form.id}
              placeholder="Enter id ...."
              onChange={handelchange}
              required
              disabled={!stop}
              style={{ backgroundColor: !stop ? "slategray" : "white" }}
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">title:</label>
            <input
              name="title"
              type="text"
              value={form.title}
              placeholder="Enter Your title ...."
              onChange={handelchange}
              required
              disabled={!stop}
              style={{ backgroundColor: !stop ? "slategray" : "white" }}
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">description:</label>
            <input
              name="description"
              type="text"
              value={form.description}
              placeholder="Enter Your description ...."
              onChange={handelchange}
              required
              disabled={!stop}
              style={{ backgroundColor: !stop ? "slategray" : "white" }}
              className={style.input}
            />
          </div>

          <div className="">
            <label className="text-[20px]">price:</label>
            <input
              name="price"
              type="text"
              value={form.price}
              placeholder="Enter Your price ...."
              onChange={handelchange}
              required
              disabled={!stop}
              style={{ backgroundColor: !stop ? "slategray" : "white" }}
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">discount:</label>
            <input
              name="discount"
              type="text"
              value={form.discount}
              placeholder="Enter Your discount ...."
              onChange={handelchange}
              required
              disabled={!stop}
              style={{ backgroundColor: !stop ? "slategray" : "white" }}
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">About:</label>
            <input
              name="About"
              type="text"
              value={form.About}
              placeholder="Enter Your About ...."
              onChange={handelchange}
              disabled={!stop}
              style={{ backgroundColor: !stop ? "slategray" : "white" }}
              className={style.input}
            />
          </div>
          {images.length >= 1 ? (
            <div>
              <div>{imagesshow}</div>
              <div
                className=" cursor-pointer p-3 rounded-md bg-sky-500 w-fit ml-auto"
                onClick={() => openfile.current.click()}
              >
                add more
              </div>
              <input
                hidden
                multiple
                ref={openfile}
                onChange={handel_images}
                type="file"
                disabled={!stop}
              />
            </div>
          ) : (
            <div>
              <input
                hidden
                multiple
                ref={openfile}
                onChange={handel_images}
                type="file"
                disabled={!stop}
              />
              <label>Chosse Your Photo:</label>
              <div
                style={{
                  filter: !stop && "grayscale(1)",
                  cursor: !stop ? "default" : "pointer",
                }}
                onClick={() => openfile.current.click()}
                className="h-[350px] cursor-pointer flex items-center duration-300 justify-center border-2 border-dashed border-gray-400 mt-2"
              >
                <img
                  className="w-[300px]"
                  src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Fupload.png?alt=media&token=cab919e8-cb29-40a3-871c-a412fabfc130"
                />
              </div>
            </div>
          )}

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

export default Addproduct;
