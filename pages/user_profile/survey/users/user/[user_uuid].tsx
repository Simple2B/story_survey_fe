import React from "react";
import User from "../../../../../components/UserProfile/User";
import UserList from "../../../../../components/UserProfile/UsersList/UserList";


const UserListPage = ({headerName}) => {
  // const { data: session } = useSession();
  return (
    <User title={'User List'} keywords={""} style={""}  headerName={"User List"}>
      <UserList/>
    </User>
  )
}

export default UserListPage;
