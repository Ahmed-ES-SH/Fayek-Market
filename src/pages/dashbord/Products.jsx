import React, { useEffect, useState } from "react";
import Tabelshow from "../../components/dashbord/Tabel_show";
import { productsheader } from "../../constants/opation";
import { useFirebase_context } from "../../context/Firebase_Context";
import Loading from "../../components/Loading";
import { Use_Date } from "../../context/Data_context";
import PaginatedItems from "../../components/dashbord/Pagenaton";

const Products = () => {
  const { products, images } = Use_Date();
  const { delete_doc } = useFirebase_context();
  const [loading, setloading] = useState(true);

  setInterval(() => {
    setloading(false);
  }, 1000);

  const handel_delete = async (name) => {
    try {
      await delete_doc("products", name);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Tabelshow
            images={images}
            data={products}
            headers={productsheader}
            delete={handel_delete}
            search_type="title"
          />
        </>
      )}
    </>
  );
};

export default Products;
