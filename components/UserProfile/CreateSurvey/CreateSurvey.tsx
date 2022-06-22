import React, { ReactElement, useState } from "react";
import Image from "next/image";
import styles from "./CreateSurvey.module.css";
import plusIcon from "../../../styles/icons/icons8-add-property-64.png";
import cancelIcon from "../../../styles/icons/icons8-cancel-64.png";
// import editIcon from "../../../styles/icons/icons8-pencil-64.png";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";
import { useStore } from "../../../redux/store";
import { surveyApi } from "../../../pages/api/backend/surveyInstance";
import { ICreateSurvey } from "../../../redux/types/surveyTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const CreateSurvey = (): ReactElement => {
    const {user} = useStore().getState();

    const { data: session} = useSession();
    const { push } = useRouter();

    console.log("session", session)

    const [isFormCreateOpen, setIsFormCreateOpen] = useState<boolean>(false);

    const [titleError, setTitleError] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const [questionError, setQuestionError] = useState<string>("");
    const [question, setQuestion] = useState<string>("");

    const [questions, setQuestions] = useState<string[]>([]);

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

    
    const openCreateSurvey = () => {
        setIsFormCreateOpen(!isFormCreateOpen);
        setQuestion("");
    };

    const addQuestion = (question: string) => {
        if (question.length === 0){
            setQuestionError("Question is empty");
        }
        setQuestions([...questions, question]);
        setQuestion("");
    };

    const writeQuestion = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuestion(e.target.value);

        let value = e.target.value;

        let errMsg ="";

        if (value !== undefined) {
            errMsg="Question is empty";
        }

        if ( value.length === 0){
            errMsg="Question is empty";
        }  else {
            errMsg="";
        }

        if (errMsg.length === 0) {
            setQuestionError("");
            setQuestion(value);
        } else {
            setQuestionError(errMsg);
        }
    };

    console.log("question", question);

    console.log("add question", questions);
    
    const deleteQuestion = (index: number) => {
        setQuestions([...questions.filter((item, ind) => index !==ind)]);
    };

    const createSurvey = () => {
        if (title.length === 0) {
            setTitleError("Title is empty");
        };

        console.log("survey ", {
            "title": title,
            "user_id": user.id,
            "email": session? session.user.email : "",
            "questions": questions,
        });

        const data: ICreateSurvey = {
            "title": title,
            "user_id": user.id,
            "email": user.email,
            "questions": questions,
        }

        const saveSurveyToDB = async(data: ICreateSurvey) => {
            const newSurvey = surveyApi.createSurvey(data);
            console.log("newSurvey =>>> ", newSurvey)
        };
        saveSurveyToDB(data);
        setIsFormCreateOpen(false);
        push('/user_profile/user');

    }

    return  (
        <div className={styles.container}>
            <div className={styles.listSurveys}>

                {
                    !isFormCreateOpen ? (
                    <div className={`${styles.item} ${styles.itemHover}`} onClick={openCreateSurvey}>
                        <div className={styles.rightSide}>
                            <span className={styles.text}>Create survey</span>
                            <Image src={plusIcon} height={30} width={30}/>
                        </div>
                        <i className={`${styles.bx} ${styles.bxCartAlt} ${styles.cart}`}></i>
                    </div>
                    ) :
                    (
                        <div className={styles.survey}>
                                <i className={styles.cancelIcon} onClick={openCreateSurvey}><Image src={cancelIcon} height={30} width={30}/></i>
                                <div className={styles.titleContainer}>
                                    {titleError.length > 0 && <div className={styles.errorMessage}>{titleError}</div>}
                                    <input type="text" 
                                        className={styles.formControl} 
                                        value={title} 
                                        placeholder="Title"
                                        onChange={handleOnchange}
                                    />
                                </div>

                                <div className={styles.questionContainer}>
                                    {questions.length > 0 && (
                                        questions.map((question, index) => {
                                                return (
                                                    <div className={styles.question} key={index}>
                                                        <i className={styles.editIcon} onClick={() => deleteQuestion(index)}><Image src={deleteIcon} height={30} width={30}/></i>
                                                        <div>{index+1}). {question}</div>
                                                    </div>
                                                )
                                        })
                                    )}
                                </div>

                                <div className={styles.titleContainer}>
                                    {questionError.length > 0 && <div className={styles.errorMessage}>{questionError}</div>}
                                    <textarea placeholder="Write your question" value={question} onChange={writeQuestion} className={styles.formControl}  name="addQuestion" id=""  rows={3}>{question}</textarea>
                                </div>
                                <button className={`${styles.position} ${styles.btnAdd}`} disabled={questionError.length > 0} onClick={() => addQuestion(question)}>+ add question</button>
                                

                                <button className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} disabled={titleError.length > 0} onClick={createSurvey}>Create survey</button>
                                
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default CreateSurvey;
