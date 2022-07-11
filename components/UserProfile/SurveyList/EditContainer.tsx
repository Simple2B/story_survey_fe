import React, { ReactElement } from "react";
import styles from "./SurveyList.module.css";
import Image from "next/image";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";




const EditContainer = ({
    isOpen, 
    setIsOpen, 
    titleError, 
    title, 
    handleOnchange, 
    questions, 
    editQuestions, 
    description,
    handleOnchangeDescription,
    successMessage,
    handleOnchangeSuccessMessage,
    editSurvey
    }): ReactElement => {

    
    return  (
        (
            <div className={styles.modalWindow}>
                <div className={styles.modal}>
                    <i className={styles.editIcon} onClick={() => setIsOpen(!isOpen)}>
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
                            questions[0].id !== 0 && questions.map((item, index) => {
                                return (
                                    <div className={styles.titleContainer} key={item.id}>
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

                    <button 
                        className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`} 
                        disabled={titleError.length > 0} onClick={editSurvey}
                    >
                        Edit survey
                    </button>
                </div>
            </div>

        )
    );
};

export default EditContainer;
