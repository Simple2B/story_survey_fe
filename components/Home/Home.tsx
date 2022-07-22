import React, { ReactElement, useEffect, useRef, useState } from "react";
import Wrapper from "../common/Wrapper/Wrapper";
import Banner from "../common/Banner/Banner";
import { CustomLink } from "../common/CustomLink";
import { ADMIN, CLIENT } from "../../redux/types/userTypes";
import styles from "./Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { surveyApi } from "../../pages/api/backend/surveyInstance";
import { IGetSurvey, ISurveyInfo } from "../../redux/types/surveyTypes";
import deleteIcon from "../../styles/icons/icons8-cancel-64.png";
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { instancePagination } from "../../pages/api/backend/pagination";
import { useFetching } from "../Hooks/useFetching";
import Loader from "../common/Loader/Loader";
import SwiperContainer from "../UserProfile/SwiperContainer/SwiperContainer";
import ContainerDescription from "../UserProfile/ContainerDescription/ContainerDescription";
import ContainerCopyLink from "../UserProfile/ContainerCopyLink/ContainerCopyLink";
import QuestionList from "./QuestionList";
import { useCheckAnswer } from "../Hooks/useCheckAnswer";
import Success from "../UserProfile/Success/Success";

interface IMessageInfo {
  message: string,
  question_id: number
}



// TODO: create link for prod
const link = 'https://survey.simple2b.net';

// The number of items that are shown when the page opens (before scrolling and loading more)
const defaultQuantityItems = 30

