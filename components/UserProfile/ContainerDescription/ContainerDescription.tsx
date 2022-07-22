import React, { ReactElement } from 'react';
import Image from "next/image";
import styles from "./ContainerDescription.module.css";
import deleteIcon from "../../../styles/icons/icons8-cancel-64.png";
import { useCheckAnswer } from '../../Hooks/useCheckAnswer';
import InfoMessage from '../../common/InfoMessage/InfoMessage';
import { useSession } from 'next-auth/react';

const ContainerDescription = ({setOpenDescription, isOpenDescription, survey, openQuestion}): ReactElement => {
    const {data: session, status} = useSession();
    const isAnswer = useCheckAnswer(survey.uuid);
    return (
        <div className={styles.modalWindow}>
            {isAnswer &&
                    <div onClick={() => setOpenDescription(!isOpenDescription)}>
                            <InfoMessage children={"You are already answer the questions for this survey"} infoStyle={styles.infoContainer}/> 
                    </div>
            }
            <div className={styles.modal}>
                <i className={styles.editIcon} onClick={() => setOpenDescription(!isOpenDescription)}>
                    <Image src={deleteIcon} height={30} width={30}/>
                </i>
                <div className={styles.titleShowMore}>
                    {survey.title}
                </div>
                
                <div className={styles.description}>
                    {survey.description}
                </div>
                {
                    !isAnswer  &&
                    <button 
                        className={!isAnswer ? `${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}` : ""} 
                        onClick={() => openQuestion(survey)}
                    >
                            Answer the {survey.questions.length > 0 ? "questions" : "question"}
                    </button>
                }
                
            </div>
        </div>
    )
}

export default ContainerDescription;
