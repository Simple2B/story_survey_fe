import React, { ReactElement, useEffect, useRef, useState } from "react";
import Wrapper from "../common/Wrapper/Wrapper";
import Banner from "../common/Banner/Banner";
import { CustomLink } from "../common/CustomLink";
import { ADMIN, CLIENT } from "../../redux/types/userTypes";
import styles from "./Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { surveyApi } from "../../pages/api/backend/surveyInstance";
import { IGetSurvey } from "../../redux/types/surveyTypes";
import deleteIcon from "../../styles/icons/icons8-cancel-64.png";
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import iconLink from "../../styles/icons/icons8-link-64.png";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface IAnswer  {
    question: string, 
    answer: string, 
    email: string
};

const Home = (): ReactElement => {
    const [sessionId, setSessionId ] = useState();
    const [startDate, setStartDate ] = useState();
    const [isPublic, setIsPublic] = useState(false);
    const {data: session } = useSession();
    const { push, asPath } = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [userSurveys, setUserSurveys] = useState<IGetSurvey[]>([{
        title: "",
        description: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [],
        successful_message: "",
        published: true,
    }]);
    const [answerInfo, setAnswerInfo] = useState<IAnswer>({
        question: "", 
        answer: "", 
        email: ""
    });
    const [answers, setAnswers] = useState([{
        question: null, 
        answer: null, 
        email: "",
        session_id: "",
        start_time: "",
        // end_time: "",
    }]);
    const [answer, setAnswer] = useState<string>("");
    const [slide, setSlide] = useState(null);
    const [indexSurvey, setIndexSurvey] = useState(null);
    const [success, setSuccess] = useState(false);

    if (success === true) {
        setTimeout(() => {
            setSuccess(false);
        }, 1500)
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
        published: true,
    });

    const [isOpenDescription, setOpenDescription] = useState(false);

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
                    published: l.published,
                }}) 
                setUserSurveys(listUserSurvey);
            };
        };
        getListSurveys();
        if (session) {
            const profile: any = session.profile;
            setIsPublic((profile.role === ADMIN || profile.role === CLIENT));
        } else {
            setIsPublic(false);
        };
    },[session]);

    const openSurvey = (
            data: React.SetStateAction<{ 
                id: number; 
                uuid: string; 
                title: string; 
                description: string; 
                successful_message: string; 
                created_at: string; 
                user_id: number; 
                email: string; 
                questions: { question: string; id: number; survey_id: number; }[];
                published: boolean,
             }>, 
                
            index: number
        ) => {
        setOpenDescription(!isOpenDescription);
        setSurvey(data);
        setIndexSurvey(index);

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

    const handleChangeAnswer = (e: { target: { value: React.SetStateAction<string>; }; }, ind: number) => {
        setAnswers(answers.map((item, index) => index === ind ? {
            question: item.question, 
            answer: e.target.value, 
            email: item.email,
            session_id: sessionId,
            start_time: startDate,
        } : item));  
    };

    const answerTheQuestion = () => {
        const data = [...answers];
        const saveQuestion = async(answersInfo: { 
            question: any; 
            answer: any; 
            email: string; 
            session_id: string,
            start_time?: string,
            end_time?: string,
        }[]) => {
            const questionsFromDB = await surveyApi.answerTheQuestion(answersInfo);
            console.log("questionsFromDB ", questionsFromDB);
            if (slide === survey.questions.length - 1){ 
                setSuccess(!success);
                setIsOpen(!isOpen);
            };
        }
        saveQuestion(data);
    };

    // TODO: create link for prod
    // process.env.COPY_LINK
    // const link = 'http://localhost:3000';
    const link = 'https://survey.simple2b.net';

    const [isCopiedLink, setCopiedLink] = useState({
        isCopied: false,
        surveyUUID: "",
    });

    if (isCopiedLink.isCopied) {
        setTimeout(() => {
            setCopiedLink({
                isCopied: false,
                surveyUUID: "",
            });
        }, 500);
    };

    const copyLink = (survey_uuid: string, title: string, isPublic: boolean) => {
        console.log("COPY  survey id", survey_uuid);
        let value = `${link}/survey/${survey_uuid}`;
        if (!isPublic) {
            value = `${link}/survey/not_public/${survey_uuid}`;
        }
        
        navigator.clipboard.writeText(value).then(() => {
            setCopiedLink({
                isCopied: true,
                surveyUUID: survey_uuid,
            });
        });
    };

    console.log("HOME: userSurveys => ", userSurveys);
    console.log("HOME: isPublic => ", isPublic);
    
    // const isPublish = 
    return (
        <div className={styles.wrapper}>
            {
                userSurveys[0].user_id === 0 ? (
                   <Wrapper>
                        <Banner title="Story Survey" subtitle="">
                            <CustomLink 
                                text={"create your survey"}  
                                href={`/auth/signin?callbackUrl=${asPath}`} 
                                style={"btnPrimary"}
                            />
                        </Banner>
                    </Wrapper> 
                ) : (
                    <Wrapper>
                        { userSurveys[0].user_id !== 0 && (
                                <div className={styles.homeContent}>
                                    {(
                                    userSurveys.map((item, index) => {
                                        const uuid = item.uuid;
                                        return (
                                            <div className={styles.overviewBoxes} key={index}>
                                                <div className={styles.box}>
                                                    <div className={styles.rightSide}>
                                                            <div className={styles.titleCard}>
                                                                <div className={styles.titlePublic}>
                                                                    {!item.published? "not public": ""}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {item.title}
                                                                </div>
                                                            </div>
                                                            
                                                            <div className={styles.containerQuestionList}>
                                                                
                                                                {   
                                                                    item.questions.length > 0 && (
                                                                        item.questions.slice(0, 1).map((q, index) => {
                                                                            return (
                                                                                <div className={styles.containerStep} key={index}>
                                                                                    {item.questions.length > 2 && <span className={styles.btnShowMore}><i className={`${styles.arrow} ${styles.up}`}></i></span> }
                                                                                    
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
                                                                            item.questions.slice(1, item.questions.length - 1).map((item, index) => {
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
                                                        {
                                                            ((!isPublic || isPublic) && item.published) && (
                                                                <div className={styles.containerIconLink}>
                                                                    <i 
                                                                        className={styles.iconLink} 
                                                                        title="copy link" 
                                                                        onClick={() => {copyLink(uuid, item.title, item.published)}}
                                                                    >
                                                                        <Image src={iconLink} height={30} width={30}/>
                                                                    </i>

                                                                    {
                                                                        isCopiedLink.surveyUUID === uuid && (
                                                                        <div className={styles.linkCopied}>
                                                                            copied
                                                                        </div>
                                                                        )
                                                                    }
                                                                    <Link href={`/survey/${uuid}`}>
                                                                        <a target="_blank" className="card-link">
                                                                            survey
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                        { !item.published && <div></div> }
                                                        { !item.published && isPublic &&
                                                            (
                                                                <div className={styles.containerIconLink}>
                                                                    <i 
                                                                        className={styles.iconLink} 
                                                                        title="copy link" 
                                                                        onClick={() => {copyLink(uuid, item.title, item.published)}}
                                                                    >
                                                                        <Image src={iconLink} height={30} width={30}/>
                                                                    </i>
                                                                    {
                                                                        isCopiedLink.surveyUUID === uuid && (
                                                                        <div className={styles.linkCopied}>
                                                                            copied
                                                                        </div>
                                                                        )
                                                                    }
                                                                    
                                                                    <Link 
                                                                        href={`/survey/not_public/${uuid}`} 
                                                                    >
                                                                        <a 
                                                                        target="_blank" 
                                                                        className="card-link">
                                                                            survey
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                        
                                                        <div  
                                                            className={`${styles.link} card-link`}
                                                            onClick={() => {
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
                                                                    published: item.published,
                                                                }, index)
                                                                setAnswers(item.questions.map((question) => {return {
                                                                    question: question, 
                                                                    answer: "", 
                                                                    email: item.email,
                                                                    session_id: "",
                                                                    start_time: "",
                                                                }} ));
                                                            }}
                                                            >
                                                                show more
                                                        </div>
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
                                    <i className={styles.editIcon} onClick={() => setOpenDescription(!isOpenDescription)}>
                                        <Image src={deleteIcon} height={30} width={30}/>
                                    </i>
                                    <div className={styles.titleShowMore}>
                                        {survey.title}
                                    </div>
                                    <div className={styles.description}>
                                        {survey.description}
                                    </div>
                                    <button 
                                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} 
                                        onClick={() => {
                                            if (!survey.published && !isPublic) {
                                                return push(`/auth/signin?callbackUrl=${asPath}`);
                                            }
                                            setOpenDescription(!isOpenDescription);
                                            setIsOpen(!isOpen);
                                        }}
                                    >
                                            Answer the {survey.questions.length > 0 ? "questions" : "question"}
                                    </button>
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
                                                    navigation={{
                                                        prevEl: '.prev',
                                                        nextEl: '.nextSwiper',
                                                    }}
                                                    onSlideChange={(swiper) => {
                                                        setSlide(swiper.activeIndex);
                                                        console.log("indexSurvey: ", indexSurvey);
                                                        const currentSurvey = userSurveys[indexSurvey];
                                                        const currentQuestion = currentSurvey[swiper.activeIndex];
                                                        console.log("currentQuestion", currentQuestion);
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
                                                                                        </textarea>
                                                                                    </div>
                                                                                </div>
                                                                            </SwiperSlide>
                                                                        )
                                                                })
                                                            )
                                                        }

                                                </Swiper>
                                                { 
                                                    <button 
                                                        className={`nextSwiper ${styles.nextSwiper}`} 

                                                        onClick={answerTheQuestion}
                                                    >
                                                            + answer
                                                    </button>
                                                }
                                        </div>
                                    </div>
                                )
                        }

                    </Wrapper>                    
                )
            }
            {success && (
                    <div className={styles.isSuccess}>
                        {survey.successful_message.length === 0 && <div>answers added successfully</div>}
                        {survey.successful_message.length > 0 && <div>{survey.successful_message}</div>}
                    </div>
            )}
        </div>
    )
}

export default Home;
