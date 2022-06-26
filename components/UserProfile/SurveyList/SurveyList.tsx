import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { ICreateSurvey } from "../../../redux/types/surveyTypes";
import styles from "./SurveyList.module.css";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";


const SurveyList = (): ReactElement => {

    const {data: session, status} = useSession();
    const [userSurveys, setUserSurveys] = useState<ICreateSurvey[]>([{
        id: 0,
        title: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [],
    }]);

    useEffect(() => {

        if (status === 'authenticated' ) {
            const email: string= session.user.email;

            const getListSurveys = async() => {
                const list = await surveyApi.getUserSurveys(email);
                setUserSurveys(list);
            }

            getListSurveys();
        }
    },[session]);

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

    };
    

    return  (
        <div className={styles.homeContent}>
                    {userSurveys.length > 0 && (

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
                                                        item.questions.slice(0, 1).map((item, index) => {
                                                            return (
                                                                <div className={styles.containerStep} key={index}>
                                                                    <div className={styles.indicator} key={index}>
                                                                        <i className={`bx bx-right-arrow-alt`}></i>
                                                                        <span className={styles.text}>{item}</span>
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
                                                                        <div className={styles.indicator} key={index}>
                                                                            <i className={`bx bx-right-arrow-alt`}></i>
                                                                            <span className={styles.text}>{item}</span>
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
                                        <a href="#" className="card-link">survey link</a>
                                        <a href="#" className="card-link" 
                                            // onClick={() => {
                                            //     openSurvey({
                                            //         id: item.id,
                                            //         title: item.title,
                                            //         created_at: item.created_at,
                                            //         user_id: item.user_id,
                                            //         email: item.email,
                                            //         questions: item.questions,
                                            //     }, index)
                                            //     setAnswers(item.questions.map((question) => {return {question: question, answer: "", email: session? session.user.email : ""}} ));
                                            // }}
                                            >
                                                edit
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })                
                    )} 
                </div>
    );
};

export default SurveyList;
