import React from "react";
import SectionDashboard from "../../../components/UserProfile/SectionDashboard/SectionDashboard";
import User from "../../../components/UserProfile/User";



const ProfileDashboards = ({children, title, keywords, style}) => {
  // const { data: session } = useSession();
  return (
    <User title={'Dashboard Surveys'} keywords={""} style={""} headerName={"Dashboard"}>
      <SectionDashboard/>
    </User>
  )
}

export default ProfileDashboards;