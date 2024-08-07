import { categorys } from "../../constants/opation";
import { useVariabels } from "../../context/Variabel_conrexr";

const Catergores_page = () => {
  const { setopencat } = useVariabels();

  return (
    <>
      <div className="">
        <div className="w-full text-black   h-[100vh] bg-gradient-to-r from-third to-main z-50   absolute top-0">
          <div className="w-[500px] max-sm:w-[80%] max-sm:h-fit mx-auto relative mt-[8%] max-sm:mt-[25%] flex flex-wrap rounded-lg items-center justify-center h-[500px] bg-white z-[99] ">
            <button
              onClick={() => {
                setopencat((prev) => !prev);
              }}
              className="text-[32px]  absolute -top-9 -right-9  text-black z-[999] "
            >
              x
            </button>
            <h1 className=" w-full absolute top-0 p-2 rounded-t-md text-white text-[18px]  bg-[#0d1429]">
              select category
            </h1>
            {categorys.map((cat, key) => (
              <div key={key} className="mt-14">
                <div className="hover:bg-secend duration-200 cursor-pointer w-[150px] max-sm:w-[100px] flex flex-col items-center justify-center   h-[90px]  ">
                  <img width={"50px"} src={cat.icon} />
                  <h1 className=" whitespace-nowrap max-sm:hidden">
                    {cat.title}
                  </h1>
                </div>
              </div>
            ))}
            <div className="select w-full m-auto hover:text-secend  cursor-pointer py-4 duration-300 flex items-center pr-10  ">
              <h1 className="w-fit m-auto">
                <i className="fa-solid fa-table p-2 text-gray-400"></i>
                more category
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catergores_page;
