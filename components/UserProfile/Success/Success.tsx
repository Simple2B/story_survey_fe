import React, { ReactElement } from 'react';
import styles from "../../Home/Home.module.css";

const Success = ({survey}): ReactElement => {

    return (
        <div className={styles.isSuccess}>
            {survey.successful_message.length === 0 && <div>answers added successfully</div>}
            {survey.successful_message.length > 0 && <div>{survey.successful_message}</div>}
        </div>

    )
}

export default Success;
