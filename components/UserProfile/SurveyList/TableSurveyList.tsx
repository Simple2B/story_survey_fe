import { useSession } from "next-auth/react";
import React, { ReactElement, useState } from "react";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { IGetSurvey, IQuestion } from "../../../redux/types/surveyTypes";
import EditContainer from "./EditContainer";
import styles from "./SurveyList.module.css";

const TableSurveyList = ({userSurveys, setUserSurveys, copyLink, link}): ReactElement => {
    const { data: session} = useSession();

    const [isCopied, setCopied] = useState<boolean>(false);

    const [editSurveyId, setEditSurveyID] = useState<number | null>(null);
    const [userEmail, setUserEmail] = useState<string>("");


    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [titleError, setTitleError] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [questions, setQuestion] = useState<IQuestion[]>([{
        id: 0,
        question: "",
        survey_id: 0,
    }]);

    const [createQuestion, setCreateQuestion] = useState<string[]>([]);

    const [questionsDeleted, setQuestionDeleted] = useState<IQuestion[]>([]);
    const [description, setDescription] = useState<string>("");

    const [successMessage, setSuccessMessage] = useState<string>("");



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

    const editQuestions = (e: { 
            target: { value: any; }; }, 
            question: { id: number; survey_id: any; 
        }, 
        index: any
        ) => {
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
        };
    };

    const handleOnchangeDescription = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(e.target.value);
    };

    const handleOnchangeSuccessMessage = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSuccessMessage(e.target.value);
    };

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

    const getEditSurvey = (id: React.SetStateAction<number>, index: number) => {
        setIsOpen(!isOpen);
        setEditSurveyID(id);
    };

    console.log("TableSurveyList: userSurveys ", userSurveys);
    

    
    return  (
        <div className={styles.tableListContainer}>
            <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Question</th>
                    <th scope="col">Link</th>
                    <th scope="col">Correct survey</th>
                    </tr>
                </thead>
                <tbody>
                    {userSurveys && userSurveys.length > 0 && (
                        userSurveys.map((survey, index) => {
                            
                            return (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td className={styles.rowTitle}>
                                        <span  className={styles.statusSurvey}>{!survey.published? "not public": ""}</span>
                                        <span>{survey.title}</span>
                                    </td>
                                    <td>{survey.description}</td>
                                    <td>{survey.questions.length - 1}</td>
                                    <td 
                                        className={styles.linkRow} 
                                        onClick={() => copyLink(survey.published ? survey.id : survey.uuid, survey.title)}
                                        // survey_id?: number, survey_uuid?: string, title?: string
                                    >  
                                        <span className={styles.copyLinkTitle}>copy link</span>
                                        <span className={styles.copyLink}>
                                            {
                                                survey.published 

                                                ? `${link}/survey/${survey.id}` 

                                                : `${link}/survey/not_public/${survey.uuid}`
                                            }
                                        </span>
                                    </td>
                                    <td className={styles.btnEditContainer}>
                                        <span className={styles.btnEdit}
                                            onClick={() => {
                                                getEditSurvey(survey.id, index)
                                                setEditSurveyID(survey.id);
                                                setDescription(survey.description);
                                                setSuccessMessage(survey.successful_message)
                                                setTitle(survey.title);
                                                setQuestionDeleted([]);
                                                setCreateQuestion([]);
                                                setUserEmail(survey.email)
                                                if (survey.questions.length > 0 )setQuestion(survey.questions.slice(0, survey.questions.length - 1).map((q) => {
                                                    return {
                                                        id: q.id, 
                                                        question: q.question, 
                                                        survey_id: q.survey_id,
                                                    }
                                                }));
                                            }}
                                        >
                                            edit
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    )} 
                </tbody>
            </table>  
            {
                isOpen 
                    &&
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

export default TableSurveyList;
