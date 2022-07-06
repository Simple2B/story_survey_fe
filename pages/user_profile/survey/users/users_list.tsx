import React from "react";
import User from "../../../../components/UserProfile/User";
import UsersList from "../../../../components/UserProfile/UsersList/UsersList";


const UsersListPage = ({headerName}) => {
  // const { data: session } = useSession();
  return (
    <User title={'Survey List'} keywords={""} style={""} headerName={'Users List'}>
      <UsersList/>
    </User>
  )
}

export default UsersListPage;
