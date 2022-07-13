import React from "react";
import { useRouter } from "next/router";
import Survey from "../../components/Survey/Survey"


const SurveyPage = () => {
  const { asPath } = useRouter();
  let modifyPath = asPath.split("/");
  let surveyUUID = modifyPath[modifyPath.length - 1];

  // console.log("SurveyPage: surveyId ", surveyId);
 

  return  (
      <Survey surveyUUID={surveyUUID}></Survey>
  );
};

export default SurveyPage;