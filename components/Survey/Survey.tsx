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


const Survey = ({surveyUUID}) => {
    const [sessionId, setSessionId ] = useState();
    const [startDate, setStartDate ] = useState();
    const {push} = useRouter();
    const [answers, setAnswers] = useState([{
      question: "", 
      answer: "", 
      email: "",
      session_id: "",
      start_time: "",
    }]);
    const [slide, setSlide] = useState(null);
    const [success, setSuccess] = useState(false);
    if (success === true) {
        setTimeout(() => {
            setSuccess(false);
            push('/');
        }, 1000)
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
    const getSurvey = async(uuid: string) => {
        const surveyFromDB = await surveyApi.getSurveyFromDBWithUUID(uuid);
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
          }} ));
    }
    if(surveyUUID !== "[uuid]") getSurvey(surveyUUID);


  }, [surveyUUID]);

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>, ind: number) => {
      setAnswers(answers.map((item, index) => index === ind ? {
        question: item.question, 
        answer: e.target.value, 
        email: item.email,
        session_id: sessionId,
        start_time: startDate,
      } : item)); 
      // set session_id for answer
      if (Cookies.get('session_id') === undefined && sessionId === undefined) {
          Cookies.set('session_id', uuidv4());
          Cookies.set('start_time', new Date().toISOString());
          setSessionId(Cookies.get('session_id'));
          setStartDate(Cookies.get('start_time'));
      } else {
          setSessionId(Cookies.get('session_id'));
          setStartDate(Cookies.get('start_time'));
      };
  };

  const answerTheQuestion = () => {
      const data = [...answers];
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


  return  (
      <Wrapper>
        <div className={styles.title}>{survey.title}</div>
        <div className={styles.modal}>
          {/* <div className={styles.description}>{survey.description}</div> */}
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
                                                        className={styles.textareaInput}
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
            {success && (
                    <div className={styles.isSuccess}>
                        {survey.successful_message.length === 0 && <div>answers added successfully</div>}
                        {survey.successful_message.length > 0 && <div>{survey.successful_message}</div>}
                    </div>
            )}
        </div>
      </Wrapper>
  );
};

export default Survey;
