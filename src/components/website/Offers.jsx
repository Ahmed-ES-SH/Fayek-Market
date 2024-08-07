import { useVariabels } from "../../context/Variabel_conrexr";

const Offers = () => {
  const { Dark } = useVariabels();
  return (
    <div className={`bg-${Dark ? "dark" : "main"}`}>
      <div className="main-title p-3 w-[1100px] max-lg:w-fit m-auto max-lg:ml-0  ">
        <h1 className="p-1 rounded-md text-white  bg-secend w-fit">Offers</h1>
        <h1 className="text-[22px] text-blue-900">Best Values</h1>
      </div>
      <div className=" max-2xl:w-[1100px]  max-lg:w-full  m-auto relative flex flex-col items-center justify-center">
        <div className="images_offers w-full m-auto grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-2">
          <img
            className="rounded-lg max-sm:w-[100%] p-2 cursor-pointer "
            src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Foffer-1.jpg?alt=media&token=d5b654f4-e864-482d-ae8e-d124e4587a4d"
            alt=""
          />
          <img
            className="rounded-lg max-sm:w-[100%] p-2 cursor-pointer "
            src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Foffer-2.jpg?alt=media&token=cadc17e9-bde4-4a4e-9134-620afea0941f"
            alt=""
          />
          <img
            className="rounded-lg max-sm:w-[100%] p-2 cursor-pointer "
            src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Foffer-3.jpg?alt=media&token=a94d6d14-7647-4a22-bfae-003a40f511b3"
            alt=""
          />
          <div className="w-[1100px]   max-lg:hidden">
            <img
              className=" py-2 w-full rounded-xl cursor-pointer "
              src="https://firebasestorage.googleapis.com/v0/b/fayek-market.appspot.com/o/images%2Foffer-4.jpg?alt=media&token=344ad97f-6f14-4185-9d34-8c9b415498fd"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
