import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { IGetSurvey, IQuestion } from "../../../redux/types/surveyTypes";
import styles from "./SurveyList.module.css";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";
import iconLink from "../../../styles/icons/icons8-link-64.png";
import EditContainer from "./EditContainer";
import { ADMIN, CLIENT } from "../../../redux/types/userTypes";


const SurveyList = ({userSurveys, setUserSurveys, copyLink, link}): ReactElement => {

    const {data: session, status} = useSession();
    const { push, asPath } = useRouter();
    const isSurveyList = asPath.includes("surveys_list");

    const [isPublic, setIsPublic] = useState(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [editSurveyId, setEditSurveyID] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string>("");

    const [titleError, setTitleError] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [description, setDescription] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [questions, setQuestion] = useState<IQuestion[]>([{
        id: 0,
        question: "",
        survey_id: 0,
    }]);

    const [questionsDeleted, setQuestionDeleted] = useState<IQuestion[]>([]);

    const [createQuestion, setCreateQuestion] = useState<string[]>([]);

    const [isDelete, setDelete] = useState<boolean>(false);
    const [indexDelete, setIndexDelete] = useState<number>(null);
    const [nameDelete, setNameDelete] = useState<string>("");

    // const refLinkCopy = useRef(null);

    useEffect(() => {
        if (session) {
            const profile: any = session.profile;
            setIsPublic((profile.role === ADMIN || profile.role === CLIENT));
        } else {
            setIsPublic(false);
        };
        
    },[session]);

    const handleOnchange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(e.target.value)

        let value = e.target.value;

        let errMsg ="";

        if (value !== undefined) {
            errMsg="Title is empty";
        }

        if ( value.length === 0){
            errMsg="Title is empty";
        }  else {
            errMsg="";
        }

        if (errMsg.length === 0) {
            setTitleError("");
            setTitle(value);
        } else {
            setTitleError(errMsg);
        }
    };

    const handleOnchangeDescription = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(e.target.value);
    };

    const handleOnchangeSuccessMessage = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSuccessMessage(e.target.value);
    };

    console.log("SurveyList: userSurveys", userSurveys);

    const deleteSurvey = (index: number) => {
        const email: string= session? session.user.email : "";

        setUserSurveys(prev => prev.filter((_, ind) => ind !== index));

        const delSurvey = userSurveys.filter((_, ind) => index === ind)[0];
        console.log("deleteSurvey", delSurvey);
        

        const data = {
            email: email,
            survey_id: delSurvey.id,
        }

        const deleteSurvey = async(userData: { email: string; survey_id: number; }) => {
            await surveyApi.deleteSurvey(userData)
        }

        deleteSurvey(data);
        setDelete(!isDelete);
    };

    const getEditSurvey = (id: React.SetStateAction<number>, index: number) => {
        setIsOpen(!isOpen);
        setEditSurveyID(id);
    };

    const editQuestions = (e, question, index) => {
        if (questions)  {
            setQuestion(questions.map((item) => {
                if (item.id === question.id) {
                    item = {
                        id: question.id, 
                        question: e.target.value, 
                        survey_id: question.survey_id}
                }
                return item;
            }));
        }
        
    };
    console.log(" ===>>>> questions ", questions);

    const editSurvey = () => {
        console.log("survey id ", editSurveyId);
        const editDataSurvey = {
            id: editSurveyId,
            title: title,
            description: description,
            successful_message: successMessage,
            email: userEmail,
            questions: questions,
            questions_deleted: questionsDeleted,
            create_question: createQuestion,
        };
        console.log("=>>> editDataSurvey ", editDataSurvey);
        const editSurvey = async(data: IGetSurvey, id: any) => {
            const editDataSurvey: IGetSurvey = await surveyApi.editSurvey(data, id);
            console.log(" editDataSurvey ", editDataSurvey);

            const getListSurveys = async() => {
                const list = await surveyApi.getUserSurveys(session.user.email);
                setUserSurveys(list);
            }
            getListSurveys();
        };
        editSurvey(editDataSurvey, editSurveyId);
        setIsOpen(!isOpen);
    };


    return  (
        <div className={styles.homeContent}>
                    {userSurveys.length > 0 && (

                    userSurveys.map((item, index) => {
                        console.log("========item.questions", item.questions);
                        const survey_id = item.id;
                        const not_public_survey_id = item.uuid;
                        return (
                            <div className={styles.overviewBoxes} key={index}>
                                <div className={styles.box}>
                                    <div className={styles.rightSide}>
                                        <i className={styles.editIcon} onClick={() => {
                                                setDelete(!isDelete);
                                                setIndexDelete(index);
                                                setNameDelete(item.title);
                                            }}><Image src={deleteIcon} height={30} width={30}/></i>
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
                                                                    {item.questions.length > 2 && <span className={styles.btnShowMore}>
                                                                        <i className={`${styles.arrow} ${styles.up}`}>
                                                                        </i></span> }

                                                                    <div className={styles.indicator} key={index}>
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
                                    <div className={styles.linkContainer}>
                                    {
                                        ((!isPublic || isPublic) && item.published) && (
                                            <div className={styles.containerIconLink}>
                                                <i 
                                                    className={styles.iconLink} 
                                                    title="copy link" 
                                                    onClick={() => {copyLink(survey_id, item.title)}}
                                                >
                                                    <Image src={iconLink} height={30} width={30}/>
                                                </i>

                                                <Link 
                                                    href={`/survey/${survey_id}`} 
                                                >
                                                    <a 
                                                    // onClick={() => router.push(`/survey/${survey_id}`)} 
                                                    target="_blank" 
                                                    className="card-link">
                                                        survey
                                                    </a>
                                                </Link>
                                            </div>
                                        )
                                    }
                                    { !item.published &&
                                        (
                                            <div></div>
                                        )
                                    }
                                    { !item.published && isPublic &&
                                        (
                                            <div className={styles.containerIconLink}>
                                                <i 
                                                    className={styles.iconLink} 
                                                    title="copy link" 
                                                    onClick={() => {copyLink(not_public_survey_id, item.title)}}
                                                >
                                                    <Image src={iconLink} height={30} width={30}/>
                                                </i>

                                                <Link 
                                                    href={`/survey/not_public/${not_public_survey_id}`} 
                                                >
                                                    <a 
                                                    // onClick={() => router.push(`/survey/${survey_id}`)} 
                                                    target="_blank" 
                                                    className="card-link">
                                                        survey
                                                    </a>
                                                </Link>
                                            </div>
                                        )
                                    }
                                        {/* <div className={styles.containerIconLink}>
                                            <i 
                                                className={styles.iconLink} 
                                                title="copy link" 
                                                onClick={() => copyLink(item.id, item.title)}
                                            >
                                                <Image src={iconLink} height={30} width={30}/>
                                            </i>
                                            <Link href={`/survey/${item.id}`}>
                                                <a target="_blank" className="card-link">survey</a>
                                            </Link>
                                        </div> */}
                                        <a href="#" 
                                            className={`${styles.link} card-link`}
                                            onClick={() => {
                                                getEditSurvey(item.id, index)
                                                setEditSurveyID(item.id);
                                                setDescription(item.description);
                                                setSuccessMessage(item.successful_message)
                                                setQuestionDeleted([]);
                                                setCreateQuestion([]);
                                                setTitle(item.title);
                                                setUserEmail(item.email)
                                                if (item.questions.length > 0 )setQuestion(item.questions.slice(0, item.questions.length - 1).map((q) => {
                                                    return {
                                                        id: q.id, 
                                                        question: q.question, 
                                                        survey_id: item.id,
                                                    }
                                                }));
                                                // setAnswers(item.questions.map((question) => {return {question: question, answer: "", email: session? session.user.email : ""}} ));
                                            }}
                                            >
                                                edit
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })                
                    )} 
                    {isDelete && (
                            <div className={styles.isDelete} >
                                <div className={styles.deleteTitle}>You are sure you want to delete survey {nameDelete}?</div>
                                <div className={styles.deleteBtn}>
                                    <div onClick={() => setDelete(!isDelete)}>No</div>
                                    <div onClick={() => deleteSurvey(indexDelete)}>Yes</div>
                                </div>
                            </div>
                                )}
                    {isOpen &&
                        <EditContainer 
                            isOpen={isOpen} 
                            setIsOpen={setIsOpen} 
                            titleError={titleError} 
                            title={title} 
                            handleOnchange={handleOnchange} 
                            questions={questions} 
                            setQuestion={setQuestion}
                            editQuestions={editQuestions} 
                            description={description} 
                            handleOnchangeDescription={handleOnchangeDescription} 
                            successMessage={successMessage} 
                            handleOnchangeSuccessMessage={handleOnchangeSuccessMessage} 
                            editSurvey={editSurvey}
                            userEmail={userEmail}
                            editSurveyId={editSurveyId}
                            questionsDeleted={questionsDeleted}
                            setQuestionDeleted={setQuestionDeleted}
                            createQuestion={createQuestion}
                            setCreateQuestion={setCreateQuestion}
                        />
                    }
                </div>
    );
};

export default SurveyList;
