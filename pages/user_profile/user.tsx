import React from "react";
import MainContainer from "../../components/Containers/MainContainer/MainContainer";
import UserProfile from "../../components/UserProfile/UserProfile";


const User = () => {
  // const { data: session } = useSession();
  return (
    <MainContainer title={'User Profile'} keywords={""} style={""}>
      <UserProfile/>
    </MainContainer>
  )
}

export default User;