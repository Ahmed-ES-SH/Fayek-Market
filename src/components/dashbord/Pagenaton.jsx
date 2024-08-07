import { useState } from "react";
import ReactPaginate from "react-paginate";

function PaginatedItems({ data, itemsPerPage, setpage }) {
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => setpage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex items-center bg-sky-500 justify-end "
        pageClassName="mx-2 rounded-full text-center  bg-white leading-[30px] w-[30px] h-[30px]"
        pageLinkClassName="text-black "
        previousClassName="p-2 rounded-sm text-center bg-sky-300 text-black "
        nextClassName="p-2 text-black rounded-sm text-center bg-sky-300 self-start"
      />
    </>
  );
}

export default PaginatedItems;
