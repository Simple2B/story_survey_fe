import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { surveyApi } from "../../pages/api/backend/surveyInstance";
import { ICreateSurvey } from "../../redux/types/surveyTypes";
import Wrapper from "../common/Wrapper/Wrapper";
import styles from "./Home.module.css";
// import Banner from "../common/Banner/Banner";
// import { CustomLink } from "../common/CustomLink";

function Home() {

    const {data: session } = useSession();
    const [userSurveys, setUserSurveys] = useState<ICreateSurvey[]>([{
        title: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [],
    }]);

    useEffect(() => {

        const getListSurveys = async() => {
            const list = await surveyApi.getSurveys();
            setUserSurveys(list);
        }

        getListSurveys();
        
    },[session]);
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
                            <div className={styles.overviewBoxes} key={index}>
                                <div className={styles.box}>
                                    <div className={styles.rightSide}>
                                        {/* <i className={styles.editIcon} onClick={deleteSurvey}><Image src={deleteIcon} height={30} width={30}/></i> */}
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
            </Wrapper>
        </>
    )
}

export default Home;