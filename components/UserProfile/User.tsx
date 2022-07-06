import React, { useState } from "react";
import UserContainer from "../../components/Containers/MainContainer/UserContainer";
// import UserProfile from "../../components/UserProfile/UserProfile";


const User = ({children, title, keywords, style , headerName}) => {
  // const { data: session } = useSession();
  // const [isActive, setActive] = useState(false);
  return (
    <UserContainer 
        title={'User Profile'} 
        keywords={""} 
        style={""} 
        // setActive={setActive}
        headerName={headerName} 
        // isActive={isActive}
      >
      {children}
    </UserContainer>
  )
}

export default User;
