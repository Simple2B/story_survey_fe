import React from "react";
import Setting from "../../../components/UserProfile/Setting/Setting";
import User from "../../../components/UserProfile/User";


const ProfileSetting = ({children, title, keywords, style, headerName}) => {
  // const { data: session } = useSession();
  return (
    <User title={'Setting Surveys'} keywords={""} style={""}  headerName={"Setting"}>
        <Setting/>
    </User>
  )
}

export default ProfileSetting;
