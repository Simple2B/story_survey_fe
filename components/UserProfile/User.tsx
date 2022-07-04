import React from "react";
import UserContainer from "../../components/Containers/MainContainer/UserContainer";
// import UserProfile from "../../components/UserProfile/UserProfile";


const User = ({children, title, keywords, style , headerName}) => {
  // const { data: session } = useSession();
  return (
    <UserContainer title={'User Profile'} keywords={""} style={""} headerName={headerName}>
      {children}
    </UserContainer>
  )
}

export default User;
