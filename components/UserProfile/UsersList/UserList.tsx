import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { ReactElement, useEffect, useState } from "react";
import { clientApi } from "../../../pages/api/backend/userInstance";
import { IUserResponse } from "../../../redux/types/userTypes";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";
import styles from "./UsersList.module.css";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { ISurveyInfo } from "../../../redux/types/surveyTypes";
import handler from "../../../pages/api/keys";


const UserList = (): ReactElement => {
    const {data: session} = useSession();
    const {push, asPath} = useRouter();
    const [user, setUser] = useState<IUserResponse>();
    const pathInfo = asPath.split("/");
    const userId = pathInfo[pathInfo.length - 1];
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [survey, setSurvey] = useState<ISurveyInfo>({
        id: "",
        uuid: "",
        title: "",
        description: "",
        successful_message: "",
        created_at: "",
        user_id: 0,
        email: "",
        questions: [{
            id: "",
            question: "",
            survey_id: 0,
            survey: "",
            answers: [],
        }],
    });

    useEffect(() => {
          if (session && asPath) {
            const getUser = async() => {
              const usersFromDB = await clientApi.getUserByUUID(userId);
              console.log("usersFromDB ", usersFromDB);
              setUser(usersFromDB);
            };
            getUser();
          };
        }, [session]);

    const handlerClickBack = () => {
        push("/user_profile/survey/users/users_list")
    }

    return  (
      <div className={styles.container}>
            <div className={styles.backBtn} onClick={handlerClickBack} title="go back">
                <i className={`${styles.arrow} ${styles.left}`}/>
            </div>
            <table className="table table-hover" id="userList">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Create</th>
                    <th scope="col">Questions</th>
                    </tr>
                </thead> 
                <tbody>
                    {user && user.surveys.length > 0 && (
                        user.surveys.map((survey, index) => {
                            return (
                                <tr 
                                    key={index} 
                                    onClick={() => {
                                        setIsOpen(!isOpen);
                                        const surveyId = user.surveys[index].id;
                                        const getInfoSurvey = async() => {
                                            const infoSurvey = await surveyApi.getInfoSurvey(surveyId);
                                            setSurvey(infoSurvey);
                                        };
                                        getInfoSurvey();
                                    }} 
                                    className={styles.tableRow}
                                >
                                    <th scope="row">{index+1}</th>
                                    <td className={styles.rowTitle}>
                                        <div className={styles.titleContent}>
                                            {survey.title}
                                        </div>
                                    </td>
                                    <td className={styles.description}>
                                        <div className={styles.descriptionContent}>
                                            {survey.description}
                                        </div>
                                    </td>
                                    <td>{survey.created_at}</td>
                                    <td>{survey.questions.length}</td>
                                </tr>
                            )
                        })
                    )} 
                </tbody>
            </table>
            {isOpen && (
            <div className={styles.modalWindow}>
                <div className={styles.modal}>
                    <i className={styles.editIcon} onClick={() => {setIsOpen(!isOpen)}}>
                        <Image src={deleteIcon} height={30} width={30}/>
                    </i>
                    {survey && (
                        <div className={styles.containerCard}>
                            <div className={styles.titleCard}>
                                <div className={styles.title}>{survey.title}</div>
                            </div>
                            <div className={styles.questionContainer}>
                                {survey.questions
                                    && (
                                    survey.questions.slice(0).map((questionInfo, item) => {
                                        return (
                                            <div>
                                                {
                                                questionInfo.question !== "" && (
                                                <div key={item} className={styles.question}>
                                                    <div>
                                                        {questionInfo.question} 
                                                    </div>
                                                    <div>
                                                        {questionInfo.answers.length > 0 ? "answers" : "answer"}
                                                    </div>
                                                    <div>
                                                        {questionInfo.answers.length}
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
      </div>
    );
};

export default UserList;
