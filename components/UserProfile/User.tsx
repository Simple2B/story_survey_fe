import React, { useState } from "react";
import UserContainer from "../../components/Containers/MainContainer/UserContainer";


const User = ({children, title, keywords, style , headerName}) => {

  return (
    <UserContainer 
        title={'User Profile'} 
        keywords={""} 
        style={""} 
        headerName={headerName} 
      >
      {children}
    </UserContainer>
  )
}

export default User;
