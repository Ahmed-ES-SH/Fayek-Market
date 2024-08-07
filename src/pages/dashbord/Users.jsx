import Tabelshow from "../../components/dashbord/Tabel_show";
import { headerusers } from "../../constants/opation";
import { Use_Date } from "../../context/Data_context";
import { useFirebase_context } from "../../context/Firebase_Context";

const Users = () => {
  const { users } = Use_Date();
  const { delete_doc, Auth } = useFirebase_context();

  const uniqUsers = [];

  users.map((user) => {
    uniqUsers.push(user.data);
  });

  const handel_delete = async (name) => {
    try {
      await delete_doc("users", name);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(Auth.currentUser);

  return (
    <div>
      <Tabelshow
        data={uniqUsers}
        headers={headerusers}
        delete={handel_delete}
        search_type="name"
      />
    </div>
  );
};

export default Users;
