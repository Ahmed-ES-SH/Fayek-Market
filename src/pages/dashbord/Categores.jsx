import React, { useEffect, useState } from "react";
import Tabelshow from "../../components/dashbord/Tabel_show";
import { catsheaders } from "../../constants/opation";
import { Use_Date } from "../../context/Data_context";
import { useFirebase_context } from "../../context/Firebase_Context";
import PaginatedItems from "../../components/dashbord/Pagenaton";

const Categores = () => {
  const { categores } = Use_Date();
  const { delete_doc } = useFirebase_context();

  const handel_delete = async (name) => {
    try {
      await delete_doc("categores", name);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Tabelshow
        data={categores}
        headers={catsheaders}
        delete={handel_delete}
        search_type="name"
      />
    </>
  );
};

export default Categores;
