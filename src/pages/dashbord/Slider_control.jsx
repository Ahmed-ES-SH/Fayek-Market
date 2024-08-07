import { useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useFirebase_context } from "../../context/Firebase_Context";
import app from "../../components/Firebase";
import { Use_Date } from "../../context/Data_context";

const Slider_control = () => {
  const { make_list, delete_doc } = useFirebase_context();
  const { slider_images } = Use_Date();
  const storge = getStorage(app);
  const [form, setform] = useState({
    category: "select an option",
    title: "",
    discount: "",
    id: "",
  });
  const [image, setimage] = useState([]);
  const [del_title, setdel_title] = useState("");
  const [progress, setprogress] = useState(Number);
  const [images_url, setimages_url] = useState([]);
  const [Add, setAdd] = useState(false);
  const [deltee, setdeltee] = useState(false);
  const [show, setshow] = useState(true);
  const openfile = useRef(null);

  const style = {
    input:
      " valid:outline-green-600 text-black h-fit border-gray-300 border p-3 mt-1 duration-300 w-full outline-red-500 rounded-md  bg-slate-300",
  };

  const handel_images = (e) => {
    const files = [...e.target.files];
    setimage(files);
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
              file_name: form.title,
              file_size: file.size,
              id: form.id,
              category: form.category,
              discount: form.discount,
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

  const handel_add = async (e) => {
    e.preventDefault();
    try {
      await make_list("slider_images", form.title, images_url);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handel_change = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handel_delete = async (e) => {
    e.preventDefault();
    try {
      await delete_doc("slider_images", del_title);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // images get and show
  const imagesshow = image.map((img, key) => (
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
            setimage((prev) => prev.filter((item) => item !== img))
          }
          className="p-3 fas fa-trash cursor-pointer rounded-lg bg-red-600 mr-2"
        ></i>
      </div>
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
    </div>
  ));

  return (
    <>
      {show && (
        <div  className="flex justify-center items-center h-[70vh] "  > 
<div className="w-[500px] max-sm:w-fit h-[150px] m-auto     rounded-lg p-2 bg-[#222]   flex items-center justify-around gap-4">
          <div
            onClick={() => {
              setAdd(true), setshow(false);
            }}
            className="py-3 max-sm:px-8 cursor-pointer px-12 rounded-md ml-2 text-center text-white bg-green-400 "
          >
            Add
          </div>
          <div
            onClick={() => {
              setdeltee(true), setshow(false);
            }}
            className="py-3 max-sm:px-8 cursor-pointer px-12 rounded-md text-center text-white bg-red-500"
          >
            Delte
          </div>
        </div>

        </div>
      )}
      {Add && (
        <div className="block">
          <form onSubmit={handel_add}>
            <div className="">
              <label className="text-[20px]">Id:</label>
              <input
                type="number"
                name="id"
                placeholder="Enter Your id ...."
                onChange={handel_change}
                required
                className={style.input}
              />
            </div>
            <div className="">
              <label className="text-[20px]">title:</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Your title ...."
                onChange={handel_change}
                required
                className={style.input}
              />
            </div>
            <div className="">
              <label className="text-[20px]">category:</label>
              <input
                type="text"
                name="category"
                placeholder="Enter Your category ...."
                onChange={handel_change}
                required
                className={style.input}
              />
            </div>
            <div className="">
              <label className="text-[20px]">discount:</label>
              <input
                type="text"
                name="discount"
                placeholder="Enter Your discount ...."
                onChange={handel_change}
                required
                className={style.input}
              />
            </div>
            {image.length >= 1 ? (
              <div>
                <div>{imagesshow}</div>
                <div
                  className=" cursor-pointer p-3 rounded-md bg-sky-500 w-fit ml-auto"
                  onClick={() => openfile.current.click()}
                >
                  Change Photo
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
      )}
      {deltee && (
        <form onSubmit={handel_delete}>
          <div className="p-3 flex items-start flex-col">
            <label className="text-[20px]">Name offfer:</label>
            <select
              onChange={(e) => setdel_title(e.target.value)}
              className={style.input}
            >
              {slider_images.map((offer, key) => (
                <option value={offer.file_name} key={key}>
                  {offer.file_name}
                </option>
              ))}
            </select>
            <input
              className="py-3 w-full text-white  rounded-md mt-3 bg-transparent border duration-300 hover:bg-red-500 cursor-pointer"
              type="submit"
              value={"Delete"}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default Slider_control;
