import React, { useState } from "react";
import ToggleSwitch from "../../../components/common/ToggleSwitchBtn/ToggleSwitchBtn";
import UserContainer from "../../../components/Containers/MainContainer/UserContainer";
import SurveyList from "../../../components/UserProfile/SurveyList/SurveyList";
import User from "../../../components/UserProfile/User";


const ProfileSurveyLists = ({headerName}) => {
  const [checked, setChecked] = useState(false);
  
  const handleChangeChecked = () => {
    setChecked(!checked);
  }

  return (
    <User title={'Survey List'} keywords={""} style={""} headerName={'Survey List'}>
      <div className="surveyListContainer">
        <ToggleSwitch checked={checked} onChange={handleChangeChecked} id={"SurveyList"}/>
        {
          !checked ? 
            <SurveyList />
            :
            <div>Table</div>
        }
        
        
      </div>
    </User>
  )
}

export default ProfileSurveyLists;