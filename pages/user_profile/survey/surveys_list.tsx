import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../../components/common/ToggleSwitchBtn/ToggleSwitchBtn";
import UserContainer from "../../../components/Containers/MainContainer/UserContainer";
import SurveyList from "../../../components/UserProfile/SurveyList/SurveyList";
import TableSurveyList from "../../../components/UserProfile/SurveyList/TableSurveyList";
import User from "../../../components/UserProfile/User";
import { IGetSurvey } from "../../../redux/types/surveyTypes";
import { surveyApi } from "../../api/backend/surveyInstance";


const ProfileSurveyLists = ({headerName}) => {
  const {data: session, status} = useSession();
  const [checked, setChecked] = useState(false);
  
  const handleChangeChecked = () => {
    setChecked(!checked);
  };

  const [userSurveys, setUserSurveys] = useState<IGetSurvey[]>([{
      id: 0,
      uuid: "",
      title: "",
      description: "",
      successful_message: "",
      created_at: "",
      user_id: 0,
      email: "",
      questions: [],
  }]);

    // TODO: create link for prod
    // process.env.COPY_LINK
    const link = 'http://localhost:3000';
    // const link = 'https://survey.simple2b.net';
    const [isCopied, setCopied] = useState<boolean>(false);

    const copyLink = (survey_id: number, title?: string) => {
        console.log("COPY  survey id", survey_id);
        const value = `${link}/survey/${survey_id}`
        navigator.clipboard.writeText(value).then(() => {
            alert(`Copied to clipboard link on ${title}`);
            setCopied(true);
        });
    };

    

  useEffect(() => {

    if (status === 'authenticated') {
        
        const email: string= session.user.email;

        const getListSurveys = async() => {
            const list = await surveyApi.getUserSurveys(email);
            setUserSurveys(list);
        }

        getListSurveys();
    }
  },[session]);

console.log(" ==>> ProfileSurveyLists: userSurveys", userSurveys);
console.log("ProfileSurveyLists: COPY_LINK =>", process.env.COPY_LINK);


  return (
    <User title={'Survey List'} keywords={""} style={""} headerName={'Survey List'}>
      <div className="surveyListContainer">
        <ToggleSwitch checked={ checked } onChange={ handleChangeChecked } id={"SurveyList"}/>
        {
          !checked ? 
            <SurveyList userSurveys={userSurveys} setUserSurveys={setUserSurveys} copyLink={copyLink} link={link}/>
            :
            <TableSurveyList userSurveys={userSurveys} setUserSurveys={setUserSurveys} copyLink={copyLink} link={link}/>
        }
      </div>
    </User>
  )
}

export default ProfileSurveyLists;