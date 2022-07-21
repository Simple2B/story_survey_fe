import React, { ReactElement } from 'react';
import styles from "./SurveyList.module.css";

const QuestionUserList = ({questions}): ReactElement => {

    return (
        <div className={styles.containerQuestionList}>
            {   
                questions.length > 0 && (
                    questions.slice(0, 1).map((q, index) => {
                        return (
                            <div className={styles.containerStep} key={index}>
                                {questions.length > 2 && <span className={styles.btnShowMore}>
                                    <i className={`${styles.arrow} ${styles.up}`}>
                                    </i></span> }

                                <div className={styles.indicator} key={index}>
                                    <i className={`bx bx-right-arrow-alt`}></i>
                                    <span className={styles.text}>
                                        {q.question.length > 100 ? q.question.substring(0, 100) + '...' : q.question}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                )
            }
            <div className={styles.hideContainerQuestion}>
                {   
                    questions.length > 1 && (
                        questions.slice(0, questions.length - 1).map((item, index) => {
                            return (
                                <div className={styles.containerStep} key={index}>
                                    <div className={styles.indicator} key={index}>
                                        <i className={`bx bx-right-arrow-alt`}></i>
                                        <span className={styles.textHidden}>{item.question}</span>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default QuestionUserList;
