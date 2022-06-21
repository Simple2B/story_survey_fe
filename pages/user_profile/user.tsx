import React from "react";
import UserContainer from "../../components/Containers/MainContainer/UserContainer";
import UserProfile from "../../components/UserProfile/UserProfile";


const User = () => {
  // const { data: session } = useSession();
  return (
    <UserContainer title={'User Profile'} keywords={""} style={""}>
      <UserProfile/>
    </UserContainer>
  )
}

export default User;