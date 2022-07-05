import React, { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import styles from "./survey.module.css";
import { useRouter } from "next/router";

import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Wrapper from "../../components/common/Wrapper/Wrapper"
import { useState } from "react";
import { surveyApi } from "../../pages/api/backend/surveyInstance";


const Survey = ({surveyId}) => {
  // const { asPath } = useRouter();
  // let modifyPath = asPath.split("/");
  // let surveyIdFromPath = modifyPath[modifyPath.length - 1];

  const [sessionId, setSessionId ] = useState();
  const [startDate, setStartDate ] = useState();

  console.log("=>>> Survey: surveyId ", surveyId);
  // console.log("=>>> Survey: surveyIdFromPath ", surveyIdFromPath);
  
  const {push} = useRouter();
  const [answer, setAnswer] = useState("");

  const [answers, setAnswers] = useState([{
    question: "", 
    answer: "", 
    email: "",
    session_id: "",
    start_time: "",
    // end_time: "",
  }]);
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
      successful_message: "",
      created_at: "",
      user_id: 0,
      email: "",
      questions: [{question: "", id: 0, survey_id: 0}],
  });

  const [userSurveys, setUserSurveys] = useState({
    title: "",
    description: "",
    successful_message: "",
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
            successful_message: surveyFromDB.successful_message,
            title: surveyFromDB.title,
            created_at: surveyFromDB.created_at,
            user_id: surveyFromDB.user_id,
            email: surveyFromDB.email,
            questions: surveyFromDB.questions,
        }
        setUserSurveys(dataUserSurvey);
        setAnswers(surveyFromDB.questions.map((question) => {return {
          question: question, 
          answer: "", 
          email: survey.email,
          session_id: "",
          start_time: "",
          // end_time: "",
        }} ));
    }
    if(surveyId !== "[id]") getSurvey(surveyId);


  }, [surveyId]);

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>, ind: number) => {
    setAnswers(answers.map((item, index) => index === ind ? {
      question: item.question, 
      answer: e.target.value, 
      email: item.email,
      session_id: sessionId,
      start_time: startDate,
      // end_time?: string,
    } : item)); 
    
    // set session_id for answer
    if (Cookies.get('session_id') === undefined && sessionId === undefined) {
        Cookies.set('session_id', uuidv4());
        Cookies.set('start_time', new Date().toLocaleString());
        setSessionId(Cookies.get('session_id'));
        setStartDate(Cookies.get('start_time'));
    } else {
        setSessionId(Cookies.get('session_id'));
        setStartDate(Cookies.get('start_time'));
    };
  };

  console.log("answers ", answers);

  const answerTheQuestion = () => {
    
    
    const data = [...answers];
    // console.log("answers data => ", data);

    const saveQuestion = async(answersInfo: { 
      question: any; 
      answer: any; 
      email: string; 
      session_id: string;
      start_time?: string;
      end_time?: string,
    }[]) => {
        const questions = await surveyApi.answerTheQuestion(answersInfo);
        console.log("!!!!!!!questions ", questions);
        if (slide === survey.questions.length - 1){ 
          setSuccess(!success);
        };
    }
    saveQuestion(data);
  };

  console.log("Survey: answers ", answers);
  
  

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
                navigation={{
                  prevEl: '.prev',
                  nextEl: '.nextSwiperSurvey',
                }}
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
                                                      <textarea 
                                                        placeholder="Put you answer" 
                                                        value={answers[index].answer} 
                                                        onChange={(e) => handleChangeAnswer(e, index)} 
                                                        name={item.question} 
                                                        id={item.question} 
                                                        cols={30} 
                                                        rows={10}
                                                      >
                                                              {/* {answer}  */}
                                                      </textarea>
                                                  </div>
                                              </div>
                                              
                                          </SwiperSlide>
                                      )
                              })
                          )
                      }

              </Swiper>
          <button 
            className={slide ===  survey.questions.length - 1  ? `nextSwiperSurvey ${styles.disabledNextBtn}`: `nextSwiperSurvey ${styles.nextSwiper}`} 
            onClick={answerTheQuestion}
            >
              + answer
          </button>
          {/* <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} onClick={answerTheQuestion}>Save answer the {survey.questions.length > 0 ? "questions" : "question"}</button> */}
            {success && (
                    <div className={styles.isSuccess} onClick={() => setSuccess(!success)}>
                        {survey.successful_message.length === 0 && <div>answers added successfully</div>}
                        {survey.successful_message.length > 0 && <div>{survey.successful_message}</div>}
                    </div>
            )}
        </div>
        
      </Wrapper>

  );
};

export default Survey;