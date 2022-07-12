import React from "react";
import { useRouter } from "next/router";


const NotPublicSurveyPage = () => {
  const { asPath } = useRouter();
  let modifyPath = asPath.split("/");
  let surveyId = modifyPath[modifyPath.length - 1];

  // console.log("SurveyPage: surveyId ", surveyId);
 

  return  (
      <NotPublicSurvey surveyId={surveyId}/>
  );
};

export default NotPublicSurveyPage;