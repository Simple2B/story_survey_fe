import { useSession } from "next-auth/react";
import React, { ReactElement, useState } from "react";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { IGetSurvey, IQuestion } from "../../../redux/types/surveyTypes";
import EditContainer from "./EditContainer";
import Image from "next/image";
import downloadIcon from "../../../styles/icons/icons8-download-64.png";
import styles from "./SurveyList.module.css";
import { CSVLink } from "react-csv";
import { instancePagination } from "../../../pages/api/backend/pagination";


const TableSurveyList = ({userSurveys, setUserSurveys, copyLink, link, isCopiedLink, pageNumber}): ReactElement => {
    const { data: session} = useSession();
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

    const [file, setFile] = useState<string | any>(null);
    const [uuid, setUUID] = useState<string>("");

    const [isPublished, setIsPublished] = useState(null);
    const handleOnChangePublished = () => {
        setIsPublished(!isPublished);
    };

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
    const editQuestions = (e: {target: { value: any; }}, question: { id: number; survey_id: any}, index: any) => {
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

    const handleOnchangeDescription = (e: { target: { value: React.SetStateAction<string>; }}) => {
        setDescription(e.target.value);
    };

    const handleOnchangeSuccessMessage = (e: { target: { value: React.SetStateAction<string> } }) => {
        setSuccessMessage(e.target.value);
    };

    const editSurvey = () => {
        console.log("survey id ", editSurveyId);
        const editDataSurvey = {
            id: editSurveyId,
            title: title,
            description: description,
            successful_message: successMessage,
            published: !isPublished,
            email: userEmail,
            questions: questions,
            questions_deleted: questionsDeleted,
            create_question: createQuestion,
        };
        const editSurvey = async(data: IGetSurvey, id: any) => {
            const editDataSurvey: IGetSurvey = await surveyApi.editSurvey(data, id);
            console.log(" editDataSurvey ", editDataSurvey);
            const getListSurveys = async() => {
                const list = await instancePagination(pageNumber).get(`/survey/${session.user.email}`);
                setUserSurveys(list.data.data);
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

    const openEditSurvey = (item, index) => {
        getEditSurvey(item.id, index)
            setEditSurveyID(item.id);
            setDescription(item.description);
            setSuccessMessage(item.successful_message)
            setQuestionDeleted([]);
            setCreateQuestion([]);
            setTitle(item.title);
            setUserEmail(item.email);
            setIsPublished(!item.published);
            if (item.questions.length > 0 )setQuestion(item.questions.slice(0, item.questions.length - 1).map((q) => {
                return {
                    id: q.id, 
                    question: q.question, 
                    survey_id: item.id,
                }
            }));
    }

    const getFileWithSurvey = async (uuid: string) => {
        const fileFromDB =  await surveyApi.getFileSurvey(uuid);
        setFile(fileFromDB);
        setUUID(uuid);
    };

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
                    <th scope="col">File</th>
                    </tr>
                </thead>
                <tbody>
                    {userSurveys && userSurveys.length > 0 && (
                        userSurveys.map((survey, index) => {
                            return (
                                <tr key={index} className={styles.rowTable}>
                                    <th scope="row">{index+1}</th>
                                    <td className={styles.rowTitle}>
                                        <span  className={styles.statusSurvey}>{!survey.published? "private": ""}</span>
                                        <div className={styles.titleContent}>
                                            {survey.title}
                                        </div>
                                    </td>
                                    <td className={styles.description}>
                                        <div className={styles.descriptionContent}>
                                            {survey.description}
                                        </div>
                                    </td>
                                    <td>{survey.questions.length - 1}</td>
                                    <td 
                                        className={styles.linkRow} 
                                        onClick={() => copyLink(survey.uuid, survey.title, survey.published)}
                                    >  
                                        <span className={styles.copyLinkTitle}>copy link</span>
                                        <span className={styles.copyLink}>
                                            {survey.published ? `${link}/survey/${survey.uuid}`:`${link}/survey/not_public/${survey.uuid}`}
                                        </span>
                                        {
                                            isCopiedLink.surveyUUID === survey.uuid && (
                                                <div className={styles.linkCopiedContainer}>
                                                    <span className={styles.linkCopied}>
                                                        copied
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </td>
                                    <td className={styles.btnEditContainer}>
                                        <span className={styles.btnEdit}
                                            onClick={() => openEditSurvey(survey, index)}
                                        >
                                            edit
                                        </span>
                                    </td>
                                    <td 
                                        onMouseEnter={() => {getFileWithSurvey(survey.uuid)}} 
                                        onMouseLeave={() => {
                                            setUUID("");
                                            setFile(null);
                                        }}
                                        className={styles.downloadRow}
                                    >
                                        <i>
                                            <Image src={downloadIcon} height={30} width={30}/>
                                        </i>
                                        {
                                            survey.uuid  === uuid && file && (
                                                <CSVLink 
                                                    data={file} 
                                                    filename={`${
                                                        "survey_report" +
                                                        "_" +
                                                        new Date().toLocaleDateString("en-US")
                                                    }.csv`}
                                                    target="_blank"
                                                    className={styles.downLoadCSV}
                                                    
                                                    >
                                                        ok
                                                </CSVLink>
                                            )
                                        }
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
                    isPublished={isPublished}
                    handleOnChangePublished={handleOnChangePublished}
                />
            }          
        </div>

    );
};

export default TableSurveyList;
