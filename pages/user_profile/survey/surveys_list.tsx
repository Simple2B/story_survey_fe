import React from "react";
import UserContainer from "../../../components/Containers/MainContainer/UserContainer";
import SurveyList from "../../../components/UserProfile/SurveyList/SurveyList";
import User from "../../../components/UserProfile/User";


const ProfileSurveyLists = ({headerName}) => {
  // const { data: session } = useSession();
  return (
    <User title={'Survey List'} keywords={""} style={""} headerName={'Survey List'}>
      <SurveyList />
    </User>
  )
}

export default ProfileSurveyLists;