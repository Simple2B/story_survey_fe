import React from "react";
import { useRouter } from "next/router";
import NotPublicSurvey from "../../../components/Survey/NotPublicSurvey"

const NotPublicSurveyPage = () => {
  const { asPath } = useRouter();
  let modifyPath = asPath.split("/");
  let surveyUUID = modifyPath[modifyPath.length - 1];


  return  (
      <NotPublicSurvey surveyUUID={surveyUUID}/>
  );
};

export default NotPublicSurveyPage;