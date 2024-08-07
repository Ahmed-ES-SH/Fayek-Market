const Weight = () => {
  const active = (ele_id, className) => {
    var ele = document.getElementById(ele_id);
    var all_eles = document.querySelectorAll(".try");
    all_eles.forEach((el) => {
      el.classList.remove("bg-orange-500");
    });
    if (ele) {
      if (!ele.classList.contains(className)) {
        ele.classList.add(className);
      }
    }
  };

  return (
    <div className="flex weight items-center gap-2 pt-4">
      <span
        id="1"
        onClick={() => active("1", "bg-orange-500")}
        className="p-2 try border-2 border-orange-300 cursor-pointer    duration-300 rounded-sm  hover:bg-orange-500"
      >
        500g
      </span>
      <span
        id="2"
        onClick={() => active("2", "bg-orange-500")}
        className="p-2 try border-2 border-orange-300 cursor-pointer    duration-300 rounded-sm  hover:bg-orange-500"
      >
        1kg
      </span>
      <span
        id="3"
        onClick={() => active("3", "bg-orange-500")}
        className="p-2 try border-2 border-orange-300 cursor-pointer    duration-300 rounded-sm  hover:bg-orange-500"
      >
        2kg
      </span>
      <span
        id="4"
        onClick={() => active("4", "bg-orange-500")}
        className="p-2 try border-2 border-orange-300 cursor-pointer    duration-300 rounded-sm  hover:bg-orange-500"
      >
        3kg
      </span>
    </div>
  );
};

export default Weight;
