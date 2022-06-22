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

    console.log("userSurveys", userSurveys);

    const deleteSurvey = (index: number) => {
        const email: string= session.user.email;

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
                                <i className={styles.editIcon} onClick={() => deleteSurvey(index)}><Image src={deleteIcon} height={30} width={30}/></i>
                                <div className={styles.number}>{item.title}</div>
                                {   
                                    item.questions.length > 0 && (
                                        item.questions.map((question, index) => {
                                            return (
                                                <div className={styles.indicator} key={index}>
                                                    <i className={`bx bx-right-arrow-alt`}></i>
                                                    <span className={styles.text}>{question}</span>
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
    );
};

export default SurveyList;
