import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { surveyApi } from "../../pages/api/backend/surveyInstance";
import { IGetSurvey } from "../../redux/types/surveyTypes";
import Wrapper from "../common/Wrapper/Wrapper";
import styles from "./Home.module.css";
import deleteIcon from "../../styles/icons/icons8-cancel-64.png";
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import iconLink from "../../styles/icons/icons8-link-64.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Home() {

    const {data: session } = useSession();
    const { push } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [userSurveys, setUserSurveys] = useState<IGetSurvey[]>([{
        title: "",
        description: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [],
        successful_message: "",
    }]);

    const [answer, setAnswer] = useState<string>("");

    const [answers, setAnswers] = useState([{question: null, answer: null, email: ""}]);

    const [slide, setSlide] = useState(null);
    const [indexSurvey, setIndexSurvey] = useState(null);
    const [success, setSuccess] = useState(false);
    const refLink = useRef(null);

    if (success === true) {
        setTimeout(() => {
            setSuccess(false);
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

    const [isOpenDescription, setOpenDescription] = useState(false);

    const [answerToQuestion, setAnswerToQuestion] = useState([{questionIndex: null, answer: ""}]);


    console.log("HOME ===>>> survey ", survey);
    
    useEffect(() => {
        
        const getListSurveys = async() => {
            const list = await surveyApi.getSurveys();
            if (list.length > 0 ) {
                const listUserSurvey = list.map(( l ) =>{ return {
                    id: l.id,
                    uuid: l.uuid,
                    description: l.description,
                    title: l.title,
                    created_at: l.created_at,
                    user_id: l.user_id,
                    email: l.email,
                    questions: l.questions,
                    successful_message: l.successful_message,
                }}) 
                setUserSurveys(listUserSurvey);
                console.log("list", list);
            }
            
            
        }
        getListSurveys();
        
    },[session]);


    const openSurvey = (data: React.SetStateAction<{ id: number; uuid: string; title: string; description: string; successful_message: string; created_at: string; user_id: number; email: string; questions: { question: string; id: number; survey_id: number; }[]; }>, index: number) => {
        setOpenDescription(!isOpenDescription);
        setSurvey(data);
        setIndexSurvey(index);
    };

    const handleChangeAnswer = (e: { target: { value: React.SetStateAction<string>; }; }, ind: number) => {
        setAnswers(answers.map((item, index) => index === ind ? {question: item.question, answer: e.target.value, email: item.email} : item));  
    };

    console.log("answers ", answers);


    const answerTheQuestion = () => {
        console.log("answers ", answers);
        
        const data = [...answers];
        const saveQuestion = async(answersInfo: { question: any; answer: any; email: string; }[]) => {
            const questions = await surveyApi.answerTheQuestion(answersInfo);
            console.log("questions ", questions);
            setSuccess(!success);
        }
        saveQuestion(data);
        setIsOpen(!isOpen);
    };
    // TODO: create link for prod
    // process.env.COPY_LINK
    const link = 'http://localhost:3000';

    
    return (
        <div className={styles.wrapper}>
            <Wrapper>
                {/* <Banner title="Story Survey" subtitle="">
                    <CustomLink text={"Surveys"}  href="/surveys" style={"btnPrimary"}/>
                </Banner> */}
                { userSurveys[0].user_id !== 0 && (
                        <div className={styles.homeContent}>
                            {(

                            userSurveys.map((item, index) => {
                                return (
                                    <div className={styles.overviewBoxes} key={index}>
                                        <div className={styles.box}>
                                            <div className={styles.rightSide}>
                                                {/* <i className={styles.editIcon} onClick={deleteSurvey}><Image src={deleteIcon} height={30} width={30}/></i> */}
                                                    <div className={styles.titleCard}>
                                                        <div className={styles.title}>{item.title}</div>
                                                    </div>
                                                    
                                                    <div className={styles.containerQuestionList}>
                                                        
                                                        {   
                                                            item.questions.length > 0 && (
                                                                item.questions.slice(0, 1).map((q, index) => {
                                                                    return (
                                                                        <div className={styles.containerStep} key={index}>
                                                                            {item.questions.length > 1 && <span className={styles.btnShowMore}><i className={`${styles.arrow} ${styles.up}`}></i></span> }
                                                                            
                                                                            <div className={styles.indicator}>
                                                                                <i className={`bx bx-right-arrow-alt`}></i>
                                                                                <span className={styles.text}>{q.question}</span>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            )
                                                        }
                                                        <div className={styles.hideContainerQuestion}>
                                                            {   
                                                                item.questions.length > 1 && (
                                                                    item.questions.slice(1).map((item, index) => {
                                                                        return (
                                                                            <div className={styles.containerStep} key={index}>
                                                                                <div className={styles.indicator}>
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
                                            <div className={styles.containerLink}>
                                                <div className={styles.containerIconLink}>
                                                    <i className={styles.iconLink} title="copy link" onClick={(event) => {
                                                            function copyLink() {
                                                                const value = refLink.current.value;
                                                                navigator.clipboard.writeText(value).then(() => {
                                                                    alert(`Copied to clipboard, link on ${item.title}`);
                                                                });
                                                            }
                                                            copyLink()
                                                        }}>
                                                        <Image src={iconLink} height={30} width={30}/>
                                                        <input 
                                                            className={styles.hideContainerLink} 
                                                            type="text"
                                                            ref={refLink}
                                                            value={`${link}/survey/${item.id}`}
                                                        />
                                                    </i>
                                                     <Link href={`/survey/${item.id}`}>
                                                        <a target="_blank" className="card-link">survey</a>
                                                     </Link>
                                                </div>
                                                <a href="#" className="card-link" onClick={() => {
                                                        openSurvey({
                                                            id: item.id,
                                                            uuid: item.uuid,
                                                            title: item.title,
                                                            description: item.description,
                                                            created_at: item.created_at,
                                                            user_id: item.user_id,
                                                            email: item.email,
                                                            questions: item.questions,
                                                            successful_message: item.successful_message,
                                                        }, index)
                                                        setAnswers(item.questions.map((question) => {return {question: question, answer: "", email: item.email}} ));
                                                    }}
                                                    >
                                                        show more
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })                
                            )} 
                        </div>
                    )
                }
                {
                    isOpenDescription &&
                    <div className={styles.modalWindow}>
                        <div className={styles.modal}>
                            <i className={styles.editIcon} onClick={() => setOpenDescription(!isOpenDescription)}><Image src={deleteIcon} height={30} width={30}/></i>
                            <div className={styles.title}>{survey.title}</div>
                            <div className={styles.title}>{survey.description}</div>
                            <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} onClick={() => {
                                    setOpenDescription(!isOpenDescription);
                                    setIsOpen(!isOpen);
                                }}>Answer the {survey.questions.length > 0 ? "questions" : "question"}</button>
                        </div>
                    </div>

                }
                { isOpen &&
                        (
                            <div className={styles.modalWindow}>
                                <div className={styles.modal}>
                                    <i className={styles.editIcon} onClick={() => {setIsOpen(!isOpen)}}><Image src={deleteIcon} height={30} width={30}/></i>
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
                                    <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} onClick={answerTheQuestion}>Save answer the {survey.questions.length > 0 ? "questions" : "question"}</button>
                                </div>
                            </div>
                        )
                }

            </Wrapper>
            {success && (
                    <div className={styles.isSuccess} onClick={() => setSuccess(!success)}>
                        {survey.successful_message.length === 0 && <div>answers added successfully</div>}
                        {survey.successful_message.length > 0 && <div>{survey.successful_message}</div>}
                    </div>
            )}
        </div>
    )
}

export default Home;
