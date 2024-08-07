import React, { useRef, useState } from "react";
import { useFirebase_context } from "../../context/Firebase_Context";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../components/Firebase";

const Add_category = () => {
  const { make_list } = useFirebase_context();
  const [images_url, setimages_url] = useState([]);
  const [form, setform] = useState({
    name: "",
    image: images_url,
    id: "",
  });
  const [image, setimage] = useState([]);
  const [progress, setprogress] = useState(Number);
  const openfile = useRef(null);
  const storge = getStorage(app);

  const handel_images = (e) => {
    const file = e.target.files[0];
    setimage([...e.target.files]);
    const storageRef = ref(storge, `images/${file.name}`);

    // تحقق مما إذا كان الملف موجودًا
    getDownloadURL(storageRef)
      .then((url) => {
        const imageInfo = {
          url: url,
          file_name: form.name,
          file_size: file.size,
        };
        setimages_url({ imageInfo });
        setform({ ...form, image: { imageInfo } }); // تحديث form.image
      })
      .catch((error) => {
        // إذا لم يكن الملف موجودًا، قم برفعه
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress);
        });
        uploadTask
          .then(() => {
            return getDownloadURL(storageRef).then((url) => {
              const imageInfo = {
                url: url,
                file_name: file.name,
                file_size: file.size,
                id: form.id,
              };
              setimages_url({ imageInfo });
              setform({ ...form, image: { imageInfo } }); // تحديث form.image
            });
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      });
  };

  const handelchange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      await make_list("categores", form.name, form);
      window.location.pathname = "/dashbord/categores";
    } catch (err) {
      console.log(err);
    }
  };

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

  const style = {
    input:
      " valid:outline-green-600 text-black h-fit border-gray-300 border p-3 mt-1 duration-300 w-full outline-red-500 rounded-md  bg-slate-300",
  };
  return (
    <>
      <div className="block">
        <form onSubmit={handelsubmit}>
          <div className="">
            <label className="text-[20px]">id:</label>
            <input
              type="number"
              name="id"
              placeholder="Enter Your id ...."
              onChange={handelchange}
              required
              className={style.input}
            />
          </div>
          <div className="">
            <label className="text-[20px]">Title:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your title ...."
              onChange={handelchange}
              required
              className={style.input}
            />
          </div>
          {image.length > 0 ? (
            imagesshow
          ) : (
            <div>
              <input
                hidden
                ref={openfile}
                name="image"
                onChange={handel_images}
                type="file"
              />
              <label>Chosse Your Photo:</label>
              <div
                onClick={() => openfile.current.click()}
                className="h-[350px] cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-400 mt-2"
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

export default Add_category;
