import React, { ReactElement, useEffect, useState } from "react";
import styles from "./survey.module.css";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Wrapper from "../../components/common/Wrapper/Wrapper";
import { surveyApi } from "../../pages/api/backend/surveyInstance";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useCheckAnswer } from "../Hooks/useCheckAnswer";
import InfoMessage from "../common/InfoMessage/InfoMessage";
import Success from "../UserProfile/Success/Success";
import { useSession } from "next-auth/react";
import Loader from "../common/Loader/Loader";



const NotPublicSurvey = ({surveyUUID}): ReactElement => {
    const [sessionId, setSessionId ] = useState();
    const [startDate, setStartDate ] = useState();
    const {push} = useRouter();
    const {data: session,  status} = useSession();

    const [answers, setAnswers] = useState([{
      question: "", 
      is_answer: false,
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
        setAnswers(answers.map((item, index) => {
                if (index === ind) {
                    item = { 
                        question: item.question, 
                        is_answer: true,
                        answer: e.target.value, 
                        email: item.email,
                        session_id: sessionId,
                        start_time: startDate,
                    }
                } 
                if (ind-1 !== -1) {
                    if (index === (ind-1)) {
                        item = { 
                            question: item.question, 
                            is_answer: false,
                            answer: item.answer, 
                            email: item.email,
                            session_id: item.session_id,
                            start_time: item.start_time,
                        }
                    }
                }
                return item;
            }
        ));
        
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
            is_answer: boolean;
            answer: any; 
            email: string; 
            session_id: string;
            start_time?: string;
            end_time?: string,
        }[]) => {
            const questions = await surveyApi.answerTheQuestion(answersInfo);
            console.log("NotPublicQuestion: questionsFromDB ", questions);
            if (slide === survey.questions.length - 1){ 
              setSuccess(!success);
            };
        }
        saveQuestion(data);
    };

    const isAnswer = useCheckAnswer(surveyUUID);
    console.log("NotPublicSurvey: isAnswer ", isAnswer);

    return  (
        <>
            {
                status === "loading" ? <div className={styles.loaderContainer}><Loader style={styles.loaderColor}/></div> :
                <Wrapper>
                    <div className={styles.title}>
                        {survey.title}
                    </div>
                    {isAnswer ? 
                        <InfoMessage children={"You are already answer the questions for this survey"} infoStyle={styles.infoMessage}/> 
                        :
                        <div className={styles.modal}>
                            <Swiper
                                pagination={{type: "custom"}}
                                onSlideChange={(swiper) => {setSlide(swiper.activeIndex)}}
                                navigation={{prevEl: '.prev', nextEl: '.nextSwiperSurvey'}}
                                modules={[Pagination, Navigation]}
                                className={styles.containerQuestion}
                            >
                                {
                                survey.questions.length > 0 && (
                                    survey.questions.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index} onClick={() => console.log("SwiperSlide") }>
                                                {  index === (survey.questions.length - 1) ?
                                                        <Success survey={survey} styles={styles.successMessage}/>
                                                        :
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
                                                }                                     
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
                        }
                    
                </Wrapper>
            }
        </>

    );
};

export default NotPublicSurvey;