const Home = (): ReactElement => {
    const {data: session } = useSession();
    const { push, asPath } = useRouter();
    const [sessionId, setSessionId ] = useState();
    const [startDate, setStartDate ] = useState();
    const [isPublic, setIsPublic] = useState(false);
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
    const [answers, setAnswers] = useState([{
        question: null,
        is_answer: false,
        answer: null,
        email: "",
        session_id: "",
        start_time: "",
    }]);
    const [slide, setSlide] = useState(null);
    const [indexSurvey, setIndexSurvey] = useState(null);
    const [success, setSuccess] = useState<boolean>(false);

    const [infoMessageForAnswer, setInfoMessageForAnswer] = useState<IMessageInfo>({
        message: "",
        question_id: 0
    });

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

    const [pageNumber, setPageNumber] = useState<number>(defaultQuantityItems);
    const [endMessage, setEndMessage] = useState(true)
    const [allServeyListLength, setAllServeyListLength] = useState(0)

  const getMoreCards = () => {
    console.log(userSurveys.length);

    if (userSurveys.length >= allServeyListLength && userSurveys.length > defaultQuantityItems) {
      setEndMessage(false);
    }

    setPageNumber((prev) => prev + 10);
  }

      const [getListSurveysAll, isLoading, error] = useFetching( async () => {
        const response = await instancePagination(pageNumber).get('/survey/surveys');
        console.log(
          '%c [getListSurveys] RESPONSE data - ', 'color: black; background-color: white; font-weight: 700', response.data
          );

        setUserSurveys(response.data.data);
        setAllServeyListLength(response.data.data_length)
    });

    useEffect(() => {
      getListSurveysAll()
        if (session) {
            const profile: any = session.profile;
            setIsPublic((profile.role === ADMIN || profile.role === CLIENT));
        } else {
            setIsPublic(false);
        };
    },[session, pageNumber]);

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
        if(e.target.value === "") {
            // setMessage("You must put some answer")
        };
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
    };

    const answerTheQuestion = () => {
        const data = [...answers];
        const saveQuestion = async(answersInfo: {
            question: any;
            is_answer: boolean;
            answer: any;
            email: string;
            session_id: string,
            start_time?: string,
            end_time?: string,
        }[]) => {
            const questionsFromDB = await surveyApi.answerTheQuestion(answersInfo);
            console.log("questionsFromDB ", questionsFromDB);
            if (questionsFromDB) {
                setInfoMessageForAnswer(questionsFromDB);
            };

            if (slide === survey.questions.length - 1){
                setSuccess(!success);
                setTimeout(() => {
                    setIsOpen(!isOpen);
                }, 2000);
            };
        }
        saveQuestion(data);
    };

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
        };
        navigator.clipboard.writeText(value).then(() => {
            setCopiedLink({
                isCopied: true,
                surveyUUID: survey_uuid,
            });
        });
    };

    if (infoMessageForAnswer.message !== "") {
        setTimeout(() => {
            setInfoMessageForAnswer({
                message: "",
                question_id: 0
            });
        }, 1300);
    };

    const showMore = (item: IGetSurvey, index: number) => {
        console.log("showMore: item ", item.questions);

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
            is_answer: false,
            answer: "",
            email: item.email,
            session_id: "",
            start_time: "",
        }} ));
    };

    const openQuestion = (survey: ISurveyInfo) => {
        if (!survey.published && !isPublic) {
            return push(`/auth/signin?callbackUrl=${asPath}`);
        }
        setOpenDescription(!isOpenDescription);
        setIsOpen(!isOpen);
    };

    console.log(" userSurveys ", userSurveys);
    return (
        <div className={styles.wrapper}>
            {
                userSurveys.length === 0 &&
                <Wrapper>
                    <Banner title="Story Survey" subtitle="">
                        <CustomLink
                            text={"create your survey"}
                            href={`/auth/signin?callbackUrl=${asPath}`}
                            style={"btnPrimary"}
                        />
                    </Banner>
                </Wrapper>
            }
            {
                <Wrapper>
                    {/* {error && <div className={styles.ErrorContainer}>{error}</div>} */}
                        <>
                          <InfiniteScroll
                              className={styles.homeContent}
                              dataLength={userSurveys.length}
                              next={getMoreCards}
                              hasMore={endMessage}
                              loader={userSurveys.length > defaultQuantityItems
                                ? <h3 className="paginationMessage"> Loading...</h3>
                                : ''
                              }
                              endMessage={<h4 className="paginationMessage">Nothing more to show</h4>}
                            >
                            {  (
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
                                                                    {!item.published? "private": ""}
                                                                </div>
                                                                <div className={styles.title}>
                                                                    {/* {isAnswer &&
                                                                        <i>
                                                                            <Image src={successIcon} height={30} width={30}/>
                                                                        </i>
                                                                    } */}
                                                                    {item.title}
                                                                </div>
                                                            </div>
                                                            <QuestionList questions={item.questions}/>
                                                    </div>
                                                    <div className={styles.containerLink}>
                                                        <ContainerCopyLink
                                                            isCopiedLink={isCopiedLink}
                                                            copyLink={copyLink}
                                                            isPublic={isPublic}
                                                            uuid={uuid}
                                                            title={item.title}
                                                            published={item.published}
                                                        />
                                                        <div
                                                            className={`${styles.link} card-link`}
                                                            onClick={() => showMore(item, index)}
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
                                <ContainerDescription
                                    setOpenDescription={setOpenDescription}
                                    isOpenDescription={isOpenDescription}
                                    survey={survey}
                                    openQuestion={openQuestion}
                                />
                            }
                            { isOpen &&
                                (
                                    <div className={styles.modalWindow}>
                                        <div className={styles.modal}>
                                            <i className={styles.editIcon} onClick={() => {setIsOpen(!isOpen)}}><Image src={deleteIcon} height={30} width={30}/></i>
                                            <div className={styles.title}>{survey.title}</div>
                                            <SwiperContainer
                                                setSlide={setSlide}
                                                survey={survey}
                                                answers={answers}
                                                handleChangeAnswer={handleChangeAnswer}
                                                // infoMessageForAnswer={infoMessageForAnswer}
                                            />
                                            <button
                                                className={`nextSwiper ${styles.nextSwiper}`}
                                                onClick={answerTheQuestion}>
                                                    + answer
                                            </button>

                                        </div>
                                    </div>
                                )
                            }
                            </InfiniteScroll>
                        </>
                    ) : <div className={styles.loaderContainer}>{userSurveys.length !== allServeyListLength && <Loader/>} </div>
                </Wrapper>
            }
            {/* {success && <Success survey={survey}/>} */}
        </div>
    )
}

export default Home;
