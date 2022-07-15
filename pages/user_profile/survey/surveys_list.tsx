import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ToggleSwitch from "../../../components/common/ToggleSwitchBtn/ToggleSwitchBtn";
import SurveyList from "../../../components/UserProfile/SurveyList/SurveyList";
import TableSurveyList from "../../../components/UserProfile/SurveyList/TableSurveyList";
import User from "../../../components/UserProfile/User";
import { IGetSurvey } from "../../../redux/types/surveyTypes";
import { surveyApi } from "../../api/backend/surveyInstance";


const ProfileSurveyLists = () => {
  const {data: session, status} = useSession();
  const {push, asPath} = useRouter();
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
  // const link = 'http://localhost:3000';
  const link = 'https://survey.simple2b.net';
  const [isCopiedLink, setCopiedLink] = useState({
    isCopied: false,
    surveyUUID: "",
  });

  if (isCopiedLink.isCopied) {
      setTimeout(() => {
          setCopiedLink({
              isCopied: false,
              surveyUUID: "",
          });
      }, 500);
  };

  const copyLink = (survey_id?: string, title?: string, isPublic?: boolean) => {
      console.log("COPY  survey id", survey_id);
      let value = `${link}/survey/${survey_id}`;
        if (!isCopiedLink) {
            value = `${link}/survey/not_public/${survey_id}`;
        }
      navigator.clipboard.writeText(value).then(() => {
        setCopiedLink({
          isCopied: true,
          surveyUUID: survey_id,
      });
    });
  };

  useEffect(() => {
    if (status === 'unauthenticated' && asPath.includes('/user_profile')) push("/");
    if (status === 'authenticated') {
        const email: string= session.user.email;
        const getListSurveys = async() => {
            const list = await surveyApi.getUserSurveys(email);
            setUserSurveys(list);
        }
        getListSurveys();
    }
    
  },[session]);

  console.log(" status", status);
  

  return (
    <User title={'Survey List'} keywords={""} style={""} headerName={'Survey List'}>
      <div className="surveyListContainer">
        <ToggleSwitch 
          checked={ checked } 
          onChange={ handleChangeChecked } 
          id={"SurveyList"}
        />
        {
          !checked ? 
            <SurveyList 
              userSurveys={userSurveys} 
              setUserSurveys={setUserSurveys} 
              copyLink={copyLink} 
              isCopiedLink={isCopiedLink}
              link={link}
            />
            :
            <TableSurveyList 
              userSurveys={userSurveys} 
              setUserSurveys={setUserSurveys} 
              copyLink={copyLink} 
              isCopiedLink={isCopiedLink}
              link={link}
            />
        }
      </div>
    </User>
  )
}

export default ProfileSurveyLists;
