import React, { ReactElement, useState } from "react";
import styles from "./SurveyList.module.css";
import Image from "next/image";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";
import deleteIcon2 from "../../../styles/icons/icons8-multiply-64.png";
import Checkbox from "../../common/Checkbox/Checkbox";


const EditContainer = ({
        isOpen, 
        setIsOpen, 
        titleError, 
        title, 
        handleOnchange, 
        questions, 
        setQuestion,
        editQuestions, 
        description,
        handleOnchangeDescription,
        successMessage,
        handleOnchangeSuccessMessage,
        editSurvey,
        userEmail,
        editSurveyId,
        questionsDeleted, 
        setQuestionDeleted,
        createQuestion,
        setCreateQuestion,
        isPublished,
        handleOnChangePublished,
    }): ReactElement => {

    // const [delQuestions, setDelQuestions] = useState<IQuestion[]>([{
    //     id: 0,
    //     question: "",
    //     survey_id: 0,
    // }]);
    const [writeQuestion, setWriteQuestion] = useState<string>("");
    const deleteQuestion = async (questionId: number, surveyId: number) => {
        if (questions.length < 1 || createQuestion.length < 0) {
            console.log("EditContainer: questions.length ", questions.length);
            alert("The survey must contain at least one question ")
            return; 
        };
        const delQuestion = questions.filter((question: { id: number; }) => question.id === questionId);
        setQuestionDeleted(prev => [...prev, delQuestion[0]]);
        setQuestion((prevQuestions) => prevQuestions.filter((question: { id: number; }) => question.id != questionId));
    };

    const handleWriteQuestion = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setWriteQuestion(e.target.value);
    };

    const addQuestion = (question: string) => {
        setCreateQuestion(prev => [...prev, question]);
        setWriteQuestion("");
    };
    
    const deleteWriteQuestion = (index: number) => {
        setCreateQuestion(prev => prev.filter((_, i) => index !== i));
    };

    const editWriteQuestion = (e, index: number) => {
        setCreateQuestion(prev => prev.map((question: string, i: number) => {
            if (index === i) {
                question = e.target.value
            }
            return question;
        }));
    }

    return  (
        (
            <div className={styles.modalWindow}>
                <div className={styles.modal}>
                    <i className={styles.closeIconEdit} onClick={() => setIsOpen(!isOpen)}>
                        <Image src={deleteIcon} height={30} width={30}/>
                    </i>
                    <div className={styles.titleContainer}>
                        {titleError.length > 0 && <div className={styles.errorMessage}>{titleError}</div>}
                        <input type="text" 
                            className={styles.formControl} 
                            value={title} 
                            placeholder="Title"
                            onChange={handleOnchange}
                        />
                    </div>
                    {
                        ( questions.length > 0)  && questions.map((item, index) => {
                            return (
                                <div className={styles.titleContainer} key={item.id}>
                                    <i 
                                        className={styles.deleteIcon} 
                                        onClick={() => deleteQuestion(item.id, editSurveyId)}
                                        title={'delete question'}
                                    >
                                        <Image src={deleteIcon2} height={30} width={30}/>
                                    </i>
                                    <textarea 
                                        placeholder="question" 
                                        value={item.question} 
                                        onChange={(e) => editQuestions(e, item, index)} 
                                        className={styles.formControl}  
                                        name={item.question} 
                                        rows={1}
                                    >
                                        {/* {item.question} */}
                                    </textarea>
                                </div>
                            )
                        })
                    }
                    {
                        createQuestion.length > 0 && createQuestion.map((item: string, index: number) => {
                            return (
                                <div className={styles.titleContainer} key={index}>
                                    <i 
                                        className={styles.deleteIcon} 
                                        onClick={() => deleteWriteQuestion(index)}
                                        title={'delete question'}
                                    >
                                        <Image src={deleteIcon2} height={30} width={30}/>
                                    </i>
                                    <textarea 
                                        placeholder="question" 
                                        value={item} 
                                        onChange={(e) => editWriteQuestion(e, index)} 
                                        className={styles.formControl}  
                                        name={item} 
                                        rows={1}
                                    >
                                        {/* {item.question} */}
                                    </textarea>
                                </div>
                            )
                        })
                    }
                    <div className={`${styles.titleContainer} ${styles.titleContainerPosition}`}>
                        <textarea 
                            placeholder="add question" 
                            value={writeQuestion} 
                            onChange={handleWriteQuestion} 
                            className={styles.formControl}  
                            name="addQuestion" 
                            id=""  
                            rows={3}
                        >
                            {/* {question} */}
                        </textarea>
                        <div
                            className={`${styles.position} ${styles.btnAdd}`} 
                            onClick={() => addQuestion(writeQuestion)}
                        >
                                + add question
                        </div>
                    </div>

                    <div className={styles.titleContainer}>
                        <textarea 
                            placeholder="description" 
                            value={description} 
                            onChange={handleOnchangeDescription} 
                            className={styles.formControl}  
                            name="description" 
                            id=""  
                            rows={2}
                        >
                            {/* {description} */}
                        </textarea>
                    </div>

                    <div className={styles.titleContainer}>
                        <textarea 
                            placeholder="success message" 
                            value={successMessage} 
                            onChange={handleOnchangeSuccessMessage} 
                            className={styles.formControl}  
                            name="successMessage" 
                            id=""  
                            rows={1}
                        >
                            {/* {successMessage} */}
                        </textarea>
                    </div>
                    <Checkbox 
                        children={"private"}
                        value={"not public"}
                        id={"createSurveyCheckbox"} 
                        isChecked={isPublished} 
                        handleOnChange={handleOnChangePublished}                                
                    />

                    <button 
                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} 
                        disabled={titleError.length > 0} onClick={editSurvey}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        )
    );
};

export default EditContainer;
