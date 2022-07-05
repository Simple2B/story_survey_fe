import React from "react";
import User from "../../../components/UserProfile/User";


const ProfileMessages = ({children, title, keywords, style}) => {
  // const { data: session } = useSession();
  return (
    <User title={'Messages Surveys'} keywords={""} style={""} headerName={"Messages"}>
      <div className={"styles.containerCentered"}>Messages</div>
    </User>
  )
}

export default ProfileMessages;