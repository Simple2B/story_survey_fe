import React, { useEffect } from "react";
import styles from "./survey.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Wrapper from "../../components/common/Wrapper/Wrapper"
import { useState } from "react";
import { surveyApi } from "../../pages/api/backend/surveyInstance";

const Survey = ({surveyId}) => {
//   const { asPath } = useRouter();
//   let modifyPath = asPath.split("/");
//   let surveyId = modifyPath[modifyPath.length - 1];

  console.log("=>>> Survey: surveyId ", surveyId);
  const {push} = useRouter();
  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([{question: "", answer: "", email: ""}]);
  const [slide, setSlide] = useState(null);
  const [indexSurvey, setIndexSurvey] = useState(0);
  const [success, setSuccess] = useState(false);

    if (success === true) {
        setTimeout(() => {
            setSuccess(false);
            push('/');
        }, 2500)
    };

  const [survey, setSurvey] = useState({
      id: 0,
      uuid: "",
      title: "",
      description: "",
      created_at: "",
      user_id: 0,
      email: "",
      questions: [{question: "", id: 0, survey_id: 0}],
  });

  const [userSurveys, setUserSurveys] = useState({
    title: "",
    description: "",
    created_at: "",
    user_id: 0,
    email: "",
    questions: [],
});

  useEffect(() => {
    const getSurvey = async(id: string) => {
      const surveyFromDB = await surveyApi.getSurveyFromDB(id);
      setSurvey(surveyFromDB);
      console.log("=> surveyFromDB ", surveyFromDB);
      const dataUserSurvey = {
            id: surveyFromDB.id,
            uuid: surveyFromDB.uuid,
            description: surveyFromDB.description,
            title: surveyFromDB.title,
            created_at: surveyFromDB.created_at,
            user_id: surveyFromDB.user_id,
            email: surveyFromDB.email,
            questions: surveyFromDB.questions, 
        }
        setUserSurveys(dataUserSurvey)        
    }
    if(surveyId !== "[id]") getSurvey(surveyId);


  }, [surveyId]);

  useEffect(() => {
    setAnswers(userSurveys.questions.map((question) => {return {question: question, answer: "", email: survey.email}} ));
  }, [userSurveys]);

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>, ind: number) => {
    setAnswers(answers.map((item, index) => index === ind ? {question: item.question, answer: e.target.value, email: item.email} : item));  
  };

  console.log("answers ", answers);

  const answerTheQuestion = () => {
    
    
    const data = [...answers];
    console.log("answers data => ", data);

    const saveQuestion = async(answersInfo: { question: any; answer: any; email: string; }[]) => {
        const questions = await surveyApi.answerTheQuestion(answersInfo);
        console.log("!!!!!!!questions ", questions);
        setSuccess(!success);
    }
    saveQuestion(data);
}
  

  return  (

      <Wrapper>
        <div className={styles.modal}>
          <div className={styles.title}>{survey.title}</div>
          <div className={styles.description}>{survey.description}</div>
              <Swiper
                  pagination={{
                  type: "custom",
                  }}
                  onSlideChange={(swiper) => {
                    setSlide(swiper.activeIndex);

                  }
                }
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className={styles.containerQuestion}
              >
                      {
                          survey.questions.length > 0 && (
                              survey.questions.map((item, index) => {
                                      
                                      return (
                                          <SwiperSlide key={index} onClick={() => console.log("SwiperSlide") }>
                                              <div className={styles.questionBlock}>
                                                  <div key={index} className={styles.question}>{index+1}). {item.question}</div>
                                                  <div className={styles.answerContainer}>
                                                      <textarea placeholder="Put you answer" value={answer} 
                                                          onChange={(e) => handleChangeAnswer(e, index)} name={item.question} id={item.question} cols={30} rows={10}>
                                                              {answer} 
                                                      </textarea>
                                                  </div>
                                              </div>
                                              
                                          </SwiperSlide>
                                      )
                              })
                          )
                      }

              </Swiper>
          <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} onClick={answerTheQuestion}>Save answer the {survey.questions.length > 0 ? "questions" : "question"}</button>
            {success && (
                <div className={styles.isSuccess} onClick={() => setSuccess(!success)}>
                    <div>answers added successfully</div>
                </div>
            )}
        </div>
        
      </Wrapper>

  );
};

export default Survey;