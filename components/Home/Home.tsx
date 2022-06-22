import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { surveyApi } from "../../pages/api/backend/surveyInstance";
import { ICreateSurvey, IGetSurvey } from "../../redux/types/surveyTypes";
import Wrapper from "../common/Wrapper/Wrapper";
import styles from "./Home.module.css";
import deleteIcon from "../../styles/icons/icons8-cancel-64.png";
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


function Home() {

    const {data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [userSurveys, setUserSurveys] = useState<IGetSurvey[]>([{
        title: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [],
    }]);

    const [answer, setAnswer] = useState<string>("");

    const [answers, setAnswers] = useState([{question: null, answer: null, email: ""}]);

    const [slide, setSlide] = useState(null);
    const [indexSurvey, setIndexSurvey] = useState(null);

    const [survey, setSurvey] = useState({
        id: 0,
        title: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [{question: "", id: 0, survey_id: 0}],
    });

    const [answerToQuestion, setAnswerToQuestion] = useState([{questionIndex: null, answer: ""}]);

    console.log("answerToQuestion ", answerToQuestion);
    

    useEffect(() => {

        const getListSurveys = async() => {
            const list = await surveyApi.getSurveys();
            if (list.length > 0 ) {
                const listUserSurvey = list.map(( l ) =>{ return {
                    id: l.id,
                    title: l.title,
                    created_at: l.created_at,
                    user_id: l.user_id,
                    email: l.email,
                    questions: l.questions,
                }}) 
                setUserSurveys(listUserSurvey);
                console.log("list", list);
            }
            
            
        }
        getListSurveys();
        
    },[session]);

    console.log("answerToQuestion", answerToQuestion);
    

    const openSurvey = (data: React.SetStateAction<{ id: number; title: string; created_at: string; user_id: number; email: string; questions: { question: string; id: number; survey_id: number; }[]; }>, index: number) => {
        setIsOpen(!isOpen);
        setSurvey(data);
        setIndexSurvey(index);
    };
    console.log(" survey ", survey);

    const handleChangeAnswer = (e: { target: { value: React.SetStateAction<string>; }; }, ind) => {
        setAnswers(answers.map((item, index) => index === ind ? {question: item.question, answer: e.target.value, email: item.email} : item));  
    };

    console.log("answers ", answers);


    const answerTheQuestion = () => {
        console.log("answers ", answers);
        
        const data = [...answers];
        const saveQuestion = async(answersInfo) => {
            const questions = await surveyApi.answerTheQuestion(answersInfo);
            console.log("questions ", questions);
            
        }
        saveQuestion(data);
    }

    
    return (
        <>
            <Wrapper>
                {/* <Banner title="Story Survey" subtitle="">
                    <CustomLink text={"Surveys"}  href="/surveys" style={"btnPrimary"}/>
                </Banner> */}
                <div className={styles.homeContent}>
                    {userSurveys.length > 0 && (

                    userSurveys.map((item, index) => {
                        return (
                            <div className={styles.overviewBoxes} key={index} onClick={() => {
                                openSurvey({
                                    id: item.id,
                                    title: item.title,
                                    created_at: item.created_at,
                                    user_id: item.user_id,
                                    email: item.email,
                                    questions: item.questions,
                                }, index)
                                setAnswers(item.questions.map((question) => {return {question: question, answer: "", email: session? session.user.email : ""}} ));
                            }}>
                                <div className={styles.box}>
                                    <div className={styles.rightSide}>
                                        {/* <i className={styles.editIcon} onClick={deleteSurvey}><Image src={deleteIcon} height={30} width={30}/></i> */}
                                        <div className={styles.number}>{item.title}</div>
                                        {   
                                            item.questions.length > 0 && (
                                                item.questions.map((item, index) => {
                                                    return (
                                                        <div className={styles.containerStep}>
                                                            <div className={styles.indicator} key={index}>
                                                                <i className={`bx bx-right-arrow-alt`}></i>
                                                                <span className={styles.text}>{item.question}</span>
                                                            </div>

                                                        </div>
                                                    )
                                                })
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })                
                    )} 
                </div>
                { isOpen &&
                        (
                            <div className={styles.modalWindow}>
                                <div className={styles.modal}>
                                    <i className={styles.editIcon} onClick={() => setIsOpen(!isOpen)}><Image src={deleteIcon} height={30} width={30}/></i>
                                    <div className={styles.title}>{survey.title}</div>
                                        <Swiper
                                            pagination={{
                                            type: "custom",
                                            }}
                                            navigation={true}
                                            onSlideChange={(swiper) => {
                                                setSlide(swiper.activeIndex);
                                                console.log("indexSurvey: ", indexSurvey);
                                                const currentSurvey = userSurveys[indexSurvey];
                                                const currentQuestion = currentSurvey[swiper.activeIndex];
                                                console.log("currentQuestion", currentQuestion);
                                              }
                                            }
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
                                                                                <textarea placeholder="Put you answer" value={answers[index].answer} 
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
                                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} onClick={answerTheQuestion}>Answer the {survey.questions.length > 0 ? "questions" : "question"}</button>
                                </div>
                            </div>
                        )
                }
            </Wrapper>
        </>
    )
}

export default Home;
