import React, { ReactElement } from 'react';
import styles from "./Home.module.css";

const QuestionList = ({questions}): ReactElement => {

    return (
        <div className={styles.containerQuestionList}>
            {   
                questions.length > 0 && (
                    questions.slice(0, 1).map((q, index) => {
                        return (
                            <div className={styles.containerStep} key={index}>
                                {
                                    questions.length > 2 && 
                                    <div className={styles.btnShowMore}>
                                        <i className={`${styles.arrow} ${styles.up}`}></i>
                                    </div> 
                                }
                                <div className={styles.indicator}>
                                    <div className={styles.indicatorIcon}><i className={`bx bx-right-arrow-alt`}></i></div>
                                    <div className={styles.text}>
                                        {q.question.length > 100 ?  q.question.substring(0, 100) + '...' : q.question}
                                    </div>
                                </div>
                                <div className={styles.hideContainerQuestion}>
                                    {   
                                        questions.length > 1 && (
                                            questions.slice(0, questions.length - 1).map((item, index) => {
                                                return (
                                                    <div className={styles.indicator}>
                                                        <div className={styles.indicatorIcon}><i className={`bx bx-right-arrow-alt`}></i></div>
                                                        <div className={styles.textHidden}>{item.question}</div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div> 
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}

export default QuestionList;
