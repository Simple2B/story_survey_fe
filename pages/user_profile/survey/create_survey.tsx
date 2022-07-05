import React from "react";
import CreateSurvey from "../../../components/UserProfile/CreateSurvey/CreateSurvey";
import User from "../../../components/UserProfile/User";



const ProfileSurveys = ({children, title, keywords, style}) => {
  // const { data: session } = useSession();
  return (
    <User title={'Create Surveys'} keywords={""} style={""} headerName={"Create Survey"}>
      <CreateSurvey/>
    </User>
  )
}

export default ProfileSurveys;