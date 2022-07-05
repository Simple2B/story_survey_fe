import React from "react";
import { useRouter } from "next/router";
import Survey from "../../components/Survey/Survey"


const SurveyPage = () => {
  const { asPath } = useRouter();
  let modifyPath = asPath.split("/");
  let surveyId = modifyPath[modifyPath.length - 1];

  // console.log("SurveyPage: surveyId ", surveyId);
 

  return  (
      <Survey surveyId={surveyId}></Survey>
  );
};

export default SurveyPage;